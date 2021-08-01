import React, { useState, useEffect } from "react";
import "./index.css";
import MapSection from "./components/MapSection";
import Navbar from "./components/Navbar";
import StationInfo from "./components/StationInfo";
import AllStations from "./components/AllStations";
import Filters from "./components/Filters";
import RoutesMap from "./components/RoutesMap";
import AllRoutes from "./components/AllRoutes";
import RouteInfo from "./components/RouteInfo";
import TripPlanning from "./components/TripPlanning";
import TripMap from "./components/TripMap";
import TripInfo from "./components/TripInfo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FlyToInterpolator } from "react-map-gl";
import { FaRoute, FaBuilding, FaPlus, FaSearch } from "react-icons/fa";
import { FaTrain, FaBus, FaSubway } from "react-icons/fa";

function Info() {
  const busStyle = { color: "#0EB63B" };
  const trainStyle = { color: "#FD5A1F" };
  const subwayStyle = { color: "#EE1FFD" };
  return (
    <div className="infocontainer">
      <h2>Station symbols</h2>
      <div className="infostation">
        <FaTrain style={trainStyle} />
        <p>Train station</p>
      </div>
      <div className="infostation">
        <FaBus style={busStyle} />
        <p>Bus station</p>
      </div>
      <div className="infostation">
        <FaSubway style={subwayStyle} />
        <p>Subway station</p>
      </div>
    </div>
  );
}

function StationsSection({
  tripOpen,
  setViewport,
  viewport,
  trip,
  setStation,
  setAllStations,
  station,
  allStations,
  setTripOpen,
  setTrip,
  FlyToInterpolator,
  info,
  setInfo,
}) {
  return (
    <div className="content">
      {tripOpen ? (
        <TripPlanning
          allStations={allStations}
          setTripOpen={setTripOpen}
          trip={trip}
          setTrip={setTrip}
          viewport={viewport}
          setViewport={setViewport}
        />
      ) : null}
      <MapSection
        setStation={setStation}
        setAllStations={setAllStations}
        setViewport={setViewport}
        viewport={viewport}
        trip={trip}
        info={info}
        setInfo={setInfo}
      />
      <div>
        {station ? (
          <StationInfo
            station={station}
            setStation={setStation}
            setViewport={setViewport}
            viewport={viewport}
          />
        ) : (
          <AllStations
            FlyToInterpolator={FlyToInterpolator}
            stations={allStations}
            setStation={setStation}
            setViewport={setViewport}
            viewport={viewport}
          />
        )}
      </div>
    </div>
  );
}

function GetHeight() {
  if (window.innerHeight < 800) {
    return 100;
  } else return 500;
}

function App() {
  const [station, setStation] = useState(null);
  const [allStations, setAllStations] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [tripOpen, setTripOpen] = useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  const [route, setRoute] = useState(null);
  const [trip, setTrip] = useState(null);
  const [info, setInfo] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 60.170556,
    longitude: 24.941463,
    zoom: 11,
    width: "700px",
    height: `${GetHeight()}px`,
    transitionDuration: 2000,
    transitionInterpolator: new FlyToInterpolator(),
  });

  console.log(viewport);
  useEffect(() => {
    route
      ? setViewport({
          latitude: 60.170556,
          longitude: 24.941463,
          zoom: 11,
          width: "100vw",
          height: "100vh",
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator(),
        })
      : setViewport({
          latitude: 60.170556,
          longitude: 24.941463,
          zoom: 11,
          width: "700px",
          height: "500px",
          transitionDuration: 2000,
          transitionInterpolator: new FlyToInterpolator(),
        });
  }, [route]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
            {info ? <Info /> : null}

            {trip ? (
              <div className="content">
                <TripMap
                  setViewport={setViewport}
                  viewport={viewport}
                  trip={trip}
                />
                <TripInfo
                  setTrip={setTrip}
                  setViewport={setViewport}
                  viewport={viewport}
                  trip={trip}
                />
              </div>
            ) : (
              <StationsSection
                station={station}
                viewport={viewport}
                setViewport={setViewport}
                trip={trip}
                tripOpen={tripOpen}
                allStations={allStations}
                setAllStations={setAllStations}
                FlyToInterpolator={FlyToInterpolator}
                setTrip={setTrip}
                setTripOpen={setTripOpen}
                setStation={setStation}
                setInfo={setInfo}
                info={info}
              />
            )}

            {navOpen ? (
              <Filters
                FlyToInterpolator={FlyToInterpolator}
                setNavOpen={setNavOpen}
                setStation={setStation}
                allStations={allStations}
                setViewport={setViewport}
                viewport={viewport}
                navOpen={navOpen}
                text={"Routes"}
                link={"/routes"}
                icon={<FaRoute className="routeicon" />}
                station={station}
                tripOpen={tripOpen}
                setTripOpen={setTripOpen}
              />
            ) : null}
          </Route>
          <Route exact path="/routes">
            <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
            <div className="content">
              <RoutesMap
                route={route}
                viewport={viewport}
                setViewport={setViewport}
                setAllRoutes={setAllRoutes}
              />

              {route ? (
                <RouteInfo
                  route={route}
                  setRoute={setRoute}
                  viewport={viewport}
                  setViewport={setViewport}
                />
              ) : (
                <AllRoutes
                  allRoutes={allRoutes}
                  FaSearch={<FaSearch className="searchicon" />}
                  FaPlus={<FaPlus className="viewbutton" />}
                  setRoute={setRoute}
                  setViewport={setViewport}
                  viewport={viewport}
                />
              )}
            </div>
            {navOpen ? (
              <Filters
                route={route}
                setRoute={setRoute}
                FlyToInterpolator={FlyToInterpolator}
                setNavOpen={setNavOpen}
                setStation={setStation}
                allStations={allStations}
                setViewport={setViewport}
                viewport={viewport}
                navOpen={navOpen}
                text={"Stations"}
                link={"/"}
                icon={<FaBuilding className="routeicon" />}
              />
            ) : null}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
