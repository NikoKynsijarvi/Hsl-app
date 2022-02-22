import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import { useDispatch } from "react-redux";
import { setInitialViewport } from "../reducers/mapReducer";
import { Link } from "react-router-dom";

function BottomNavigationBar() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.href.includes("carparks")) setValue(1);
    if (window.location.href.includes("routes")) setValue(2);
    if (
      !window.location.href.includes("carparks") &&
      !window.location.href.includes("routes")
    )
      setValue(0);
  }, []);

  const setInitialState = () => {
    dispatch(setInitialViewport());
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        marginBottom: "1em",
        width: "100%",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BottomNavigation sx={{ width: "60%" }} showLabels value={value}>
        <BottomNavigationAction
          label="Stations"
          LinkComponent={Link}
          onClick={setInitialState}
          to="/"
          icon={<LocationCityRoundedIcon />}
        />

        <BottomNavigationAction
          label="Car parks"
          LinkComponent={Link}
          onClick={setInitialState}
          to="/carparks"
          icon={<LocalParkingRoundedIcon />}
        />

        <BottomNavigationAction
          label="Routes"
          LinkComponent={Link}
          onClick={setInitialState}
          to="/routes"
          icon={<RouteRoundedIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default BottomNavigationBar;
