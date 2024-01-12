import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";

const ItemForm = () => {
  return (
    <Box>
      <Heading size="md" mb="20px">
        New Item
      </Heading>

      <FormControl mb="40px">
        <FormLabel mb="2px">Name:</FormLabel>
        <Input variant="flushed" />
      </FormControl>

      <FormControl mb="40px">
        <FormLabel mb="2px">Description:</FormLabel>
        <Input variant="flushed" />
      </FormControl>

      {/* <FormControl>
        <FormLabel mb="8px">Tags:</FormLabel>
        <Input variant="flushed" />
      </FormControl>
      
      <Tag>
        {tag}
      </Tag> */}

      <Button colorScheme="teal" size="lg">
        Add
      </Button>
    </Box>
  );
};

export default ItemForm;
