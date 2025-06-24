"use client"

import type { Product, Variant } from "@/lib/types"
import ProductImage from "@/components/user/product-img";
import { TbCurrencyTaka } from "react-icons/tb";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ProductProps = {
    product: Product
}

export default function Product(props: ProductProps) {

    const { product } = props;
    const defaultProductVariant = product.variants.find((variant) => variant.isDefault);
    const [activeVariant, setActiveVariant] = useState(defaultProductVariant);
    const [sku, setSku] = useState(defaultProductVariant?.sku);
    const [currPrice, setCurrPrice] = useState(defaultProductVariant?.currPrice);

    function handleVariantClick(variant: Variant) {
        setActiveVariant(()=> variant);
        setSku((prev) => variant.sku);
        setCurrPrice(() => variant.currPrice)
    }

    return (
        <div className="grid gird-cols-1 sm:grid-cols-2 gap-4">
            <ProductImage images={product?.images} />
            <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-xl">{product?.name}</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-2 text-xs text-gray-500 font-medium">
                    <span>SKU: {sku}</span>
                    <span>Category: {product.category}</span>
                    <span>Brand: {product.brand}</span>
                </div>
                <div>
                    <span className="flex items-center font-semibold text-gray-500">
                        <TbCurrencyTaka />
                        {currPrice}
                    </span>
                </div>
                {product.variantOptions.length > 0 &&
                    <div className="text-xs">
                        <p className="mb-2">Select {product.variantOptions[0].name}</p>
                        <div className="flex gap-2">
                            {
                                product.variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={cn("border-2 rounded-sm font-medium border-gray-500 py-1 px-2",{
                                            "bg-gray-900": variant.sku === sku,
                                            "text-gray-100": variant.sku === sku
                                        })}
                                        onClick={() => handleVariantClick(variant)}
                                    >
                                        {variant.values && variant.values[product.variantOptions[0].name]}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                }
                <div>
                    <Button>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}