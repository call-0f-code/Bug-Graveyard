from flask import Flask, request, jsonify
from model import get_embedding
from utils import build_text

app = Flask(__name__)

@app.route("/embed", methods=["POST"])
def embed():
    data = request.json
    text = build_text(data)
    embedding = get_embedding(text)
    return jsonify({"embedding": embedding})

if __name__ == "__main__":
    app.run(port=3000, debug=True)