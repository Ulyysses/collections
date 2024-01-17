"use server";

import { connectionMongo, tag_list } from "./connectMongo";

export const getTag = async (id: string) => {
  try {
    await connectionMongo;
    const tagDocument = await tag_list.findById(id).lean();
    return tagDocument?.tagName;
  } catch (error) {
    console.error(error);
    throw error;
  } 
};

