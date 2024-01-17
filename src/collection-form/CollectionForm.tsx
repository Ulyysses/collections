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
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  title: string
  description: string
  category: string
}

const CollectionForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addNewCollection(data);
      reset();
    } catch (error) {
      console.error("Error adding new collection:", error);
    }
  };

  return (
    <Box>
      <Heading mb="20px">Create a new collection!</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="40px">
          <FormLabel mb="2px">Title:</FormLabel>
          <Input
            variant="flushed"
            type="text"
            {...register("title", { required: true })}
          />
        </FormControl>

        <FormControl mb="40px">
          <FormLabel mb="2px">Description:</FormLabel>
          <Input
            variant="flushed"
            type="text"
            {...register("description", { required: true })}
          />
        </FormControl>

        <Select
          placeholder="Category"
          variant="flushed"
          mb="40px"
          {...register("category", { required: true })}
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
          mb="40px"
          type="submit"
        >
          Create a new collection
        </Button>
      </form>
    </Box>
  );
};

export default CollectionForm;
