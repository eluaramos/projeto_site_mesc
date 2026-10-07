export default function Checkbox({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`rounded border-gray-300 text-uff shadow-sm focus:ring-uff ${className}`}
        />
    );
}