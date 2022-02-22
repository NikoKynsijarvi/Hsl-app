import React from "react";
import { Card, Typography, CardContent, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeCarPark } from "./../reducers/carParksReducers";
import { setInitialViewport } from "./../reducers/mapReducer";

function CarParkInfoCard() {
  const state = useSelector((state) => state.carParks.carPark);
  const dispatch = useDispatch();
  console.log(state);

  const handleBack = () => {
    dispatch(setInitialViewport());
    dispatch(removeCarPark());
  };

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
        <Button variant="contained" onClick={() => handleBack()}>
          Back
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Typography>Max capacity: {state.maxCapacity}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarParkInfoCard;
