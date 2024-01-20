import ItemForm from "@/item-form";
import { IModal } from "@/types";
import {
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";

const NewItemModal = ({ isOpen, onClose, collectionId }: IModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ItemForm collectionId={collectionId}/>
      </ModalContent>
    </Modal>
  );
};

export default NewItemModal;
