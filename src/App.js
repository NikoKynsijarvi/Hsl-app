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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FlyToInterpolator } from "react-map-gl";
import { FaRoute, FaBuilding, FaPlus, FaSearch } from "react-icons/fa";

function App() {
  const [station, setStation] = useState(null);
  const [allStations, setAllStations] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [tripOpen, setTripOpen] = useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  const [route, setRoute] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 60.170556,
    longitude: 24.941463,
    zoom: 11,
    width: "700px",
    height: "500px",
    transitionDuration: 2000,
    transitionInterpolator: new FlyToInterpolator(),
  });

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
            <div className="content">
              <MapSection
                setStation={setStation}
                setAllStations={setAllStations}
                setViewport={setViewport}
                viewport={viewport}
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
              {tripOpen ? <TripPlanning /> : null}
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
                tripOpen={tripOpen}
                setTripOpen={setTripOpen}
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
