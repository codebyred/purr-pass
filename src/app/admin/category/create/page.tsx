import { getCategories } from "@/actions/category-action";
import FormCreateCategory from "@/components/admin/form-create-category";
import { tryCatch } from "@/lib/utils";

export default async function CreateCategoryPage() {


    const [serverError, data] = await tryCatch(getCategories())

    const categories = data?.categories;
    return (
        <div className="flex flex-col px-4 sm:px-24">
            {categories && <FormCreateCategory categories={categories}/>}
        </div>
    )
}