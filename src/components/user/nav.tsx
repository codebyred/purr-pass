
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
import { buildNestedCategories, tryCatch } from "@/lib/utils"
import {getCategories} from "@/actions/category-action";

export default async function Nav() {

  const [error, result] = await tryCatch(getCategories());

  return (
    <div
      className="hidden sm:w-full sm:flex sm:items-center sm:justify-center sm:border-b-2 py-2">
      <ul className="list-none flex items-center gap-4">
        <Link href={"/"}>
          <li className="hover:bg-primary/20 font-medium rounded-lg py-1 px-2">
            Home
          </li>
        </Link>
        {
          !error && result && result.categories &&
          result.categories.map((cat, index) => (
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
                        <SubMenu item={{ ...child }} />
                      </React.Fragment>
                    ))
                  }
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
