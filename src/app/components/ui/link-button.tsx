import Link from "next/link";

interface LinkButtonProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({ href, isActive, children, className }: LinkButtonProps) {
  const baseClasses = "group flex gap-2 px-4 py-2 rounded-md transition-colors";
  const activeClasses = "text-blue-500 bg-blue-200";
  const inactiveClasses = "text-neutral-600 hover:text-blue-500 hover:bg-blue-200";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className ?? ""}`.trim()}>

            {children}
        </Link>);

}