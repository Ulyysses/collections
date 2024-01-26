"use server";

import { connectionMongo, item_list } from "../connectMongo";

export const getItem = async (id: string) => {
  try {
    await connectionMongo;
    return await item_list.findById(id).lean();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
