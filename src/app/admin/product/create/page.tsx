import { getCategories } from "@/actions/category-action"
import Form from "@/app/admin/product/form";
import { tryCatch } from "@/lib/utils";
import { Category, VariantValue } from "@/lib/types";
import { getVariantValues } from "@/actions/product-action";

export default async function CreateProductPage() {

    const [catoriesDataError, categoryiesData] = await tryCatch(getCategories())
    const [variantValuesError, variantValuesData] = await tryCatch(getVariantValues());

    const categories = categoryiesData?.categories as Category[];
    const variantValues = variantValuesData?.variantValues as VariantValue[]

    return (
        <div className="flex flex-col px-4 sm:px-24">
            {
                categories && variantValues &&
                <Form 
                    categories={categories}
                    variantValues={variantValues}
                /> 
            }
        </div>
    )
}