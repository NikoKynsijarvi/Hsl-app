import { Card, Typography, CardContent, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { moveViewport } from "./../reducers/mapReducer";

function StationCard({ station }) {
  const dispatch = useDispatch();
  const viewport = useSelector((state) => state.viewport);

  const setViewport = (lat, lon, event) => {
    event.preventDefault();
    const stationsViewport = {
      ...viewport,
      latitude: lat,
      longitude: lon,
      zoom: 13,
    };
    dispatch(moveViewport(stationsViewport));
  };
  return (
    <Card
      style={{
        marginBottom: "1em",
        cursor: "pointer",
      }}
      onClick={(e) => setViewport(station.lat, station.lon, e)}
      elevation={2}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            {station.name}
          </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography variant="p">Zone: {station.zoneId}</Typography>
          <Tooltip title={station.vehicleMode} placement="top-end">
            <Typography variant="p">Vehicle type: {station.icon}</Typography>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}

export default StationCard;
