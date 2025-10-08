interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`bg-white shadow-md ${className ?? ""}`.trim()}>
            {children}
        </div>);

};