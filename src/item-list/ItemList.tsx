"use client";

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
import { useEffect, useState } from "react";

interface TagsMap {
  [key: string]: string;
}

interface ItemListProps {
  itemList: IItem[];
}

const ItemList = ({ itemList }: ItemListProps) => {
  const [tagsMap, setTagsMap] = useState<TagsMap>({});

  useEffect(() => {
    const fetchTags = async () => {
      await Promise.all(
        itemList
          .map((item) => item.tagsId)
          .flat()
          .map((id) => {
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
    };
    fetchTags();
  }, [itemList]);

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
                {item.tagsId.map((id) => (
                  <Tag marginRight="2" marginBottom="2" key={id}>
                    {tagsMap[id]}
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
