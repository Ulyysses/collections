"use client";

import { getLongestCollection } from "@/db/receiving/getLongestCollection";
import Loader from "@/loader";
import { ICollection } from "@/types";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Stack,
  StackDivider,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FlattenMaps } from "mongoose";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [collection, setCollection] = useState<ICollection>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      const collection: FlattenMaps<any> | null = await getLongestCollection();

      const processedCollection: ICollection = {
        _id: String(collection?._id),
        title: String(collection?.title),
        description: String(collection?.description),
        category: String(collection?.category),
      };

      setCollection(processedCollection);
      setLoading(false);
    };

    fetchCollection();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">The longest collection</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Link href={`/collection/${collection?._id}`}>
              <Heading size="xs" textTransform="uppercase">
                {collection?.title}
              </Heading>
              <Text pt="2" fontSize="sm">
                {collection?.description}
              </Text>
              <Tag>{collection?.category}</Tag>
            </Link>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MainPage;
