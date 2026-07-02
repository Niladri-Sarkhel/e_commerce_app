import mongoose from "mongoose";
import { pricingSchema } from "../schemas/listing/pricing.js";
import { inventorySchema } from "../schemas/listing/inventory.js";
import { shippingSchema } from "../schemas/listing/shipping.js";
import { statusSchema } from "../schemas/listing/status.js";

const listingSchema = new mongoose.Schema(
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
    collection: "listings",
  },
);

// Compound indexing to guarantee a single seller can't list the exact same product twice
listingSchema.index({ sellerId: 1, productId: 1 }, { unique: true });

export const Listing = mongoose.model("Listing", listingSchema);
