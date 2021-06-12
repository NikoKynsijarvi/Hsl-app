import ReactMapGl, { Marker } from "react-map-gl";
import { gql, useQuery } from "@apollo/client";
import { FaMapMarkerAlt } from "react-icons/fa";
import mapboxgl from "mapbox-gl";

require("dotenv").config();

const ALL_ROUTES = gql`
  query {
    routes {
      longName
      id
      stops {
        name
        gtfsId
        lat
        lon
      }
    }
  }
`;

function RoutesMap({ viewport, setViewport, setAllRoutes, route }) {
  const result = useQuery(ALL_ROUTES);
  /* eslint-disable */
  mapboxgl.workerClass =
    require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
  /* eslint-enable */

  if (result.loading) {
    return <div>loading....</div>;
  }
  setAllRoutes(result.data.routes);

  if (route) {
    console.log(
      route.stops.map((r) => {
        let coors = [r.lat, r.lon];
        return coors;
      })
    );
  }

  const style = { color: "red" };
  return (
    <div className="mapSection">
      <ReactMapGl
        className="map"
        {...viewport}
        width="98vw"
        height="97vh"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/niksu98/ckp6mewtr7fni18otmkpslbbs"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {route
          ? [...route.stops].splice(0, route.stops.length / 2 + 1).map((r) => (
              <Marker key={r.gtfsId} latitude={r.lat} longitude={r.lon}>
                <FaMapMarkerAlt style={style} />
              </Marker>
            ))
          : null}
      </ReactMapGl>
    </div>
  );
}

export default RoutesMap;
