const filterReducer = (
  state = {
    textFilter: "",
    filterBus: true,
    filterRail: true,
    filterSubway: true,
  },
  action
) => {
  switch (action.type) {
    case "SET_FILTER":
      state = { ...state, textFilter: action.data };
      return state;
    case "FILTER_BUS":
      state = { ...state, filterBus: !state.filterBus };
      return state;
    case "FILTER_RAIL":
      state = { ...state, filterRail: !state.filterRail };
      return state;
    case "FILTER_SUBWAY":
      state = { ...state, filterSubway: !state.filterSubway };
      return state;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    data: filter,
  };
};

export const filterBus = () => {
  return {
    type: "FILTER_BUS",
  };
};
export const filterRail = () => {
  return {
    type: "FILTER_RAIL",
  };
};
export const filterSubway = () => {
  return {
    type: "FILTER_SUBWAY",
  };
};

export default filterReducer;
