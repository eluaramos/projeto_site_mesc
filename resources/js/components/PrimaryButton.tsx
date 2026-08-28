export default function PrimaryButton({ className = '', disabled, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none disabled:opacity-50 ${className}`}
            style={{ backgroundColor: 'var(--uff-highlight)' }}
        >
            {children}
        </button>
    );
}