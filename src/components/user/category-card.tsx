"use client"

import { motion } from "framer-motion";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
    categoryName: string,
    index: number,
    categoryLink: Url
}

const fadeInAnimationVariant = {
    initial: {
        opacity: 0
    },
    animate: (index: number) => ({
        opacity: 1,
        transition: {
            delay: index * 0.05
        }
    })
}

export default function CategoryCard(props: CategoryCardProps) {

    return (
        <Link href={props.categoryLink}>
            <motion.div
                variants={fadeInAnimationVariant}
                initial="initial"
                whileInView="animate"
                viewport={{
                    once: true,
                    amount: 0.5
                }}
                custom={props.index}
                className="flex flex-col items-center gap-2 group"
            >
                <div className="border-2 rounded-lg aspect-square overflow-hidden max-w-[225px]">
                    <Image
                        src={"/cat.png"}
                        width={225}
                        height={225}
                        alt={"featured category image"}
                        className="object-contain group-hover:-translate-y-2 transition group-hover:scale-110"
                    />
                </div>
                <p className="group-hover:text-primary font-medium">{props.categoryName}</p>
            </motion.div>
        </Link>
    )
}