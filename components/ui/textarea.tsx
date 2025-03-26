export function Textarea({ className = "", ...props }: any) {
    return (
      <textarea
        {...props}
        className={`border px-3 py-2 rounded w-full ${className}`}
      />
    );
  }