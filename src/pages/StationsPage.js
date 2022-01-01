import React from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NavBar from "./../components/NavBar";
import DirectionsBusRoundedIcon from "@mui/icons-material/DirectionsBusRounded";
import DirectionsRailwayRoundedIcon from "@mui/icons-material/DirectionsRailwayRounded";
import SubwayRoundedIcon from "@mui/icons-material/SubwayRounded";
import { CircularProgress } from "@mui/material";
import StationsList from "./../components/StationsList";

function GetIcon(props) {
  const busStyle = { color: "#0EB63B", fontSize: "medium" };
  const trainStyle = { color: "#FD5A1F", fontSize: "medium" };
  const subwayStyle = { color: "#EE1FFD", fontSize: "medium" };
  switch (props.vehicleMode) {
    case "BUS":
      return <DirectionsBusRoundedIcon style={busStyle} />;
    case "RAIL":
      return <DirectionsRailwayRoundedIcon style={trainStyle} />;
    case "SUBWAY":
      return <SubwayRoundedIcon style={subwayStyle} />;
    default:
      return null;
  }
}

function StationsPage() {
  const stations = useSelector((state) => state.stations);
  const filter = useSelector((state) => state.filter);

  if (!stations.stations) {
    return (
      <Box
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const stationsWithIcon = stations.stations
    .map((s) => ({
      ...s,
      icon: GetIcon(s),
    }))
    .filter((a) =>
      a.name.toLowerCase().includes(filter.textFilter.toLowerCase())
    );

  function filterStations() {
    const a = [];
    if (filter.filterBus) {
      stationsWithIcon.map((s) => {
        if (s.vehicleMode === "BUS") a.push(s);
        return s;
      });
    }
    if (filter.filterRail) {
      stationsWithIcon.map((s) => {
        if (s.vehicleMode === "RAIL") a.push(s);
        return s;
      });
    }

    if (filter.filterSubway) {
      stationsWithIcon.map((s) => {
        if (s.vehicleMode === "SUBWAY") a.push(s);
        return s;
      });
    }
    console.log(a);
    return a;
  }

  const filteredStations = filterStations();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Grid container spacing={0}>
        <Grid item lg={9} sm={12}>
          <Map content={filteredStations} />
        </Grid>
        <Grid item lg={3} sm={12}>
          <StationsList stations={filteredStations} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default StationsPage;
