from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from routes.journal_routes import journal_bp
from model import run_chat_once  # ✅ Import updated chat function

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://hardikj112:ZJxCunmdOKOBgIZP@innerecho.zqpckcp.mongodb.net/?retryWrites=true&w=majority&appName=InnerEcho")
db = client.get_database("InnerEcho")
users_collection = db["users"]

@app.route('/')
def home():
    return "InnerEcho backend is running ✅"

# Journal Routes
app.register_blueprint(journal_bp, url_prefix='/journal')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get("email")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pw = generate_password_hash(data["password"])
    new_user = {
        "name": data["name"],
        "nickname": data["nickname"],
        "age": data["age"],
        "gender": data["gender"],
        "occupation": data["occupation"],
        "email": email,
        "password": hashed_pw
    }
    users_collection.insert_one(new_user)
    return jsonify({"message": "User created successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found"}), 400

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "nickname": user["nickname"],
            "email": user["email"],
            "age": user["age"],
            "gender": user["gender"],
            "occupation": user["occupation"]
        }
    }), 200

# ✅ AI Summary Endpoint
@app.route('/ai-tip', methods=['POST'])
def get_ai_tip():
    data = request.json
    user_input = data.get("message", "")
    if not user_input:
        return jsonify({"summary": "No input provided"}), 400

    summary = run_chat_once(user_input)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
