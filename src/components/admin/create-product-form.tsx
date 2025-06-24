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
import MultiFileUploader from "./multi-file-uploader";
import { productFormSchema } from "@/lib/types";
import type { ProductForm } from "@/lib/types";
import { Input } from "../ui/input";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

const defaultValues: ProductForm = {
    name: "",
    brand: "",
    category: "",
    images: {} as FileList,
    variantType: "",
    variants: [
        {
            value: "",
            price: 0,
            discount: 0,
            isDefault: false,
        },
    ]
}

export default function CreateProductForm() {

    const form = useForm<ProductForm>({
        mode: "onSubmit",
        resolver: zodResolver(productFormSchema),
        defaultValues,
    });

    const { fields, append, remove } = useFieldArray<ProductForm>({ name: "variants", control: form.control })

    function createProduct(value: ProductForm) {
        console.log({ value });
    }

    return (
        <Form {...form}>
            <form
                className="space-y-8 mb-8"
                onSubmit={form.handleSubmit(createProduct)}
            >
                <div className="flex items-center justify-between border-b-2 py-2">
                    <h1 className="text-2xl font-semibold ">Product</h1>
                    <Button 
                        className="flex items-center gap-2"
                        type="submit">
                        <MdLibraryAdd className="text-2xl font-bold"/>
                        Create
                    </Button>
                </div>

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
                <div className="grid grid-cols-2 gap-2">
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
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Category</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Select Product Category
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                <FormField
                    control={form.control}
                    name="variantType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Variant Type</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Add Variant type. E.g: Weight, Color
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    fields.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <div className="flex flex-col border-2 rounded-sm px-2 pt-8 pb-2 relative">
                                <div className="grid grid-cols-2 gap-2">

                                    <FormField
                                        control={form.control}
                                        name={`variants.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Variant Value</FormLabel>
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
                                        name={`variants.${index}.discount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Discount</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
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
                                        name={`variants.${index}.price`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
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
                                        name={`variants.${index}.isDefault`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Variants</FormLabel>
                                                <FormControl>
                                                    <Input type="text" />
                                                </FormControl>
                                                <FormDescription>
                                                    Add a Product Variant
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-center justify-center absolute top-2 right-12">
                                    {
                                        index > 0 && (
                                            <Button
                                                className="w-8 h-8 rounded-full"
                                                type="button"
                                                variant={"destructive"}
                                                onClick={() => remove(index)}
                                            >
                                                <MdOutlineDeleteOutline />
                                            </Button>
                                        )
                                    }
                                </div>
                                <div className="flex items-center justify-center absolute top-2 right-2">
                                    <Button
                                        className="rounded-full w-8 h-8 bg-gray-900 text-gray-100 hover:bg-gray-700"
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
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
            </form>
        </Form>
    )
}