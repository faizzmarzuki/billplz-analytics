import { CloseIcon } from "@/app/components/ui/icons/bui_close";

interface CloseButtonProps {
  onClick?: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <div className="bg-neutral-400 rounded-full flex items-center justify-center md:hidden w-8 h-8" onClick={onClick}>
            <CloseIcon size={24} strokeWidth={2} color="white" />
        </div>);

}