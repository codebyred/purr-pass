import NavBreadcrumb from "@/components/user/nav-breadcrumb";

export default function CategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="px-4 py-4 sm:px-24">
            {children}
        </div>
    )
}