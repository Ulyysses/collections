"use server";

import { ITag } from "@/types";
import { connectionMongo, tag_list } from "../connectMongo";

export const getTag = async (id: string): Promise<string | undefined> => {
  try {
    await connectionMongo;
    const tagDocument = await tag_list.findById(id).lean() as ITag | null;
    return tagDocument?.tagName;
  } catch (error) {
    console.error(error);
    throw error;
  } 
};

