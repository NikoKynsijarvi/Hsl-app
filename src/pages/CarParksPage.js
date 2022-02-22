import React from "react";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import { Box, Grid, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import ContentList from "./../components/ContentList";

function CarParksPage() {
  const carParks = useSelector((state) => state.carParks);
  const filter = useSelector((state) => state.filter);
  console.log(filter);

  if (!carParks.carParks.carParks) {
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

  const carParksWithIcon = carParks.carParks.carParks.map((p) => ({
    ...p,
    icon: (
      <LocalParkingRoundedIcon
        style={{ fontSize: "medium", color: "#2282FF" }}
      />
    ),
    spacePercentage: (p.spacesAvailable / p.maxCapacity) * 100,
  }));

  const filterCarParks = () => {
    const parks = [];
    if (carParks.carPark) {
      parks.push(carParks.carPark);
      return parks;
    }

    return carParksWithIcon
      .filter((p) =>
        p.name.toLowerCase().includes(filter.textFilter.toLowerCase())
      )
      .filter((p) => p.maxCapacity <= filter.maxCapacityFilter)
      .filter((p) => p.spacePercentage <= filter.spaceAvailableFilter);
  };

  const filteredCarParks = filterCarParks();
  console.log(filteredCarParks);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Grid container spacing={0}>
        <Grid item lg={9} sm={12}>
          <Map content={filteredCarParks} />
        </Grid>
        <Grid item lg={3} sm={12}>
          <ContentList content={filteredCarParks} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default CarParksPage;
