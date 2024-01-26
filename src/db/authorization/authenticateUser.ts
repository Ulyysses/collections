"use server";

import { IUser } from "@/types";
import { connectionMongo, users_base } from "../connectMongo";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const authenticateUser = async (data: IUser) => {
  try {
    await connectionMongo;
    const user = await users_base.findOne({ email: data.email });
    if (!user) {
      return console.log("User does not exist");
    }
    const validPassword = await bcryptjs.compare(data.password, user.password);
    if (!validPassword) {
      return console.log("Invlid password");
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    
    return {
      tokenData,
      message: "Login successful",
      success: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
