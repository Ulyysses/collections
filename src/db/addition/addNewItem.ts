"use server";

import { connectionMongo, item_list } from "../connectMongo";
import { IItem } from "@/types";

export const addNewItem = async (newItem: IItem) => {
  try {
    await connectionMongo;
    return JSON.parse(JSON.stringify(await item_list.create(newItem)));
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};
