import React, { useState } from "react";
import { Card, Typography, CardContent, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { STATION_INFO } from "./../graphql";
import { removeStation } from "./../reducers/stationsReducer";
import { setInitialViewport } from "./../reducers/mapReducer";

function ChangeTimeFormat(time) {
  const totalMinutes = time / 60;
  const hours = Math.floor(totalMinutes / 60);

  const minutes = totalMinutes % 60;
  return parseFloat(hours + "." + minutes).toFixed(2);
}

function RoutePatternInfo({ route }) {
  const [showTimePattern, setShowTimePattern] = useState(false);
  const index = route.pattern.name.indexOf("(");
  const routeName = route.pattern.name.slice(0, index);
  const stoptimes = route.stoptimes.map((s) => {
    return ChangeTimeFormat(s.scheduledArrival);
  });

  return (
    <Paper
      elevation={1}
      style={{
        minHeight: "5em",
        width: "100%",
        padding: "0.5em",
        marginBottom: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography color="primary">{routeName}</Typography>
      <Button
        variant="contained"
        style={{ width: "100%" }}
        color="secondary"
        onClick={() => setShowTimePattern(!showTimePattern)}
      >
        Stoptimes
      </Button>
      {showTimePattern ? stoptimes.map((s) => <p>Arrives: {s}</p>) : null}
    </Paper>
  );
}

function StationInfoCard() {
  const state = useSelector((state) => state.stations.station);
  const dispatch = useDispatch();
  const id = state.gtfsId;
  const result = useQuery(STATION_INFO, {
    variables: { id },
  });

  const handleBack = () => {
    dispatch(setInitialViewport());
    dispatch(removeStation());
  };

  if (result.loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        overflowX: "auto",
        maxHeight: "87vh",
        padding: "2em",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1em",
          alignItems: "center",
        }}
      >
        <Typography color="primary" variant="h4">
          {state.name}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography>Zone: {state.zoneId}</Typography>
          <Typography>Vehicle: {state.vehicleMode}</Typography>
        </div>
        <Button variant="contained" onClick={() => handleBack()}>
          Back
        </Button>
        <Typography variant="h5" color="primary">
          Routes
        </Typography>
        <div>
          {result.data.station.stoptimesForPatterns.map((s) => (
            <RoutePatternInfo route={s} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default StationInfoCard;
