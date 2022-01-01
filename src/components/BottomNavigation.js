import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";

function BottomNavigationBar() {
  const [value, setValue] = useState("stations");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        marginBottom: "1em",
        width: "100%",
        backgroundColor: "primary",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BottomNavigation
        sx={{ width: "60%" }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Stations"
          value="stations"
          icon={<LocationCityRoundedIcon />}
        />
        <BottomNavigationAction
          label="Car parks"
          value="carparks"
          icon={<LocalParkingRoundedIcon />}
        />
        <BottomNavigationAction
          label="Routes"
          value="routes"
          icon={<RouteRoundedIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default BottomNavigationBar;
