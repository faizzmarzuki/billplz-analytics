interface PayoutIconProps {
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export const PayoutIcon = ({
    color = "currentColor",
    size = 18,
    strokeWidth = 2,
    className,
}: PayoutIconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3669_559)">
                <path d="M9.18842 0.61438V17.1144" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={className} />
                <path d="M12.9384 3.61438H7.31342C6.61722 3.61438 5.94954 3.89094 5.45726 4.38322C4.96498 4.87551 4.68842 5.54319 4.68842 6.23938C4.68842 6.93557 4.96498 7.60325 5.45726 8.09554C5.94954 8.58782 6.61722 8.86438 7.31342 8.86438H11.0634C11.7596 8.86438 12.4273 9.14094 12.9196 9.63322C13.4119 10.1255 13.6884 10.7932 13.6884 11.4894C13.6884 12.1856 13.4119 12.8533 12.9196 13.3455C12.4273 13.8378 11.7596 14.1144 11.0634 14.1144H4.68842" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={className} />
            </g>
            <defs>
                <clipPath id="clip0_3669_559">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};