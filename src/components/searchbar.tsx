"use client"

import { CiSearch } from "react-icons/ci";

const Searchbar = ()=> {
    return (
        <form className="border-2 rounded-full py-2 px-4 hidden sm:flex items-center">
            <input type="text" placeholder="Search" className="outline-none min-w-64" required/>
            <button><CiSearch /></button>
        </form>
    )
}

export default Searchbar;