import { FlyToInterpolator } from "react-map-gl";

const mapReducer = (
  state = {
    latitude: 60.170556,
    longitude: 24.941463,
    zoom: 10,
    width: "fit",
    height: "87vh",
    transitionDuration: 2000,
    transitionInterpolator: new FlyToInterpolator(),
  },
  action
) => {
  switch (action.type) {
    case "MOVE_VIEWPORT":
      return action.data;
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

export default mapReducer;
