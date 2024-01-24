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

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);