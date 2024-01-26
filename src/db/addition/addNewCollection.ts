"use server";

import { ICollection } from "@/types";
import { collection_list, connectionMongo } from "../connectMongo";

export const addNewCollection = async (newCollection: ICollection) => {
  try {
    await connectionMongo;
    const collection = await collection_list.create(newCollection);
    const savedCollection = await collection.save();
    const savedCollectionPlain = savedCollection.toObject();
    return savedCollectionPlain;
  } catch (error) {
    console.error("Error adding new collection:", error);
  }
};
