import { HomeIcon } from "@/components/ui/icons/home";
import { PayoutIcon } from "@/components/ui/icons/payout";
import { RedirectIcon } from "@/components/ui/icons/redirect";
import { SettingsIcon } from "@/components/ui/icons/settings";

type IconName = "home" | "payout" | "redirect" | "settings";

type IconProps = {
    name: IconName;
    className?: string;
    size?: number;
    strokeWidth?: number;
    color?: string;
};

export function Icons({
    name,
    className,
    size = 24,
    strokeWidth = 2,
    color = "currentColor",
}: IconProps) {
    switch (name) {
        case "home":
            return (
                <HomeIcon
                    color={color}
                    size={size}
                    strokeWidth={strokeWidth}
                    className={className}
                />
            );
        case "payout":
            return (
                <PayoutIcon
                    color={color}
                    size={size}
                    strokeWidth={strokeWidth}
                    className={className}
                />
            );
        case "redirect":
            return (
                <RedirectIcon
                    color={color}
                    size={size}
                    strokeWidth={strokeWidth}
                    className={className}
                />
            );
        case "settings":
            return (
                <SettingsIcon
                    color={color}
                    size={size}
                />
            );
        default:
            return null;
    }
}