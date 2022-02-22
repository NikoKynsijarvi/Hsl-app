import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NavBar from "./../components/NavBar";
import ReactMapGl, { Marker } from "react-map-gl";
import { useSelector, useDispatch } from "react-redux";
import { moveViewport } from "./../reducers/mapReducer";
import BottomNavigationBar from "../components/BottomNavigation";
var mqtt = require("mqtt");

function LivePositionPage() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.viewport);
  const handleViewportChange = (viewport) => {
    dispatch(moveViewport(viewport));
  };

  useEffect(() => {
    var client = mqtt.connect("wss://mqtt.hsl.fi:443/");

    client.on("connect", function () {
      console.log("connected");
    });

    client.subscribe("/hfp/v2/journey/ongoing/vp/tram/#");

    client.on("message", function (topic, message, packet) {
      console.log("message is " + message);
      console.log("topic is " + topic);
    });
    return () => {
      client.end();
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Grid container spacing={0}>
        <Grid item lg={12} sm={12}>
          <ReactMapGl
            className="map"
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle="mapbox://styles/niksu98/ckp6mewtr7fni18otmkpslbbs"
            onViewportChange={(viewport) => {
              handleViewportChange(viewport);
            }}
          >
            <BottomNavigationBar />
          </ReactMapGl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LivePositionPage;
