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
import z from "zod";
import MultiFileUploader from "./form-item-multi-file-uploader";
import { productFormDataSchema } from "@/lib/types";
import type { Image, NestedCategory, ProductFormData } from "@/lib/types";
import { Input } from "../ui/input";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import FormItemCategoryDropDown from "./form-item-category-dropdown";
import FormItemVariantInput from "./form-item-variant-input";
import { createProduct } from "@/actions/product-action";
import { convertProductDataToFormData, tryCatch } from "@/lib/utils";
import { toast } from "sonner"

const defaultValues: ProductFormData = {
    name: "",
    brand: "",
    categoryId: "",
    images: {} as FileList,
    variantType: "",
    variants: [
        {
            value: "",
            price: undefined,
            discount: undefined,
            isDefault: true,
        },
    ]
}

type FormCreateProductProps = {
    categories: NestedCategory[]
}

export default function CreateProductForm(props: FormCreateProductProps) {

    const {categories} = props;

    const form = useForm<ProductFormData>({
        mode: "onSubmit",
        resolver: zodResolver(productFormDataSchema),
        defaultValues,
    });

    const { fields, append, remove } = useFieldArray<ProductFormData>({ name: "variants", control: form.control })

    const onSubmit = async (data: ProductFormData) => {

        const formData = convertProductDataToFormData(data);
        
        const [error, result] = await tryCatch(createProduct(formData));

        if(error || !result){
            toast(`Could not create product due to ${error?.message}`)
        }

    }

    return (
        <Form {...form}>
            <form
                className="space-y-8 mb-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-semibold border-b-2">Create Product</h1>
                <div className="sm:grid sm:grid-cols-2 flex flex-col">
                    <div className="">
                        <h2 className=" font-bold text-[20px]">Basic Info</h2>
                        <p className="text-gray-500">
                            Add some basic info about your product from here
                        </p>
                    </div>
                    <div className="bg-white px-4 py-4 shadow-md rounded-sm">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Write Your Product name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Brand</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Write Product's brand name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="gap-4 sm:grid sm:grid-cols-2 flex flex-col">

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Category</FormLabel>
                                        <FormItemCategoryDropDown field={field} categories={categories}/>
                                        <FormDescription>
                                            Select Product Category
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="variantType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Variant</FormLabel>
                                        <FormItemVariantInput field={field} />
                                        <FormDescription>
                                            Select Product Variant. E.g: Weight, Color
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-2 flex flex-col">
                    <div className="">
                        <h2 className=" font-bold text-[20px]">Product Images</h2>
                        <p className="text-gray-500">
                            Add images of your Product
                        </p>
                    </div>
                    <div className="bg-white px-4 py-4 shadow-md rounded-sm">
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Images</FormLabel>
                                    <FormControl>
                                        <MultiFileUploader field={field} />
                                    </FormControl>
                                    <FormDescription>
                                        Choose images for your product
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {
                    form.watch().variantType && fields.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <div className="sm:grid sm:grid-cols-2 flex flex-col">
                                <div className="">
                                    <h2 className=" font-bold text-[20px]">Product Variant</h2>
                                    <p className="text-gray-500">
                                        Add variants of your Product
                                    </p>
                                </div>

                                <div className="bg-white px-4 py-4 shadow-md rounded-sm">
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
                                    <div className="flex flex-col items-center justify-center gap-4 mt-4">
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
                            </div>
                        </React.Fragment>
                    ))
                }
                <div className="flex items-center">
                    <Button
                        className="flex items-center gap-2 w-full py-4 text-lg font-semibold"
                        type="submit">
                        <MdLibraryAdd className="text-2xl font-bold" />
                        Save
                    </Button>
                </div>

            </form>
        </Form>
    )
}