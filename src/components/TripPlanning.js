import "./../index.css";
import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaRegCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { gql, useLazyQuery } from "@apollo/client";

const YOUR_TRIP = gql`
  query ($fromlat: Float!, $fromlon: Float!, $tolat: Float!, $tolon: Float!) {
    plan(
      from: { lat: $fromlat, lon: $fromlon }
      to: { lat: $tolat, lon: $tolon }
    ) {
      itineraries {
        duration
        fares {
          type
          cents
          components {
            fareId
          }
        }
        legs {
          mode
          from {
            name
            lat
            lon
            stop {
              name
            }
          }
          to {
            name
            lat
            lon
          }
          trip {
            gtfsId
            routeShortName
          }
        }
      }
    }
  }
`;

function Loading() {
  return (
    <div>
      <h2>...loading</h2>
    </div>
  );
}

function FromStation({ station, setFromStation }) {
  return (
    <div
      className="onestationcontainer"
      onClick={() => setFromStation(station)}
    >
      <h3>{station.name}</h3> <FaRegCheckCircle className="buttonicon" />
    </div>
  );
}
function ToStation({ station, setToStation }) {
  return (
    <div className="onestationcontainer" onClick={() => setToStation(station)}>
      <h3>{station.name}</h3> <FaRegCheckCircle className="buttonicon" />
    </div>
  );
}

function TripPlanning({
  allStations,
  setTripOpen,
  setTrip,
  setViewport,
  viewport,
}) {
  const [getTrip, result] = useLazyQuery(YOUR_TRIP);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);

  const showTrip = () => {
    getTrip({
      variables: {
        fromlat: fromStation.lat,
        fromlon: fromStation.lon,
        tolat: toStation.lat,
        tolon: toStation.lon,
      },
    });
  };

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
      setTrip(result.data);
      setToSearch("");
      setFromSearch("");
      setTripOpen(false);
      setViewport({
        ...viewport,
        latitude: result.data.plan.itineraries[0].legs[0].from.lat,
        longitude: result.data.plan.itineraries[0].legs[0].from.lon,
        zoom: 10,
      });
    }
  }, [result, setTrip, setTripOpen, setViewport, viewport]);

  const handleFromSearch = (event) => {
    setFromSearch(event.target.value);
  };

  const handleToSearch = (event) => {
    setToSearch(event.target.value);
  };

  const searchedStations = allStations.filter((element) => {
    const stationName = element.name;
    return (
      stationName.toLowerCase().indexOf(fromSearch.toLowerCase()) > -1 &&
      element !== toStation
    );
  });

  const destinations = allStations.filter((element) => {
    const stationName = element.name;
    return (
      stationName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 &&
      element !== fromStation
    );
  });

  return (
    <div className="tripcontainer">
      <h1 className="routename">Plan your trip</h1>
      {result.loading ? (
        <Loading />
      ) : (
        <div className="searchcontainer">
          <div className="fromtosearch">
            From:
            <input
              value={fromSearch}
              className="searchinput"
              onChange={handleFromSearch}
            />
            <div className="filteredStations">
              {searchedStations.length < 4
                ? searchedStations.map((s) => (
                    <FromStation
                      key={s.id}
                      station={s}
                      setFromStation={setFromStation}
                    />
                  ))
                : null}
            </div>
          </div>

          <div className="fromtosearch">
            To:
            <input
              className="searchinput"
              value={toSearch}
              onChange={handleToSearch}
            />
            <div className="filteredStations">
              {" "}
              <div className="filteredStations">
                {destinations.length < 4
                  ? destinations.map((s) => (
                      <ToStation
                        key={s.id}
                        station={s}
                        setToStation={setToStation}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="tripreview">
        {fromStation ? <h3>{fromStation.name}</h3> : <p></p>}
        <FaArrowRight className="arrowright" />
        {toStation ? <h3>{toStation.name}</h3> : <p></p>}
      </div>

      <div className="tripbuttons">
        <FaArrowLeft
          className="plusicon"
          onClick={(e) => {
            e.preventDefault();
            setTripOpen(false);
          }}
        />
        <button className="searchbutton" onClick={showTrip}>
          <FaSearch className="buttonicon" />
        </button>
      </div>
    </div>
  );
}

export default TripPlanning;
