"use server"

import { Product } from "@/db/schema";
import { productFormDataSchema } from "@/lib/types";
import { generateSku, slugify } from "@/lib/utils";
import { readFile } from "fs/promises"


export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  const fileContent = await readFile("products.json", "utf-8");
  const data = JSON.parse(fileContent);

  const products: Product[] = data.products.filter(
    (product: Product) => product.category?.categoryId === categoryId
  );

  return products;
}

export async function getProductById(productId: string): Promise<Product | undefined> {
  const fileContent = await readFile("products.json", "utf-8");
  const data = JSON.parse(fileContent);

  const product: Product | undefined = data.products?.find(
    (product: Product) => product.productId === productId
  );

  return product;
}

export async function createProduct(formData: FormData) {

  const result = productFormDataSchema.safeParse(formData);

  if(!result.success) {
    return {
      error: "Invalid form data format"
    }
  }

  const productFormData = result.data;

  const productId = slugify(productFormData.name);

  const prices = productFormData.variants.map((v) => v.price ?? 0);
  const affectsPrice = new Set(prices).size > 1;

  const variants = productFormData.variants.map((variant, index) => ({
    sku: generateSku(productFormData, [variant.value]),
    values: {
      [productFormData.variantType]: variant.value,
    },
    currPrice: variant.price ?? 0,
    originalPrice: variant.price ?? 0,
    isDefault: variant.isDefault,
  }));

  const variantOptions = [
    {
      name: productFormData.variantType,
      affectsPrice,
      values: productFormData.variants.map((v) => v.value),
    },
  ];

  const product = {
    id: productId,
    name: productFormData.name,
    brand: productFormData.brand,
    category: {
      id: productFormData.categoryId,
      name: "",
    },
    images: [],
    variantOptions,
    variants,
  };
}