export function Button({ children, className = "", ...props }: any) {
    return (
      <button
        {...props}
        className={`px-4 py-2 rounded font-medium ${className}`}
      >
        {children}
      </button>
    );
  }