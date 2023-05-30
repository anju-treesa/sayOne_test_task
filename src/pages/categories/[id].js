import EventGrid from "@/components/EventGrid";
import { db } from "@/libs/firebase";
import { Box, Container, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { capitalize } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EventCategoriesPage = () => {
  const [category, setCategory] = useState(null);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      if (route.isReady) {
        await fetchCategory();
      }
    })();
  }, [route]);

  const fetchCategory = async () => {
    try {
      const docRef = doc(db, "categories", route.query?.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCategory({
          ...docSnap.data(),
        });
      } else {
        setCategory(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>
          {capitalize(category?.name)} - Re-Events | Favourite events near you!
        </title>
      </Head>
      <Container maxW="container.lg">
        <Text fontSize="3xl" fontWeight="black" letterSpacing="wider">
          {category?.name?.toUpperCase()}
        </Text>
        <Box mt="10">
          <EventGrid />
        </Box>
      </Container>
    </>
  );
};

export default EventCategoriesPage;
