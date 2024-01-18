"use client";

import { addNewItem } from "@/db/addNewItem";
import { addNewTag } from "@/db/addNewTag";
import { IItem } from "@/types";
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
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ItemFormProps {
  collectionId: string;
}

const ItemForm = ({ collectionId }: ItemFormProps) => {
  const { register, handleSubmit, reset } = useForm<IItem>({
    defaultValues: {
      collectionId: collectionId,
      name: "",
      tagsId: [],
    },
  });

  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const onSubmit = async (data: IItem) => {
    try {
      const tagPromises = tags.map((tag) => addNewTag(tag));
      const savedTags = await Promise.all(tagPromises);
      const tagIds = savedTags.map((savedTag) => savedTag._id);

      data.tagsId = tagIds;

      await addNewItem(data);

      reset({
        collectionId: "",
        name: "",
        tagsId: [],
      });
      setTags([]);
      setTagValue("")
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const handleAddNewTag = () => {
    setTags((prevTags) => [...prevTags, tagValue]);
    setTagValue("");
  };

  return (
    <Flex direction="column">
      <Heading size="md" mb="20px">
        New Item
      </Heading>

<form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="40px">
          <FormLabel mb="2px">Name:</FormLabel>
          <Input
          {...register("name", { required: true })}
            variant="flushed"
            type="text"
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

        <Button
          colorScheme="teal"
          size="lg"
          w="84px"
          type="submit"
        >
          Add
        </Button>
        </form>
    </Flex>
  );
};

export default ItemForm;
