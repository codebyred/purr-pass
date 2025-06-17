"use client"

import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";

const Searchbar = ()=> {
    return (
        <motion.form 
        initial={{width:0, opacity:0, flex:0}}
        animate={{width:256, opacity:1, flex:1}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 border-2 rounded-full py-2 px-4 hidden sm:flex items-center justify-center">
            <motion.input type="text" placeholder="Search" className="outline-none w-full" required/>
            <motion.button type="submit"><CiSearch /></motion.button>
        </motion.form>
    )
}

export default Searchbar;