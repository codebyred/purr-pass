
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
import Link from "next/link"
import { FaAngleDown } from "react-icons/fa";
import { NestedCategory } from "@/lib/types"
import { tryCatch } from "@/lib/utils"
import { getCategories } from "@/actions/category-action";
import NavMenu from "./nav-menu";

export default async function Nav() {

  const [error, result] = await tryCatch(getCategories({nested:true})) as [Error| null, { categories: NestedCategory[] } | null];

  return (
    <div
      className="hidden sm:w-full sm:flex sm:items-center sm:justify-between sm:border-b-2 py-2 sm:px-24">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-primary text-gray-100 px-4 py-2 rounded-full flex items-center gap-2 font-medium ">
            
              All categories
            
            <FaAngleDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              result && result.categories.map((child, index) => (
                <React.Fragment key={index}>
                  <SubMenu item={{ ...child }} />
                </React.Fragment>
              ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {result && <NavMenu categories={result.categories as NestedCategory[]}/>}
      <div className="px-8">

      </div>
    </div>
  )
}

type NavItemProps = {
  item: NestedCategory
}

function SubMenu(props: NavItemProps) {
  const { name, link, children } = props.item;
  return children && children.length > 0 ? (
    <DropdownMenuSub>
      <Link href={link ?? ""} className="font-medium"><DropdownMenuSubTrigger>{name}</DropdownMenuSubTrigger></Link>
      <DropdownMenuSubContent>
        <DropdownMenuSub>
          {
            children.map((child, index) => (
              <React.Fragment key={index}>
                <SubMenu item={{ ...child }} />
              </React.Fragment>
            ))
          }
        </DropdownMenuSub>
      </DropdownMenuSubContent>
    </DropdownMenuSub>

  ) : (
    <DropdownMenuItem asChild className="font-medium"><Link href={link ?? ""}>{name}</Link></DropdownMenuItem>
  );
}
