import Image from "next/image";
import { HamburgerIcon } from "@/app/components/ui/icons/bui_hamburger";
import { CalendarFilter } from "./calendar-filter";

interface HeaderProps {
    title: string;
    filterDate?: (range: { start: string; end: string }) => void;
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
            <div className="flex p-4 flex-col md:flex-row md:justify-between md:items-center">
                <span className="text-2xl font-bold">{title}</span>
                {filterDate && (
                    <div className="flex items-center gap-2">
                        <CalendarFilter filterDate={filterDate} />
                    </div>
                )}
            </div>
        </div>
    );
}