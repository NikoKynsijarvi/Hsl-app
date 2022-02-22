const stationsReducer = (
  state = {
    stations: [],
    station: null,
  },
  action
) => {
  switch (action.type) {
    case "INIT_STATIONS":
      state = { ...state, stations: action.data };
      return state;
    case "SET_STATION":
      state = { ...state, station: action.data };
      return state;
    case "REMOVE_STATION":
      state = { ...state, station: null };
      return state;
    default:
      return state;
  }
};

export const initializeStations = (stations) => {
  return {
    type: "INIT_STATIONS",
    data: stations,
  };
};

export const setStation = (station) => {
  return {
    type: "SET_STATION",
    data: station,
  };
};

export const removeStation = () => {
  return {
    type: "REMOVE_STATION",
  };
};

export default stationsReducer;
