import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NavBar from "../components/Navbar";
import ReactMapGl, { Marker } from "react-map-gl";
import { useSelector, useDispatch } from "react-redux";
import { moveViewport } from "./../reducers/mapReducer";
import BottomNavigationBar from "../components/BottomNavigation";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import SubwayRoundedIcon from "@mui/icons-material/SubwayRounded";
var mqtt = require("mqtt");

function GetIcon(type) {
  const ferryStyle = { color: "red", height: "12px" };
  const subwayStyle = { color: "#EE1FFD", height: "12px" };
  switch (type) {
    case "FERRY":
      return <DirectionsBoatIcon style={ferryStyle} />;
    case "METRO":
      return <SubwayRoundedIcon style={subwayStyle} />;
    default:
      return null;
  }
}

function LivePositionPage() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.viewport);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    var client = mqtt.connect("wss://mqtt.hsl.fi:443/");

    client.on("connect", function () {
      console.log("connected");
      setData([]);
      if (filter.mqttTopicFilter === "METRO") {
        client.subscribe("/hfp/v2/journey/ongoing/vp/metro/#");
      } else {
        client.subscribe("/hfp/v2/journey/ongoing/vp/ferry/#");
      }
    });

    client.on("message", function (topic, message) {
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
  }, [filter]);

  console.log(data);

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
                    {GetIcon(filter.mqttTopicFilter)}
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
