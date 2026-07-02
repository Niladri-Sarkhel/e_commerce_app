import { slugify } from "../../utils/slugify.js";

export const parseIdentity = (raw, brandMap) => {
  // Explicitly convert to string to protect numeric model identifiers (like 3, 5, 2007)
  const modelName =
    raw.model !== undefined && raw.model !== null
      ? String(raw.model).trim()
      : "";
  const brandName = raw.brand || "";
  const brandId = brandMap[brandName] || null;

  return {
    gtin:
      raw.ean ||
      `TEMP-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    // Now substring works flawlessly regardless of the raw JSON type
    sku: `${brandName.substring(0, 3).toUpperCase()}-${modelName.substring(0, 3).toUpperCase()}-${raw.ean || "000"}`,
    slug: slugify(`${brandName} ${modelName}`),
    brandId,
    model: modelName,
  };
};
