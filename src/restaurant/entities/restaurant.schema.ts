import * as mongoose from 'mongoose';

//Restaurant model Schema
export const RestaurantSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    openingHours: [
      {
        day: String,
        openingTime: String,
        closingTime: String,
      },
    ],
    picture: String,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  { timestamps: true },
);
