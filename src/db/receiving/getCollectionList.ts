"use server";

import { collection_list, connectionMongo } from "../connectMongo";

export const getCollectionList = async () => {
  try {
    await connectionMongo;
    const collections = await collection_list.find({}).lean().exec();
    return collections;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
