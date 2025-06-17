import CategoryCard from "./category-card";
import React from "react";

const Featured = () => {

    const featuredCategories = ["Cat Toys", "Cat Food", "Bird Cage"]

    return (
        <div className="py-2 flex flex-col items-center">
            <h2 className="text-primary font-bold text-xl text-center mb-4">Featured Categories</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {
                    featuredCategories.map((featured, index) => (
                        <React.Fragment key={index}>
                            <CategoryCard categoryName={featured} index={index}/>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;