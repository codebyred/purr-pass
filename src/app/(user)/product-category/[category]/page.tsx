
import { getProducts} from "@/actions/product-action";
import {getCategories, getCategory, getSubCategories} from "@/actions/category-action"
import ProductCard from "@/components/user/product-card";
import SubCategoryCard from "@/components/user/sub-cat-card";
import { NestedCategory } from "@/lib/types";
import React from "react";
import { tryCatch } from "@/lib/utils";

type PageProps = {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: PageProps) {

  const { category } = params;

  const [subCategoriesError, subCategoriesResult] = await tryCatch(getSubCategories({categorySlug: category}));

  if (subCategoriesError || !subCategoriesResult) {

    const [productsError, productsResult] = await tryCatch(getProducts({categorySlug: category}));

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
        {
          !productsError && productsResult && productsResult.products &&
          productsResult.products.map((product, index) => (
            <React.Fragment key={index}>
              <ProductCard product={product} />
            </React.Fragment>
          ))
        }
      </div>
    )
  }

  return (

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
      {
        subCategoriesResult && subCategoriesResult.subCategories.map((subCategory, index) => (
          <React.Fragment key={index}>
            <SubCategoryCard subCategory={subCategory} />
          </React.Fragment>
        ))
      }
    </div>
  )
}