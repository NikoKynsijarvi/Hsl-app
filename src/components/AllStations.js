import React, { useState } from "react";
import "./../index.css";
import { FaPlus, FaTrain, FaBus, FaSubway, FaSearch } from "react-icons/fa";

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

function Station({
  station,
  setStation,
  setViewport,
  viewport,
  FlyToInterpolator,
}) {
  return (
    <div className="singlestation">
      <h2 className="stationname">{station.name}</h2>
      {GetIcon(station)}
      <div
        className="plusicon"
        onClick={(e) => {
          e.preventDefault();
          setStation(station);
          setViewport({
            ...viewport,
            latitude: station.lat,
            longitude: station.lon,
            zoom: 13,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
          });
        }}
      >
        <FaPlus className="viewbutton"></FaPlus>
      </div>
    </div>
  );
}

function AllStations({
  stations,
  setStation,
  viewport,
  setViewport,
  FlyToInterpolator,
}) {
  const [search, setSearch] = useState("");

  const searchedStations = stations.filter((element) => {
    const stationName = element.name;
    return stationName.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="allstations">
      <form className="filtersearch">
        <FaSearch className="searchicon" />
        <div>
          <input
            className="searchinput"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </form>
      <nav className="stationslist">
        <div>
          {searchedStations.map((s) => (
            <ul className="stationsul" key={s.id}>
              <Station
                FlyToInterpolator={FlyToInterpolator}
                key={s.id}
                station={s}
                setStation={setStation}
                viewport={viewport}
                setViewport={setViewport}
              ></Station>
            </ul>
          ))}
        </div>
      </nav>
    </div>
  );
}
export default AllStations;
