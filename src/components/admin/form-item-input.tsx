import { ProductFormData } from "@/lib/types"
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

type FormItemInputProps = {
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

export default function FormItemInput(props: FormItemInputProps) {

    const { form, fieldName, fieldLabel, fieldDescription} = props;
    
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <FormControl>
                        <Input type="text" {...field} />
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