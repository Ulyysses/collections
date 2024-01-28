"use server";

import { connectionMongo, item_list } from "../connectMongo";

export const getItem = async (id: string) => {
  try {
    await connectionMongo;
    return JSON.parse(JSON.stringify(await item_list.findById(id)));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
