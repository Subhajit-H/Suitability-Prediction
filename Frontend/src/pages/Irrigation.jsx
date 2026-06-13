import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import SimpleMap from '../components/Map.jsx'

const Irrigation = () => {
  const { closestWater } = useContext(ShopContext);

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");
  const [waterLocation, setWaterLocation ] = useState(null);
  
  const formData = {
    lat,
    long,
  };
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await closestWater(formData);
      setDistance(result.distance);
      setLocation(result.location);

      setWaterLocation({
        lat: result.latitude,
        long: result.longitude,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div>
    <div className="bg-white flex justify-center py-10 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-6xl border border-gray-300 rounded-lg p-8 bg-white"
      >
        <div className="flex items-center gap-3 mb-8">
          <p className="text-3xl text-gray-800">Closest Water Body</p>
          <hr className="w-12 border-gray-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            type="number"
            placeholder="Latitude"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
          <input
            required
            value={long}
            onChange={(e) => setLong(e.target.value)}
            type="number"
            placeholder="Longitude"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="border border-black px-10 py-3 rounded-md hover:bg-gray-200 transition"
          >
            SEARCH
          </button>
        </div>
      </form>
      <div className="border border-gray-400 bg-white rounded-md w-full max-w-6xl p-6 mt-6">
        <h1 className="flex items-center gap-3 text-2xl font-semibold text-center mb-4">
          Result
        </h1>
        <div>
        {distance == "" ? '' : <p className="text-center text-lg">Distance: {distance} km</p>}
        {location == "" ? '' : <p className="text-center text-lg flex">{JSON.stringify(location)}</p>}
        </div>
      </div>
    </div>
      <SimpleMap formData={formData} waterLocation={waterLocation} />
    </div>
  );
};

export default Irrigation;
