"use server";

import { collection_list, connectionMongo } from "../connectMongo";

export const updateCollection = async (data: {
  title: string;
  description: string;
}, id: string) => {
  try {
    await connectionMongo;
    return await collection_list.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
