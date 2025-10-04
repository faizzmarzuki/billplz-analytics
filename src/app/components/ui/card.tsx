interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`bg-white rounded-md shadow-md p-4 ${className ?? ""}`.trim()}>
            {children}
        </div>
    )
}