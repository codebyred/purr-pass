"use client"

import { useForm } from "react-hook-form";
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
import type { Image, NestedCategory, ProductFormData } from "@/lib/types";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import FormItemCategoryDropDown from "./form-item-category-dropdown";
import FormItemVariantInput from "./form-item-select";
import { createProduct } from "@/actions/product-action";
import { convertProductDataToFormData, tryCatch } from "@/lib/utils";
import { toast } from "sonner"
import FormItemInput from "./form-item-input";
import FormItemImages from "./form-item-images";
import { sleep } from "@/lib/utils"
import { categoryFomDataSchema } from "@/lib/types";
import type {CategoryFormData} from "@/lib/types"

const defaultValues: CategoryFormData = {
    name: "",
    parentId: null,
    featured: false,
    image: {} as File,
}


export default function FormCreateCategory() {

    const form = useForm<CategoryFormData>({
        mode: "onSubmit",
        resolver: zodResolver(categoryFomDataSchema),
        defaultValues,
    });

    const onSubmit = async (data: CategoryFormData) => {

        // const [error, result] = await tryCatch(createProduct(formData));

        // if(error || !result || !result.message){
        //     toast(`Could not create product due to ${error?.message}`);
        //     return;
        // }
        // toast(`${result.message}`);
        // form.reset();
    }

    return (
        <Form {...form}>
            <form
                className="space-y-8 mb-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-semibold border-b-2">Create Category</h1>
                <div className="sm:grid sm:grid-cols-2 flex flex-col">
                    <div className="">
                        <h2 className=" font-bold text-[20px]">Basic Info</h2>
                        <p className="text-gray-500">
                            Add some basic info about your product from here
                        </p>
                    </div>
                    <div className="bg-white px-4 py-4 shadow-md rounded-sm">
                        <FormItemInput
                            form={form}
                            fieldName="name"
                            fieldLabel="Category Name"
                            fieldDescription="Write Category name"
                            inputType="text"
                        />
                        <FormItemInput
                            form={form}
                            fieldName="featured"
                            fieldLabel="Featured"
                            fieldDescription="Add to featured product"
                            inputType="checkbox"
                        />
                    </div>
                </div>
               
                <div className="flex items-center">
                    <Button
                        disabled={form.formState.isSubmitting}
                        className="flex items-center gap-2 w-full py-4 text-lg font-semibold"
                        type="submit">
                        <MdLibraryAdd className="text-2xl font-bold" />
                        {form.formState.isSubmitting?"Saving ...":"Save"}
                    </Button>
                </div>

            </form>
        </Form>
    )
}