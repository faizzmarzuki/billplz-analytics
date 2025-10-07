interface CalendarIconProps {
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export const CalendarIcon = ({
    color = "currentColor",
    size = 18,
    strokeWidth = 2,
    className,
}: CalendarIconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
            <path d="M12 1.5V4.5" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
            <path d="M6 1.5V4.5" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
            <path d="M2.25 7.5H15.75" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
        </svg>
    );
};