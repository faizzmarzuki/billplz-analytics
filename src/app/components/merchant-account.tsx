import Avatar from "@/components/ui/avatar";
import CloseButton from "@/components/close-icon";

export default function MerchantAccount() {
    return (
        <div className="flex items-center gap-2">
            <Avatar />
            <div>
                <span>John Doe</span>
            </div>
            <CloseButton />
        </div>
    );
}