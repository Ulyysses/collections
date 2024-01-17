"use server";

import { collection_list, connectionMongo } from "./connectMongo";

export const getCollectionList = async () => {
  try {
    await connectionMongo;
    return await await collection_list.find({}).exec();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
