"use client"

import { Category, PartialProduct } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const productTableColumns: ColumnDef<PartialProduct>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
    },
    {
        accessorKey: "brand",
        header: "Brand Name",
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ cell }) => {
            const category = cell.getValue();
            if (typeof category === "string") {
                return category;
            } else if (typeof category === "object" && category !== null && "name" in category) {
                return (category as Category).name;
            }
            return "Unknown";
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Product</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:!bg-red-600 hover:!text-gray-100">                       
                            Delete Product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]