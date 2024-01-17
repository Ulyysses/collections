"use client";

import { getItemList } from "@/db/getItemList";
import { getTag } from "@/db/getTag";
import { IItem } from "@/types";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Text,
  Tag,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ItemListProps {
  collectionId: string;
}

interface itemList {
  collectionId: string;
  name: string;
  tagNames?: string[];
  tagsId: string[];
  _id: string;
  description?: string;
}

const ItemList = ({ collectionId }: ItemListProps) => {
  const [itemList, setItemList] = useState<itemList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getItemList(collectionId);
        setItemList(list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [collectionId]);

  useEffect(() => {
    const fetchTags = async () => {
      const updatedList = await Promise.all(
        itemList.map(async (item) => {
          const tagNames = await renderTags(item.tagsId);
          return { ...item, tagNames };
        })
      );
      setItemList(updatedList);
    };

    fetchTags();
  }, [itemList]);

  const renderTags = async (tagsId: string[]) => {
    const tagName = await Promise.all(tagsId.map((tagId) => getTag(tagId)));
    return tagName;
  };

  return (
    <Flex direction="column" gap={2}>
      {itemList.map((item) => (
        <Card overflow="hidden" variant="outline" maxH="200px" key={item._id}>
          <Link href={`/item/${item._id}`}>
            <Stack direction="row" alignItems="center" flex="1">
              <CardBody>
                <Heading size="md">{item.name}</Heading>
                {item.description && <Text py="2">{item.description}</Text>}
              </CardBody>
              <CardFooter display="flex" flexWrap="wrap" maxW="500px">
                {item.tagNames?.map((tagName, index) => (
                  <Tag marginRight="2" marginBottom="2" key={index}>
                    {tagName}
                  </Tag>
                ))}
              </CardFooter>
            </Stack>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default ItemList;
