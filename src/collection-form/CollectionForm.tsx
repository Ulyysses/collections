"use client";

import { addNewCollection } from "@/db/addition/addNewCollection";
import { CollectibleType } from "@/types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  title: string;
  description: string;
  category: string;
};

const CollectionForm = () => {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormValues>();

  const watchedValues = watch();

  const toast = useToast();

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("collectionFormData") || "{}"
    );
    Object.entries(storedData).forEach(([field, value]) => {
      setValue(field as keyof FormValues, value as string);
    });
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("collectionFormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const promise = toast.promise(addNewCollection(data), {
        success: {
          title: "Collection was created!",
          description: "Now you can add an item",
        },
        error: {
          title: "Collection was not created",
          description: "Something went wrong",
        },
        loading: {
          title: "Creating collection...",
          description: "Please wait",
        },
      });
      await promise;
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

        <Button colorScheme="teal" size="lg" mb="40px" type="submit">
          Create a new collection
        </Button>
      </form>
    </Box>
  );
};

export default CollectionForm;
