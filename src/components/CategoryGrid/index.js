import React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";

const CategoryGrid = ({ data = [] }) => {
  return (
    <Grid p="14" templateColumns="repeat(5, 1fr)" gap={6}>
      {data.map(({ id, name }) => (
        <GridItem
          key={id}
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="20"
          bg="blue.500"
          rounded="md"
        >
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            letterSpacing="wider"
            color="white"
            textTransform="capitalize"
          >
            {name}
          </Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
