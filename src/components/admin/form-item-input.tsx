import { ProductFormData } from "@/lib/types"
import { UseFormReturn, FieldValues, Path } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

type FormItemInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>
    fieldName: Path<T>
    fieldLabel: string
    fieldDescription: string
    inputType: "text" | "checkbox"
}

export default function FormItemInput<T extends FieldValues>(props: FormItemInputProps<T>) {

    const { form, fieldName, fieldLabel, fieldDescription, inputType } = props;

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <FormControl>
                        <Input type={inputType} {...field} />
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