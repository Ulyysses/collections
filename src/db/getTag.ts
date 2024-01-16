"use server";

import { client } from "./connectMongo";

export const getTag = async (tagValue: string) => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("tag_list");

    return await collection.findOne({}, { tagValue: tagValue });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.close();
  }
};
