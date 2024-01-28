"use server";

import { collection_list, connectionMongo } from "../connectMongo";

export const getCollection = async (id: string) => {
  try {
    await connectionMongo;
    const collection = JSON.parse(JSON.stringify(await collection_list.findById(id)));
    return collection;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
