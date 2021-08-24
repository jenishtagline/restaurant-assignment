import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    price: {
      type:Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);



export interface ProductSchema {
  name: String,
  price: String,
  image: String,
  category: String,
  createdAt:Date,
  updatedAt:Date
}

