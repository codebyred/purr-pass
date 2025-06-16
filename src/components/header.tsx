import React from "react";
import Searchbar from "./searchbar";
import { CiShoppingCart } from "react-icons/ci";
import Nav from "./nav";

const header = () => {
    return (
        <header className="w-full flex flex-col">
            <div className="bg-primary py-1">
                <p className="text-center text-gray-100">৪ জুন থেকে অর্ডারকৃত সকল অর্ডার ১৪ জুন থেকে ডেলিভারী করা শুরু হবে🚛🚛</p>
            </div>
            <div className="flex items-center justify-between px-6 xl:px-24 py-2 border-b-2">
                <h1>PetLandBD</h1>
                <Searchbar />
                <div>
                    <CiShoppingCart />
                </div>
            </div>    
            <Nav />
        </header>
    )
}

export default header;