"use server"

import { Category, categorySchema } from "@/lib/types";
import { buildNestedCategories, tryCatch } from "@/lib/utils";


export async function getCategories({ nested }: { nested: boolean } = { nested: false }) {
    const [fetchError, fetchResponse] = await tryCatch(fetch(`${process.env.API_URI}/categories`));

    if (fetchError || !fetchResponse) {
        console.error(fetchError?.message);
        throw new Error("Could not fetch categories");
    }

    const [parseError, categoriesData] = await tryCatch(fetchResponse.json());

    if (parseError || !categoriesData || !categoriesData.categories) {
        console.error(parseError?.message);
        throw new Error("Could not parse categories data");
    }

    if (nested) {
        const categories = buildNestedCategories(categoriesData.categories);

        return { categories };
    }

    return { categories: categoriesData.categories }

}

export async function getCategory({
    categoryId,
    categorySlug
}: {
    categoryId?: string;
    categorySlug?: string;
}) {
    if (!categoryId && !categorySlug) {
        throw new Error("CategoryId or CategorySlug is missing");
    }

    const endpoint = categoryId
        ? `${process.env.API_URI}/categories/${categoryId}`
        : `${process.env.API_URI}/categories/slug/${categorySlug}`;

    const [fetchError, fetchResponse] = await tryCatch(fetch(endpoint, {
        cache: "no-store"
    }));

    if (fetchError || !fetchResponse) {
        console.error("Fetch Category Error", fetchError);
        throw new Error(`Could not fetch Category with slug: ${categorySlug}`);
    }

    const [parseError, categoryData] = await tryCatch(fetchResponse.json());

    if (parseError || !categoryData || !categoryData.category) {
        console.error(parseError?.message);
        throw new Error(`Invalid category data received for slug: ${categorySlug}`);
    }

    return { category: categoryData.category as Category };
}

export async function getSubCategories({
    categoryId,
    categorySlug
}: {
    categoryId?: string;
    categorySlug?: string;
}) {
    if (!categoryId && !categorySlug) {
        throw new Error("CategoryId or CategorySlug is missing");
    }

    const [fetchError, fetchResponse] = await tryCatch(fetch(`${process.env.API_URI}/categories`));

    if (fetchError || !fetchResponse || !fetchResponse.ok) {
        console.error(fetchError?.message);
        throw new Error("Could not fetch categories");
    }

    const [parseError, categoriesData] = await tryCatch(fetchResponse.json());

    if (parseError || !categoriesData || !categoriesData.categories) {
        console.error(parseError?.message);
        throw new Error("Could not parse categories data");
    }

    const categories: Category[] = categoriesData.categories;

    if (!categoryId && categorySlug) {
        const result = await getCategory({ categorySlug });

        if (!result || !result.category) {
            throw new Error("Could not get category");
        }

        const subCategories = categories.filter((c) => c.parentId === result.category.id);

        return { subCategories };
    } else {
        const subCategories = categories.filter((c) => c.parentId === categoryId);

        return { subCategories };
    }
}
