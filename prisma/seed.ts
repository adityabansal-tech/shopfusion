import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ---- Reference data used to generate 100 varied products ----

const menItems = [
  "Classic Fit Shirt",
  "Casual Polo",
  "Slim Fit Jeans",
  "Cotton T-Shirt",
  "Formal Blazer",
  "Cargo Trousers",
  "Hooded Sweatshirt",
  "Denim Jacket",
  "Linen Shirt",
  "Track Pants",
  "Bomber Jacket",
  "Chino Shorts",
  "Crew Neck Sweater",
  "Windbreaker Jacket",
  "Checked Flannel Shirt",
  "Graphic Print Tee",
  "Formal Trousers",
  "Puffer Jacket",
  "Rugby Shirt",
  "Waistcoat",
  "Kurta",
  "Nehru Jacket",
  "Joggers",
  "Henley Shirt",
  "Overshirt",
];

const womenItems = [
  "Floral Midi Dress",
  "Wrap Top",
  "High-Waist Jeans",
  "Cotton Kurti",
  "A-Line Skirt",
  "Casual Jumpsuit",
  "Cropped Jacket",
  "Silk Blouse",
  "Palazzo Pants",
  "Anarkali Suit",
  "Sleeveless Top",
  "Denim Skirt",
  "Cardigan Sweater",
  "Maxi Dress",
  "Printed Saree",
  "Off-Shoulder Top",
  "Tailored Blazer",
  "Culottes",
  "Peplum Top",
  "Shrug",
  "Co-ord Set",
  "Chiffon Dress",
  "Bodycon Dress",
  "Tunic Top",
  "Palazzo Suit",
];

const brands = [
  "Urban Thread",
  "Nova Wear",
  "Studio Weft",
  "Metro Style",
  "Everyday Co.",
  "Alta Moda",
  "Northline",
  "Cotton Root",
];

const materials = [
  "Cotton",
  "Linen",
  "Polyester Blend",
  "Denim",
  "Silk Blend",
  "Wool Blend",
  "Rayon",
  "Viscose",
];

const colorPalette = [
  { color: "Black", hexCode: "#111111" },
  { color: "White", hexCode: "#f5f5f5" },
  { color: "Navy", hexCode: "#1e3a5f" },
  { color: "Maroon", hexCode: "#6b1f2a" },
  { color: "Beige", hexCode: "#d8c3a5" },
  { color: "Olive", hexCode: "#556b2f" },
  { color: "Mustard", hexCode: "#d4a72c" },
  { color: "Grey", hexCode: "#808080" },
];

const sizeOptions = ["S", "M", "L", "XL", "XXL"];

function pick<T>(arr: T[], i: number): T {
  return arr[((i % arr.length) + arr.length) % arr.length];
}

function rand(min: number, max: number, seed: number): number {
  // simple deterministic pseudo-random based on seed, so re-running seed gives same data
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(frac * (max - min + 1)) + min;
}

async function main() {
  console.log("Start seeding...");

  // ---- Categories ----
  const maleCategory = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "male", description: "Men's clothing" },
  });

  const femaleCategory = await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: "female", description: "Women's clothing" },
  });

  // ---- Demo customer (safe to skip if already exists) ----
  await prisma.customer.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      userAvatarUrl: "https://example.com/avatar.jpg",
    },
  });

function getImageKeyword(name: string, gender: "men" | "women"): string {
  const lower = name.toLowerCase();
  const keywordMap: [string, string][] = [
    ["shirt", "shirt"],
    ["polo", "polo-shirt"],
    ["jeans", "jeans"],
    ["t-shirt", "tshirt"],
    ["tee", "tshirt"],
    ["blazer", "blazer"],
    ["trouser", "trousers"],
    ["sweatshirt", "sweatshirt"],
    ["hoodie", "hoodie"],
    ["jacket", "jacket"],
    ["linen", "linen-shirt"],
    ["track pant", "trackpants"],
    ["bomber", "bomber-jacket"],
    ["short", "shorts"],
    ["sweater", "sweater"],
    ["windbreaker", "windbreaker"],
    ["flannel", "flannel-shirt"],
    ["graphic", "graphic-tshirt"],
    ["puffer", "puffer-jacket"],
    ["rugby", "rugby-shirt"],
    ["waistcoat", "waistcoat"],
    ["kurta", "kurta"],
    ["nehru", "nehru-jacket"],
    ["jogger", "joggers"],
    ["henley", "henley-shirt"],
    ["overshirt", "overshirt"],
    ["dress", "dress"],
    ["wrap top", "blouse"],
    ["kurti", "kurti"],
    ["skirt", "skirt"],
    ["jumpsuit", "jumpsuit"],
    ["blouse", "blouse"],
    ["palazzo", "palazzo-pants"],
    ["anarkali", "anarkali-suit"],
    ["sleeveless", "womens-top"],
    ["cardigan", "cardigan"],
    ["saree", "saree"],
    ["off-shoulder", "womens-top"],
    ["culotte", "culottes"],
    ["peplum", "womens-top"],
    ["shrug", "shrug"],
    ["co-ord", "co-ord-set"],
    ["chiffon", "chiffon-dress"],
    ["bodycon", "bodycon-dress"],
    ["tunic", "tunic"],
  ];

  for (const [key, tag] of keywordMap) {
    if (lower.includes(key)) return tag;
  }

  return gender === "men" ? "mens-fashion" : "womens-fashion";
}

  const buildProducts = (
    items: string[],
    categoryId: number,
    countStart: number,
    total: number,
    gender: "men" | "women"
  ) => {
    const products = [];
    for (let i = 0; i < total; i++) {
      const seedNum = countStart + i;
      const variantSuffix =
        i >= items.length ? ` #${Math.floor(i / items.length) + 1}` : "";
      const name = `${pick(items, i)}${variantSuffix}`;
      const brand = pick(brands, seedNum);
      const material = pick(materials, seedNum + 1);
      const price = rand(699, 4999, seedNum * 7 + 1);
      const cost = Math.round(price * 0.55);
      const keyword = getImageKeyword(name, gender);

      products.push({
        name,
        description: `${name} made from premium ${material.toLowerCase()} by ${brand}. Comfortable everyday wear, perfect for casual and semi-formal occasions.`,
        sellingPrice: price,
        costPrice: cost,
        stockQty: rand(20, 150, seedNum * 3 + 2),
        categoryId,
        brand,
        material,
        originCountry: "India",
        mainImgUrl: `https://loremflickr.com/600/800/${keyword}?lock=${seedNum}`,
      });
    }
    return products;
  };

  const menProducts = buildProducts(menItems, maleCategory.id, 1, 50, "men");
  const womenProducts = buildProducts(
    womenItems,
    femaleCategory.id,
    51,
    50,
    "women"
  );
  const allProducts = [...menProducts, ...womenProducts];

  let createdCount = 0;

  for (let i = 0; i < allProducts.length; i++) {
    const p = allProducts[i];

    const numColors = 2 + (i % 2); // 2 or 3 colors per product
    const colorsForProduct = Array.from({ length: numColors }).map((_, ci) =>
      pick(colorPalette, i + ci)
    );

    const numSizes = 3 + (i % 2); // 3 or 4 sizes per product
    const sizesForProduct = sizeOptions.slice(0, numSizes);

    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        sellingPrice: p.sellingPrice,
        costPrice: p.costPrice,
        stockQty: p.stockQty,
        categoryId: p.categoryId,
        brand: p.brand,
        material: p.material,
        originCountry: p.originCountry,
        mainImgUrl: p.mainImgUrl,
        colors: {
          create: colorsForProduct.map((c) => ({
            color: c.color,
            hexCode: c.hexCode,
            stockQty: rand(10, 60, i + 5),
          })),
        },
        sizes: {
          create: sizesForProduct.map((s) => ({
            size: s,
            stockQty: rand(10, 60, i + 9),
          })),
        },
        features: {
          create: [
            { key: "Fit", value: "Regular" },
            { key: "Care", value: "Machine wash cold" },
          ],
        },
      },
    });

    createdCount++;
  }

  console.log(`Seeding complete. Created ${createdCount} products.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
