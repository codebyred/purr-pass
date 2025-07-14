import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { variantOptions } from "@/lib/data"
import { ProductFormData } from "@/lib/types"
import React from "react"
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

type SelectItem = {
    id: string,
    name: string
}

type VariantInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>
    fieldName: Path<T>
    fieldLabel: string
    fieldDescription: string
    selectItems: SelectItem[],
    selectValue: keyof SelectItem
}

export default function FormItemVariantInput<T extends FieldValues>(props: VariantInputProps<T>) {

    const { form, fieldName, fieldLabel, fieldDescription, selectItems, selectValue } = props

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field: { value, onChange } }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <Select
                        onValueChange={onChange}
                        value={value}
                    >
                        <FormControl>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Variant" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Variants</SelectLabel>
                                {
                                    selectItems.map((item) => (
                                        <React.Fragment key={item.id}>
                                            <SelectItem value={item[selectValue]}>{item.name}</SelectItem>
                                        </React.Fragment>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        {fieldDescription}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )
            } />
    )
}