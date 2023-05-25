import React, { useEffect, useState } from "react";
import {
  Modal,
  useDisclosure,
  FormControl,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  Input,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";

import Button from "@/components/button/Button";
import { Select } from "@chakra-ui/react";
import { db } from "@/libs/firebase";
import CustomInput from "@/components/input/Input";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

function HomePageCommon() {
  const [userDataArray, setUserDataArray] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [eventName, setEventName] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    let unsubscribed = false;

    getDocs(collection(db, "categories"))
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.
        console.log(querySnapshot, "querySnapshot");
        const newUserDataArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setUserDataArray(newUserDataArray);
      })
      .catch((err) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        // TODO: Handle errors
        console.error("Failed to retrieve data", err);
      });

    return () => (unsubscribed = true);
  }, []);
  console.log(userDataArray, "userDataArray");

  const onEventSaveHandler = async (event) => {
    console.log(event, "event");
    await setDoc(doc(db, "events"), {
      eventName: eventName,
      title: title,
      price: price,
    });
  };
  return (
    <div>
      <h1>Categories Listing Page</h1>

      <Button title="Add Events" onSubmit={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Event Name</FormLabel>
              <CustomInput
                type="text"
                name="eventName"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                id="eventName"
                placeholder="Event Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <CustomInput
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                id="title"
                placeholder="Event Title"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input placeholder="Date" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <CustomInput
                type="text"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                id="price"
                placeholder="Event Price"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Select Category</FormLabel>
              <Select
                bg="red"
                borderColor="black"
                color="white"
                placeholder="Select Category"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              title="Save"
              onClick={onEventSaveHandler()}
            />
            <Button rounded="lg" onClick={onClose} title="Cancel" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default HomePageCommon;
