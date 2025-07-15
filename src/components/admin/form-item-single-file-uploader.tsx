"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FaImages } from "react-icons/fa";

type MultiFileUploaderProps<T extends FieldValues> = {
    field: ControllerRenderProps<T, Path<T>>
}

export default function MultiFileUploader<T extends FieldValues>(props: MultiFileUploaderProps<T>) {

    const { field } = props;
    const { onChange, value, ref, ...rest } = field;

    const [files, setFiles] = useState<File[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!value || value.length === 0) {
            setFiles([]);
            return;
        }
        const filesArray = Array.from(value as FileList);
        setFiles(filesArray);
    }, [value]);

    function removeFile(fileIndex: number) {
        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, index) => index !== fileIndex);
            return updatedFiles;
        });
    }
    function triggerFileInput() {
        imageInputRef.current?.click();
    };
    function toFileList(files: File[]): FileList {
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        return dataTransfer.files;
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {
                files.map((file, index) => (
                    <div
                        key={file.name}
                        className="relative h-[180px] w-[180px] rounded-sm border-2"
                    >
                        <div
                            className="absolute -right-2 -top-2 w-6 h-6 flex items-center justify-center border-2 border-gray-900 rounded-full bg-gray-100"
                            onClick={() => removeFile(index)}
                        >
                            <MdDeleteForever className="text-red-500 text-lg" />
                        </div>
                        <Image
                            src={URL.createObjectURL(file)}
                            width={180}
                            height={180}
                            alt="product image"
                            className="object-contain aspect-square "
                        />
                    </div>
                ))
            }
            <div className="h-[180px] w-[180px] border-2 border-primary rounded-sm flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => triggerFileInput()}
                    className="flex flex-col items-center gap-2"
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
                        const selecteFiles = e.target.files;
                        if (!selecteFiles || selecteFiles.length === 0) return;

                        const newFiles = Array.from(selecteFiles);
                        const updatedFiles = [...files, ...newFiles];

                        setFiles(updatedFiles)

                        onChange(toFileList(updatedFiles))
                    }}
                    className="hidden"
                />
            </div>
        </div>
    )
}