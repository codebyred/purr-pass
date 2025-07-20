"use client"

import Image from "next/image"
import { useState } from "react"

type ProductImageProps = {
    images: {
        url: string
        alt: string
    }[]
}

export default function ProductImage(props: ProductImageProps) {

    const {images} = props;

    const [imageIndex, setImageIndex] = useState<number>(0);

    return (
        <div className="flex">
            <div className="flex flex-col gap-2">
                {
                    images?.map((image, index) => (
                        <Image
                            key={index}
                            src={image.url}
                            width={100}
                            height={100}
                            alt={image.alt}
                            className="hover:border-2 hover:border-primary border-2"
                            onClick={()=> setImageIndex((prev)=> index)}
                        />
                    ))
                }
            </div>
            <div>
                <Image
                    src={images[imageIndex].url}
                    width={480}
                    height={480}
                    alt="product image"
                />
            </div>
        </div>
    )
}