import { getCategories } from "@/actions/category-action";
import FormCreateCategory from "../form"
import { tryCatch } from "@/lib/utils";
import { Category } from "@/lib/types";

export default async function CreateCategoryPage() {

    const [serverError, data] = await tryCatch(getCategories())

    const categories = data?.categories as Category[];
    return (
        <div className="flex flex-col px-4 sm:px-24">
            {categories && <FormCreateCategory categories={categories}/>}
        </div>
    )
}