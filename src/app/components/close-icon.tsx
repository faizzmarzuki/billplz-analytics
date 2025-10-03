import { CloseIcon } from "@/components/ui/icons/close";

export default function CloseButton() {
    return (
        <div className="bg-neutral-950 rounded-full flex items-center justify-center w-[40px] h-[40px] md:hidden">
            <CloseIcon size={24} strokeWidth={2} color="currentColor" />
        </div>
    );
}