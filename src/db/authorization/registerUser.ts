"use server";

import { IUser } from "@/types";
import { connectionMongo, users_base } from "../connectMongo";
import bcryptjs from "bcryptjs";

export const registerUser = async (data: IUser) => {
  try {
    await connectionMongo;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);
    const userData = {
      email: data.email,
      password: hashedPassword,
      username: data.username,
    };
    return await users_base.create(userData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
