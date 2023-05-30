import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete = () => {},
  deleteLoading = false,
}) => {
  return (
    <Modal onClose={onClose} size="xs" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Do you want to delete this event?</ModalBody>
        <ModalFooter>
          <HStack spacing="4">
            <Button
              isLoading={deleteLoading}
              loadingText="Deleting..."
              colorScheme="red"
              onClick={onDelete}
            >
              Yes
            </Button>
            <Button colorScheme="gray" onClick={onClose}>
              No
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
