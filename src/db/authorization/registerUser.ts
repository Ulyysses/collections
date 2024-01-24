"use server";

import { connectionMongo, users_base } from "../connectMongo";

export const registerUser = async (data) => {
  try {
    await connectionMongo;
    return await users_base.create(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
