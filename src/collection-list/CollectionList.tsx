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
    <Link href="collection-page">
      <Flex direction="column" gap={2}>
        <Card overflow="hidden" variant="outline" maxH="200px">
          <Stack direction="row" alignItems="center" flex="1">
            <CardBody>
              <Heading size="md">Collection of detective books</Heading>
              <Tag marginRight="2" marginBottom="2">
                Books
              </Tag>
            </CardBody>
          </Stack>
        </Card>
      </Flex>
    </Link>
  );
};

export default CollectionList;
