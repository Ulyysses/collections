"use server";

import { client } from "./connectMongo";

export const addNewTag = async (newTag: string) => {
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("tag_list");

    await collection.insertOne({
      tagName: newTag,
    });

    console.log("New tag added to MongoDB:", newTag);
  } catch (error) {
    console.error("Error adding new tag:", error);
  } finally {
    await client.close();
  }
};
