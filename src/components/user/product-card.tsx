import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"
import Link from "next/link"
import { TbCurrencyTaka } from "react-icons/tb";
import { CiShoppingCart } from "react-icons/ci";

type ProductCardProps = {
    product: Product
}

export default function ProductCard(props: ProductCardProps) {

    const { name, id, images, variants } = props.product;

    return (

        <Card className="group flex flex-col items-center justify-between overflow-hidden">
            <Link href={`/product/${id}`}>
                <CardHeader>
                    <div className="w-full flex items-center justify-center">
                        <div className="aspect-square max-w-[150px] h-[150px] w-[150px] overflow-hidden rounded-md">
                            <Image
                                className="object-contain w-full h-full transition duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-115"
                                src={images[0].url}
                                alt="sub category image"
                                width={150}
                                height={150}
                            />
                        </div>
                    </div>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className="flex items-center">
                        <TbCurrencyTaka />
                        {variants.find((variant) => variant.isDefault)?.currPrice}
                    </CardDescription>
                </CardHeader>
            </Link>
            <CardFooter className="flex items-center justify-center">
                <Button className="bg-primary text-gray-100 hover:bg-primary/90 flex items-center gap-2">
                    <CiShoppingCart className="font-bold text-lg" />
                    <span className="hidden lg:block">Add to Card</span>
                </Button>
            </CardFooter>
        </Card>

    )
}