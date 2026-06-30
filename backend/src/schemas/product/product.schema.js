import mongoose from "mongoose";

import {
  identitySchema,
  catalogSchema,
  specificationsSchema,
  mediaSchema,
  metadataSchema,
} from "./index.js";

export const productSchema = new mongoose.Schema(
  {
    identity: identitySchema,
    catalog: catalogSchema,
    specifications: specificationsSchema,
    media: mediaSchema,
    metadata: metadataSchema,
  },
  {
    timestamps: true,
  },
);
