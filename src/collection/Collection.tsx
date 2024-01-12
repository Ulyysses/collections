'use client';

import ItemList from "@/item-list";
import ItemModal from "@/item-modal";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const Collection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Flex justifyContent="space-between">
          <Heading size="lg">Collection of Detective Books</Heading>
          <Flex gap="4px">
            <IconButton
              aria-label="Add new item in collection"
              icon={<AddIcon />}
              onClick={onOpen}
            />
            <IconButton aria-label="Delete Collection" icon={<DeleteIcon />} />
          </Flex>
        </Flex>
        <Text fontSize="xl">
          Dive into a world of suspense with our thrilling detective novel
          collection, ranging from gritty urban landscapes to mysterious
          countryside settings. Follow brilliant investigators as they unravel
          dark secrets, navigate crime scenes, and make clever deductions in a
          rollercoaster of suspense. Whether you crave classic whodunits or
          gripping police procedurals, our collection promises an
          edge-of-your-seat literary journey where every clue counts, and every
          mystery demands to be solved. Are you up for the challenge?
        </Text>
        <Text fontSize="lg">Books</Text>
        <ItemList />
      </Box>

      <ItemModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Collection;
