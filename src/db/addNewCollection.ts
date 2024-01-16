"use server";

import { client } from "./connectMongo";

interface NewCollection {
  title: string;
  description: string;
  category: string;
}

export const addNewCollection = async (newCollection: NewCollection) => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("collection_list");

    await collection.insertOne(newCollection);

    console.log("New collection added to MongoDB:", newCollection);
  } catch (error) {
    console.error("Error adding new collection:", error);
  } finally {
    await client.close();
  }
};
