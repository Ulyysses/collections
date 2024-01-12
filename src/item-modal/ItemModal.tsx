import ItemForm from "@/item-form";
import {
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";

interface IItemForm {
  isOpen: boolean;
  onClose: () => void;
}

const NewItemModal = ({ isOpen, onClose }: IItemForm) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ItemForm />
      </ModalContent>
    </Modal>
  );
};

export default NewItemModal;
