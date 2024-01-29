"use client";

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

const CollectionList = ({ collectionList }: { collectionList: ICollection[] }) => {
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
