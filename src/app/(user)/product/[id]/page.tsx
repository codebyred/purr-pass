import { getProductById, getProductsByCategory } from "@/actions/product-action"
import Product from "@/components/user/product";
import ProductCard from "@/components/user/product-card";

type PageProps = {
    params: {
        id: string;
    }
}

export default async function ProductPage(props: PageProps) {

    const product = await getProductById(props.params.id);
    const products = await getProductsByCategory(product?.category as string);

    return product && (
        <div className="flex flex-col">
            <Product product={product} />
            <h1 className="mt-8 mb-2 text-lg font-medium text-primary border-b-2 border-primary">Similar Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {
                    products && products.map((product)=>(
                        <ProductCard
                            product={product}
                        />
                    ))
                }
            </div>
        </div>
    )
}