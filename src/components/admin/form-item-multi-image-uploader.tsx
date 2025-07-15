"use client"
import * as React from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FaImages } from "react-icons/fa6"
import { Input } from "../ui/input"
import Image from "next/image"
import { MdDeleteForever } from "react-icons/md"

type FormItemImagesProps<T extends FieldValues> = {
    form: UseFormReturn<T>
    fieldName: Path<T>
    fieldLabel: string
    fieldDescription: string
}

export default function FormItemImages<T extends FieldValues>(props: FormItemImagesProps<T>) {

    const { form, fieldName, fieldLabel, fieldDescription } = props;

    const imageInputRef = React.useRef<HTMLInputElement>(null);

    const files = form.watch(fieldName) as FileList | null;

    function triggerFileInput() {
        imageInputRef.current?.click();
    }

    function toFileList(files: File[]): FileList {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;
    }

    function removeFile(index: number, onChange: (value: FileList) => void) {
        if (!files) return;
        const updatedFilesArray = Array.from(files).filter((_, i) => i !== index);
        onChange(toFileList(updatedFilesArray));
    }

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field: { value, ref, onChange, ...rest } }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <FormControl>
                        <div className="flex flex-wrap items-center gap-2">
                            {
                                files && Array.from(files).map((file, index) => (
                                    <div
                                        key={file.name}
                                        className="relative h-[180px] w-[180px] rounded-sm border-2"
                                    >
                                        <div
                                            className="absolute -right-2 -top-2 w-6 h-6 flex items-center justify-center border-2 border-gray-900 rounded-full bg-gray-100 cursor-pointer"
                                            onClick={() => removeFile(index, onChange)}
                                        >
                                            <MdDeleteForever className="text-red-500 text-lg" />
                                        </div>
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            width={180}
                                            height={180}
                                            alt="product image"
                                            className="object-contain aspect-square"
                                        />
                                    </div>
                                ))
                            }
                            <div className="h-[180px] w-[180px] border-2 border-primary rounded-sm flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => triggerFileInput()}
                                    className="flex flex-col items-center justify-center gap-2 w-full h-full hover:text-primary transition"
                                >
                                    <FaImages />
                                    Upload Image
                                </button>
                                <Input
                                    ref={imageInputRef}
                                    type="file"
                                    multiple
                                    {...rest}
                                    onChange={(e) => {
                                        const selectedFiles = e.target.files;
                                        if (!selectedFiles || selectedFiles.length === 0) return;

                                        const newFiles = Array.from(selectedFiles);
                                        const existingFiles = files ? Array.from(files) : [];

                                        const updatedFiles = [...existingFiles, ...newFiles];

                                        onChange(toFileList(updatedFiles));
                                    }}
                                    className="hidden"
                                />
                            </div>
                        </div>
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
