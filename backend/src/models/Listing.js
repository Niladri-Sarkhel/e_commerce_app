import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  },
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
