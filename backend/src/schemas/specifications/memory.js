// src/schemas/product/specifications/memory.schema.js

import mongoose from "mongoose";

export const memorySchema = new mongoose.Schema(
  {
    ramGb: Number,

    storageOptionsGb: {
      type: [Number],
      default: [],
    },

    expandable: {
      supported: {
        type: Boolean,
        default: false,
      },

      type: String,

      maxGb: Number,

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
