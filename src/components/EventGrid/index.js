import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import EventCard from "../EventCard";

const EventGrid = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem>
        <EventCard />
      </GridItem>
    </Grid>
  );
};

export default EventGrid;
