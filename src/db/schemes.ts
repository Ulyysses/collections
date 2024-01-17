import mongoose from "mongoose";

export const tagSchema = new mongoose.Schema({
  tagName: String,
});

export const itemSchema = new mongoose.Schema({
  collectionId: String,
  name: String,
  tagsId: [String],
});

export const collectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
});
