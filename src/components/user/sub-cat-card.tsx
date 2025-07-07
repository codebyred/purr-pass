"use client"
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
import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SubCategoryCardProps = {
    subCategory: {
        id: string;
        slug: string;
        name: string;
        parentId: string | null;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }
}

export default function SubCategoryCard(props: SubCategoryCardProps) {

    const { subCategory } = props;
    const pathname = usePathname();

    const subCategoryLink = pathname.endsWith("/")
        ? `${pathname}${subCategory.slug}`
        : `${pathname}/${subCategory.slug}`;

    return (
        <Link href={subCategoryLink}>
            <Card className="group h-full flex flex-col">
                <CardHeader className="w-full flex items-center justify-center">
                    <div className="aspect-square max-w-[150px] overflow-hidden rounded-md">
                        <Image className="object-contain w-full h-full transition duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-115"
                            src={"/sub-cat.png"}
                            alt="sub category image"
                            width={150}
                            height={150}
                        />
                    </div>
                    <CardTitle className="text-center group-hover:text-primary transition">{subCategory.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}