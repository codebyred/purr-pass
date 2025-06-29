"use server"

import { Product, ProductData, ProductFormData } from "@/lib/types";
import { readFile } from "fs/promises"


export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  const fileContent = await readFile("products.json", "utf-8");
  const data = JSON.parse(fileContent);

  const products: Product[] = data.products.filter(
    (product: Product) => product.category.id === categoryId
  );

  return products;
}

export async function getProductById(productId: string): Promise<Product | undefined> {
  const fileContent = await readFile("products.json", "utf-8");
  const data: ProductData = JSON.parse(fileContent);

  const product: Product | undefined = data.products.find(
    (product: Product) => product.id === productId
  );

  return product;
}

export async function createProduct(productFormData: FormData) {
  try{

  }catch(err:unknown){
    return 
  }
}