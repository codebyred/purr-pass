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
import type { Category, Image, NestedCategory, ProductFormData } from "@/lib/types";
import { Input } from "../ui/input";
import React, { startTransition, useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import FormItemVariantInput from "./form-item-select";
import { createProduct } from "@/services/product-service";
import { categoryFormDataToFormData, tryCatch } from "@/lib/utils";
import { toast } from "sonner"
import FormItemInput from "./form-item-input";
import FormItemImages from "./form-item-image-uploader";
import { sleep } from "@/lib/utils"
import { categoryFomDataSchema } from "@/lib/types";
import type { CategoryFormData } from "@/lib/types"
import FormItemSelect from "./form-item-select";
import { createCategory } from "@/services/category-service";


const defaultValues: CategoryFormData = {
    name: "",
    parentId: "none",
    featured: false,
    image: {} as File,
}

type FormCreateCategoryProps = {
    categories: Category[]
}

export default function FormCreateCategory(props: FormCreateCategoryProps) {

    const { categories } = props;

    const form = useForm<CategoryFormData>({
        mode: "onSubmit",
        resolver: zodResolver(categoryFomDataSchema),
        defaultValues,
    });


    const onSubmit = async (data: CategoryFormData) => {

        const formData = categoryFormDataToFormData(data);
        const [error, result] = await tryCatch(createCategory(formData));

        if(error || !result || !result.message){
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
                <h1 className="text-2xl font-semibold border-b-2">Create Category</h1>
                <div className="flex flex-col gap-2">
                    <div className="bg-white px-4 py-4 shadow-md rounded-sm flex gap-2 sm:items-center sm:justify-between flex-col sm:flex-row">
                        <FormItemInput
                            form={form}
                            fieldName="name"
                            fieldLabel="Category Name"
                            fieldDescription="Write Category name"
                            inputType="text"
                        />
                        <FormItemSelect
                            form={form}
                            fieldName={"parentId"}
                            fieldLabel="Parent Category"
                            fieldDescription="Set Parent Category"
                            selectItems={[
                                { id: "none", name: "No Parent" },
                                ...categories.map((category) => ({
                                    id: category.id,
                                    name: category.name
                                }))
                            ]}
                            selectValue="id"
                        />
                        <FormItemInput
                            form={form}
                            fieldName="featured"
                            fieldLabel="Featured"
                            fieldDescription="Add to featured product"
                            inputType="checkbox"
                        />
                    </div>
                    <div className="bg-white px-4 py-4 shadow-md rounded-sm">
                        <FormItemImages
                            form={form}
                            fieldName={"image"}
                            fieldLabel={"Product Images"}
                            fieldDescription="Select images for your product"
                        />
                    </div>
                </div>

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