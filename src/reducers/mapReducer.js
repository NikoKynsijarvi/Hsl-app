import { FlyToInterpolator } from "react-map-gl";

const initialState = {
  latitude: 60.170556,
  longitude: 24.941463,
  zoom: 10,
  width: "fit",
  height: "87vh",
  transitionDuration: 3000,
  transitionInterpolator: new FlyToInterpolator(),
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE_VIEWPORT":
      return action.data;
    case "SET_INITIALSTATE":
      state = initialState;
      return state;
    default:
      return state;
  }
};

export const moveViewport = (viewport) => {
  return {
    type: "MOVE_VIEWPORT",
    data: viewport,
  };
};

export const setInitialViewport = () => {
  return {
    type: "SET_INITIALSTATE",
  };
};

export default mapReducer;
