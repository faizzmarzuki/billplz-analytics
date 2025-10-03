import { Icons } from "@/components/menu-icons";
import MerchantAccount from "@/app/components/merchant-account";
import LinkButton from "@/components/ui/link-button";
import Image from "next/image";

export default function Sidebar() {
    const isActive = true;
    const isNotActive = !isActive;
    return (
        <div className="w-[217px] hidden md:block">
            <Image src="/logo.svg" alt="Logo" width={151.2} height={41} />
            <MerchantAccount />
            <div className="flex flex-col justify-between h-full">
                <div>
                    <LinkButton href="/" isActive={!isActive}><Icons
                        name="home"
                        color={isNotActive ? "#2563EB" : "#6B7280"}
                        size={24}
                        strokeWidth={2}
                        className="hover:border-blue-500"
                    />Dashboard</LinkButton>
                    <LinkButton href="/billing-page" isActive={isActive}><Icons
                        name="payout"
                        color={isActive ? "#2563EB" : "#6B7280"}
                        size={24}
                        strokeWidth={2}
                        className="hover:border-blue-500"
                    />Billing</LinkButton>
                    <LinkButton href="/subscription-page" isActive={isNotActive}><Icons
                        name="payout"
                        color={isNotActive ? "#2563EB" : "#6B7280"}
                        size={24}
                        strokeWidth={2}
                        className="hover:border-blue-500"
                    />Subscriptions</LinkButton>
                </div>
                <div>
                    <LinkButton href="/" isActive={isNotActive}><Icons
                        name="settings"
                        color={isNotActive ? "#2563EB" : "#6B7280"}
                        size={24}
                        strokeWidth={2}
                        className="hover:text-blue-500"
                    />Account Settings</LinkButton>
                    <LinkButton href="/" isActive={isNotActive}><Icons
                        name="redirect"
                        color={isNotActive ? "#2563EB" : "#6B7280"}
                        size={24}
                        strokeWidth={2}
                        className="hover:text-blue-500"
                    />Support</LinkButton>
                    <LinkButton href="/" isActive={isNotActive}><Icons
                        name="redirect"
                        color={isNotActive ? "#2563EB" : "#6B7280"}
                        size={24}
                        strokeWidth={2}
                        className="hover:text-blue-500"
                    />FAQ</LinkButton>
                </div>
            </div>
        </div>
    );
}