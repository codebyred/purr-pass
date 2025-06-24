import NavBreadcrumb from "@/components/user/nav-breadcrumb";

export default function CategoryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col px-4 sm:px-24">
            <div className="mb-4">
                <NavBreadcrumb />
            </div>
            {children}
        </div>
    )
}