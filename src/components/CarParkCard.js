import React from "react";
import {
  Card,
  Typography,
  CardContent,
  LinearProgress,
  Box,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { moveViewport } from "./../reducers/mapReducer";
import { setCarPark } from "./../reducers/carParksReducers";

function CarParkCard(carPark) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.viewport);
  const spaceAvailable =
    (parseFloat(carPark.carPark.spacesAvailable) /
      parseFloat(carPark.carPark.maxCapacity)) *
    100;

  const getColor = () => {
    if (spaceAvailable < 50) return "warning";
    if (spaceAvailable < 1) return "inherit";
    if (spaceAvailable > 50) return "success";
  };

  const color = getColor();
  const setViewport = (carPark, event) => {
    event.preventDefault();
    const stationsViewport = {
      ...viewport,
      latitude: carPark.carPark.lat,
      longitude: carPark.carPark.lon,
      zoom: 13,
    };
    dispatch(moveViewport(stationsViewport));
    dispatch(setCarPark(carPark.carPark));
  };
  return (
    <Card
      style={{
        marginBottom: "1em",
        cursor: "pointer",
      }}
      onClick={(e) => setViewport(carPark, e)}
      elevation={2}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            {carPark.carPark.name}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>
              Space available {carPark.carPark.spacesAvailable} /{" "}
              {carPark.carPark.maxCapacity}
            </p>
          </div>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <Tooltip title={`${Math.round(spaceAvailable)} %`} placement="left">
              <LinearProgress
                style={{
                  height: "1.5em",
                  borderRadius: "4%",
                  cursor: "auto",
                }}
                value={Math.round(spaceAvailable)}
                color={color}
                variant="determinate"
              />
            </Tooltip>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
}

export default CarParkCard;
