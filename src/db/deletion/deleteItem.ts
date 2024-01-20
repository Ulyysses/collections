"use server";

import { connectionMongo, item_list } from "../connectMongo";

export const deleteItem = async (id: string) => {
  try {
    await connectionMongo;
    return await item_list.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
