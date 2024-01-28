"use server";

import { ICollection } from "@/types";
import { collection_list, connectionMongo } from "../connectMongo";

export const addNewCollection = async (newCollection: ICollection) => {
  try {
    await connectionMongo;
    return JSON.parse(JSON.stringify(await collection_list.create(newCollection)));
  } catch (error) {
    console.error("Error adding new collection:", error);
  }
};
