"use client"

import { getLongestCollection } from "@/db/receiving/getLongestCollection";
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
import { useEffect, useState } from "react";

const MainPage = () => {
  const [collection, setCollection] = useState<ICollection>();

  useEffect(() => {
    const fetchCollection = async () => {
      const collection = await getLongestCollection();
      setCollection(collection);
    };

    fetchCollection();
  }, []);

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
