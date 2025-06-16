"use client"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Categories } from "@/lib/data"
import Link from "next/link"
import { FaAngleDown } from "react-icons/fa";

export default function Nav() {

  return (
    <div className="hidden sm:w-full sm:flex sm:items-center sm:justify-center sm:border-b-2 py-2">
      <ul className="list-none flex items-center gap-4">
        <li >
          <Link href={"/"}>Home</Link>
        </li>
        {
          Categories.map((cat, index) => (
            <li
              key={index}
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2">
                  {cat.name}
                  <FaAngleDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ul className="flex flex-col">
                    {
                      cat.children && cat.children.map((child, index) => (
                        <React.Fragment key={index}>
                          <SubMenu {...child} />
                        </React.Fragment>
                      ))
                    }
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

type NavItemProps = {
  name: string
  children?: { name: string }[]
}

function SubMenu({ name, children }: NavItemProps) {
  return children ? (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{name}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuSub>
          {
            children.map((child, index) => (
              <React.Fragment key={index}>
                <DropdownMenuItem>
                  <SubMenu {...child} />
                </DropdownMenuItem>
              </React.Fragment>
            ))
          }
        </DropdownMenuSub>

      </DropdownMenuSubContent>
    </DropdownMenuSub>

  ) : (
    <DropdownMenuSub>
      <DropdownMenuItem> <Link href={"/tt"}>{name}</Link></DropdownMenuItem>
    </DropdownMenuSub>

  );
}
