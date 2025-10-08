interface CloseIconProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const CloseIcon = ({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  className
}: CloseIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 5L13.5 14M4.5 14L13.5 5L4.5 14Z" stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" className={`${className ? ` ${className}` : ""}`} />
        </svg>);

};