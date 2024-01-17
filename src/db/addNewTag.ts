"use server";

import { ITag } from "@/types";
import { connectionMongo, tag_list } from "./connectMongo";

export const addNewTag = async (newTag: string) => {
  try {
    await connectionMongo;
    const collection = await tag_list.create(newTag);
    return await collection.save().then((savedTag: ITag) => {
      console.log("🚀 ~ file: addNewTag.ts:39 ~ awaitcollection.save ~ savedTag:", savedTag)
      
    });
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};
