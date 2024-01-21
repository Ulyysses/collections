"use client";

import { deleteCollection } from "@/db/deletion/deleteCollection";
import { getCollection } from "@/db/receiving/getCollection";
import ItemList from "@/item-list";
import ItemModal from "@/item-modal";
import Loader from "@/loader";
import { ICollection } from "@/types";
import WarningModal from "@/warning-modal";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CollectionProps {
  id: string;
}

const Collection = ({ id }: CollectionProps) => {
  const [collection, setCollection] = useState<ICollection>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const itemModalDisclosure = useDisclosure();
  const warningModalDisclosure = useDisclosure();

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

  const handleDeleteCollection = (id: string) => {
    deleteCollection(id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <Flex justifyContent="space-between">
          <Heading size="lg">{collection?.title}</Heading>
          <Flex gap="4px">
            <IconButton aria-label="Edit Collection" icon={<EditIcon />} />
            <IconButton
              aria-label="Delete Collection"
              icon={<DeleteIcon />}
              onClick={warningModalDisclosure.onOpen}
            />
          </Flex>
        </Flex>
        <Text fontSize="xl">{collection?.description}</Text>
        <Text fontSize="lg">{collection?.category}</Text>
        <Flex justifyContent="flex-end">
          <Button rightIcon={<AddIcon />} onClick={itemModalDisclosure.onOpen} mb="10px">
            Add item
          </Button>
        </Flex>
        <ItemList collectionId={id} />
      </Box>

      <ItemModal isOpen={itemModalDisclosure.isOpen} onClose={itemModalDisclosure.onClose} id={id} />
      <WarningModal isOpen={warningModalDisclosure.isOpen} onClose={warningModalDisclosure.onClose} id={id} deletionFunction={() => handleDeleteCollection(id)}/>
    </>
  );
};

export default Collection;
