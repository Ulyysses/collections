"use server"

import { client } from "./connectMongo";

export const addNewCollection = async () => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("collections-list");

    const newCollection = {
      id: "1",
      title: "Collection of Detective Books",
      category: "Books",
      description:
        "A captivating assortment of detective novels from various authors and eras.",
    };

    await collection.insertOne(newCollection);

    console.log("New collection added to MongoDB:", newCollection);
  } catch (error) {
    console.error("Error adding new collection:", error);
  } finally {
    await client.close();
  }
};
