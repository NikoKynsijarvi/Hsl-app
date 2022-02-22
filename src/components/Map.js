import { Tooltip } from "@mui/material";
import React from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import { useSelector, useDispatch } from "react-redux";
import { moveViewport } from "./../reducers/mapReducer";
import BottomNavigationBar from "./BottomNavigation";
import { setStation } from "./../reducers/stationsReducer";
import { setCarPark } from "./../reducers/carParksReducers";

function Map({ content }) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.viewport);
  const handleViewportChange = (viewport) => {
    dispatch(moveViewport(viewport));
  };

  const setViewportToMarker = (content, event) => {
    event.preventDefault();
    const markerViewport = {
      ...viewport,
      latitude: content.lat,
      longitude: content.lon,
      zoom: 13,
    };
    dispatch(moveViewport(markerViewport));
    getDispatch(content);
  };

  const getDispatch = (content) => {
    if (window.location.href.includes("carpark")) dispatch(setCarPark(content));
    if (
      !window.location.href.includes("carpark") &&
      !window.location.href.includes("routes")
    ) {
      dispatch(setStation(content));
    }
  };

  return (
    <div>
      <ReactMapGl
        className="map"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/niksu98/ckp6mewtr7fni18otmkpslbbs"
        onViewportChange={(viewport) => {
          handleViewportChange(viewport);
        }}
      >
        {content.map((s) => (
          <Marker key={s.id} latitude={s.lat} longitude={s.lon}>
            <Tooltip title={s.name}>
              <button
                onClick={(e) => setViewportToMarker(s, e)}
                style={{ background: "none", border: "none" }}
              >
                {s.icon}
              </button>
            </Tooltip>
          </Marker>
        ))}
        <BottomNavigationBar />
      </ReactMapGl>
    </div>
  );
}

export default Map;
