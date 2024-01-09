import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Text,
  IconButton,
  Tag,
  Flex,
  Link,
} from "@chakra-ui/react";

const ItemList = () => {
  return (
    <Flex direction="column" gap={2}>
      <Card overflow="hidden" variant="outline" maxH="200px">
        <Stack direction="row" alignItems="center" flex="1">
          <IconButton
            aria-label="Delete Item"
            icon={<DeleteIcon />}
            ml="20px"
          />
          <CardBody>
            <Heading size="md">The perfect latte</Heading>
            <Text py="2">
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Text>
          </CardBody>
          <CardFooter display="flex" flexWrap="wrap" maxW="500px">
            <Tag marginRight="2" marginBottom="2">
              Sample Tag
            </Tag>
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
};

export default ItemList;
