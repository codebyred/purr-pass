import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Searchbar from "../searchbar";
import { cn } from "@/lib/utils"
import { RxHamburgerMenu } from "react-icons/rx";
import SidebarTriggerButton from "./sidebar-trigger-button"

type AdminHeaderProps = {
  className?: string
}

export default function AdminHeader(props: AdminHeaderProps) {
  return (
    <header className={cn("z-50 py-2 px-4 lg:gap-2 lg:px-6", props.className)}>
      <div className="flex items-center justify-between">
        <div className="mr-16">
          <SidebarTriggerButton/>
        </div>
        <div className="hidden sm:flex sm:flex-1">
          <Searchbar />
        </div>
        <Avatar className="ml-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
