"use client";

import { getCollectionList } from "@/db/getCollectionList";
import { ICollection } from "@/types";
import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  Tag,
  Flex,
  Link,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CollectionList = () => {
  const [collectionList, setCollectionList] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getCollectionList();
        setCollectionList(list);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionList]);

  if (loading) {
    return (
      <Box>
        <SpinnerIcon />
      </Box>
    );
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
