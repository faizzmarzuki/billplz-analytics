import Image from "next/image";

export default function Avatar() {
    return (
        <div className="w-[32px] h-[32px] bg-neutral-950 rounded-full flex items-center justify-center">
            <Image src="/bui_merchant-shop.svg" alt="Avatar" width={18} height={18} />
        </div>
    );
}