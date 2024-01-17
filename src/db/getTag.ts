"use server";

import { connectionMongo, tag_list } from "./connectMongo";

interface Tag {
  _id: string;
  tagName: string;
}

export const getTag = async (id: string): Promise<string | undefined> => {
  try {
    await connectionMongo;
    const tagDocument = await tag_list.findById(id).lean() as Tag | null;
    return tagDocument?.tagName;
  } catch (error) {
    console.error(error);
    throw error;
  } 
};

