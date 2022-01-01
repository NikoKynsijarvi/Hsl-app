import mapReducer from "./reducers/mapReducer";
import stationsReducer from "./reducers/stationsReducer";
import filterReducer from "./reducers/filterReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducer = combineReducers({
  viewport: mapReducer,
  stations: stationsReducer,
  filter: filterReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
