import { useEffect, useState } from "react";
import * as toGeoJSON from "@tmcw/togeojson";

const KmlReader = () => {

  const [locations, setLocations] = useState([]);

  useEffect(() => {

    const loadKml = async () => {

      const response = await fetch("/Farm Pond.kml");
      const kmlText = await response.text();

      const parser = new DOMParser();
      const kml = parser.parseFromString(
        kmlText,
        "text/xml"
      );

      const geojson = toGeoJSON.kml(kml);

      const coords = geojson.features.map(
        feature => feature.geometry.coordinates
      );

      setLocations(coords);

      console.log(coords);
    };

    loadKml();

  }, []);


  return (
    <div>
      {locations.map((loc,index)=>(
        <p key={index}>
          Longitude: {loc[0]}, Latitude: {loc[1]}
        </p>
      ))}
    </div>
  );
};

export default KmlReader;