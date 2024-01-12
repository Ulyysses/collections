"use server";

import { client } from "./connectMongo";

export const getItemList = async (collectionId: string) => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("item_list");

    const query = { collectionId: collectionId };

    return await collection.find(query).toArray();
  } finally {
    await client.close();
  }
};
