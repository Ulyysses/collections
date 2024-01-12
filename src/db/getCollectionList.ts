"use server";

import { client } from "./connectMongo";

export const getCollectionList = async () => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("collection_list");

    const query = {};

    return await collection.find(query).toArray();
  } finally {
    await client.close();
  }
};
