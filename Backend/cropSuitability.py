from pydantic import BaseModel, Field, validator

class SuitableCrop(BaseModel):
    Crop: str
    Soil: str
    Temp_low: float = Field(..., ge=0, le=50)
    Temp_high: float = Field(..., ge=0, le=50)
    Rainfall: float = Field(..., ge=0, le=5000)
    Humidity: float = Field(..., ge=0, le=100)
    Moisture: float = Field(..., ge=0, le=100)
    pH: float = Field(..., ge=0, le=14.0)
    Elevation: float = Field(..., ge=0, le=4000)
    Nitrogen: float = Field(..., ge=0, le=1000)
    Phosphorus: float = Field(..., ge=0, le=1000)
    Potassium: float = Field(..., ge=0, le=1000)
    Pest: str
    Irrigation: str

    @validator("Crop")
    def validate_crop(cls, v):
        allowed = {
            "black pepper",
            "clove",
            "small cardamom"
        }

        value = v.strip().lower()

        if value not in allowed:
            raise ValueError(
                "Crop must be Black Pepper, Clove, or Small Cardamom"
            )

        return v.strip()

    @validator("Soil")
    def validate_soil(cls, v):
        allowed = {
            "black soil",
            "red soil",
            "forest soil",
            "laterite",
            "black cotton",
            "red loam",
            "red sandy",
            "mountain soil",
            "alluvial",
            "silty",
            "silty clay loam",
            "clayey",
            "sandy",
            "loamy",
            "sand clay loam",
            "sandy loam",
            "clayey loam",
            "sandy clay",
            "loamy sand",
            "silty loam"
        }

        value = v.strip().lower()

        if value not in allowed:
            raise ValueError("Invalid soil type")

        return v.strip()

    @validator("Pest")
    def validate_pest(cls, v):
        allowed = {"low", "medium", "high"}

        value = v.strip().lower()

        if value not in allowed:
            raise ValueError("Pest must be Low, Medium, or High")

        return value.capitalize()

    @validator("Irrigation")
    def validate_irrigation(cls, v):
        allowed = {"yes", "no"}

        value = v.strip().lower()

        if value not in allowed:
            raise ValueError("Irrigation must be Yes or No")

        return value.capitalize()