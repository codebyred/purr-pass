import { getProducts } from "@/actions/product-action";
import { DataTable } from "@/components/admin/data-table";
import { productTableColumns } from "@/components/admin/product-table-columns";
import { Category, PartialProduct } from "@/lib/types";
import { tryCatch } from "@/lib/utils";


export default async function ProductList({ searchParams }: { searchParams: { page?: string } }) {

    const page = searchParams.page || "1";

    const pageNumber = parseInt(page, 10);

    const [error, productsResult] = await tryCatch(getProducts({page:pageNumber}));

    console.log(productsResult)

    return (
        <div className="flex flex-col px-4 sm:px-24">
            {
                productsResult && productsResult.products &&
                <DataTable 
                    columns={productTableColumns} 
                    data={productsResult.products as PartialProduct[]} 
                    prev={productsResult.prev}
                    next={productsResult.next}
                />
            }
        </div>
    )
}