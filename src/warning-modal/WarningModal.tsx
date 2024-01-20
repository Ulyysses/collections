"use client";

import { deleteItem } from "@/db/deletion/deleteItem";
import { IModal } from "@/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const WarningModal = ({ isOpen, onClose, id }: IModal) => {
  // const router = useRouter();

  // const handleDeleteItem = async (id: string) => {
  //   try {
  //     await deleteItem(id);
  //     router.back();
  //   } catch (error) {
  //     console.error("Error handling delete:", error);
  //   }
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete the item? It will be impossible to
            restore it.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            // onClick={() => handleDeleteItem(id)}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
