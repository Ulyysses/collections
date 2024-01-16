"use client";

import { addNewItem } from "@/db/addNewItem";
import { addNewTag } from "@/db/addNewTag";
import { getTag } from "@/db/getTag";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

interface ItemValue {
  collectionId: string;
  name: string;
  tagsId: string[];
}

interface ItemFormProps {
  collectionId: string;
}

const ItemForm = ({ collectionId }: ItemFormProps) => {
  const [value, setValue] = useState<ItemValue>({
    collectionId: "",
    name: "",
    tagsId: [],
  });
  console.log("🚀 ~ file: ItemForm.tsx:36 ~ ItemForm ~ value:", value)
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddNewTag = async () => {
    try {
      await addNewTag(tagValue);
      const tagObject = await getTag(tagValue);
      setValue((prevValue) => ({
        ...prevValue,
        tagsId: [...prevValue.tagsId, tagObject._id],
        collectionId: collectionId,
      }));
      setTags((prevTags) => [...prevTags, tagValue]);
      setTagValue("");
    } catch (error) {
      console.error("Error adding new tag:", error);
    }
  };

  const handleAddNewItem = async () => {
    try {
      await addNewItem(value);
      setValue({
        collectionId: "",
        name: "",
        tagsId: [],
      });
      setTags([]);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  return (
    <Flex direction="column">
      <Heading size="md" mb="20px">
        New Item
      </Heading>

      <FormControl mb="40px">
        <FormLabel mb="2px">Name:</FormLabel>
        <Input
          variant="flushed"
          type="text"
          name="name"
          value={value.name}
          onChange={onChange}
        />
      </FormControl>

      <InputGroup size="md" mb="20px">
        <FormLabel mb="8px">Tags:</FormLabel>
        <Input
          variant="flushed"
          pr="4.5rem"
          type="text"
          name="tagValue"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleAddNewTag}>
            Add tag
          </Button>
        </InputRightElement>
      </InputGroup>

      <Box mb="40px">
        {tags.map((tag, index) => (
          <Tag marginRight="2" marginBottom="2" key={index}>
            {tag}
          </Tag>
        ))}
      </Box>

      <Button colorScheme="teal" size="lg" w="84px" onClick={handleAddNewItem}>
        Add
      </Button>
    </Flex>
  );
};

export default ItemForm;
