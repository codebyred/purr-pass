import React from "react";
import Searchbar from "./searchbar";
import { CiShoppingCart } from "react-icons/ci";
import Nav from "./nav";
import Logo from "../logo";
import Notice from "./notice";
import MenuButton from "./menu-button";

const header = () => {
    return (
        <header className="w-full flex flex-col">
            <div className="bg-primary py-1 px-2 overflow-hidden">
                <Notice />
            </div>
            <div className="flex items-center justify-between px-6 xl:px-24 border-b-2">
                <div className="sm:hidden block">
                    <MenuButton />
                </div>

                <div className="sm:mr-12">
                    <Logo />
                </div>
                <div className="hidden sm:flex sm:flex-1">
                    <Searchbar />
                </div>
                <div className="sm:ml-24">
                    <CiShoppingCart className="text-2xl font-bold" />
                </div>
            </div>
            <div className="sm:hidden flex flex-1 px-4 py-2">
                <Searchbar />
            </div>
            <Nav />
        </header>
    )
}

export default header;