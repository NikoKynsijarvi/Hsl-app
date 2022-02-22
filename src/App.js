import React, { useEffect } from "react";
import "./index.css";
import StationsPage from "./pages/StationsPage";
import CarParksPage from "./pages/CarParksPage";
import { useDispatch } from "react-redux";
import { initializeStations } from "./reducers/stationsReducer";
import { initializeCarParks } from "./reducers/carParksReducers";
import { initializeFilters } from "./reducers/filterReducer";
import { ALL_STATIONS, ALL_CARPARKS } from "./graphql";
import { useQuery } from "@apollo/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LivePositionPage from "./pages/LivePositionPage";

const theme = createTheme({
  palette: {
    primary: {
      light: "#98ee99",
      main: "#66bb6a",
      dark: "##338a3e",
      contrastText: "#fff",
      success: "#4BFA4B",
    },
    secondary: {
      light: "#ffd149",
      main: "#ffa000",
      dark: "#c67100",
      contrastText: "#000",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const stations = useQuery(ALL_STATIONS);
  const carParks = useQuery(ALL_CARPARKS);

  useEffect(() => {
    if (!stations.loading && !carParks.loading) {
      dispatch(initializeStations(stations.data));
      dispatch(initializeCarParks(carParks.data));
      dispatch(initializeFilters(carParks.data));
    }
  }, [stations, carParks, dispatch]);
  return (
    <Router>
      <div>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/carparks">
              <CarParksPage />
            </Route>
            <Route path="/liveposition">
              <LivePositionPage />
            </Route>
            <Route path="/">
              <StationsPage />
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
