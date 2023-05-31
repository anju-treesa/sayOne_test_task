import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import CategoryGrid from "@/components/CategoryGrid";
import EventGrid from "@/components/EventGrid";

const PAGINATION_LIMIT = 10;

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [loadingLastKey, setLoadingLastKey] = useState("");

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchEvents();
    })();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          createdat: doc.data().createdat?.toDate(),
        });
      });

      setCategories(data);
      setCategoryLoading(false);
    } catch (error) {
      setCategoryLoading(false);
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      setEventLoading(true);
      const querySnapshot = await getDocs(
        query(
          collection(db, "events"),
          orderBy("title", "desc"),
          limit(PAGINATION_LIMIT)
        )
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data()?.startDate?.toDate(),
          endDate: doc.data()?.endDate?.toDate(),
        });
        setLoadingLastKey(doc.data().title);
      });

      setEvents(data);
      setEventLoading(false);
    } catch (error) {
      setEventLoading(false);
      console.error(error);
    }
  };

  const fetchEventsNextBatch = async () => {
    try {
      setEventLoading(true);
      const querySnapshot = await getDocs(
        query(
          collection(db, "events"),
          orderBy("title", "desc"),
          startAfter(loadingLastKey),
          limit(PAGINATION_LIMIT)
        )
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data()?.startDate?.toDate(),
          endDate: doc.data()?.endDate?.toDate(),
        });
        setLoadingLastKey(doc.data().title);
      });

      if (!data.length) {
        setLoadingLastKey("");
      }
      setEvents([...events, ...data]);
      setEventLoading(false);
    } catch (error) {
      setEventLoading(false);
      console.error(error);
    }
  };

  const fetchEventsByKeyword = async () => {
    try {
      setSearchLoading(true);
      const querySnapshot = await getDocs(query(collection(db, "events")));
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data()?.startDate?.toDate(),
          endDate: doc.data()?.endDate?.toDate(),
        });
      });

      const filteredData = data.filter(({ title }) =>
        title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      setEvents(filteredData);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      console.error(error);
    }
  };

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchEvents = async () => {
    await fetchEventsByKeyword();
  };

  return (
    <>
      <Head>
        <title>Events - Re-Events | Favourite events near you!</title>
      </Head>

      <Box pb="20" h="100%" as="section">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndesearchLoadingx="99"
          bg="gray.900"
          position="relative"
        >
          <Box
            zIndex="100"
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPos="center"
            w="full"
            fetchEventsNextBatch
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
                onChange={handleSearchKeyword}
                value={searchKeyword}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearchEvents();
                  }
                }}
              />
              <Button
                onClick={handleSearchEvents}
                size="lg"
                colorScheme="green"
              >
                Search
              </Button>
            </HStack>
          </VStack>
        </Box>
        <Box mt="10">
          <Center>
            <Text
              fontSize="4xl"
              fontWeight="semibold"
              letterSpacing="wider"
              color="gray.700"
            >
              Things to do around..
            </Text>
          </Center>
          {categoryLoading ? (
            <Box p="14">
              <EventLoading />
            </Box>
          ) : (
            <CategoryGrid data={categories} />
          )}
        </Box>

        <Box px="12">
          {searchLoading || eventLoading ? (
            <EventLoading />
          ) : (
            <>
              <EventGrid events={events} />
              {!loadingLastKey.length ? (
                <Button
                  mt="10"
                  onClick={fetchEventsNextBatch}
                  colorScheme="green"
                  w="full"
                >
                  Load more events
                </Button>
              ) : (
                <Center mt="5">
                  <Text fontSize="lg" fontWeight="semibold">
                    You reach end of events.
                  </Text>
                </Center>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;

const EventLoading = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      <Stack>
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
      </Stack>
      <Stack>
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
      </Stack>
      <Stack>
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
      </Stack>
      <Stack>
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
        <Skeleton w="sm" height="20px" />
      </Stack>
    </Grid>
  );
};
