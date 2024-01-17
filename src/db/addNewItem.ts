"use server";

import { connectionMongo, item_list } from "./connectMongo";
import { IItem } from "@/types";

export const addNewItem = async (newItem: IItem) => {
  try {
    await connectionMongo;
    const collection = await item_list.create(newItem);
    await collection.save().then((savedItem: IItem) => {
      console.log(
        "🚀 ~ file: addNewItem.ts:45 ~ awaitcollection.save ~ savedItem:",
        savedItem
      );
    });

    console.log("New item added to MongoDB:", newItem);
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};
