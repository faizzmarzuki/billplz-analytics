"use client";

import { Icons } from "@/components/menu-icons";
import MerchantAccount from "@/app/components/merchant-account";
import LinkButton from "@/components/ui/link-button";
import Image from "next/image";
import { usePathname } from "next/navigation";

const primaryLinks = [
    { href: "/", label: "Dashboard", icon: "home" as const },
    { href: "/billing-page", label: "Billing", icon: "payout" as const },
    { href: "/subscription-page", label: "Subscriptions", icon: "payout" as const },
];

const secondaryLinks = [
    { href: "/#", label: "Account Settings", icon: "settings" as const },
    { href: "/#", label: "Support", icon: "redirect" as const },
    { href: "/#", label: "FAQ", icon: "redirect" as const },
];

const ACTIVE_COLOR = "#2563EB";
const INACTIVE_COLOR = "#6B7280";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-[217px] h-screen gap-5 flex-col hidden md:block">
            <Image src="/logo.svg" alt="Logo" width={151.2} height={41} />
            <MerchantAccount />
            <div className="flex flex-col justify-between h-[calc(100vh-151.2px)]">
                <div className="flex flex-col gap-2">
                    {primaryLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <LinkButton key={link.href} href={link.href} isActive={isActive}>
                                <Icons
                                    name={link.icon}
                                    size={24}
                                    strokeWidth={2}
                                    className="transition-colors"
                                />
                                {link.label}
                            </LinkButton>
                        );
                    })}
                </div>
                <div>
                    {secondaryLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <LinkButton key={link.href} href={link.href} isActive={isActive}>
                                <Icons
                                    name={link.icon}
                                    size={24}
                                    strokeWidth={2}
                                    className="transition-colors"
                                />
                                {link.label}
                            </LinkButton>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}