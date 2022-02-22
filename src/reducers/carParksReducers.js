const carParksReducer = (
  state = {
    carParks: [],
    carPark: null,
  },
  action
) => {
  switch (action.type) {
    case "INIT_CARPARKS":
      state = { ...state, carParks: action.data };
      return state;
    case "SET_CARPARK":
      state = { ...state, carPark: action.data };
      return state;
    case "REMOVE_CARPARK":
      state = { ...state, carPark: null };
      return state;
    default:
      return state;
  }
};

export const initializeCarParks = (carParks) => {
  return {
    type: "INIT_CARPARKS",
    data: carParks,
  };
};

export const setCarPark = (carPark) => {
  return {
    type: "SET_CARPARK",
    data: carPark,
  };
};

export const removeCarPark = () => {
  return {
    type: "REMOVE_CARPARK",
  };
};

export default carParksReducer;
