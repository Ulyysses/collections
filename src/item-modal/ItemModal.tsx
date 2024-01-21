import ItemForm from "@/item-form";
import { IItem } from "@/types";
import {
  Modal,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface ItemModalProps {
  isOpen: boolean;
  id: string;
  setItemList: Dispatch<SetStateAction<IItem[]>>;
  onClose: () => void;
}

const ItemModal = ({ isOpen, onClose, id, setItemList }: ItemModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="40px">
        <ItemForm id={id} setItemList={setItemList}/>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
