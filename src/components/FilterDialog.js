import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  filterBus,
  filterRail,
  filterSubway,
} from "./../reducers/filterReducer";

function FilterDialog({ open, handleClose }) {
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

      default:
        console.log(event.target.id);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container style={{ width: "200px", height: "200px" }}>
        <DialogTitle>Filter:</DialogTitle>
        <FormGroup>
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
      </Container>
    </Dialog>
  );
}

export default FilterDialog;
