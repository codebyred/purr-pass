"use client"

import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebar } from "../ui/sidebar";

export default function SidebarTriggerButton() {

    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
    return (
        <button onClick={() => toggleSidebar()}>
            <RxHamburgerMenu />
        </button>
    )
}