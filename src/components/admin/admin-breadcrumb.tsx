"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { generateBreadcrumbItems } from "@/lib/utils"
import { usePathname } from "next/navigation"
import React from "react"

export default function AdminBreadcrumb() {

    const pathname = usePathname()
    const items = generateBreadcrumbItems(pathname)

    return (
        <Breadcrumb className="py-4 px-2">
            <BreadcrumbList>
                {
                    items.map((breadcrumbItem, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={breadcrumbItem.link}>{breadcrumbItem.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

