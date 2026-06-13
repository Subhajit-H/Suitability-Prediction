import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
    <div style={{ fontSize: "25px" }}>
      {text}
    </div>
  );

export default function SimpleMap({ formData }) {
  const defaultProps = {
    center: {
      lat: 23.5520528, //23.5520528,87.2760367
      lng: 87.2760367,
    },
    zoom: 16,
  };

  const searchLocation = {
    center: {
      lat: Number(formData.lat),
      lng: Number(formData.long),
    },
    zoom: 16,
  };


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {searchLocation ? (
        <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        center={searchLocation.center}
        zoom={searchLocation.zoom}
      >
        <Marker
          lat={searchLocation.center.lat}
          lng={searchLocation.center.lng}
          text="Water"
        />
      </GoogleMapReact>
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        />
      )}
    </div>
  );
}
