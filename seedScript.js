import "dotenv/config.js";
import mongoose from "mongoose";
import { Category, Product } from "./src/models/index.js";
import { categories, products } from "./seedData.js";

async function seedDataBase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Category.deleteMany({});
    //insert categories into the table..
    const categoryDocs = await Category.insertMany(categories);
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    const productWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));
    console.log("productWithCategoryIds", productWithCategoryIds);

    await Product.insertMany(productWithCategoryIds);
    console.log("...DATEBASE SEEDED SUCCESSFULLY...");
  } catch (error) {
    console.log("error seed", error);
  } finally {
    mongoose.connection.close();
  }
}
seedDataBase();
