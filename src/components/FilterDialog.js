import React, { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Container, Box, Slider, Typography, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setMaxCapacityFilter,
  setPercentageFilter,
} from "./../reducers/filterReducer";
import {
  filterBus,
  filterRail,
  filterSubway,
  mqttFerryFilter,
  mqttMetroFilter,
  addZoneToFilter,
} from "./../reducers/filterReducer";

const StationsDialog = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const handleFilterChange = (event) => {
    switch (event.target.id) {
      case "bus":
        dispatch(filterBus());
        break;
      case "rail":
        dispatch(filterRail());
        break;
      case "subway":
        dispatch(filterSubway());
        break;
      case "a":
        dispatch(addZoneToFilter("A"));
        break;
      case "b":
        dispatch(addZoneToFilter("B"));
        break;
      case "c":
        dispatch(addZoneToFilter("C"));
        break;
      case "d":
        dispatch(addZoneToFilter("D"));
        break;
      default:
        console.log(event.target.id);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FormGroup>
        <Typography variant="p3">Vehicle type</Typography>
        <FormControlLabel
          control={
            <Switch
              id="bus"
              checked={filter.filterBus}
              onChange={(e) => handleFilterChange(e)}
            />
          }
          label="Bus"
        />
        <FormControlLabel
          control={
            <Switch
              id="rail"
              onChange={(e) => handleFilterChange(e)}
              checked={filter.filterRail}
            />
          }
          label="Rail"
        />
        <FormControlLabel
          control={
            <Switch
              id="subway"
              onChange={(e) => handleFilterChange(e)}
              checked={filter.filterSubway}
            />
          }
          label="Subway"
        />
      </FormGroup>
      <FormGroup>
        <Typography variant="p3">Zone</Typography>
        <FormControlLabel
          control={
            <Switch
              id="a"
              checked={filter.filterZones.includes("A")}
              onChange={(e) => handleFilterChange(e)}
            />
          }
          label="A"
        />
        <FormControlLabel
          control={
            <Switch
              id="b"
              onChange={(e) => handleFilterChange(e)}
              checked={filter.filterZones.includes("B")}
            />
          }
          label="B"
        />
        <FormControlLabel
          control={
            <Switch
              id="c"
              onChange={(e) => handleFilterChange(e)}
              checked={filter.filterZones.includes("C")}
            />
          }
          label="C"
        />
        <FormControlLabel
          control={
            <Switch
              id="d"
              onChange={(e) => handleFilterChange(e)}
              checked={filter.filterZones.includes("D")}
            />
          }
          label="D"
        />
      </FormGroup>
    </div>
  );
};

const CarParksDialog = () => {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [value, setValue] = useState(filters.maxCapacityFilter);
  const [percentageValue, setPercentageValue] = useState(
    filters.spaceAvailableFilter
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setMaxCapacityFilter(newValue));
  };

  const handlePercentageChange = (event, newValue) => {
    setPercentageValue(newValue);
    dispatch(setPercentageFilter(newValue));
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "1em",
      }}
    >
      <Typography variant="h8">Max capacity</Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mb: 1, width: "100%" }}
        alignItems="center"
      >
        <Typography variant="h8">{filters.minCapacity}</Typography>
        <Slider
          value={value}
          valueLabelDisplay="auto"
          step={20}
          min={filters.minCapacity}
          max={filters.maxCapacity}
          onChange={handleChange}
          color="primary"
        />
        <Typography variant="h8">{filters.maxCapacity}</Typography>
      </Stack>
      <Typography variant="h8">Space available %</Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{ mb: 1, width: "100%" }}
        alignItems="center"
      >
        <Typography variant="h8">0 %</Typography>
        <Slider
          value={percentageValue}
          valueLabelDisplay="auto"
          onChange={handlePercentageChange}
          color="primary"
        />
        <Typography variant="h8">100 %</Typography>
      </Stack>
    </Box>
  );
};

const LivePositionDialog = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.mqttTopicFilter);
  const [value, setValue] = useState(filter);

  useEffect(() => {
    setValue(filter);
  }, [filter]);

  const handleChange = (event) => {
    console.log(event.target.value);
    switch (event.target.value) {
      case "FERRY":
        dispatch(mqttFerryFilter());
        break;
      case "METRO":
        dispatch(mqttMetroFilter());
        break;
      default:
        break;
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel value="FERRY" control={<Radio />} label="Ferry" />
        <FormControlLabel value="METRO" control={<Radio />} label="Metro" />
      </RadioGroup>
    </FormControl>
  );
};

function getRightDialog() {
  if (window.location.href.includes("carparks")) {
    return <CarParksDialog />;
  }
  if (window.location.href.includes("liveposition")) {
    return <LivePositionDialog />;
  } else {
    return <StationsDialog />;
  }
}

function FilterDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Container
        style={{
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DialogTitle>Filter:</DialogTitle>
        {getRightDialog()}
      </Container>
    </Dialog>
  );
}

export default FilterDialog;
