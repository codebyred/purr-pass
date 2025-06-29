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
import { flatCategories } from "@/lib/data"
import Link from "next/link"
import { FaAngleDown } from "react-icons/fa";
import { motion } from "framer-motion"
import { FlatCategory, NestedCategory } from "@/lib/types"
import { buildNestedCategories } from "@/lib/utils"

export default function Nav() {

  const categories = buildNestedCategories(flatCategories);

  return (
    <motion.div
      initial={{ y: -500, z: -1 }}
      animate={{ y: 0, z: 10 }}
      className="hidden sm:w-full sm:flex sm:items-center sm:justify-center sm:border-b-2 py-2">
      <ul className="list-none flex items-center gap-4">
        <Link href={"/"}>
          <li className="hover:bg-primary/20 font-medium rounded-lg py-1 px-2">
            Home
          </li>
        </Link>
        {
          categories.map((cat, index) => (
            <li
              key={index}
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-primary/20 font-medium rounded-lg py-1 px-2">
                  {cat.name}
                  <FaAngleDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                      cat.children && cat.children.map((child, index) => (
                        <React.Fragment key={index}>
                          <SubMenu item={{...child}} />
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
  item: NestedCategory
}

function SubMenu(props: NavItemProps) {
  const { name, link, children } = props.item;
  return children ? (
    <DropdownMenuSub>
      <Link href={link??""} className="font-medium"><DropdownMenuSubTrigger>{name}</DropdownMenuSubTrigger></Link>
      <DropdownMenuSubContent>
        <DropdownMenuSub>
          {
            children.map((child, index) => (
              <React.Fragment key={index}>
                  <SubMenu item={{...child}} />
              </React.Fragment>
            ))
          }
        </DropdownMenuSub>
      </DropdownMenuSubContent>
    </DropdownMenuSub>

  ) : (  
    <DropdownMenuItem asChild className="font-medium"><Link href={link?? ""}>{name}</Link></DropdownMenuItem>
  );
}
