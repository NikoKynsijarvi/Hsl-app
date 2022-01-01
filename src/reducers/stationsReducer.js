const stationsReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_STATIONS":
      state = action.data;
      return action.data;
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

export default stationsReducer;
