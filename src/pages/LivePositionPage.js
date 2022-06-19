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

function LivePositionPage() {
  const [topic, setTopic] = useState("/hfp/v2/journey/ongoing/vp/ferry/#");
  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.viewport);

  useEffect(() => {
    var client = mqtt.connect("wss://mqtt.hsl.fi:443/");

    client.on("connect", function () {
      console.log("connected");
      setIsConnected(true);
    });

    client.subscribe(topic);

    client.on("message", function (topic, message) {
      console.log("message is " + message);
      var decoded = new TextDecoder("utf-8").decode(message);
      const obj = JSON.parse(decoded);
      const newObject = { lat: obj.VP.lat, lon: obj.VP.long, ...obj };
      setData((curr) => {
        var array = [...curr];
        if (array.length === 0) {
          array.push(newObject);
        } else {
          let found = 0;
          for (let i = 0; i < array.length; i++) {
            if (array[i].VP.oper === newObject.VP.oper) {
              if (array[i].VP.veh === newObject.VP.veh) {
                found++;
                array[i] = newObject;
              }
            }
          }
          if (found === 0) {
            array.push(newObject);
          }
        }
        return array;
      });
    });

    return () => {
      client.end();
    };
  }, []);

  const handleViewportChange = (viewport) => {
    dispatch(moveViewport(viewport));
  };

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
            {data.length > 0
              ? data.map((d) => (
                  <Marker
                    latitude={d.lat}
                    longitude={d.lon}
                    key={d.VP.oper + d.VP.veh}
                  >
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
