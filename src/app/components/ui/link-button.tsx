import Link from "next/link";

interface LinkButtonProps {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}

export default function LinkButton({ href, isActive, children }: LinkButtonProps) {
    return (
        <Link href={href} className={`flex gap-2 px-4 py-2 rounded-md hover:bg-blue-200 hover:text-blue-500 ${isActive ? "text-blue-500 bg-blue-200" : ""}`}>{children}</Link>
    )
}