import React from "react";

import { FaTrain, FaBus, FaSubway, FaArrowLeft } from "react-icons/fa";
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

function StationInfo({ station, setStation, viewport, setViewport }) {
  return (
    <div>
      <h1>{station.name}</h1>
      <p>Zone: {station.zoneId}</p>
      <p>
        Type of vehicle: {station.vehicleMode} {GetIcon(station)}
      </p>
      <p>
        Location of station, latitude: {station.lat}, longitude: {station.lon}
      </p>
      <FaArrowLeft
        className="plusicon"
        onClick={(e) => {
          e.preventDefault();
          setStation(null);
          setViewport({
            ...viewport,
            latitude: 60.170556,
            longitude: 24.941463,
            zoom: 11,
          });
        }}
      ></FaArrowLeft>
    </div>
  );
}
export default StationInfo;
