import "./../index.css";
import { FaArrowLeft, FaRegCircle } from "react-icons/fa";
import { CgMoreVertical } from "react-icons/cg";

function Stop({ stop, setViewport, viewport }) {
  return (
    <div className="routestop">
      <ul
        className="stop"
        onClick={() =>
          setViewport({
            ...viewport,
            latitude: stop.lat,
            longitude: stop.lon,
            zoom: 14,
          })
        }
      >
        {" "}
        <FaRegCircle className="stopicon" />
        {stop.name}
      </ul>
      <CgMoreVertical className="dotsicon" />
    </div>
  );
}

function RouteInfo({ route, setRoute, setViewport, viewport }) {
  let stops = [...route.stops];

  return (
    <div className="routecontainer">
      <h2 className="routename">{route.longName}</h2>
      <div>
        <nav className="routeslist">
          {stops.splice(0, stops.length / 2 + 1).map((r) => (
            <Stop stop={r} setViewport={setViewport} viewport={viewport} />
          ))}
        </nav>
      </div>
      <div className="backicon">
        <FaArrowLeft
          className="plusicon"
          onClick={(e) => {
            e.preventDefault();
            setRoute(null);
            setViewport({
              latitude: 60.170556,
              longitude: 24.941463,
              zoom: 11,
              width: "700px",
              height: "500px",
            });
          }}
        />
      </div>
    </div>
  );
}

export default RouteInfo;
