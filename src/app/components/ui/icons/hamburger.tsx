interface HamburgerIconProps {
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export const HamburgerIcon = ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    className,
}: HamburgerIconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
            <path d="M3 6H21" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
            <path d="M3 18H21" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
        </svg>
    );
};