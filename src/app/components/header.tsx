import Image from "next/image";

export default function Header() {
    return (
        <div>
            <Image
                src="/logo.svg"
                alt="Logo"
                width={151.2}
                height={41}
                className="md:hidden"
            />
        </div>
    );
}