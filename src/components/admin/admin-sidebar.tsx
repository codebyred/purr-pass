"use client"

import * as React from "react"
import { adminSidebarItem } from "@/lib/data"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logo from "../logo"

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <SidebarMenuButton
              asChild
            >
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {
            adminSidebarItem.map((groupItem) => (
              <SidebarGroup key={groupItem.group}>
                <SidebarGroupLabel>{groupItem.group}</SidebarGroupLabel>
                {
                  groupItem.items.map((item) => (
                    <SidebarMenuItem className="list-none" key={item.title}>
                      {"items" in item && Array.isArray(item.items) && item.items.length ? (
                        <>
                          <SidebarMenuButton tooltip={item.title}>
                            <div className="flex items-center gap-2">
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </>
                      ) : (
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <Link href={item.url} className="flex items-center gap-2">
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))
                }
              </SidebarGroup>
            ))
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
