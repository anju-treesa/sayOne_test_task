import React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CategoryGrid = ({ data = [] }) => {
  const route = useRouter();

  return (
    <Grid p="14" templateColumns="repeat(5, 1fr)" gap={6}>
      {data.map(({ id, name }) => (
        <GridItem
          cursor="pointer"
          _hover={{
            bg: "blue.600",
          }}
          key={id}
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="20"
          bg="blue.500"
          rounded="md"
          onClick={() =>
            route.push({
              pathname: "/categories/[id]",
              query: { ...route.query, id },
            })
          }
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
