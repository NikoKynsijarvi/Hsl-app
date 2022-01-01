import React from "react";
import { Container, Box } from "@mui/material";
import StationCard from "./StationCard";

function StationsList({ stations }) {
  return (
    <Container style={{ maxHeight: "87vh", overflow: "auto" }}>
      <Box>
        {stations.map((s) => (
          <StationCard station={s} key={s.id} />
        ))}
      </Box>
    </Container>
  );
}

export default StationsList;
