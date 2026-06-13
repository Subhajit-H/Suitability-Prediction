from pydantic import BaseModel, Field

class waterBody(BaseModel):
    Latitude: float = Field(..., ge=-90, le=90)
    Longitude: float = Field(..., ge=-180, le=180)