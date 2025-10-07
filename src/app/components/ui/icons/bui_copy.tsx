interface CopyIconProps {
    color?: string;
    width?: number;
    height?: number;
    strokeWidth?: number;
    className?: string;
}

export const CopyIcon = ({ color = "#5B5B5B", width = 14, height = 14, strokeWidth = 1.5, className }: CopyIconProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g clip-path="url(#clip0_1188_4996)">
                <path d="M11.6667 5.25H6.41667C5.77233 5.25 5.25 5.77233 5.25 6.41667V11.6667C5.25 12.311 5.77233 12.8333 6.41667 12.8333H11.6667C12.311 12.8333 12.8333 12.311 12.8333 11.6667V6.41667C12.8333 5.77233 12.311 5.25 11.6667 5.25Z" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
                <path d="M2.91667 8.75008H2.33334C2.02392 8.75008 1.72717 8.62716 1.50838 8.40837C1.28959 8.18958 1.16667 7.89283 1.16667 7.58341V2.33341C1.16667 2.024 1.28959 1.72725 1.50838 1.50846C1.72717 1.28966 2.02392 1.16675 2.33334 1.16675H7.58334C7.89276 1.16675 8.1895 1.28966 8.4083 1.50846C8.62709 1.72725 8.75 2.024 8.75 2.33341V2.91675" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1188_4996">
                    <rect width={width} height={height} fill="white" />
                </clipPath>
            </defs>
        </svg>

    );
}