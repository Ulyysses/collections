"use server";

import { ICollection } from "@/types";
import { collection_list, connectionMongo } from "./connectMongo";

export const addNewCollection = async (newCollection: ICollection) => {
  try {
    await connectionMongo;
    const collection = await collection_list.create(newCollection);
    await collection.save().then((savedCollection: ICollection) => {
      console.log(
        "🚀 ~ file: addNewCollection.ts:11 ~ awaitcollection.save ~ savedCollection:",
        savedCollection
      );
    });
  } catch (error) {
    console.error("Error adding new collection:", error);
  }
};
