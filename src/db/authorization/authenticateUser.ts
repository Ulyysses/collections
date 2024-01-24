"use server";

import { connectionMongo, users_base } from "../connectMongo";

interface authenticateUserProps {
  email: string;
  password: string
}

export const authenticateUser = async (data: authenticateUserProps) => {
  try {
    await connectionMongo;
    return await users_base.findOne(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
