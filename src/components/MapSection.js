import React, { useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import { gql, useQuery } from "@apollo/client";
import { FaTrain, FaBus, FaSubway, FaLocationArrow } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import "./../index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

require("dotenv").config();

const ALL_STATIONS = gql`
  query {
    stations {
      name
      lat
      lon
      zoneId
      vehicleMode
      id
      gtfsId
    }
  }
`;

function GetIcon(props) {
  const busStyle = { color: "#0EB63B" };
  const trainStyle = { color: "#FD5A1F" };
  const subwayStyle = { color: "#EE1FFD" };
  switch (props.vehicleMode) {
    case "BUS":
      return <FaBus style={busStyle} />;
    case "RAIL":
      return <FaTrain style={trainStyle} />;
    case "SUBWAY":
      return <FaSubway style={subwayStyle} />;
    default:
      return null;
  }
}
function MapSection({
  setStation,
  setAllStations,
  viewport,
  setViewport,
  lat,
  lon,
}) {
  const result = useQuery(ALL_STATIONS);
  const [userLocation, setUserLocation] = useState({ show: false });

  /* eslint-disable */
  mapboxgl.workerClass =
    require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
  /* eslint-enable */
  if (result.loading) {
    return <div>loading...</div>;
  }
  setAllStations(result.data.stations);

  const GetUserLocation = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((location) => {
      let lat = location.coords.latitude;
      let lon = location.coords.longitude;
      setUserLocation({
        ...userLocation,
        show: true,
        lat: lat,
        lon: lon,
      });
      setViewport({
        ...viewport,
        latitude: lat,
        longitude: lon,
        zoom: 13,
      });
    });
  };

  const style = { color: "red" };
  return (
    <div className="mapSection">
      <ReactMapGl
        className="map"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/niksu98/ckp6mewtr7fni18otmkpslbbs"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <FaLocationArrow className="locationarrow" onClick={GetUserLocation} />
        {result.data.stations.map((s) => (
          <Marker key={s.id} latitude={s.lat} longitude={s.lon}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setStation(s);
                setViewport({
                  ...viewport,
                  latitude: s.lat,
                  longitude: s.lon,
                  zoom: 13,
                });
              }}
              className="stationMarker"
            >
              {GetIcon(s)}
            </button>
          </Marker>
        ))}
        {userLocation.show ? (
          <Marker latitude={userLocation.lat} longitude={userLocation.lon}>
            <GoLocation style={style} />
          </Marker>
        ) : null}
      </ReactMapGl>
    </div>
  );
}

export default MapSection;
