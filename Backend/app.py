# 1. Library imports
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from cropSuitability import SuitableCrop
import numpy as np
import pandas as pd
import joblib

# 2. Create the app object
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5178","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("crop_model.pkl")
le_crop = joblib.load("le_crop.pkl")
le_cultivation = joblib.load("le_cultivation.pkl")
le_irrigation = joblib.load("le_irrigation.pkl")
le_pest = joblib.load("le_pest.pkl")
le_soil = joblib.load("le_soil.pkl")

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Crop Suitability Api running'}

# 4. Route with a single parameterm, returns the parameter within a message
# Located at: http://127.0.0.1:8000/
@app.post('/predict')
def predict_crop(data: SuitableCrop):

    # Convert pydantic to dict
    data = data.dict()

    # Encode categorical features
    crop_encoded = le_crop.transform([data["Crop"]])[0]
    soil_encoded = le_soil.transform([data["Soil"]])[0]
    pest_encoded = le_pest.transform([data["Pest"]])[0]
    irrigation_encoded = le_irrigation.transform([data["Irrigation"]])[0]

    # Create feature array
    features = np.array([[
        crop_encoded,
        data['pH'],
        data['Temp_low'],
        data['Temp_high'],
        data['Rainfall'],
        data['Humidity'],
        data['Moisture'],
        data['Nitrogen'],
        data['Phosphorus'],
        data['Potassium'],
        data['Elevation'],
        soil_encoded,
        pest_encoded,
        irrigation_encoded,
    ]])

    # Predict
    print(features)
    print(features.shape)
    prob = model.predict_proba(features)[0][1]
    prediction = model.predict(features)

    result = (
        "Unsuitable for Crop Cultivation"
        if prediction[0]==0
        else 'Suitable for Crop Cultivation'
    )
    return {
        'prediction': result,
        'probability': round(float(prob) * 100, 8),
    }

# 5. Run the API with uvicorn
# Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run("app:app", host='127.0.0.1', port=8000, reload=True)

#uvicorn app:app --reload