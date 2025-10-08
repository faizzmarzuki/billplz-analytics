import { HomeIcon } from "@/app/components/ui/icons/bui_home";
import { PayoutIcon } from "@/app/components/ui/icons/bui_payout";
import { RedirectIcon } from "@/app/components/ui/icons/bui_redirect";
import { SettingsIcon } from "@/app/components/ui/icons/bui_settings";

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
  color = "currentColor"
}: IconProps) {
  switch (name) {
    case "home":
      return (
        <HomeIcon
          color={color}
          size={size}
          strokeWidth={strokeWidth}
          className={className} />);


    case "payout":
      return (
        <PayoutIcon
          color={color}
          size={size}
          strokeWidth={strokeWidth}
          className={className} />);


    case "redirect":
      return (
        <RedirectIcon
          color={color}
          size={size}
          strokeWidth={strokeWidth}
          className={className} />);


    case "settings":
      return (
        <SettingsIcon
          color={color}
          size={size} />);


    default:
      return null;
  }
}