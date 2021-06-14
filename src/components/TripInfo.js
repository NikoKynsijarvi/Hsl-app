import "./../index.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function getTo(props) {
  let index = props.plan.itineraries[0].legs;
  let to = props.plan.itineraries[0].legs[index.length - 1].to.name;

  if (to === "Destination") {
    return props.plan.itineraries[0].legs[index.length - 2].to.name;
  }
  return to;
}

function getFrom(props) {
  let from = props.plan.itineraries[0].legs[0].from.name;

  if (from === "Origin") {
    return props.plan.itineraries[0].legs[0].to.name;
  }
  return from;
}

function TripInfo({ setTrip, setViewport, viewport, trip }) {
  return (
    <div className="stationcontainer">
      {" "}
      <div className="tripinfo">
        <h2 className="routename">{getFrom(trip)}</h2>
        <FaArrowRight className="arrowright" />
        <h2 className="routename">{getTo(trip)}</h2>
      </div>
      <p>
        Ticket type:{" "}
        {trip.plan.itineraries[0].fares[0].components[0].fareId.substring(4, 6)}
      </p>
      <p>Price: {trip.plan.itineraries[0].fares[0].cents / 100} €</p>
      <p>
        Duration:{" "}
        {parseFloat(trip.plan.itineraries[0].duration / 60).toFixed(0)} min
      </p>
      <div className="backicon">
        <FaArrowLeft
          className="plusicon"
          onClick={(e) => {
            e.preventDefault();
            setTrip(null);
            setViewport({
              ...viewport,
              latitude: 60.170556,
              longitude: 24.941463,
              zoom: 11,
            });
          }}
        />
      </div>
    </div>
  );
}

export default TripInfo;
