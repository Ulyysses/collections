import ItemForm from "@/item-form";
import { IModal } from "@/types";
import {
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";

const ItemModal = ({ isOpen, onClose, id }: IModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ItemForm id={id}/>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
