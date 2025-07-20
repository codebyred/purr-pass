"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

type SelectItem = {
    id: string,
    name: string
}

type VariantInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>
    fieldName: Path<T>
    fieldLabel: string
    fieldDescription: string
    selectItems: SelectItem[],
    selectValue: keyof SelectItem,
    addItem?: boolean
    addItemAction?: (formData: FormData) => void
}

export default function FormItemVariantInput<T extends FieldValues>(props: VariantInputProps<T>) {

    const { form, fieldName, fieldLabel, fieldDescription, selectItems, selectValue, addItem, addItemAction } = props
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (addItemAction) {
            const result = await addItemAction(formData);
            // handle result, close dialog, refresh options, etc.
        }
        setOpen(false);
    }

    return (
        <>
            <FormField
                control={form.control}
                name={fieldName}
                render={({ field: { value, onChange } }) => (
                    <FormItem>
                        <FormLabel>{fieldLabel}</FormLabel>
                        <Select
                            onValueChange={(val) => {
                                if (val === "__add_new__") {
                                    setOpen(true);
                                } else {
                                    onChange(val);
                                }
                            }}
                            value={value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={fieldDescription} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{fieldLabel}</SelectLabel>
                                    {
                                        selectItems.map((item) => (
                                            <SelectItem key={item.id} value={item[selectValue]}>
                                                {item.name}
                                            </SelectItem>
                                        ))
                                    }
                                    {
                                        addItem &&
                                        <SelectItem value="__add_new__">+ Add Item</SelectItem>
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormDescription>{fieldDescription}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Render Dialog outside the form */}
            {addItem && addItemAction && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Item</DialogTitle>
                            <DialogDescription>
                                Add a new item below.
                            </DialogDescription>
                        </DialogHeader>
                        <form

                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>

    )
}

function DialogForm() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Item</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

