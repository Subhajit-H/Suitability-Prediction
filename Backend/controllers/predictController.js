import axios from "axios";

// Predict Controller for Suitability
export const suitabilityPrediction = async (req, res) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            req.body
        );
        return res.json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "ML backend not responding" });
    }
}