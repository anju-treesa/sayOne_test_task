import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Text } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { capitalize, isEmpty } from "lodash";

import EventGrid from "@/components/EventGrid";
import { db } from "@/libs/firebase";

const EventCategoriesPage = () => {
  const [category, setCategory] = useState(null);
  const [eventsForCategory, setEventsForCategory] = useState([]);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      if (route.isReady) {
        await fetchCategory();
      }
    })();
  }, [route]);

  useEffect(() => {
    (async () => {
      if (!isEmpty(category)) {
        await fetchEventsForCategory();
      }
    })();
  }, [category]);

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

  const fetchEventsForCategory = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "events"), where("category", "==", category?.name))
      );
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data()?.startDate?.toDate(),
          endDate: doc.data()?.endDate?.toDate(),
        });
      });

      setEventsForCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("eventsForCategory", eventsForCategory);

  return (
    <>
      <Head>
        <title>
          {capitalize(category?.name)} - Re-Events | Favourite events near you!
        </title>
      </Head>

      <Box h="full" as="section" p="20">
        <Text fontSize="3xl" fontWeight="black" letterSpacing="wider">
          {category?.name?.toUpperCase()}
        </Text>

        {isEmpty(eventsForCategory) ? (
          <Box mt="10">
            <Text fontSize="2xl" fontWeight="medium" letterSpacing="wider">
              No events found!
            </Text>
          </Box>
        ) : (
          <Box mt="10">
            <EventGrid events={eventsForCategory} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default EventCategoriesPage;
