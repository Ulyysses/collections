"use server";

import { client } from "./connectMongo";

interface NewItem {
  collectionId: string;
  name: string;
  tagsId: string[];
}

export const addNewItem = async (newItem: NewItem) => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("item_list");

    await collection.insertOne(newItem);

    console.log("New item added to MongoDB:", newItem);
  } catch (error) {
    console.error("Error adding new item:", error);
  } finally {
    await client.close();
  }
};
