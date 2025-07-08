"use server";

import type { Product, Variant, VariantFormData } from "@/lib/types";
import { productFormDataSchema, Image } from "@/lib/types";
import { slugify, tryCatch } from "@/lib/utils";

export async function getProducts({
  categoryId,
  categorySlug,
}: {
  categoryId?: string;
  categorySlug?: string;
} = {}) {
  const url = categoryId
    ? `${process.env.API_URI}/products?categoryId=${categoryId}`
    : categorySlug
      ? `${process.env.API_URI}/products?categorySlug=${categorySlug}`
      : `${process.env.API_URI}/products`;

  const [fetchError, fetchResponse] = await tryCatch(fetch(url));

  if (fetchError || !fetchResponse || !fetchResponse.ok) {
    console.error(fetchError?.message);
    throw new Error("Could not fetch products");
  }

  const [parseError, productsData] = await tryCatch(fetchResponse.json());

  if (parseError || !productsData || !productsData.products) {
    console.error(parseError?.message);
    throw new Error("Could not parse products data");
  }

  return { products:productsData.products as Product[]};
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

  return {product: productData.product as Product};
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const categoryId = formData.get("categoryId") as string;
  const variantType = formData.get("variantType") as string;
  const variantsRaw = formData.get("variants") as string;

  if (!name || !brand || !categoryId || !variantType || !variantsRaw) {
    throw new Error("Missing required product fields.");
  }

  const [parseError, variantInput] = await tryCatch(
    Promise.resolve(JSON.parse(variantsRaw))
  );
  if (parseError || !variantInput) {
    throw new Error("Invalid variants data format.");
  }

  const imageFiles = formData.getAll("images") as File[];
  if (imageFiles.length === 0) {
    throw new Error("At least one image is required.");
  }

  const images: Image[] = [];
  for (const file of imageFiles) {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const [fetchError, fetchResponse] = await tryCatch(
      fetch(`${process.env.API_URI}/imagekit/upload`, {
        method: "POST",
        body: uploadFormData,
      })
    );

    if (fetchError || !fetchResponse || !fetchResponse.ok) {
      console.error("Image upload error:", fetchError);
      throw new Error("Failed to upload images.");
    }

    const [parseUploadError, parseResult] = await tryCatch(fetchResponse.json());
    if (parseUploadError || !parseResult) {
      console.error("Error parsing image upload response:", parseUploadError);
      throw new Error("Failed to process image upload response.");
    }

    images.push({
      url: parseResult.url,
      alt: parseResult.alt || name,
    });
  }

  const prices = new Set<number>();
  variantInput.forEach((v: VariantFormData) => prices.add(v.price || 0));
  const affectsPrice = prices.size > 1;

  const variantOption = {
    name: variantType,
    affectsPrice,
    values: variantInput.map((v: VariantFormData) => v.value),
  };

  const variants: Variant[] = variantInput.map(
    (v: VariantFormData, index: number) => {
      const sku = [
        brand.replace(/\s+/g, "").toUpperCase(),
        name.replace(/\s+/g, "").toUpperCase(),
        variantOption.name.replace(/\s+/g, "").toUpperCase(),
        v.value.replace(/\s+/g, "").toUpperCase(),
        index,
      ].join("-");

      return {
        sku,
        values: { [variantOption.name]: v.value },
        currPrice: v.price || 0,
        originalPrice: v.discount ? (v.price || 0) + v.discount : v.price || 0,
        isDefault: v.isDefault,
      };
    }
  );

  const product = {
    slug: slugify(`${brand}-${name}`),
    name,
    brand,
    category: categoryId,
    images,
    variantOptions: [variantOption],
    variants,
  };

  const [savingProductError, savingProductResponse] = await tryCatch(
    fetch(`${process.env.API_URI}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
  );

  if (savingProductError || !savingProductResponse || !savingProductResponse.ok) {
    console.error("Product saving error:", savingProductError);
    throw new Error("Failed to save product to server.");
  }

  return { message: "Product saved successfully." };
}
