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
  ModalFooter,
  ModalOverlay,
  Container,
  Box,
  Select,
  useToast,
  HStack,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import * as Yup from "yup";
import format from "date-fns/format";
import Head from "next/head";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import capitalize from "lodash/capitalize";

import Button from "@/components/button/Button";
import { db } from "@/libs/firebase";
import CustomInput from "@/components/input/Input";
import DataTable from "@/components/Table";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import DeleteModal from "@/components/deleteModal";
import DatePicker from "@/components/DatePicker";
import isAfter from "date-fns/isAfter";

const columnHelper = createColumnHelper();

function EventListingPage() {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    startDate: new Date(),
    endDate: new Date(),
    price: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const finalRef = React.useRef(null);
  const initialRef = React.useRef(null);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { authUser } = useFirebaseAuth();

  useEffect(() => {
    (async () => {
      if (!authUser?.uid) {
        return;
      }

      try {
        setTableLoading(true);
        const querySnapshot = await getDocs(
          query(collection(db, "events"), where("userId", "==", authUser?.uid))
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
            startDate: format(
              doc.data()?.startDate?.toDate(),
              "dd-MMM-yyyy hh:mm aa"
            ),
            endDate: format(
              doc.data()?.endDate?.toDate(),
              "dd-MMM-yyyy  hh:mm aa"
            ),
          });
        });

        setEvents(data);
        setTableLoading(false);
      } catch (error) {
        setTableLoading(false);
        console.log("error", error);
      }
    })();
  }, [reload, authUser]);

  useEffect(() => {
    if (!isOpen && !isDeleteOpen) {
      setFormData({
        title: "",
        category: "",
        startDate: new Date(),
        endDate: new Date(),
        price: "",
        notes: "",
      });
      setIsEdit(false);
      setReload(false);
      setDeleteLoading(false);
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
  }, [isOpen, isDeleteOpen]);

  const onFormChangeHandler = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const onFormDateChangeHandler = (field) => (date) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const onEventSaveHandler = async () => {
    setLoading(true);

    const schema = Yup.object().shape({
      title: Yup.string().required("Event title is required!"),
      category: Yup.string().required("Category is required!"),
      price: Yup.number("Price should be a number").required(
        "Price is required!"
      ),
    });

    try {
      await schema.validate(
        {
          title: formData.title,
          category: formData.category,
          price: formData.price,
        },
        {
          abortEarly: false,
        }
      );

      if (!isAfter(formData.endDate, formData.startDate)) {
        throw new Error("Start date cannot be past end date!");
      }

      if (!isEdit) {
        await addDoc(collection(db, "events"), {
          title: formData.title,
          category: formData.category,
          price: Number(formData.price),
          startDate: formData.startDate,
          endDate: formData.endDate,
          notes: formData.notes,
          userId: authUser.uid,
        });
      } else {
        await updateDoc(doc(db, "events", formData.id), {
          title: formData.title,
          category: formData.category,
          price: Number(formData.price),
          startDate: formData.startDate,
          endDate: formData.endDate,
          notes: formData.notes,
          userId: authUser.uid,
        });
      }

      setLoading(false);

      toast({
        description: isEdit
          ? "Event updated successfully!"
          : "Event created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setReload(true);
      onClose();
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
  };

  const columns = [
    columnHelper.accessor("title", {
      cell: (info) => info.getValue() && capitalize(info.getValue()),
      header: "Event Title",
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue() && capitalize(info.getValue()),
      header: "Category",
    }),
    columnHelper.accessor("startDate", {
      cell: (info) => info.getValue(),
      header: "Start Date",
    }),
    columnHelper.accessor("endDate", {
      cell: (info) => info.getValue(),
      header: "End Date",
    }),
    columnHelper.accessor("price", {
      cell: (info) => {
        if (!info.getValue()) {
          return null;
        }
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        return formatter.format(info.getValue());
      },
      header: "Price",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("Actions", {
      cell: (info) => {
        return (
          <HStack justifyContent="center" spacing="5">
            <EditIcon
              cursor="pointer"
              boxSize="4"
              onClick={onEventEditHandler(info.row.original)}
            />
            <DeleteIcon
              color="red.500"
              cursor="pointer"
              boxSize="4"
              onClick={onEventDeleteHandler(info.row.original)}
            />
          </HStack>
        );
      },
      header: "Date",
    }),
  ];

  const onEventEditHandler = (data) => () => {
    setIsEdit(true);
    setFormData({
      ...data,
      date: new Date(data.date),
    });
    onOpen();
  };

  const onEventDeleteHandler = (data) => () => {
    setFormData(data);
    onDeleteOpen();
  };

  const onEventDeleteSuccessHandler = async () => {
    try {
      setDeleteLoading(true);
      await deleteDoc(doc(db, "events", formData.id));

      toast({
        description: "Event deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setDeleteLoading(false);
      setReload(true);
      onDeleteClose();
    } catch (error) {
      setDeleteLoading(false);
      toast({
        description: error?.message || "An error occured while saving event.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Events - Re-Events | Favourite events near you!</title>
      </Head>
      <Container maxW="container.xl" mt="10">
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
        <Box>
          <DataTable
            columns={columns}
            data={events}
            tableLoading={tableLoading}
          />
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
            <ModalHeader>{isEdit ? "Edit Event" : "Create Event"}</ModalHeader>
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
                  onChange={onFormChangeHandler("category")}
                  value={formData.category}
                  style={{ textTransform: "capitalize" }}
                >
                  {categories.map(({ name, id }) => (
                    <option
                      style={{ textTransform: "capitalize" }}
                      key={id}
                      value={name}
                    >
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Start Date</FormLabel>
                <DatePicker
                  selectedDate={formData.startDate}
                  onChange={onFormDateChangeHandler("startDate")}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>End Date</FormLabel>
                <DatePicker
                  selectedDate={formData.endDate}
                  onChange={onFormDateChangeHandler("endDate")}
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
                title={isEdit ? "Update" : "Save"}
                onClick={onEventSaveHandler}
                isLoading={loading}
                loadingText={isEdit ? "Updating..." : "Saving..."}
              />
              <Button rounded="lg" onClick={onClose} title="Cancel" />
            </ModalFooter>
          </ModalContent>
        </Modal>

        <DeleteModal
          deleteLoading={deleteLoading}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onDelete={onEventDeleteSuccessHandler}
        />
      </Container>
    </>
  );
}

export default EventListingPage;
