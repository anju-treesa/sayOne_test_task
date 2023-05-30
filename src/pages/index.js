import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/libs/firebase";
import CategoryGrid from "@/components/CategoryGrid";

function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchCategories();
    })();
  }, []);

  const fetchCategories = async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

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

      <Box mt="10">
        <Center>
          <Text
            fontSize="4xl"
            fontWeight="semibold"
            letterSpacing="wider"
            color="gray.700"
          >
            Things to do around
          </Text>
        </Center>
        <CategoryGrid data={categories} />
      </Box>
    </>
  );
}

export default HomePage;
