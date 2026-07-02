import fs from "fs/promises";

// Load your JSON file
const products = JSON.parse(await fs.readFile("./phone_data.json", "utf-8"));

/**
 * Calculates the EAN-13 check digit.
 */
function calculateCheckDigit(ean12) {
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    const digit = Number(ean12[i]);

    // Even positions (from the left, 0-indexed odd human positions)
    if (i % 2 === 0) {
      sum += digit;
    } else {
      sum += digit * 3;
    }
  }

  return (10 - (sum % 10)) % 10;
}

/**
 * Generates a valid EAN-13.
 */
function generateEAN13(serial) {
  // 200–299 is reserved for internal numbering.
  // Perfect for demo projects.
  const prefix = "200";

  // 9 digits after the prefix
  const body = serial.toString().padStart(9, "0");

  const ean12 = prefix + body;

  const checkDigit = calculateCheckDigit(ean12);

  return ean12 + checkDigit;
}

// Add EAN to every product
products.forEach((product, index) => {
  product.ean = generateEAN13(index + 1);
});

// Save
await fs.writeFile(
  "./products_with_ean.json",
  JSON.stringify(products, null, 2),
);

console.log(`Generated ${products.length} unique EAN-13 codes.`);
