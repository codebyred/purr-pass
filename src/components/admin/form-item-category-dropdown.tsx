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
import type { NestedCategory, ProductFormData } from "@/lib/types"
import { ControllerRenderProps } from "react-hook-form"
import { IoIosArrowDown } from "react-icons/io";

type FormItemCategoryDropDownProps = {
    categories: NestedCategory[]
    field: ControllerRenderProps<ProductFormData, "categoryId">
}

export default function FormItemCategoryDropDown(props: FormItemCategoryDropDownProps) {

    const { field: { value, onChange }, categories } = props;
    const [catName, setCatName] = React.useState("");

    return (
        <div className="flex w-full border-2 rounded-lg items-center sm:justify-center overflow-hidden">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-center items-center gap-2 w-full rounded-lg py-1 px-2">
                    {catName || <span className="flex items-center text-gray-500 gap-2 text-nowrap text-sm">Select Category <IoIosArrowDown /></span>}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {categories.map((category, index) => (
                        <SubMenu
                            key={index}
                            item={category}
                            onSelect={(val) => onChange(val)}
                            setCatName={setCatName}
                        />
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

type SubMenuProps = {
    item: NestedCategory
    onSelect: (value: string) => void
    setCatName:(value: string) => void
}

function SubMenu({ item, onSelect, setCatName }: SubMenuProps) {
    const { id, name, children } = item;

    if (children && children.length > 0) {
        return (
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>{name}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                    {children.map((child, index) => (
                        <SubMenu
                            key={index}
                            item={child}
                            onSelect={onSelect}
                            setCatName={setCatName}
                        />
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        );
    }

    return (
        <DropdownMenuItem
            onClick={() => {onSelect(id); setCatName(name)}}
            className="w-full"
        >
            {name}
        </DropdownMenuItem>
    );
}
