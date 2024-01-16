import ItemForm from "@/item-form";
import {
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";

interface IItemForm {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string;
}

const NewItemModal = ({ isOpen, onClose, collectionId }: IItemForm) => {
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
