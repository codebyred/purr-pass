"use client"

import { animate, delay, motion } from "framer-motion";
import Image from "next/image";

type CategoryCardProps = {
    categoryName: string,
    index: number
}

const fadeInAnimationVariant = {
    initial: {
        opacity:0
    },
    animate: (index: number)=>({
        opacity:1,
        transition: {
            delay: index * 0.05
        }
    })
}

export default function CategoryCard(props: CategoryCardProps) {
    return (
        <motion.div 
            variants={fadeInAnimationVariant}
            initial="initial"
            whileInView="animate"
            viewport={{
                once:true,
                amount:1
            }}
            custom={props.index}
            className="flex flex-col items-center gap-2"
        >
            <div className="border-2 rounded-full w-[14.063rem] h-[14.063] aspect-square overflow-hidden max-w-[225px]">
                <Image
                    src={"/cat.png"}
                    width={225}
                    height={225}
                    alt={"featured category image"}
                    className="object-contain"
                />
            </div>
            <p>{props.categoryName}</p>
        </motion.div>
    )
}