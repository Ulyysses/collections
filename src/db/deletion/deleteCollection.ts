"use server";

import { collection_list, connectionMongo } from "../connectMongo";

export const deleteCollection = async (id: string) => {
  try {
    await connectionMongo;
    return await collection_list.deleteOne({ _id: id }).lean();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
