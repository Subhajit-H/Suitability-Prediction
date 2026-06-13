# 1. Library imports
import pickle
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nearestWater import waterBody
import pandas as pd
import numpy as np

# 2. App object
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5178","*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('knn_model.pkl', 'rb') as f:
    knn = pickle.load(f)

df = pd.read_pickle('locations.pkl')

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Crop Suitability Api running'}

# 4. Route with a single parameter, returns the parameter within a message
@app.post('/locate')
def closest_water_body(data: waterBody):

    # Pydantic to dict
    data = data.dict()

    # Feature Array
    query = np.array([[
        data['Latitude'],
        data['Longitude'],
    ]])
    
    # Approx
    query_rad = np.radians(query)
    distance, index = knn.kneighbors(query_rad)
    nearest_location = df.iloc[index[0][0]]
    distance_km = distance[0][0] * 6371

    result_loc = (nearest_location)
    result_dist = (distance_km)
    
    return {
    'distance': result_dist,
    'location': result_loc,
    }

# 5. Run the API with uvicorn
# Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run("app:app", host='127.0.0.1', port=8000, reload=True)

# uvicorn app:app --reload