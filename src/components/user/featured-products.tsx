import { getCategories } from "@/actions/category-action";
import CategoryCard from "@/components/user/category-card";
import { Category } from "@/lib/types";
import { tryCatch } from "@/lib/utils";
import React from "react";
import ProductCard from "./product-card";
import { getProducts } from "@/actions/product-action";

const Featured = async() => {

    const [error, featuredProductsData] = await tryCatch(getProducts({featured: true}));

    const featuredProducts = featuredProductsData?.products;

    return (
        <div className="py-2 flex flex-col items-center">
            <h2 className="text-primary font-bold text-xl text-center mb-4">Featured Products</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {
                    featuredProducts && featuredProducts.map((featuredProduct, index) => featuredProduct.featured && (
                        <React.Fragment key={index}>
                            <ProductCard 
                                product={featuredProduct}
                            />
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;