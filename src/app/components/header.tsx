import Image from "next/image";
import { HamburgerIcon } from "@/app/components/ui/icons/hamburger";
import { CalendarFilter } from "./calendar-filter";

interface HeaderProps {
    title: string;
    filterDate: (range: string) => void;
    onMenuClick?: () => void;
}

export default function Header({ title, filterDate, onMenuClick }: HeaderProps) {
    return (
        <div>
            <div className="flex items-center p-4 gap-2 border-b border-neutral-200 md:hidden">
                <HamburgerIcon onClick={onMenuClick} />
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={151.2}
                    height={41}
                    className=""
                />
            </div>
            <div className="justify-between items-center p-4 hidden md:flex">
                <span className="text-2xl font-bold">{title}</span>
                <div className="flex items-center gap-2">
                    <CalendarFilter filterDate={filterDate} />
                </div>
            </div>
        </div>
    );
}