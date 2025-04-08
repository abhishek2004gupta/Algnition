# model.py
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_path = "prabureddy/Mental-Health-FineTuned-Mistral-7B-Instruct-v0.2"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",
    torch_dtype=torch.float16
).eval()

def run_chat_once(user_input):
    messages = [
        {"role": "user", "content": user_input}
    ]

    input_ids = tokenizer.apply_chat_template(
        conversation=messages,
        tokenize=True,
        add_generation_prompt=True,
        return_tensors='pt'
    ).to(model.device)

    output_ids = model.generate(input_ids, max_new_tokens=300, do_sample=True, temperature=0.7)
    response = tokenizer.decode(output_ids[0][input_ids.shape[1]:], skip_special_tokens=True)

    return response.strip()
