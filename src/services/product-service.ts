import type { Product, Variant, VariantFormData } from "@/lib/types";
import { Image } from "@/lib/types";
import { tryCatch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function getProducts({
  categoryId,
  categorySlug,
  page
}: {
  categoryId?: string;
  categorySlug?: string;
  page?: number
} = {}) {
  type Result = {
    prev?: {
      page: number,
      limit: number
    },
    next?: {
      page: number,
      limit: number
    },
    products: Product[]
  }

  revalidatePath("/admin/product/list")

  const baseUrl = `${process.env.API_URI}/products`;
  let finalUrl: string = baseUrl;

  if (categoryId) {
    finalUrl = finalUrl.concat(`?categoryId=${categoryId}`)
  } else if (categorySlug) {
    finalUrl = finalUrl.concat(`?categorySlug=${categorySlug}`)
  }
  if (page) {
    finalUrl = finalUrl.concat(`?page=${page}`);
  }

  const [fetchError, fetchResponse] = await tryCatch(fetch(finalUrl, { method: "GET" }));

  if (fetchError || !fetchResponse || !fetchResponse.ok) {

    if (fetchError) {
      console.error(fetchError.message);
      throw fetchError;
    } else if (!fetchResponse) {
      console.error(`did not receive response for operation POST /product`)
      throw new Error("Could not fetch products");
    } else {
      const body = await fetchResponse.json();
      throw new Error(body.error as string);
    }

  }

  const [parseError, productsData] = await tryCatch(fetchResponse.json());

  if (parseError || !productsData || !productsData.products) {
    console.error(parseError?.message);
    if (parseError) {
      console.error(parseError.message);
      throw parseError;
    } else if (!productsData) {
      const message = "could not parse api response body"
      console.error(message)
      throw new Error(message);
    } else if(!productsData.product){
      console.error("response body does not contain products")
      throw new Error("response body does not contain products");
    }else {
      throw new Error("unknown error while parsing api response body")
    }
  }

  const result: Result = {
    products: productsData.products as Product[]
  }

  if (productsData.next) {
    result.next = productsData.next;
  }
  if (productsData.prev) {
    result.prev = productsData.prev;
  }

  return result;
}

export async function getProduct({
  productId,
  productSlug,
}: {
  productId?: string;
  productSlug?: string;
}) {
  if (!productId && !productSlug) {
    throw new Error("ProductId or ProductSlug is required");
  }

  const url = productId
    ? `${process.env.API_URI}/products/${productId}`
    : `${process.env.API_URI}/products/slug/${productSlug}`;

  const [fetchError, fetchResponse] = await tryCatch(fetch(url));

  if (fetchError || !fetchResponse || !fetchResponse.ok) {
    console.error("Fetch Product Error", fetchError);
    throw new Error(`Could not fetch Product`);
  }

  const [parseError, productData] = await tryCatch(fetchResponse.json());

  if (parseError || !productData) {
    console.error(parseError?.message);
    throw new Error(`Invalid product data received`);
  }

  return { product: productData.product as Product };
}
