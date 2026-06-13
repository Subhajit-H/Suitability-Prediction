from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from cropSuitability import SuitableCrop
import joblib
import numpy as np

# Create the app object
app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5178","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("crop_model.pkl")
le_crop = joblib.load("le_crop.pkl")
le_irrigation = joblib.load("le_irrigation.pkl")
le_pest = joblib.load("le_pest.pkl")
le_soil = joblib.load("le_soil.pkl")

@app.post("/predict")
def predict(data: SuitableCrop):

    data = data.dict()

    # Encode categorical features
    crop_encoded = le_crop.transform([data["Crop"]])[0]
    irrigation_encoded = le_irrigation.transform([data["Irrigation"]])[0]
    pest_encoded = le_pest.transform([data["Pest"]])[0]
    soil_encoded = le_soil.transform([data["Soil"]])[0]

    # Extract the features
    features = np.array([[
        crop_encoded,
        soil_encoded,
        data["Temp_low"],
        data["Temp_high"],
        data["Rainfall"],
        data["Humidity"],
        data["Moisture"],
        data["pH"],
        data["Elevation"],
        data["Nitrogen"],
        data["Phosphorus"],
        data["Potassium"],
        pest_encoded,
        irrigation_encoded,
    ]])

    prob = model.predict_proba(features)[0][1]
    prediction = model.predict(features)[0]

    return {
        "suitability_probablity": float(prob),
        "prediction": str(prediction)
    }