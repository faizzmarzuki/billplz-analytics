interface FilterIconProps {
    className?: string;
    color?: string;
    size?: number;
    strokeWidth?: number;
}

export const FilterIcon = ({ className, color, size, strokeWidth }: FilterIconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6667 2H1.33337L6.66671 8.30667V12.6667L9.33337 14V8.30667L14.6667 2Z" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};