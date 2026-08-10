from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import numpy as np
import joblib
import os

# Download required NLTK data quietly (only if missing)
for pkg in ("stopwords", "wordnet"):
    try:
        nltk.data.find(f"corpora/{pkg}")
    except LookupError:
        nltk.download(pkg, quiet=True)

app = Flask(__name__)
CORS(app)  # allow the extension / any origin to call this API

label_encoder = joblib.load('label_encoder.joblib')
model_pipeline = joblib.load('sgd_classifier_model.joblib')
sgd_classifier = model_pipeline  # same object, single load is enough

STOP_WORDS = set(stopwords.words('english'))
LEMMATIZER = WordNetLemmatizer()

with open('en.txt', 'r') as f:
    OFFENSIVE_WORDS = set(line.strip() for line in f if line.strip())


def preprocess_text(text):
    text = re.sub(r'http\S+|www\S+|@\S+|#\S+|[^A-Za-z\s]', '', text)
    text = text.lower()
    tokens = [LEMMATIZER.lemmatize(word) for word in text.split() if word not in STOP_WORDS]
    return ' '.join(tokens)


NOT_CYBERBULLYING_INDEX = list(label_encoder.classes_).index('not_cyberbullying')


def binary_cyberbullying_detection(text):
    """Text is 'unsafe' whenever the predicted class is anything other than
    'not_cyberbullying' (the original code compared the predicted class index
    to a hardcoded 1, which only matched the 'ethnicity' class)."""
    try:
        preprocessed_text = preprocess_text(text)
        prediction = model_pipeline.predict([preprocessed_text])[0]
        is_unsafe = int(prediction) != NOT_CYBERBULLYING_INDEX
        offending_words = [word for word in preprocessed_text.split() if word in OFFENSIVE_WORDS]
        return (1 if is_unsafe else 0), offending_words
    except Exception:
        return None, []


def multi_class_cyberbullying_detection(text):
    try:
        preprocessed_text = preprocess_text(text)
        decision_function_values = sgd_classifier.decision_function([preprocessed_text])[0]
        predicted_class_index = np.argmax(decision_function_values)
        predicted_class_label = label_encoder.inverse_transform([predicted_class_index])[0]
        return predicted_class_label, decision_function_values
    except Exception:
        return None, None


def format_offensive_words(offensive_words):
    return ', '.join(offensive_words)


@app.route('/')
def welcome():
    return """<div>
    <h1>Welcome to the Cyberbullying Detection API!</h1>
    <p>This API allows you to detect cyberbullying in text. Send a POST request to /detect with the 'user_input' parameter to analyze text.</p>
    </div>"""


@app.route('/health')
def health():
    return jsonify({"status": "ok"})


@app.route('/detect', methods=['POST'])
def detect():
    user_input = request.form.get('user_input', '')
    try:
        binary_result, offensive_words = binary_cyberbullying_detection(user_input)
        predicted_class, prediction_probs = multi_class_cyberbullying_detection(user_input)

        if binary_result == 1:
            result = {
                "message": "This text is unsafe.",
                "details": {
                    "offensive": True,
                    "offensive_reasons": [f"Following words might be offensive: {format_offensive_words(offensive_words)}"] if offensive_words else [],
                    "multi_class_result": f"Multi-Class Predicted Class: {predicted_class}",
                }
            }
        else:
            result = {
                "message": "This text is safe.",
                "details": {
                    "offensive": False,
                    "offensive_reasons": [f"Following words might be offensive: {format_offensive_words(offensive_words)}"] if offensive_words else [],
                    "multi_class_result": "",
                    "context_analysis": ""
                }
            }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e), "input": user_input}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 33507))
    app.run(host='0.0.0.0', port=port, debug=False)
