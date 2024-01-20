"use client";

import { getItemList } from "@/db/receiving/getItemList";
import { getTag } from "@/db/receiving/getTag";
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
import { FlattenMaps } from "mongoose";
import { useEffect, useState } from "react";

interface ItemListProps {
  collectionId: string;
}

const ItemList = ({ collectionId }: ItemListProps) => {
  const [itemList, setItemList] = useState<IItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData: (FlattenMaps<any> & Required<{ _id: unknown }>)[] =
          await getItemList(collectionId);

        const processedList: IItem[] = listData.map((item) => {
          return {
            collectionId: String(item.collectionId),
            name: String(item.name),
            tagsId: item.tagsId.map(String),
            _id: String(item._id),
            description: item.description
              ? String(item.description)
              : undefined,
          };
        });

        setItemList(processedList);
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
    const tagNames = await Promise.all(tagsId.map((tagId) => getTag(tagId)));
    return tagNames.filter((tagName) => tagName !== undefined) as string[];
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
