"use client";

import { deleteCollection } from "@/db/deletion/deleteCollection";
import { getCollection } from "@/db/receiving/getCollection";
import { getItemList } from "@/db/receiving/getItemList";
import { updateCollection } from "@/db/updating/updateCollection";
import ItemList from "@/item-list";
import ItemModal from "@/item-modal";
import Loader from "@/loader";
import { ICollection, IItem } from "@/types";
import WarningModal from "@/warning-modal";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Tag,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FlattenMaps } from "mongoose";
import { useEffect, useState } from "react";
import { Form, SubmitHandler, useForm } from "react-hook-form";

interface CollectionProps {
  id: string;
}

type FormValues = {
  title: string;
  description: string;
};

const Collection = ({ id }: CollectionProps) => {
  const [collection, setCollection] = useState<ICollection>();
  const [loading, setLoading] = useState(true);
  const [itemList, setItemList] = useState<IItem[]>([]);
  const [editedCollection, setEditedCollection] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  const { register, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: {
      title: collection?.title,
      description: collection?.description,
    },
  });

  useEffect(() => {
    const formValues = getValues();
    const isChanged =
      formValues.title !== collection?.title ||
      formValues.description !== collection?.description;
    setIsFormChanged(isChanged);
  }, [getValues, collection]);

  const itemModalDisclosure = useDisclosure();
  const warningModalDisclosure = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collection = await getCollection(id);
        setCollection(collection);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditCollection = () => {
    setEditedCollection(!editedCollection);
  };

  const handleDeleteCollection = (id: string) => {
    deleteCollection(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listData: (FlattenMaps<any> & Required<{ _id: unknown }>)[] =
          await getItemList(id);

        const processedList: IItem[] = listData.map((item) => {
          return {
            collectionId: String(item.collectionId),
            name: String(item.name),
            tagsId: item.tagsId.map(String),
            _id: String(item._id),
            description: item.description
              ? String(item.description)
              : undefined,
          };
        });

        setItemList(processedList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (isFormChanged) {
        const updatedCollection = await updateCollection(data, id);
        setCollection(updatedCollection);
        setEditedCollection(false);
      } else {
        setEditedCollection(false);
      }
    } catch (error) {
      console.error("Error adding new collection:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap="10px">
            <Flex justifyContent="space-between">
              {editedCollection ? (
                <Input
                  defaultValue={collection?.title}
                  {...register("title")}
                ></Input>
              ) : (
                <Heading size="lg">{collection?.title}</Heading>
              )}
              <Flex gap="4px">
                <IconButton
                  aria-label="Edit Collection"
                  icon={<EditIcon />}
                  onClick={handleEditCollection}
                />
                <IconButton
                  aria-label="Delete Collection"
                  icon={<DeleteIcon />}
                  onClick={warningModalDisclosure.onOpen}
                />
              </Flex>
            </Flex>

            {editedCollection ? (
              <Textarea
                height="auto"
                resize="vertical"
                defaultValue={collection?.description}
                {...register("description")}
              />
            ) : (
              <Text fontSize="md">{collection?.description}</Text>
            )}

            {editedCollection && (
              <Button type="submit" mb="10px">
                Save
              </Button>
            )}

            <Box>
              <Tag fontSize="sm">{collection?.category}</Tag>
            </Box>
          </Flex>
        </form>

        <Flex justifyContent="flex-end">
          <Button
            rightIcon={<AddIcon />}
            onClick={itemModalDisclosure.onOpen}
            mb="10px"
          >
            Add item
          </Button>
        </Flex>
        <ItemList itemList={itemList} />
      </Box>

      <ItemModal
        isOpen={itemModalDisclosure.isOpen}
        onClose={itemModalDisclosure.onClose}
        id={id}
        setItemList={setItemList}
      />
      <WarningModal
        isOpen={warningModalDisclosure.isOpen}
        onClose={warningModalDisclosure.onClose}
        id={id}
        deletionFunction={() => handleDeleteCollection(id)}
      />
    </>
  );
};

export default Collection;
