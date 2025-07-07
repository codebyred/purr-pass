"use client"
import * as React from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import MultiFileUploader from "./multi-file-uploader"
import { UseFormReturn } from "react-hook-form"
import { ProductFormData } from "@/lib/types"

type FormItemImagesProps = {
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
export default function FormItemImages(props: FormItemImagesProps) {

    const { form, fieldName, fieldLabel, fieldDescription } = props;
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <FormControl>
                        <MultiFileUploader field={field} />
                    </FormControl>
                    <FormDescription>
                        {fieldDescription}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}