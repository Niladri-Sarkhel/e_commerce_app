import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { transformProduct } from "./transformers/product.transformer.js";

// Import actual structural Mongoose models from your source configuration layout
import { Brand } from "../../src/models/Brand.js";
import { Category } from "../../src/models/Category.js";
import { Product } from "../../src/models/Product.js";
import { connectDB } from "../../src/config/mongodb.js"; // Ensure correct path to your connection string file

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("📦 Database connected successfully...");

    // Wipe old execution data sets cleanly
    await Product.deleteMany({});
    await Brand.deleteMany({});
    await Category.deleteMany({});
    console.log("🧹 Collection space wiped clean.");

    // Load data payload from target directory safely
    const rawDataPath = path.resolve("./data/phone_data.json");
    const rawData = JSON.parse(fs.readFileSync(rawDataPath, "utf-8"));
    console.log(`📖 Loaded ${rawData.length} records into parser buffer.`);

    // 1. Gather distinctive Brands and create references
    const uniqueBrands = [
      ...new Set(rawData.map((item) => item.brand).filter(Boolean)),
    ];
    const brandDocs = await Brand.insertMany(
      uniqueBrands.map((name) => ({ name })),
    );
    const brandMap = brandDocs.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: curr._id }),
      {},
    );
    console.log(
      `✅ Dynamically seeded ${brandDocs.length} brand relationships.`,
    );

    // 2. Mock or create baseline Categories
    const categoriesList = [{ name: "Smartphones", slug: "smartphones" }];
    const categoryDocs = await Category.insertMany(categoriesList);
    const categoryMap = categoryDocs.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: curr._id }),
      {},
    );

    // 3. Transform and seed products safely bulk style
    const parsedProducts = [];
    for (const rawItem of rawData) {
      try {
        const transformed = transformProduct(rawItem, brandMap, categoryMap);
        parsedProducts.push(transformed);
      } catch (err) {
        console.error(
          `❌ Data transform error skipped for item: ${rawItem.model}. Reason:`,
          err.message,
        );
      }
    }

    console.log(
      `⏳ Committing ${parsedProducts.length} items to database catalog execution...`,
    );
    await Product.insertMany(parsedProducts);
    console.log("🎉 Database collection successfully seeded!");

    process.exit(0);
  } catch (error) {
    console.error(
      "💥 Execution halted during execution lifecycle phase:",
      error,
    );
    process.exit(1);
  }
};

seedDatabase();
