"use server";

import { ITag } from "@/types";
import { connectionMongo, tag_list } from "../connectMongo";

export const addNewTag = async (newTag: string) => {
  try {
    await connectionMongo;
    const tagObject = { tagName: newTag };
    const createdTag = await tag_list.create(tagObject);
    const savedTag = await createdTag.save().toObject();
    return savedTag;
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};
