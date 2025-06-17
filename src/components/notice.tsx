"use client"

import { motion } from "framer-motion";

export default function Notice() {
    return (
        <motion.p
            initial={{x: "-100%"}}
            animate={{ x: ["100%", "-100%"] }}
            transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
            }}
            className="text-center text-gray-100 whitespace-nowrap">
            ৪ জুন থেকে অর্ডারকৃত সকল অর্ডার ১৪ জুন থেকে ডেলিভারী করা শুরু হবে🚛🚛
        </motion.p>
    )
}