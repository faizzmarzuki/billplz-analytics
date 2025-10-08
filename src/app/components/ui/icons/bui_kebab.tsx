interface KebabIconProps {
  className?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const KebabIcon = ({ className, color, size, strokeWidth }: KebabIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99996 7.58341C7.32213 7.58341 7.58329 7.32225 7.58329 7.00008C7.58329 6.67792 7.32213 6.41675 6.99996 6.41675C6.67779 6.41675 6.41663 6.67792 6.41663 7.00008C6.41663 7.32225 6.67779 7.58341 6.99996 7.58341Z" fill={color} stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.99996 3.49992C7.32213 3.49992 7.58329 3.23875 7.58329 2.91659C7.58329 2.59442 7.32213 2.33325 6.99996 2.33325C6.67779 2.33325 6.41663 2.59442 6.41663 2.91659C6.41663 3.23875 6.67779 3.49992 6.99996 3.49992Z" fill={color} stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.99996 11.6667C7.32213 11.6667 7.58329 11.4055 7.58329 11.0833C7.58329 10.7612 7.32213 10.5 6.99996 10.5C6.67779 10.5 6.41663 10.7612 6.41663 11.0833C6.41663 11.4055 6.67779 11.6667 6.99996 11.6667Z" fill={color} stroke={color} stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round" />
        </svg>);

};