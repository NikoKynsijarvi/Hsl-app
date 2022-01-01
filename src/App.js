import React, { useEffect } from "react";
import "./index.css";
import StationsPage from "./pages/StationsPage";
import { useDispatch } from "react-redux";
import { initializeStations } from "./reducers/stationsReducer";
import { ALL_STATIONS } from "./graphql";
import { useQuery } from "@apollo/client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

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
      light: "#fff176",
      main: "#ffffa8",
      dark: "#cabf45",
      contrastText: "#000",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const stations = useQuery(ALL_STATIONS);

  useEffect(() => {
    if (!stations.loading) dispatch(initializeStations(stations.data));
  }, [stations, dispatch]);
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <StationsPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
