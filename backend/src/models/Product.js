import mongoose from "mongoose";

import { productSchema } from "#schemas";

// Unique identifiers
productSchema.index({ "identity.gtin": 1 }, { unique: true });
productSchema.index({ "identity.sku": 1 }, { unique: true });
productSchema.index({ "identity.slug": 1 }, { unique: true });

// Common search indexes
productSchema.index({ "identity.brandId": 1 });
productSchema.index({ "catalog.categoryId": 1 });
productSchema.index({ "catalog.status": 1 });

const Product = mongoose.model("Product", productSchema, "products");

export default Product;
