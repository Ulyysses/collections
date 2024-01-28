"use server";

import { ITag } from "@/types";
import { connectionMongo, tag_list } from "../connectMongo";

export const addNewTag = async (newTag: string) => {
  try {
    await connectionMongo;
    const tagObject = { tagName: newTag };
    return JSON.parse(JSON.stringify(await tag_list.create(tagObject)))
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};
