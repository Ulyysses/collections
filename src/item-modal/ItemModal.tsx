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
      <ModalContent>
        {/* <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>bvfsudhbfisdbfisbisbfweib</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
        <ItemForm />
      </ModalContent>
    </Modal>
  );
};

export default NewItemModal;
