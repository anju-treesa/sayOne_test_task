import React from "react";
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

function HomePageCommon() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <div>
      <h1>Categories Listing Page</h1>

      <Button title="Add Category" onSubmit={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
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
