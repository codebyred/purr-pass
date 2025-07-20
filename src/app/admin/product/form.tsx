"use client"

import { useFieldArray, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormDataSchema } from "@/lib/types";
import type { Category, ProductFormData, VariantValue } from "@/lib/types";
import { Input } from "../../../components/ui/input";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { createProduct, createVariantValue } from "@/actions/product-action";
import { productFormDataToFormData, tryCatch } from "@/lib/utils";
import { toast } from "sonner"
import FormItemInput from "../../../components/admin/form-item-input";
import FormItemImages from "../../../components/admin/form-item-image-uploader";
import FormItemSelect from "../../../components/admin/form-item-select";
import { variantOptions } from "@/lib/const";

const defaultValues: ProductFormData = {
    name: "",
    brand: "",
    featured: false,
    categoryId: "",
    images: {} as FileList,
    variantType: "",
    variants: [
        {
            value: "",
            stock: undefined,
            price: undefined,
            discount: undefined,
            isDefault: true,
        },
    ]
}

type FormCreateProductProps = {
    categories: Category[]
    variantValues: VariantValue[]
}

export default function ProductForm(props: FormCreateProductProps) {

    const { categories, variantValues } = props;

    const form = useForm<ProductFormData>({
        mode: "onSubmit",
        resolver: zodResolver(productFormDataSchema),
        defaultValues,
    });

    const { fields, append, remove } = useFieldArray<ProductFormData>({ name: "variants", control: form.control })

    const onSubmit = async (data: ProductFormData) => {

        const formData = productFormDataToFormData(data);

        const [error, result] = await tryCatch(createProduct(formData));

        if (error || !result || !result.message) {
            toast(`Could not create product due to ${error?.message}`);
            return;
        }
        toast(`${result.message}`);
        form.reset();

    }

    return (
        <Form {...form}>
            <form
                className="space-y-8 mb-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-semibold border-b-2">Create Product</h1>
                <div className="flex flex-col gap-2 bg-white px-4 py-4 shadow-md rounded-sm">
                    <div className="grid gap-2 xl:grid-cols-2 ">
                        <FormItemInput
                            form={form}
                            fieldName="name"
                            fieldLabel="Product Name"
                            fieldDescription="Write Your Product name"
                            inputType="text"
                        />
                        <FormItemInput
                            form={form}
                            fieldName="brand"
                            fieldLabel="Product Brand"
                            fieldDescription="Write name of brand"
                            inputType="text"
                        />
                    </div>
                    <div className="gap-2 xl:grid xl:grid-cols-3 flex flex-col">
                        <FormItemSelect
                            form={form}
                            fieldName={"categoryId"}
                            fieldLabel="Product Category"
                            fieldDescription="Select Product Category"
                            selectItems={categories.map((category) => {
                                return {
                                    id: category.id,
                                    name: category.name
                                }
                            })}
                            selectValue="id"
                        />
                        <FormItemSelect
                            form={form}
                            fieldName={"variantType"}
                            fieldLabel="Product Variant"
                            fieldDescription="Select Product Variant"
                            selectItems={variantValues.map((variant) => {
                                return {
                                    id: variant.id as string,
                                    name: variant.name
                                }
                            })}
                            selectValue="name"
                            addItem={true}
                            addItemAction={createVariantValue}
                        />
                        <FormItemInput
                            form={form}
                            fieldName="featured"
                            fieldLabel="Featured"
                            fieldDescription="Add to featured products"
                            inputType="checkbox"
                        />
                    </div>
                </div>
                <div className="bg-white px-4 py-4 shadow-md rounded-sm">
                    <FormItemImages
                        form={form}
                        fieldName={"images"}
                        fieldLabel={"Product Images"}
                        fieldDescription="Select images for your product"
                        multiple={true}
                    />
                </div>
                {
                    form.watch().variantType && fields.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <div className="bg-white px-4 py-4 shadow-md rounded-sm flex flex-col sm:grid sm:grid-cols-2 sm:gap-2">
                                <FormField
                                    control={form.control}
                                    name={`variants.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{form.getValues().variantType}</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                E.g: 5kg, Blue
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variants.${index}.stock`}
                                    render={({ field: { value, onChange, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number"
                                                    value={value ?? ""}
                                                    onChange={(e) => onChange(isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber)}
                                                    {...rest} />
                                            </FormControl>
                                            <FormDescription>
                                                Product Variant Stock
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variants.${index}.price`}
                                    render={({ field: { value, onChange, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number"
                                                    value={value ?? ""}
                                                    onChange={(e) => onChange(isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber)}
                                                    {...rest} />
                                            </FormControl>
                                            <FormDescription>
                                                Add a Product Variant
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variants.${index}.discount`}
                                    render={({ field: { value, onChange, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Discount</FormLabel>
                                            <FormControl>
                                                <Input type="number"
                                                    value={value ?? ""}
                                                    onChange={(e) => onChange(isNaN(e.target.valueAsNumber) ? undefined : e.target.valueAsNumber)}
                                                    {...rest} />
                                            </FormControl>
                                            <FormDescription>
                                                Add a discount for product Variant
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`variants.${index}.isDefault`}
                                    render={({ field: { value, onChange, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Set Default</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="checkbox"
                                                    checked={value}
                                                    onChange={e => onChange(e.target.checked)}
                                                    {...rest}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Set as default Product variant
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col items-center justify-center gap-4 col-span-2 mt-4">
                                    <Button
                                        className="rounded-sm bg-gray-900 text-gray-100 hover:bg-gray-700"
                                        type="button"
                                        onClick={() => append({
                                            sku: "",
                                            type: "",
                                            value: "",
                                            currPrice: 0,
                                            originalPrice: 0,
                                            isDefault: false,
                                        },)}>
                                        <FaPlus />
                                        Add Another Variant
                                    </Button>
                                    {
                                        index > 0 && (
                                            <Button
                                                className="rounded-sm"
                                                type="button"
                                                variant={"destructive"}
                                                onClick={() => remove(index)}
                                            >
                                                <MdOutlineDeleteOutline />
                                                Remove This Variant
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
                <div className="flex items-center">
                    <Button
                        disabled={form.formState.isSubmitting}
                        className="flex items-center gap-2 w-full py-4 text-lg font-semibold"
                        type="submit">
                        <MdLibraryAdd className="text-2xl font-bold" />
                        {form.formState.isSubmitting ? "Saving ..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}