"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

interface LayoutWrapperProps {
    children: React.ReactNode;
    onFilterDate?: (range: { start: string; end: string }) => void;
}

const routeTitles: Record<string, string> = {
    "/": "Overview Dashboard",
    "/billing-page": "Billing",
    "/subscription-page": "Subscription",
};

export default function LayoutWrapper({ children, onFilterDate }: LayoutWrapperProps) {
    const pathname = usePathname();
    const title = routeTitles[pathname] || "Dashboard";
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex w-screen h-screen">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex flex-col w-full h-full">
                <Header
                    title={title}
                    filterDate={pathname === "/subscription-page" ? undefined : onFilterDate}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <div className="p-4 flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>

    );
}
