import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from model import get_embedding
from utils import build_text

load_dotenv()
app = Flask(__name__)

@app.route("/embed", methods=["POST"])
def embed():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Invalid input"}), 400
        text = build_text(data)
        embedding = get_embedding(text)
        return jsonify({"embedding": embedding}), 200
    except Exception as e:
        print("Error in /embed:", str(e))
        return jsonify({"error": "Internal server error"}), 500
    
if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 3000))
    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() in ["true", "1", "yes"]
    app.run(port=PORT, debug=DEBUG)