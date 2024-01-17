"use server";

import { collection_list, connectionMongo } from "./connectMongo";

export const getCollection = async (id: string) => {
  try {
    await connectionMongo;
    return await collection_list.findById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
