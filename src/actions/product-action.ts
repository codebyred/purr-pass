"use server"
import type { Product, Variant, VariantFormData } from "@/lib/types";
import { Image } from "@/lib/types";
import { tryCatch } from "@/lib/utils";
import slugify from "slugify";


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

      console.log(process.env.API_URI,"KKKKK")
  const images: Image[] = [];
  for (const file of imageFiles) {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);



    const [fetchError, fetchResponse] = await tryCatch(
      fetch(`${process.env.API_URI}/image/upload`, {
        method: "POST",
        body: uploadFormData,
      })
    );

    if (fetchError || !fetchResponse || !fetchResponse.ok) {
      if (fetchError) {
        console.log(fetchError.message);
        throw fetchError;
      } else if (!fetchResponse) {
        console.error(`did not receive response for operation POST /product`)
        throw new Error("Could not fetch products");
      } else {
        const body = await fetchResponse.json();
        console.error(body.error as string)
        throw new Error(body.error as string);
      }
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
        stock: v.stock
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
