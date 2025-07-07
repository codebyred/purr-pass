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
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { IoIosArrowDown } from "react-icons/io";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

type FormItemCategoryDropDownProps = {
    form: UseFormReturn<ProductFormData>
    fieldName: keyof ProductFormData
    | `images.${string}`
    | `variants.${number}`
    | `variants.${number}.value`
    | `variants.${number}.discount`
    | `variants.${number}.price`
    | `variants.${number}.isDefault`,

    fieldLabel: string
    fieldDescription: string
    categories: NestedCategory[]
}

export default function FormItemCategoryDropDown(props: FormItemCategoryDropDownProps) {

    const { form, fieldName, fieldLabel, fieldDescription, categories } = props

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field: { value, onChange } }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <div className="flex w-full border-2 rounded-lg items-center sm:justify-center overflow-hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex justify-center items-center gap-2 w-full rounded-lg py-1 px-2">
                                {value || <span className="flex items-center text-gray-500 gap-2 text-nowrap text-sm">Select Category <IoIosArrowDown /></span>}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {categories.map((category, index) => (
                                    <SubMenu
                                        key={index}
                                        item={category}
                                        onSelect={(val) => {
                                            onChange(val);
                                        }}
                                    />
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <FormDescription>
                        {fieldDescription}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

type SubMenuProps = {
    item: NestedCategory
    onSelect: (value: string) => void
}

function SubMenu({ item, onSelect }: SubMenuProps) {
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

                        />
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        );
    }

    return (
        <DropdownMenuItem
            onClick={() => { onSelect(id) }}
            className="w-full"
        >
            {name}
        </DropdownMenuItem>
    );
}
