"use client";

import { deleteItem } from "@/db/deletion/deleteItem";
import { getItem } from "@/db/receiving/getItem";
import { getTag } from "@/db/receiving/getTag";
import Loader from "@/loader";
import { IItem } from "@/types";
import WarningModal from "@/warning-modal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Tag,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface CollectionProps {
  id: string;
}
interface TagsMap {
  [key: string]: string;
}

const Item = ({ id }: CollectionProps) => {
  const [item, setItem] = useState<IItem>();
  const [loading, setLoading] = useState(true);
  const [tagsMap, setTagsMap] = useState<TagsMap>({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receivedItem = await getItem(id);
        setItem(receivedItem);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchTags = async () => {
      if (item) {
        await Promise.all(
          item.tagsId.map((id) => {
            return getTag(id).then((name) => {
              if (name) {
                setTagsMap((tagsMap) => {
                  return {
                    ...tagsMap,
                    [id]: name,
                  };
                });
              }
            });
          })
        );
      }
    };
    fetchTags();
  }, [item]);

  const handleDeleteItem = async (id: string) => {
    deleteItem(id);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        minH="300px"
      >
        <Image
          p="10px"
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
        <Stack>
          <CardBody display="flex" flexDirection="column" gap="20px">
            <Heading size="md">{item?.name}</Heading>
            {item?.description && <Text py="2">{item.description}</Text>}
            <Box>
              {item?.tagsId.map((id) => (
                <Tag marginRight="2" marginBottom="2" key={id}>
                  {tagsMap[id]}
                </Tag>
              ))}
            </Box>
          </CardBody>
          <CardFooter display="flex" gap="5px">
            <Button variant="solid" colorScheme="blue">
              Edit
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={onOpen}>
              Delete
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      <WarningModal isOpen={isOpen} onClose={onClose} deletionFunction={() => handleDeleteItem(id)}/>
    </>
  );
};

export default Item;
