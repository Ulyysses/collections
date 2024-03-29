"use client";

import { deleteItem } from "@/db/deletion/deleteItem";
import { getTag } from "@/db/receiving/getTag";
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
import { FlattenMaps } from "mongoose";
import { useEffect, useState } from "react";

interface CollectionProps {
  id: string;
  item: IItem;
}
interface TagsMap {
  [key: string]: string;
}

const Item = ({ id, item }: CollectionProps) => {
  // const [item, setItem] = useState<IItem>(item);
  // const [loading, setLoading] = useState(true);
  const [tagsMap, setTagsMap] = useState<TagsMap>({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const receivedItem: FlattenMaps<any> | null = await getItem(id);

  //       const processedItem: IItem = {
  //         collectionId: String(receivedItem?.collectionId),
  //         name: String(receivedItem?.name),
  //         tagsId: receivedItem?.tagsId.map(String),
  //         _id: String(receivedItem?._id),
  //         description: receivedItem?.description
  //           ? String(receivedItem?.description)
  //           : undefined,
  //       };

  //       setItem(processedItem);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

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

  // if (loading) {
  //   return <Loader />;
  // }

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
            <Heading size="sm">{item?.name}</Heading>
            <Box>
              {item?.tagsId.map((id) => (
                <Tag
                  colorScheme="green"
                  marginRight="2"
                  marginBottom="2"
                  key={id}
                >
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
      <WarningModal
        isOpen={isOpen}
        onClose={onClose}
        deletionFunction={() => handleDeleteItem(id)}
      />
    </>
  );
};

export default Item;
