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

type SubCategoryCardProps = {
    subCategoryName: string,
    subCategoryLink: Url
}

export default function SubCategoryCard(props: SubCategoryCardProps) {

    const { subCategoryName, subCategoryLink } = props;

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
                    <CardTitle className="text-center group-hover:text-primary transition">{subCategoryName}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}