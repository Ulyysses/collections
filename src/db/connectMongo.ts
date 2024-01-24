import mongoose from "mongoose";
import { collectionSchema, itemSchema, tagSchema, userSchema } from "./schemes";

const uri = `mongodb+srv://SaninaUlyana:${process.env.MONGODB_PASSWORD}@collections.zfhzge0.mongodb.net/collections`;

export const connectionMongo = mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

export const collection_list =
  mongoose.models.collection_list ||
  mongoose.model("collection_list", collectionSchema, "collection_list");

export const item_list =
  mongoose.models.item_list ||
  mongoose.model("item_list", itemSchema, "item_list");

export const tag_list =
  mongoose.models.tag_list || mongoose.model("tag_list", tagSchema, "tag_list");

export const users_base =
  mongoose.models.users_base ||
  mongoose.model("users_base", userSchema, "users_base");
