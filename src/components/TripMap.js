import ReactMapGl, { Marker } from "react-map-gl";
import { GoLocation } from "react-icons/go";

function TripMap({ viewport, setViewport, trip }) {
  let index = trip.plan.itineraries[0].legs;
  console.log(trip);
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
        <Marker
          latitude={trip.plan.itineraries[0].legs[0].from.lat}
          longitude={trip.plan.itineraries[0].legs[0].from.lon}
        >
          <GoLocation className="tripicons" />
        </Marker>
        <Marker
          latitude={trip.plan.itineraries[0].legs[index.length - 1].to.lat}
          longitude={trip.plan.itineraries[0].legs[index.length - 1].to.lon}
        >
          <GoLocation className="tripicons" />
        </Marker>
      </ReactMapGl>
    </div>
  );
}

export default TripMap;
