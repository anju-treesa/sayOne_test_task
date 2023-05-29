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
  Container,
  Box,
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
import DataTable from "@/components/Table";

function EventListingPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    date: new Date(),
    eventPrice: "",
    notes: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        categoryId: "",
        date: new Date(),
        eventPrice: "",
        notes: "",
      });
      return;
    }

    (async () => {
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
        console.log("error", error);
      }
    })();
  }, [isOpen]);

  const onFormChangeHandler = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const onEventSaveHandler = async () => {
    console.log("formData", formData);

    // await setDoc(doc(db, "events"), {
    //   eventName: eventName,
    //   title: title,
    //   price: price,
    // });
  };

  return (
    <Container maxW="container.xl">
      <Box
        as="h2"
        fontSize="2xl"
        fontWeight="black"
        letterSpacing="wider"
        textTransform="uppercase"
      >
        Events
      </Box>

      <Box w="full" display="flex" justifyContent="flex-end">
        <Button
          h="12"
          rounded="lg"
          display="block"
          title="Add Events"
          onSubmit={onOpen}
        />
      </Box>
      <Box mt="10" bg="white">
        <DataTable />
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <CustomInput
                autoFocus
                type="text"
                name="title"
                value={formData.title}
                onChange={onFormChangeHandler("title")}
                id="title"
                placeholder="Event Title"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Select Category</FormLabel>
              <Select
                placeholder="Select Category"
                onChange={onFormChangeHandler("categoryId")}
                value={formData.categoryId}
                style={{ textTransform: "capitalize" }}
              >
                {categories.map(({ name, id }) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input placeholder="Date" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <CustomInput
                type="number"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                id="price"
                placeholder="Event Price"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              title="Save"
              onClick={onEventSaveHandler}
            />
            <Button rounded="lg" onClick={onClose} title="Cancel" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default EventListingPage;
