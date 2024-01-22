"use client";

import { addNewItem } from "@/db/addition/addNewItem";
import { addNewTag } from "@/db/addition/addNewTag";
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
  TagCloseButton,
  TagLabel,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface ItemFormProps {
  id: string;
  setItemList: Dispatch<SetStateAction<IItem[]>>; 
}

const ItemForm = ({ id, setItemList }: ItemFormProps) => {
  const { register, handleSubmit, reset } = useForm<IItem>({
    defaultValues: {
      collectionId: id,
      name: "",
      tagsId: [],
    },
  });

  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const toast = useToast();

  const onSubmit = async (data: IItem) => {
    try {
      const tagPromises = tags.map((tag) => addNewTag(tag));
      const savedTags = await Promise.all(tagPromises);
      const tagIds = savedTags.map((savedTag) => savedTag._id);

      data.tagsId = tagIds;

      const promise = toast.promise(addNewItem(data), {
        success: {
          title: "Item was created!",
          description: "keep developing your collection",
        },
        error: {
          title: "Item was not created",
          description: "Something went wrong",
        },
        loading: {
          title: "Creating item...",
          description: "Please wait",
        },
      });
      await promise;

      setItemList((prevItemList: IItem[]) => [...prevItemList, data]);

      reset({
        collectionId: "",
        name: "",
        tagsId: [],
      });
      setTags([]);
      setTagValue("");
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const handleAddNewTag = () => {
    setTags((prevTags) => [...prevTags, tagValue]);
    setTagValue("");
  };

  const deleteTag = (indexToDelete: number) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToDelete)
    );
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
            required
            onChange={(e) => setTagValue(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => tagValue && handleAddNewTag()}
            >
              Add tag
            </Button>
          </InputRightElement>
        </InputGroup>

        <Box mb="40px">
          {tags.map((tag, index) => (
            <Tag
              colorScheme="green"
              marginRight="2"
              marginBottom="2"
              key={index}
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => deleteTag(index)} />
            </Tag>
          ))}
        </Box>

        <Button colorScheme="teal" size="lg" w="84px" type="submit">
          Add
        </Button>
      </form>
    </Flex>
  );
};

export default ItemForm;
