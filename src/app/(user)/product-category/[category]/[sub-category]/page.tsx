import { getProducts } from "@/actions/product-action";
import ProductCard from "@/components/user/product-card";
import { tryCatch } from "@/lib/utils";
import React from "react";

type PageProps = {
    params: {
        category: string;
        "sub-category": string;
    }
}

export default async function SubCategoryPage(props: PageProps) {

    const { "sub-category": subCategory } = props.params;

    const [error, result] = await tryCatch(getProducts({categorySlug:subCategory}));

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
            {
                !error && result && result.products
                && result.products?.map((product, index) => (
                    <React.Fragment key={index}>
                        <ProductCard
                            product={product}
                        />
                    </React.Fragment>
                ))
            }
        </div>
    )
}