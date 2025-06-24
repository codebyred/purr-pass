"use client"

import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";


const Searchbar = () => {
    return (
        <motion.form
            initial={{ flex:0 }}
            animate={{ flex:1 }}
            transition={{  duration: 0.6, ease: "easeOut" }}
            className="border-2 rounded-full py-2 px-4 flex items-center justify-center overflow-hidden bg-white">
            <motion.input type="text" placeholder="Search" className="outline-none w-full" required />
            <motion.button className="rounded-full flex items-center justify-center" type="submit"><CiSearch /></motion.button>
        </motion.form>
    )
}

export default Searchbar;