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
import { ControllerRenderProps } from "react-hook-form"
import { FormControl } from "../ui/form"

type VariantInputProps = {
    field: ControllerRenderProps<ProductFormData, "variantType">
}

export default function FormItemVariantInput(props: VariantInputProps) {

    const { field: { value, onChange } } = props;

    return (
        <Select
            onValueChange={onChange}
            defaultValue={value}
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
    )
}