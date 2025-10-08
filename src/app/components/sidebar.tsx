"use client";

import { Icons } from "@/components/menu-icons";
import MerchantAccount from "@/app/components/merchant-account";
import LinkButton from "@/components/ui/link-button";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const primaryLinks = [
{ href: "/", label: "Dashboard", icon: "home" as const },
{ href: "/billing-page", label: "Billing", icon: "payout" as const },
{ href: "/subscription-page", label: "Subscriptions", icon: "payout" as const }];


const secondaryLinks = [
{ href: "/#", label: "Account Settings", icon: "settings" as const },
{ href: "/#", label: "Support", icon: "redirect" as const },
{ href: "/#", label: "FAQ", icon: "redirect" as const }];


export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
            <div
        className={`fixed top-0 left-0 h-full w-[300px] z-50 bg-neutral-50 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <MerchantAccount onClose={onClose} /> 
                <div className="flex flex-col justify-between h-[calc(100vh-151.2px)]">
                    <div className="flex flex-col gap-2 py-4 px-6">
                        {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <LinkButton key={link.href} href={link.href} isActive={isActive}>
                                    <Icons name={link.icon} size={24} strokeWidth={2} />
                                    {link.label}
                                </LinkButton>);

            })}
                    </div>
                    <div className="mx-6">
                        {secondaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <LinkButton key={link.href} href={link.href} isActive={isActive}>
                                    <Icons name={link.icon} size={24} strokeWidth={2} />
                                    {link.label}
                                </LinkButton>);

            })}
                    </div>
                </div>
            </div>

            
            <div className="w-[400px] p-2 h-screen gap-5 flex-col hidden md:block">
                <Image src="/logo.svg" alt="Logo" width={217} height={34} className="px-6 py-4" />
                <MerchantAccount />
                <div className="flex flex-col justify-between h-[calc(100vh-151.2px)]">
                    <div className="flex flex-col gap-2 p-2">
                        {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <LinkButton key={link.href} href={link.href} isActive={isActive}>
                                    <Icons name={link.icon} size={24} strokeWidth={2} />
                                    {link.label}
                                </LinkButton>);

            })}
                    </div>
                    <div>
                        {secondaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <LinkButton key={link.href} href={link.href} isActive={isActive}>
                                    <Icons name={link.icon} size={24} strokeWidth={2} />
                                    {link.label}
                                </LinkButton>);

            })}
                    </div>
                </div>
            </div>
        </>);

}