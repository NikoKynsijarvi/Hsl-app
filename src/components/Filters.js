import React from "react";
import { FaMapMarked, FaSearchLocation } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as geolib from "geolib";

function Filters({
  FlyToInterpolator,
  setNavOpen,
  allStations,
  setStation,
  setViewport,
  viewport,
  navOpen,
  text,
  link,
  icon,
  setRoute,
  route,
  station,
  tripOpen,
  setTripOpen,
}) {
  const filterNearest = (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition((location) => {
      let lat = location.coords.latitude;
      let lon = location.coords.longitude;

      const nearest = geolib.findNearest(
        {
          latitude: lat,
          longitude: lon,
        },

        allStations.map((a) => {
          let coordinate = { latitude: a.lat, longitude: a.lon };
          return coordinate;
        })
      );

      const nearestStation = allStations.find(
        (s) => s.lat === nearest.latitude && s.lon === nearest.longitude
      );
      setStation(nearestStation);

      setViewport({
        ...viewport,
        latitude: nearestStation.lat,
        longitude: nearestStation.lon,
        zoom: 13,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
      });
      setNavOpen(!navOpen);
    });
  };

  const clickedLink = () => {
    setNavOpen(false);
    if (route) {
      setRoute(null);
    }
    if (station) {
      setStation(null);
    }
    if (tripOpen) {
      setTripOpen(false);
    }

    setViewport({
      latitude: 60.170556,
      longitude: 24.941463,
      zoom: 11,
      width: "700px",
      height: "500px",
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const clickedTrip = () => {
    setNavOpen(false);
    setTripOpen(!tripOpen);
  };

  return (
    <div className="filterscontainer">
      <Link to={link} onClick={clickedLink} style={{ textDecoration: "none" }}>
        <div className="toroutes">
          <h2>{text}</h2>
          {icon}
        </div>
      </Link>

      {text === "Routes" ? (
        <div>
          <div className="toroutes" onClick={(e) => filterNearest(e)}>
            <h2>Nearest</h2>
            <FaSearchLocation className="routeicon" />
          </div>
          <div className="toroutes" onClick={clickedTrip}>
            {" "}
            <h2>Trip planning</h2>
            <FaMapMarked className="routeicon" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Filters;
