import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NavBar from "../components/NavBar";
import ReactMapGl, { Marker } from "react-map-gl";
import { useSelector, useDispatch } from "react-redux";
import { moveViewport } from "./../reducers/mapReducer";
import BottomNavigationBar from "../components/BottomNavigation";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
var mqtt = require("mqtt");

const VehicleData = ({ data }) => {
  return (
    <Box>
      <Grid
        style={{
          backgroundColor: "white",
          height: 300,
          zIndex: 999,
          width: 300,
          borderRadius: 20,
          marginLeft: 100,
          marginTop: 100,
        }}
      ></Grid>
    </Box>
  );
};

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

    client.subscribe("/hfp/v2/journey/ongoing/vp/ferry/#");

    client.on("message", function (topic, message, packet) {
      console.log("message is " + message);
      console.log("topic is " + topic);
      var decoded = new TextDecoder("utf-8").decode(message);
      const obj = JSON.parse(decoded);

      setData([{ lat: obj.VP.lat, lon: obj.VP.long, ...obj }]);
    });

    return () => {
      client.end();
    };
  }, []);
  console.log(data);

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
            <VehicleData data={data} />
            {data.length > 0
              ? data.map((d) => (
                  <Marker latitude={d.lat} longitude={d.lon}>
                    <DirectionsBoatIcon
                      style={{ color: "red", height: "10px" }}
                    />
                  </Marker>
                ))
              : null}
            <BottomNavigationBar />
          </ReactMapGl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LivePositionPage;
