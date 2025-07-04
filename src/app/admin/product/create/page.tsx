import getCategories from "@/actions/category-action";
import FormCreateProduct from "@/components/admin/form-create-product";
import { tryCatch } from "@/lib/utils";

export default async function CreateProductPage() {

    const [serverError, data] = await tryCatch(getCategories())

    const categories = data?.categories;

    return (
        <div className="flex flex-col px-4 sm:px-24">
            {
                categories && <FormCreateProduct categories={categories}/> 
            }
        </div>
    )
}