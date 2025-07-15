"use client"
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
import { NestedCategory } from "@/lib/types"
import Link from "next/link"

type NavMenuProps = {
    categories: NestedCategory[]
}

export default function NavMenu(props: NavMenuProps) {
    return (
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href={"/"}>
                            Home
                        </Link>
                    </NavigationMenuItem>
                    {
                        props.categories.map((cat, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger>
                                    <Link href={cat.link}>
                                        {cat.name}
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] p-4">
                                        {cat.children && cat.children.map((child, index) => (
                                            <li key={index}>
                                                <NavigationMenuLink href={child.link}>
                                                    <p>
                                                        {child.name}
                                                    </p>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}