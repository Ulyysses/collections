import { mockDataItems } from "@/mockDataItems";
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

const ItemList = () => {
  return (
    <Flex direction="column" gap={2}>
      {mockDataItems.map((item) => (
        <Card overflow="hidden" variant="outline" maxH="200px" key={item.id}>
          <Link href="item-page">
            <Stack direction="row" alignItems="center" flex="1">
              <CardBody>
                <Heading size="md">{item.name}</Heading>
                <Text py="2">
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Text>
              </CardBody>
              <CardFooter display="flex" flexWrap="wrap" maxW="500px">
                {item.tags.map((tag, index) => (
                  <Tag marginRight="2" marginBottom="2" key={index}>
                    {tag}
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
