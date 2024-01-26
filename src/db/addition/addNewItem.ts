"use server";

import { connectionMongo, item_list } from "../connectMongo";
import { IItem } from "@/types";

export const addNewItem = async (newItem: IItem) => {
  try {
    await connectionMongo;
    const collection = await item_list.create(newItem);
    const savedItem = await collection.save();
    const savedItemPlain = savedItem.toObject();
    return savedItemPlain;
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};
