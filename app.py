from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
import json
from PIL import Image


from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

gemini_model = genai.GenerativeModel("models/gemini-3.6-flash")


from monument_data import MONUMENT_DATA
from monument_info import MONUMENT_INFO

from tensorflow.keras.applications.densenet import preprocess_input 


app = Flask(__name__)


# ==========================
# Load Model
# ==========================

model = tf.keras.models.load_model(
    "fixed.keras",
    compile=False
)

print("✅ Model Loaded")

# ==========================
# Load Class Names
# ==========================

with open("class_names.json", "r") as f:
    class_names = json.load(f)

print(class_names)

# ==========================
# Prediction Function
# ==========================

def predict_image(image):

    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image)
    image = np.expand_dims(image, 0)
    image = preprocess_input(image)

    pred = model.predict(image, verbose=0)

    idx = np.argmax(pred)

    monument = class_names[idx]

    confidence = float(np.max(pred)) * 100

    return monument, confidence


# ==========================
# Home Page
# ==========================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================
# Prediction API
# ==========================

@app.route("/predict", methods=["POST"])
def predict():

    print("1. Request received")

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    image = Image.open(request.files["image"])
    print("2. Image loaded")

    monument, confidence = predict_image(image)
    print("3. Prediction done:", monument)

    info = MONUMENT_INFO.get(monument, {
        "history": "Not available",
        "architecture": "Not available",
        "speciality": "Not available",
        "best_time": "Not available"
    })
    print("4. Info loaded")

    data = MONUMENT_DATA.get(monument, {
        "state": "India",
        "lat": 20.5937,
        "lon": 78.9629
    })
    print("5. Location loaded")

    return jsonify({

    "monument": monument,

    "history": info.get("history"),

    "architecture": info.get("architecture"),

    "speciality": info.get("speciality"),

    "best_time": info.get("best_time"),

    "builder": info.get("builder"),

    "built_year": info.get("built_year"),

    "dynasty": info.get("dynasty"),

    "unesco": info.get("unesco"),

    "timings": info.get("timings"),

    "entry_fee": info.get("entry_fee"),

    "gallery": info.get("gallery", []),

    "state": data.get("state"),

    "latitude": data.get("lat"),

    "longitude": data.get("lon")

})





@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    monument = data.get("monument", "")
    question = data.get("question", "")

    prompt = f"""
You are an expert Indian Heritage Guide.

The identified monument is:
{monument}

Answer ONLY about this monument.

Keep the answer simple, informative, and within 120 words.

User Question:
{question}
"""

    try:
        response = gemini_model.generate_content(prompt)

        return jsonify({
            "answer": response.text
        })

    except Exception as e:
        return jsonify({
            "answer": f"Error: {str(e)}"
        })

if __name__ == "__main__":
    app.run(debug=True)