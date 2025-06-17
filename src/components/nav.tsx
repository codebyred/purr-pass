"use client"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Categories } from "@/lib/data"
import Link from "next/link"
import { FaAngleDown } from "react-icons/fa";
import { motion } from "framer-motion"

export default function Nav() {
  return (
    <motion.div
      initial={{ y: -500, z: -1 }}
      animate={{ y: 0, z: 10 }}
      className="hidden sm:w-full sm:flex sm:items-center sm:justify-center sm:border-b-2 py-2">
      <ul className="list-none flex items-center gap-4">
        <Link href={"/"}>
          <li className="hover:bg-gray-100 rounded-lg py-1 px-2">
            Home
          </li>
        </Link>
        {
          Categories.map((cat, index) => (
            <li
              key={index}
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-lg py-1 px-2">
                  {cat.name}
                  <FaAngleDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                      cat.children && cat.children.map((child, index) => (
                        <React.Fragment key={index}>
                          <SubMenu {...child} />
                        </React.Fragment>
                      ))
                    }
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))
        }
      </ul>
    </motion.div>
  )
}

type NavItemProps = {
  name: string
  link: string
  children?: { name: string, link: string }[]
}

function SubMenu({ name, link, children }: NavItemProps) {
  return children ? (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{name}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuSub>
          {
            children.map((child, index) => (
              <React.Fragment key={index}>
                  <SubMenu {...child} />
              </React.Fragment>
            ))
          }
        </DropdownMenuSub>
      </DropdownMenuSubContent>
    </DropdownMenuSub>

  ) : (  
    <DropdownMenuItem asChild><Link href={link}>{name}</Link></DropdownMenuItem>
  );
}
