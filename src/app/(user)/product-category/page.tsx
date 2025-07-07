import { getCategories } from "@/actions/category-action"
import CategoryCard from "@/components/user/category-card"
import { buildNestedCategories, tryCatch } from "@/lib/utils"
import React from "react"

export default async function ProductCategoryPage() {

    const [error, categoriesResult] = await tryCatch(getCategories());

    return (
        <div className="flex flex-col">
            {
                categoriesResult && categoriesResult.categories.map((category, index) => (
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