"use client";

import { getCollectionList } from "@/db/receiving/getCollectionList";
import Loader from "@/loader";
import { ICollection } from "@/types";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  Tag,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FlattenMaps } from "mongoose";
import { useEffect, useState } from "react";

const CollectionList = () => {
  const [collectionList, setCollectionList] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData: (FlattenMaps<any> & Required<{ _id: unknown }>)[] =
          await getCollectionList();

        const processedList: ICollection[] = listData.map((collection) => {
          return {
            _id: String(collection._id),
            title: String(collection.title),
            description: String(collection.description),
            category: String(collection.category),
          };
        });

        setCollectionList(processedList);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Flex direction="column" gap={2}>
      {collectionList.map((collection) => (
        <Card
          overflow="hidden"
          variant="outline"
          maxH="200px"
          key={collection._id}
        >
          <Link href={`/collection/${collection._id}`}>
            <Stack direction="row" alignItems="center" flex="1">
              <CardBody>
                <Heading size="md" mb="15px">
                  {collection.title}
                </Heading>
                <Tag marginRight="2" marginBottom="2">
                  {collection.category}
                </Tag>
              </CardBody>
            </Stack>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default CollectionList;
