"use server";

import { connectionMongo, item_list } from "./connectMongo";

export const getItemList = async (collectionId: string) => {
  try {
    await connectionMongo;
    const query = { collectionId: collectionId };
    return await item_list.find(query).lean().exec();
  } catch (error) {
    console.log(error);
    throw error;
  }
};