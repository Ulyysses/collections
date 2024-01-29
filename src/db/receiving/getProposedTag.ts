"use server";

import { ITag } from "@/types";
import { connectionMongo, tag_list } from "../connectMongo";

export const getProposedTag = async (tagValue: string) => {
  try {
    await connectionMongo;
    const regex = new RegExp(`^${tagValue}`, 'i');
    const query = { tagName: regex };
    const tags = JSON.parse(JSON.stringify(await tag_list.find(query)));
    const tagNames = tags.map((tag: ITag) => tag.tagName);
    return tagNames;
  } catch (error) {
    console.error(error);
    throw error;
  } 
};

