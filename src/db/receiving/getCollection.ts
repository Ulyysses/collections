"use server";

import { collection_list, connectionMongo } from "../connectMongo";

export const getCollection = async (id: string) => {
  try {
    await connectionMongo;
    const collection = await collection_list.findById(id).lean();
    return collection;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
