import { ShopContext } from "./ShopContext"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState('');
    const [ needIrrigation, setNeedIrrigation ] = useState(false);
    const [ needGreenHouse, setNeedGreenHouse ] = useState(false);
    const navigate = useNavigate();

    const closestWater = async (formData) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/locate",
          {
            Latitude: formData.lat,
            Longitude: formData.long
          }          
        );
        return response.data;
      } catch (error) {
        console.log("Error", error)
        return;
      }
    }
    const checkConditions = (formData, crops) => {
      try {

        if (!crops) {
          return "Crop Data Not Found!";
        }

        let messages = [];
        setNeedGreenHouse(false);
        setNeedIrrigation(false);
        if(formData.crop === crops.crop) {
          if(!crops.soil.includes(formData.soil)) {
            messages.push("Soil type is not suitable.")
          }
          if(formData.pH < crops.pH_low) {
            messages.push("Soil pH is too low.");
          }
          if(formData.pH > crops.pH_high) {
            messages.push("Soil pH is too high.");
          }
          if(formData.soil_moist < crops.moist_low) {
            messages.push("Soil Moisture is too low.");
          }
          if(formData.soil_moist > crops.moist_high) {
            messages.push("Soil Moisture is too high.");
          }
          if(formData.humidity < crops.humid_low) {
            messages.push("Humidity is too low.")
          }
          if(formData.humidity > crops.humid_high) {
            messages.push("Humidity is too high.")
          }
          if(formData.elevation < crops.elev_low) {
            messages.push("Elevation is too low.")
          }
          if(formData.elevation > crops.elev_high) {
            messages.push("Elevation is too high.")
          }
          if(formData.temp_low < crops.temp_low) {
            messages.push("Temperature is too low.")
            setNeedGreenHouse(true);
          }
          if(formData.temp_high > crops.temp_high) {
            messages.push("Temperature levels soars too high.")
            setNeedGreenHouse(true);
          }
          if(formData.rainfall < crops.rain_low) {
            messages.push("Rainfall levels are too low.")
          }
          if(formData.rainfall > crops.rain_high) {
            messages.push("Rainfall levels is too high.")
          }
          if(formData.n < crops.n_low) {
            messages.push("Nitrogen levels are too low.")
          }
          if(formData.n > crops.n_high) {
            messages.push("Nitrogen levels are too high.")
          }
          if(formData.p < crops.p_low) {
            messages.push("Phosphorus levels are too low.")
          }
          if(formData.p > crops.p_high) {
            messages.push("Phosphorus levels are too high.")
          }
          if(formData.k < crops.k_low) {
            messages.push("Potassium levels are too low.")
          }
          if(formData.k > crops.k_high) {
            messages.push("Potassium levels are too high.")
          }
          if(formData.pest === "High") {
            messages.push("Growth maybe stunted due to excess pest.")
          }
          if(formData.pest === "Medium") {
            messages.push("Growth may be slightly stunted.")
          }
          if(formData.irrigation === "No") {
            messages.push(`Irrigation is required for suitable growth of ${formData.crop}`)
            setNeedIrrigation(true);
          }
        } 
          return messages.join("\n");
      } catch (error) {
        console.log(error.message)
        return;
      }
    }

    const checkSuitability = async (formData) => {
      try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          Crop: formData.crop,
          Soil: formData.soil,
          Temp_low: Number(formData.temp_low),
          Temp_high: Number(formData.temp_high),
          Rainfall: Number(formData.rainfall),
          Humidity: Number(formData.humidity),
          Moisture: Number(formData.soil_moist),
          pH: Number(formData.pH),
          Elevation: Number(formData.elevation),
          Nitrogen: Number(formData.n),
          Phosphorus: Number(formData.p),
          Potassium: Number(formData.k),
          Pest: formData.pest,
          Irrigation: formData.irrigation
        }
      );
      console.log("Success:",response.formData);
      return response.data;
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Full Error:", error);
      return;
    }
  }

    const getUserProfile = async (token) => {
        try {
          const response = await axios.get(backendUrl + "/api/user/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success) {
            setUser(response.data.user);
          }
        } catch {
          toast.error("Failed to fetch user profile:");
        }
      };
      

      useEffect(() => {
        if (!token && localStorage.getItem("token")) {
          const savedToken = localStorage.getItem("token");
          setToken(savedToken);
          getUserProfile(savedToken);  // fetch user info too
        }
      }, [token]);
    
    const value = {
        navigate, 
        backendUrl, 
        token, 
        setToken, 
        user, 
        setUser, 
        getUserProfile,
        checkSuitability,
        closestWater,
        checkConditions,
        needIrrigation,
        needGreenHouse,
    }
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}