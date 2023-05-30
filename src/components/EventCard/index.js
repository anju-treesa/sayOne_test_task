import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const EventCard = () => {
  return (
    <Card maxW="sm">
      <CardBody p="10">
        {/* <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        /> */}
        <HStack spacing="6" alignItems="center">
          <VStack>
            <Text
              fontWeight="semibold"
              letterSpacing="wider"
              color="red.500"
              fontSize="lg"
            >
              MAY
            </Text>
            <Text fontWeight="semibold" color="gray.800" fontSize="lg">
              05
            </Text>
          </VStack>
          <Stack mt="6" spacing="3" justifyContent="center">
            <HStack>
              <Heading size="md">Event Name</Heading>
              <Badge ml="1" px="2" py="1" colorScheme="green" rounded="md">
                Movies
              </Badge>
            </HStack>
            <Text color="blue.600" fontSize="lg">
              $14.99
            </Text>
            <Text color="gray.500" fontSize="sm">
              Sun Jun 04 2023 at 11:00 am
            </Text>
          </Stack>
        </HStack>
      </CardBody>
      {/* <Divider /> */}
    </Card>
  );
};

export default EventCard;
