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
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

type VariantInputProps = {
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
}

export default function FormItemVariantInput(props: VariantInputProps) {

    const { form, fieldName, fieldLabel, fieldDescription } = props

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
                                    variantOptions.map((option) => (
                                        <React.Fragment key={option.name}>
                                            <SelectItem value={option.value}>{option.name}</SelectItem>
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