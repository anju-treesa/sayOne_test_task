import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import EventCard from "../EventCard";

const EventGrid = ({ events = [] }) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      {events.map(({ id, ...restProps }) => (
        <GridItem w="100%" key={id}>
          <EventCard {...restProps} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default EventGrid;
