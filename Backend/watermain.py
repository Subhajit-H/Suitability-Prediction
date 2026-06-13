import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nearestWater import waterBody
import joblib
import numpy as np

# Create the app object
app = FastAPI()

# ALlow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load model
with open('knn_model.pkl', 'rb') as f:
    knn = pickle.load(f)

df = pd.read_pickle('locations.pkl')

@app.post("/locate")
def closest_water_body(data; waterBody):

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

    result_loc = ("Nearest Location of Water Body: ", nearest_location)
    result_dist = ("Distance to Water Body: ", distance_km)

    return {
    "distance": result_dist,
    "location": result_loc,
    }