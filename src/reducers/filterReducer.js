const filterReducer = (
  state = {
    textFilter: "",
    filterBus: true,
    filterRail: true,
    filterSubway: true,
    maxCapacityFilter: 0,
    maxCapacity: 0,
    minCapacity: 0,
    spaceAvailableFilter: 100,
    mqttTopicFilter: "FERRY",
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
    case "INIT_FILTERS":
      let largestValue = 0;
      let minValue = 9999999;
      action.data.carParks.map((a) => {
        if (a.maxCapacity > largestValue) {
          largestValue = a.maxCapacity;
        }
        if (a.maxCapacity < minValue) {
          minValue = a.maxCapacity;
        }
        return a;
      });
      state = {
        ...state,
        maxCapacity: largestValue,
        maxCapacityFilter: largestValue,
        minCapacity: minValue,
      };
      return state;

    case "MAX_CAPACITY_FILTER":
      console.log(action.data);
      state = { ...state, maxCapacityFilter: action.data };
      return state;
    case "PERCENTAGE_FILTER":
      state = { ...state, spaceAvailableFilter: action.data };
      return state;
    case "MQTT_METRO":
      return (state = { ...state, mqttTopicFilter: "METRO" });
    case "MQTT_FERRY":
      return (state = { ...state, mqttTopicFilter: "FERRY" });
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

export const initializeFilters = (content) => {
  return {
    type: "INIT_FILTERS",
    data: content,
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

export const setMaxCapacityFilter = (value) => {
  return {
    type: "MAX_CAPACITY_FILTER",
    data: value,
  };
};

export const setPercentageFilter = (value) => {
  return {
    type: "PERCENTAGE_FILTER",
    data: value,
  };
};

export const filterSubway = () => {
  return {
    type: "FILTER_SUBWAY",
  };
};

export const mqttMetroFilter = () => {
  return {
    type: "MQTT_METRO",
  };
};

export const mqttFerryFilter = () => {
  return {
    type: "MQTT_FERRY",
  };
};

export default filterReducer;
