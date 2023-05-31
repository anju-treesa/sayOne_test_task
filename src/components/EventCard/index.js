import {
  Badge,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";
import isSameDay from "date-fns/isSameDay";
import React from "react";

const EventCard = ({ title, startDate, endDate, category, price }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedPrice = formatter.format(price);

  return (
    <Card maxW="sm">
      <CardBody p="10">
        <HStack spacing="6" alignItems="center">
          <VStack>
            <Text
              fontWeight="semibold"
              letterSpacing="wider"
              color="red.500"
              fontSize="lg"
            >
              {format(startDate, "LLL")}
            </Text>
            <Text fontWeight="semibold" color="gray.800" fontSize="lg">
              {isSameDay(startDate, endDate)
                ? format(startDate, "dd")
                : `${format(startDate, "dd")} - ${format(endDate, "dd")}`}
            </Text>
          </VStack>
          <Stack mt="6" spacing="3">
            <VStack alignItems="start">
              <Badge px="2" py="1" colorScheme="green" rounded="md">
                {category}
              </Badge>
              <Heading size="md" overflowWrap="break-word" inlineSize="150px">
                {title}
              </Heading>
            </VStack>
            <Text color="blue.600" fontSize="lg">
              {formattedPrice}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {`${format(startDate, "EEE LLL dd yyyy")} at ${format(
                startDate,
                "hh:mm aa"
              )}`}
            </Text>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
