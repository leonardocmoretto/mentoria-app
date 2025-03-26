export function Card({ children, className = "", ...props }: any) {
    return <div {...props} className={`rounded shadow border ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, ...props }: any) {
    return <div {...props}>{children}</div>;
  }