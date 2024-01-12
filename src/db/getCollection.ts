"use server";

import { client } from "./connectMongo";

export const getCollection = async (id: string) => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("collection_list");

    const query = { _id: id };

    return await collection.findOne({}, { _id: id });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.close();
  }
};
