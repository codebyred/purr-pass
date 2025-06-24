"use server"

import { Product, ProductData } from "@/lib/types";
import { readFile } from "fs/promises"


export async function getProducts(category: string): Promise<Product[]> {
  const fileContent = await readFile("products.json", "utf-8");
  const data = JSON.parse(fileContent);

  const products: Product[] = data.products.filter(
    (product: Product) => product.category === category
  );

  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const fileContent = await readFile("products.json", "utf-8");
  const data: ProductData = JSON.parse(fileContent);

  const product: Product | undefined = data.products.find(
    (product: Product) => product.id === id
  );

  return product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const fileContent = await readFile("products.json", "utf-8");
  const data: ProductData = JSON.parse(fileContent);
  return data.products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}