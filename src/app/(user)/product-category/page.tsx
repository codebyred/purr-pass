import CategoryCard from "@/components/user/category-card"
import { flatCategories } from "@/lib/data"
import { buildNestedCategories } from "@/lib/utils"
import React from "react"

export default function ProductCategoryPage() {

    const categories = buildNestedCategories(flatCategories);

    console.log(categories)

    return (
        <div className="flex flex-col">
            {
                categories.map((category, index) => (
                    <div className="mb-8" key={index}>
                        <h1 className="font-semibold text-2xl text-primary text-center mb-4">{category.name}</h1>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-0">
                            {
                                category.children?.map((categoryChildren, childIndex) => (

                                    <React.Fragment key={childIndex}>
                                        <CategoryCard 
                                        categoryName={categoryChildren.name} 
                                        categoryLink={categoryChildren.link}
                                        index={childIndex} 
                                    />
                                    </React.Fragment>
                                ))

                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}