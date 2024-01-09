import ItemList from "@/item-list"
import { Box, Heading, Text } from "@chakra-ui/react"

const Collection = () => {
  return (
    <Box>
      <Heading size="lg">Best Books</Heading>
      <Text fontSize="xl">
        Paystack helps businesses in Africa get paid by anyone, anywhere in the
        world
      </Text>
      <Text fontSize="lg">Books</Text>
      <ItemList />
    </Box>
  );
};

export default Collection;
