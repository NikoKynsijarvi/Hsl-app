import ReactMapGl, { Marker } from "react-map-gl";
import { gql, useQuery } from "@apollo/client";
import { FaMapMarkerAlt } from "react-icons/fa";
import runtimeEnv from "@mars/heroku-js-runtime-env";
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
  const env = runtimeEnv();
  if (result.loading) {
    return <div>loading...</div>;
  }
  setAllRoutes(result.data.routes);

  const style = { color: "red" };
  return (
    <div className="mapSection">
      <ReactMapGl
        className="map"
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/niksu98/ckp6mewtr7fni18otmkpslbbs"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {route
          ? route.stops.map((r) => (
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
