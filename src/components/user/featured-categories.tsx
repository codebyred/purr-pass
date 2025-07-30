import { getCategories } from "@/actions/category-action";
import CategoryCard from "@/components/user/category-card";
import { Category } from "@/lib/types";
import { tryCatch } from "@/lib/utils";
import React from "react";

const Featured = async() => {

    const [error, featuredCategoriesData] = await tryCatch(getCategories({featured: true}));

    const featuredCategories = featuredCategoriesData?.categories as Category[];

    return (
        <div className="py-2 flex flex-col items-center">
            <h2 className="text-primary font-bold text-xl text-center mb-4">Featured Categories</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {
                    featuredCategories.map((featuredCategory, index) => featuredCategory.featured && (
                        <React.Fragment key={index}>
                            <CategoryCard 
                            categoryImageUrl={featuredCategory.image.url}
                            categoryName={featuredCategory.name} 
                            index={index}/>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;