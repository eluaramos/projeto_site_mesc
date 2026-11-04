export function safeUrl(value = '', image = false): string | undefined {
    if (/[\s\\]/.test(value)) return undefined;
    if (image && value.startsWith('/images/') && !value.includes('..')) return value;
    if (!image && /^\/(?!\/)/.test(value)) return value;
    try {
        const url = new URL(value);
        if (url.protocol === 'https:') return value;
    } catch {
        /* incomplete URL in preview */
    }
    return undefined;
}
