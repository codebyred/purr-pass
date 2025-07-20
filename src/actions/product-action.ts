"use server"
import type { Product, Variant, VariantFormData } from "@/lib/types";
import { Image } from "@/lib/types";
import { tryCatch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
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

  console.log(process.env.API_URI, "KKKKK")
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


    if (fetchError) {
      console.log(fetchError.message);
      throw fetchError;
    } else if (!fetchResponse) {
      console.error(`did not receive response for operation POST /product`)
      throw new Error("Could not fetch products");
    } else if(!fetchResponse.ok) {
      const body = await fetchResponse.json();
      console.error(body.error as string)
      throw new Error(body.error as string);
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

  if (savingProductError) {
    console.error(savingProductError.message);
    throw savingProductError;
  } else if (!savingProductResponse) {
    const message = "No reponse after operation POST /products"
    console.error(message);
    throw new Error(message);
  } else if (!savingProductResponse.ok) {
    const message = await savingProductResponse.json();
    console.error(message);
    throw new Error(message);
  }

  const message = await savingProductResponse.json();
  return { message: message as string };
}

export async function createVariantValue(formData: FormData) {

  const name = formData.get("name") as string;

  console.log(name, "lalalal")

  const [savingVariantError, savingVariantResponse] = await tryCatch(
    fetch(`${process.env.API_URI}/variant-value`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
  );

  if (savingVariantError) {
    console.error(savingVariantError.message);
    throw savingVariantError;
  } else if (!savingVariantResponse) {
    const message = "No reponse after operation POST /products"
    console.error(message);
    throw new Error(message);
  } else if (!savingVariantResponse.ok) {
    const message = await savingVariantResponse.json();
    console.error(message);
    throw new Error(message);
  }

  const body = await savingVariantResponse.json();

  revalidatePath("/admin/product/create")

  return { ...body }
}

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

  if (fetchError) {
    console.error(fetchError.message);
    throw fetchError;
  } else if (!fetchResponse) {
    console.error(`did not receive response for operation POST /product`)
    throw new Error("Could not fetch products");
  } else if (!fetchResponse.ok) {
    const body = await fetchResponse.json();
    throw new Error(body.error as string);
  }

  const [parseError, productsData] = await tryCatch(fetchResponse.json());

  if (parseError) {
    console.error(parseError.message);
    throw parseError;
  } else if (!productsData) {
    const message = "could not parse api response body"
    console.error(message)
    throw new Error(message);
  } else if (productsData.error) {
    console.error(productsData.error)
    throw new Error(productsData.error);
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

export async function getVariantValues() {
  const [fetchError, fetchResponse] = await tryCatch(fetch(`${process.env.API_URI}/variant-value`));

  if (fetchError) {
    console.log(fetchError.message);
    throw fetchError;
  } else if (!fetchResponse) {
    console.error(`did not receive response for operation POST /variant-value`)
    throw new Error("Could not fetch products");
  } else if(!fetchResponse.ok) {
    const body = await fetchResponse.json();
    console.error(body.error as string)
    throw new Error(body.error as string);
  }
  
  const body = await fetchResponse.json();

  revalidatePath("/admin/product/create")

  return { variantValues: body.variantValues}

}
