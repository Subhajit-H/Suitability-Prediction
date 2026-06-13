import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { crops } from "../assets/data_range.js"

const Predictor = () => {
  
  const { checkSuitability, checkConditions, needIrrigation, needGreenHouse, navigate } = useContext(ShopContext);

  const [ crop, setCrop ] = useState('Clove');
  const [ soil, setSoil ] = useState('Alluvial');
  const [ temp_low, setTemp_Low ] = useState('');
  const [ temp_high, setTemp_High] = useState('');
  const [ rainfall, setRainfall ] = useState('');
  const [ humidity, setHumidity ] = useState('');
  const [ elevation, setElevation ] = useState('');
  const [ pH, setpH ] = useState('');
  const [ n, setN ] = useState('');
  const [ p, setP ] = useState('');
  const [ k, setK ] = useState('');
  const [ soil_moist, setSoil_Moist ] = useState('')   
  const [ pest, setPest ] = useState('Low');
  const [ irrigation, setIrrigation ] = useState('Yes');

  const [ prediction, setPrediction ] = useState("");
  const [ probability, setProbability ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ recommend, setRecommed ] = useState(false);

  const formData = {
    crop,
    soil,
    temp_low,
    temp_high,
    rainfall,
    humidity,
    soil_moist,
    pH,
    elevation,
    n,
    p,
    k,
    pest,
    irrigation
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await checkSuitability(formData);
      setPrediction(result.prediction);
      setProbability(result.probability)

      if(result.prediction === "Unsuitable for Crop Cultivation") {
        
        const selectedCrop = crops.find(item => item.crop === formData.crop);
        
        const result1 = checkConditions(formData, selectedCrop);
        
        setRecommed(result1);
      }
      console.log(formData)
    } catch (error) {
      console.log("Error", error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    <div className="bg-white flex justify-center py-10 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-6xl border border-gray-300 rounded-lg p-8 bg-white"
      >
        <div className="flex items-center gap-3 mb-8">
          <p className="text-3xl text-gray-800">Predict</p>
          <hr className="w-12 border-gray-400" />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-gray-700">Crop</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Clove">Clove</option>
                <option value="Black Pepper">Black Pepper</option>
                <option value="Small Cardamom">Small Cardamom</option>
              </select>
            </div>
  
            <div>
              <label className="block mb-2 text-gray-700">Soil Type</label>
              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Alluvial">Alluvial</option>
                <option value="Black Soil">Black Soil</option>
                <option value="Clayey">Clayey</option>
                <option value="Clayey Loam">Clayey Loam</option>
                <option value="Forest Soil">Forest Soil</option>
                <option value="Red Soil">Red Soil</option>
                <option value="Laterite">Laterite</option>
                <option value="Loamy">Loamy</option>
                <option value="Loamy Sand">Loamy Sand</option>
                <option value="Mountain Soil">Mountain Soil</option>
                <option value="Red Loam">Red Loam</option>
                <option value="Red Sandy">Red Sandy</option>
                <option value="Sandy">Sandy</option>
                <option value="Sandy Clay">Sandy Clay</option>
                <option value="Sand Clay Loam">Sand Clay Loam</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Silty">Silty</option>
                <option value="Silty Clay Loam">Silty Clay Loam</option>
                <option value="Silty Loam">Silty Loam</option>
              </select>
            </div>
  
            <div>
              <label className="block mb-2 text-gray-700">Pest Level</label>
              <select
                value={pest}
                onChange={(e) => setPest(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
  
            <div>
              <label className="block mb-2 text-gray-700">Irrigation</label>
              <select
                value={irrigation}
                onChange={(e) => setIrrigation(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              value={temp_low}
              onChange={(e) => setTemp_Low(e.target.value)}
              type="number"
              placeholder="Lowest Temperature"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={temp_high}
              onChange={(e) => setTemp_High(e.target.value)}
              type="number"
              placeholder="Highest Temperature"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              type="number"
              placeholder="Rainfall"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              type="number"
              placeholder="Humidity"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={elevation}
              onChange={(e) => setElevation(e.target.value)}
              type="number"
              placeholder="Elevation"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={pH}
              onChange={(e) => setpH(e.target.value)}
              type="number"
              placeholder="pH"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={n}
              onChange={(e) => setN(e.target.value)}
              type="number"
              placeholder="Nitrogen"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={p}
              onChange={(e) => setP(e.target.value)}
              type="number"
              placeholder="Phosphorus"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={k}
              onChange={(e) => setK(e.target.value)}
              type="number"
              placeholder="Potassium"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
  
            <input
              required
              value={soil_moist}
              onChange={(e) => setSoil_Moist(e.target.value)}
              type="number"
              placeholder="Soil Moisture"
              className="border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
  
        <div className="flex justify-center mt-10">
          <button disabled={loading}
            type="submit"
            className={`border border-black px-10 py-3 rounded-md hover:bg-gray-200 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? "Loading..." : "PREDICT"}
          </button>
        </div>
      </form>
    </div>
    <div className="border border-gray-400 bg-white rounded-md p-6">
  <h1 className="text-2xl font-semibold text-center mb-4">
    Result
  </h1>

{prediction == "" ? '' : 
  <p className="text-center text-lg">
    {loading ? "" : `${prediction}`}
  </p>
}

{probability == "" ? '' : 
  <p className="text-center text-lg">
    {loading ? `` : `${probability}`}%
  </p>
}

{prediction == "" ? '' : 
  <p className="text-center text-lg">
    {recommend}
  </p>
}

{needIrrigation === false ? '' : 
  <p onClick={navigate('/irrigation')} className="text-center text-lg text-blue-800 hover:text-blue-500">
    Click here to find nearby water source.
  </p>
}
{needGreenHouse === false ? '' : 
  <p onClick={navigate('/irrigation')} className="text-center text-lg text-blue-800 hover:text-blue-500">
    Click here to know more about green house.
  </p>
}

</div>
    </div>
  );
}

export default Predictor