"use client";

import { getCollection } from "@/db/getCollection";
import ItemList from "@/item-list";
import ItemModal from "@/item-modal";
import { ICollection } from "@/types";
import { AddIcon, DeleteIcon, EditIcon, SpinnerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CollectionProps {
  id: string;
}

const Collection = ({ id }: CollectionProps) => {
  const [collection, setCollection] = useState<ICollection>();
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collection = await getCollection(id);
        setCollection(collection);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box>
        <SpinnerIcon />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Flex justifyContent="space-between">
          <Heading size="lg">{collection?.title}</Heading>
          <Flex gap="4px">
            <IconButton
              aria-label="Add new item in collection"
              icon={<AddIcon />}
              onClick={onOpen}
            />
            <IconButton aria-label="Edit Collection" icon={<EditIcon />} />
            <IconButton aria-label="Delete Collection" icon={<DeleteIcon />} />
          </Flex>
        </Flex>
        <Text fontSize="xl">{collection?.description}</Text>
        <Text fontSize="lg">{collection?.category}</Text>
        <ItemList collectionId={id}/>
      </Box>

      <ItemModal isOpen={isOpen} onClose={onClose} collectionId={id}/>
    </>
  );
};

export default Collection;
