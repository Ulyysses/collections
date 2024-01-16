"use server";

import { ObjectId } from "mongodb";
import { client } from "./connectMongo";

export const getCollection = async (id: string) => {
  let result
  try {
    await client.connect();
    const database = client.db("collections");
    const collection = database.collection("collection_list");

    const objectId = new ObjectId(id);
    result = await collection.findOne({ _id: objectId });
    
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.close();
  }

  return result;
};
