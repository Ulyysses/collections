"use client"

import { addNewCollection } from "@/db/addNewCollection";
import ItemForm from "@/item-form";
import { CollectibleType } from "@/types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";

const CollectionForm = () => {
    const handleAddNewCollection = async () => {
    try {
      await addNewCollection();
    } catch (error) {
      console.error("Error adding new collection:", error);
    }
  };

  return (
    <Box>
      <Heading mb="20px">Create a new collection!</Heading>

      <FormControl mb="40px">
        <FormLabel mb="2px">Title:</FormLabel>
        <Input variant="flushed" />
      </FormControl>

      <FormControl mb="40px">
        <FormLabel mb="2px">Description:</FormLabel>
        <Input variant="flushed" />
      </FormControl>

      <Select placeholder="Category" variant="flushed" mb="40px">
        {Object.values(CollectibleType).map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </Select>

      <Button colorScheme="teal" size="lg" onClick={handleAddNewCollection} mb="40px">
        Create a new collection
      </Button>

      <ItemForm />
      
    </Box>
  );
};

export default CollectionForm;
