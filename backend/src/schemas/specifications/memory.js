// src/schemas/product/specifications/memory.schema.js

import mongoose from "mongoose";

export const memorySchema = new mongoose.Schema(
  {
    ramMb: Number,

    storageOptionsMb: {
      type: [Number],
      default: [],
    },

    expandable: {
      supported: {
        type: Boolean,
        default: false,
      },

      type: String,

      maxMb: Number,

      dedicatedSlot: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    _id: false,
  },
);
