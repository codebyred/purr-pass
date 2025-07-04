"use server"

import { buildNestedCategories, tryCatch } from "@/lib/utils"

export default async function getCategories() {
    const [fetchError, fetchResponse] = await tryCatch(fetch(`${process.env.API_URI}/categories`));

    if (fetchError || !fetchResponse) {
        console.error(fetchError?.message);
        return {
            error: "Could not fetch products"
        }
    }

    const [parseError, categoriesData] = await tryCatch(fetchResponse.json());

    if (parseError || !categoriesData) {
        console.error(parseError?.message);
        return {
            error: "Could not parse categories data"
        }
    }

    const categories = buildNestedCategories(categoriesData.categories);

    return {
        categories
    }

}