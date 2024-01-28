"use server";

import { collection_list, connectionMongo } from "../connectMongo";

export const getCollectionList = async () => {
  try {
    await connectionMongo;
    const collections = JSON.parse(JSON.stringify(await collection_list.find({})));
    return collections;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
