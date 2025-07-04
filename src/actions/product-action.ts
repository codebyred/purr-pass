"use server"

import type { Product } from "@/lib/types";
import { productFormDataSchema, Image } from "@/lib/types";
import { generateSku, slugify, tryCatch } from "@/lib/utils";

export async function getProducts({
  categoryId,
  categorySlug
}: {
  categoryId?: string;
  categorySlug?: string;
}) {
  const url = categoryId
    ? `${process.env.API_URI}/products?categoryId=${categoryId}`
    : categorySlug
      ? `${process.env.API_URI}/products?categorySlug=${categorySlug}`
      : `${process.env.API_URI}/products`;

  const [fetchError, fetchResponse] = await tryCatch(fetch(url));

  if (fetchError || !fetchResponse) {
    console.error(fetchError?.message);
    return {
      error: "Could not fetch products"
    };
  }

  const [parseError, productsData] = await tryCatch(fetchResponse.json());

  if (parseError || !productsData) {
    console.error(parseError?.message);
    return {
      error: "Could not parse products data"
    };
  }

  return {
    products: productsData as Product[]
  };
}


export async function getProduct({
  productId,
  productSlug
}: {
  productId?: string
  productSlug?: string
}) {

  const [fetchError, fetchResponse] = await tryCatch(fetch(`${process.env.API_URI}/products/${productId}`))

  if (fetchError || !fetchResponse) {
    console.error("Fetch Product Error", fetchError);
    return {
      error: `Could not fetch Product with id: ${productId}`,
    }
  }

  const productData = JSON.parse(fetchResponse.body?.toString() ?? "");

  if (!productData || typeof productData !== "object" || !productData.id) {
    return {
      error: `Invalid product data received for id: ${productId}`,
    };
  }

  return {
    product: productData as Product,
  };
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const imageFiles = formData.getAll("images") as File[];

  const images: Image[] = [];

  for (const file of imageFiles) {
    const formData = new FormData();
    formData.append("file", file);

    const [fetchError, fetchResponse] = await tryCatch(
      fetch(`${process.env.API_URI}/imagekit/upload`,
        { method: "POST", body: formData }
      )
    );

    if (fetchError || !fetchResponse || !fetchResponse.ok) {
      continue;
    }

    const [parseError, parseResult] = await tryCatch(fetchResponse?.json());

    if (parseError || !parseResult) {
      continue;
    }

    images.push(parseResult)
  }

  console.log(images)
}