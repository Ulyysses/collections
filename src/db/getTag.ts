"use server";

import { connectionMongo, tag_list } from "./connectMongo";

export const getTag = async (tagValue: string) => {
  try {
    await connectionMongo;
    return await tag_list.findOne({ tagName: tagValue });
  } catch (error) {
    console.error(error);
    throw error;
  } 
};

