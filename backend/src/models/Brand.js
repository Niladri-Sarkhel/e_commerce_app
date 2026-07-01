import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

brandSchema.index({ name: 1 }, { unique: true });
brandSchema.index({ slug: 1 }, { unique: true });

export const Brand = mongoose.model("Brand", brandSchema, "brands");
