# filename: mental_health_chatbot.py
from transformers import AutoModelForCausalLM, AutoTokenizer
from flask import Flask, request, jsonify
import torch
from flask_cors import CORS    
import google.generativeai as genai
import os
genai.configure(api_key="AIzaSyBqVlduIMyqEetIzucDWNZA68cd2gZIFnI")
gemmodel = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
app = Flask(__name__)
CORS(app, supports_credentials=True)
print("🔄 Loading tokenizer and model...")
model_path = "prabureddy/Mental-Health-FineTuned-Mistral-7B-Instruct-v0.2"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",
    torch_dtype=torch.float16
).eval()

print("✅ Model is ready and running!")

# Trigger keywords
trigger_keywords = [
    "suicide", "kill myself", "want to die", "end my life", "can't go on", "no reason to live",
    "die", "dying", "take my life", "give up"
]

dissatisfaction_keywords = [
    "you don't get it", "you're not helping", "this isn’t working", "i give up", 
    "no one understands", "this is pointless", "i'm done", "just a bot"
]

messages = []

def contains_trigger(text, keyword_list):
    text_lower = text.lower()
    return any(phrase in text_lower for phrase in keyword_list)

def get_gemini_closure(messages):

    prompt_intro = "You're a compassionate mental health assistant. A user has just ended a session. Here is their conversation with you:\n\n"
    
    conversation_text = ""
    for msg in messages:
        role = msg["role"].capitalize()
        conversation_text += f"{role}: {msg['content']}\n"

    prompt = prompt_intro + conversation_text + "\nNow, end the session warmly and encouragingly."

    try:
        response = gemmodel.generate_content(prompt)
        return response.text.strip()    
    except Exception as e:
        print(f"❌ Gemini API error: {e}")
        return "Thank you for talking with me. Remember, you're never alone and I'm always here for you."

@app.route('/chat', methods=['POST'])
def chat():

    import os

    # Setup Gemini
    # Make sure you set this in your environment

    global messages

    data = request.get_json()
    user_input = None

    if data and 'messages' in data:
        user_messages = data['messages']
        last_msg = user_messages[-1]

        user_input = last_msg.get("content")

    if not user_input:
        return jsonify({'error': 'No message provided'}), 400
    if contains_trigger(user_input, ["bye", "quit"]):
        gemini_response = get_gemini_closure(messages)
        messages.append({"role": "assistant", "content": gemini_response})
        print(f"Alex (Gemini): {gemini_response}")
        return jsonify({
            "reply": gemini_response,
            "alerts": {"session_end": True}
        })

    # Trigger checks
    triggers = {
        "high_risk": contains_trigger(user_input, trigger_keywords),
        "dissatisfaction": contains_trigger(user_input, dissatisfaction_keywords)
    }

    # Update messages
    messages = data['messages']  # Sync the full conversation

    input_ids = tokenizer.apply_chat_template(
        conversation=messages,
        tokenize=True,
        add_generation_prompt=True,
        return_tensors='pt'
    ).to(model.device)

    output_ids = model.generate(input_ids, max_new_tokens=300, do_sample=True, temperature=0.7)
    response = tokenizer.decode(output_ids[0][input_ids.shape[1]:], skip_special_tokens=True)
    print(f"Alex: {response}")
    messages.append({"role": "assistant", "content": response})

    return jsonify({
        "reply": response,
        "alerts": triggers
    })

# Required import
import pyttsx3

# Initialize the engine
engine = pyttsx3.init()

def text_to_speech(text):
    engine.say(text)
    engine.runAndWait()
import speech_recognition as sr
def speech_to_text():
    recognizer = sr.Recognizer()
    
    with sr.Microphone(sample_rate=16000) as source:
        print("Adjusting for ambient noise...")
        recognizer.adjust_for_ambient_noise(source, duration=6)
        print("Listening...")
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        text = recognizer.recognize_google(audio, language="en-in")
        print("You said:", text)
        engine.say(f"You said: {text}")
        engine.runAndWait()
        return text
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand the audio.")
        engine.say("Sorry, I couldn't understand the audio.")
        engine.runAndWait()
        return ""
    except sr.RequestError as e:
        print(f"API error: {e}")
        engine.say(f"API error: {e}")
        engine.runAndWait()
        return ""
if __name__ == '__main__':
    app.run(debug=True,port=5100)
