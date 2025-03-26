export function Input({ className = "", ...props }: any) {
    return (
      <input
        {...props}
        className={`border px-3 py-2 rounded w-full ${className}`}
      />
    );
  }