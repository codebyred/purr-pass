import React from "react";
import Searchbar from "./searchbar";
import { CiShoppingCart } from "react-icons/ci";
import Nav from "./nav";
import Logo from "./logo";
import Notice from "./notice";

const header = () => {
    return (
        <header className="w-full flex flex-col">
            <div className="bg-primary py-1 px-2 overflow-hidden">
                <Notice/>
            </div>
            <div className="flex items-center justify-between px-6 xl:px-24 py-2 border-b-2">
                <div className="mr-4">
                    <Logo />
                </div>
                <Searchbar />
                <div className="ml-8">
                    <CiShoppingCart />
                </div>
            </div>
            <Nav />
        </header>
    )
}

export default header;