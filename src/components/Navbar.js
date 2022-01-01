import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { Divider, Tooltip } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { setFilter } from "./../reducers/filterReducer";
import { useDispatch } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import FilterDialog from "./FilterDialog";

const Search = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 0,
  marginRight: "4em",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "24ch",
      },
    },
  },
}));

function NavBar() {
  const dispatch = useDispatch();
  const [filterDisplay, setFilterDisplay] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(setFilter(value));
  };

  const handleClickOpen = () => {
    setFilterDisplay(true);
  };

  const handleClose = () => {
    setFilterDisplay(false);
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Tooltip title="Filters">
            <IconButton onClick={handleClickOpen}>
              <FilterListIcon style={{ cursor: "pointer", color: "#ffff" }} />
            </IconButton>
          </Tooltip>
          <FilterDialog open={filterDisplay} handleClose={handleClose} />
          <Search>
            <SearchIconWrapper>
              <SearchSharpIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleChange}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
}

export default NavBar;
