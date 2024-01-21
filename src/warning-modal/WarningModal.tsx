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

const WarningModal = ({ isOpen, onClose, deletionFunction }: IModal) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletionFunction?.();
      router.back();
    } catch (error) {
      console.error("Error handling delete:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete? This action cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
