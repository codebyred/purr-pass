import { getProductsByCategoryId } from "@/actions/product-action";
import ProductCard from "@/components/user/product-card";
import SubCategoryCard from "@/components/user/sub-cat-card";
import { flatCategories } from "@/lib/data";
import { NestedCategory } from "@/lib/types";
import { buildNestedCategories, findCategoryWithChildren, normalizeCategoryKey } from "@/lib/utils"
import React from "react";

type PageProps = {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: PageProps) {

  const { category } = params;

  const categoryNormalized = normalizeCategoryKey(category);

  const nestedCategories: NestedCategory[] = buildNestedCategories(flatCategories);

  const match = findCategoryWithChildren(categoryNormalized, nestedCategories);

  if (!match) {

    const products = await getProductsByCategoryId(categoryNormalized);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
        {
          products.map((product, index) => (
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
        match && match.children && match.children.map((child, index) => (
          <React.Fragment key={index}>
            <SubCategoryCard subCategoryName={child.name} subCategoryLink={child.link} />
          </React.Fragment>
        ))
      }
    </div>
  )
}