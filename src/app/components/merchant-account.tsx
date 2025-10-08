import Avatar from "@/components/ui/avatar";
import CloseButton from "@/components/close-icon";

interface MerchantAccountProps {
  onClose?: () => void;
}

export default function MerchantAccount({ onClose }: MerchantAccountProps) {
  return (
    <div className="flex items-center gap-2 justify-between border-b border-neutral-200 py-4 px-6 md:border-0">
      <div className="flex items-center gap-2">
        <Avatar />
        <span className="font-semibold">Joy and Supply Store</span>
      </div>
      {onClose && <CloseButton onClick={onClose} />}
    </div>);

}