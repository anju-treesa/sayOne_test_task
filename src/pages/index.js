import React from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";

function HomePage() {
  return (
    <>
      <Head>
        <title>Events - Re-Events | Favourite events near you!</title>
      </Head>

      <Box as="section" mt="-6">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="99"
          bg="gray.900"
          position="relative"
        >
          <Box
            zIndex="100"
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPos="center"
            w="full"
            h="400px"
            opacity="0.45"
            bgImage="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />

          <VStack position="absolute" top="auto" spacing="6">
            <Text
              zIndex="101"
              fontSize="4xl"
              fontWeight="semibold"
              letterSpacing="wider"
              color="white"
            >
              Discover Events Happening in Your City
            </Text>
            <HStack zIndex="101" rounded="sm" spacing="4">
              <Input
                autoFocus
                w="lg"
                size="lg"
                placeContent="Search events"
                bgColor="white"
              />
              <Button size="lg" colorScheme="green">
                Search
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>

      {/* <Container maxW="container.lg">
        <Text as="h1">Re-Events</Text>
        <Text as="h2">Favourite events near you!</Text>
      </Container> */}
    </>
  );
}

export default HomePage;
