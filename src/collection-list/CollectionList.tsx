import { mockDataCollections } from "@/mockDataCollections";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  Tag,
  Flex,
  Link,
} from "@chakra-ui/react";

const CollectionList = () => {
  return (
    <Flex direction="column" gap={2}>
      {mockDataCollections.map((collection) => (
        <Card
          overflow="hidden"
          variant="outline"
          maxH="200px"
          key={collection.id}
        >
          <Link href="collection-page">
            <Stack direction="row" alignItems="center" flex="1">
              <CardBody>
                <Heading size="md">{collection.title}</Heading>
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
