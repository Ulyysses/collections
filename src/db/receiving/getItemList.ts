"use server";

import { connectionMongo, item_list } from "../connectMongo";

export const getItemList = async (id: string) => {
  try {
    await connectionMongo;
    const query = { collectionId: id };
    const items = JSON.parse(JSON.stringify(await item_list.find(query)));
    return items;
  } catch (error) {
    console.log(error);
    throw error;
  }
};