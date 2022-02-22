import React from "react";
import { Container, Box } from "@mui/material";
import StationCard from "./StationCard";
import CarParkCard from "./CarParkCard";

function getCard(content) {
  if (window.location.href.includes("carparks"))
    return <CarParkCard carPark={content} key={content.id} />;
  else return <StationCard station={content} key={content.id} />;
}

function ContentList({ content }) {
  return (
    <Container style={{ maxHeight: "87vh", overflow: "auto" }}>
      <Box>{content.map((s) => getCard(s))}</Box>
    </Container>
  );
}

export default ContentList;
