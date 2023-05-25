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

import { collection, query, where, getDocs } from "firebase/firestore";

function HomePageCommon() {
  const [userDataArray, setUserDataArray] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    let unsubscribed = false;

    getDocs(collection(db, "categories"))
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

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
              <Input placeholder="Event Name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input placeholder="Date" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input placeholder="Price" />
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
            <Button colorScheme="blue" mr={3} title="Save" />
            <Button rounded="lg" onClick={onClose} title="Cancel" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default HomePageCommon;
