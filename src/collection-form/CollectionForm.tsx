"use client";

import { addNewCollection } from "@/db/addNewCollection";
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
import { ChangeEvent, useState } from "react";

const CollectionForm = () => {
  const [value, setValue] = useState({
    title: "",
    description: "",
    category: "",
  });

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddNewCollection = async () => {
    try {
      await addNewCollection(value);
      setValue({
        title: "",
        description: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding new collection:", error);
    }
  };

  return (
    <Box>
      <Heading mb="20px">Create a new collection!</Heading>

      <FormControl mb="40px">
        <FormLabel mb="2px">Title:</FormLabel>
        <Input
          variant="flushed"
          type="text"
          name="title"
          value={value.title}
          onChange={onChange}
        />
      </FormControl>

      <FormControl mb="40px">
        <FormLabel mb="2px">Description:</FormLabel>
        <Input
          variant="flushed"
          type="text"
          name="description"
          value={value.description}
          onChange={onChange}
        />
      </FormControl>

      <Select
        placeholder="Category"
        variant="flushed"
        mb="40px"
        name="category"
        value={value.category}
        onChange={onChange}
      >
        {Object.values(CollectibleType).map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </Select>

      <Button
        colorScheme="teal"
        size="lg"
        onClick={handleAddNewCollection}
        mb="40px"
      >
        Create a new collection
      </Button>
    </Box>
  );
};

export default CollectionForm;
