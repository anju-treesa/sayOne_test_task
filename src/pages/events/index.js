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
  Select,
  useToast,
} from "@chakra-ui/react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import * as Yup from "yup";

import Button from "@/components/button/Button";
import { db } from "@/libs/firebase";
import CustomInput from "@/components/input/Input";
import DataTable from "@/components/Table";

function EventListingPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    date: new Date(),
    price: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const finalRef = React.useRef(null);
  const initialRef = React.useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        categoryId: "",
        date: new Date(),
        price: "",
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
    setLoading(true);

    const schema = Yup.object().shape({
      title: Yup.string().required("Event title is required!"),
      categoryId: Yup.string().required("Category is required!"),
      price: Yup.number("Price should be a number").required(
        "Price is required!"
      ),
    });

    try {
      await schema.validate(
        {
          title: formData.title,
          categoryId: formData.categoryId,
          price: formData.price,
        },
        {
          abortEarly: false,
        }
      );

      await addDoc(collection(db, "events"), {
        title: formData.title,
        categoryId: formData.categoryId,
        price: formData.price,
        date: formData.date,
        notes: formData.notes,
      });

      setLoading(false);

      toast({
        description: "Event created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      setLoading(false);

      toast({
        description: Array.isArray(error?.inner)
          ? error?.inner[0]?.message
          : error?.message || "An error occured while saving event.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    onClose();
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
              <CustomInput
                type="date"
                name="price"
                value={formData.price}
                onChange={onFormChangeHandler("price")}
                id="price"
                placeholder="Event Price"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <CustomInput
                type="number"
                name="price"
                value={formData.price}
                onChange={onFormChangeHandler("price")}
                id="price"
                placeholder="Event Price"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Notes</FormLabel>
              <CustomInput
                type="text"
                name="Notes"
                value={formData.notes}
                onChange={onFormChangeHandler("notes")}
                id="Notes"
                placeholder="Notes"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              rounded="lg"
              colorScheme="blue"
              mr={3}
              title="Save"
              onClick={onEventSaveHandler}
              isLoading={loading}
              loadingText="Saving..."
            />
            <Button rounded="lg" onClick={onClose} title="Cancel" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default EventListingPage;
