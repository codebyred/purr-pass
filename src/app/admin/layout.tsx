import { AdminSidebar } from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Pet Shop",
    description: "Pet food & accessories",
};

export default function CategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider>
                    <AdminSidebar variant="inset" />
                    <SidebarInset>
                        <AdminHeader className="mb-8"/>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
                <Toaster position="top-center"/>
            </body>
        </html>
    )
}