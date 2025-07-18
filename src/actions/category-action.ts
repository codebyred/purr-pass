"use server"

import { tryCatch } from "@/lib/utils";
import slugify from "slugify";

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    const parentId = formData.get("parentId") as string;
    const featured = formData.get("featured") as string;

    const imageFile = formData.get("image") as File;
    if (imageFile.length === 0) {
        throw new Error("At least one image is required.");
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", imageFile);

    const [imageUploadError, imageUploadResult] = await tryCatch(
        fetch(`${process.env.API_URI}/image/upload`, {
            method: "POST",
            body: uploadFormData,
        })
    );

    if (imageUploadError) {
        console.log(imageUploadError.message);
        throw imageUploadError;
    } else if (!imageUploadResult) {
        console.error(`did not receive response for operation POST /product`)
        throw new Error("Could not fetch products");
    } else if (!imageUploadResult.ok) {
        const body = await imageUploadResult.json();
        console.error(body.error as string)
        throw new Error(body.error as string);
    }

    const [imageError, image] = await tryCatch(imageUploadResult.json());

    if (imageError) {
        console.error(imageError?.message);
        throw imageError
    } else if (!image) {
        const message = "Api response contains no image"
        console.error(message);
        throw new Error(message)
    } else if (!image.url || !image.alt) {
        const message = "image body does not contain required properties"
        console.error(message)
        throw new Error(message);
    }

    let category: {
        slug: string;
        name: string;
        image: any;
        parentId?: string;
    } = {
        slug: slugify(name),
        name,
        image,
    };

    if (parentId) {
        category.parentId = parentId;
    }

    const [saveError, saved] = await tryCatch(fetch(`${process.env.API_URI}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
    }))

    if (saveError) {
        console.error(saveError.message);
        throw saveError;
    } else if (!saved) {
        const message = "No reponse from api after request to POST /api/v1/category"
        console.error(message);
        throw new Error(message);
    } else if (!saved.ok) {
        const body = await saved.json();
        console.error(body.error);
        throw new Error(body.error);
    }

    const body = await saved.json();
    return { message: body.message }

}
/*
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
  image:imageSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
*/
