import mongoose from "mongoose";

import {
  inventorySchema,
  pricingSchema,
  shippingSchema,
  statusSchema,
} from "./index.js";

export const listingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    pricing: {
      type: pricingSchema,
      required: true,
    },

    inventory: {
      type: inventorySchema,
      required: true,
    },

    shipping: {
      type: shippingSchema,
      required: true,
    },

    status: {
      type: statusSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
