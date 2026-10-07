import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref: React.ForwardedRef<HTMLInputElement>
) {
    const localRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || localRef;

    useEffect(() => {
        if (isFocused) inputRef.current?.focus();
    }, []);

    return (
        <input
            {...props}
            type={type}
            ref={inputRef}
            className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-transparent focus:outline-none focus:ring-2 ${className}`}
            style={{ '--tw-ring-color': 'var(--uff-highlight)' } as React.CSSProperties}
        />
    );
});