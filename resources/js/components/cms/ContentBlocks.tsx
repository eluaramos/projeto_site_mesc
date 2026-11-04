export type Block = {
    type: 'paragraph' | 'heading' | 'quote' | 'list' | 'link' | 'image' | 'table';
    text?: string;
    ordered?: boolean;
    url?: string;
    alt?: string;
    caption?: string;
    rows?: string[][];
};
export const blockLabels: Record<Block['type'], string> = {
    paragraph: 'Parágrafo',
    heading: 'Subtítulo',
    quote: 'Citação',
    list: 'Lista',
    link: 'Link',
    image: 'Imagem',
    table: 'Tabela',
};
export function readBlocks(body: string, format?: string): Block[] {
    if (format === 'blocks') {
        try {
            const value = JSON.parse(body);
            if (Array.isArray(value)) return value;
        } catch {
            /* legacy text fallback */
        }
    }
    return [{ type: 'paragraph', text: body }];
}
export function safeUrl(value = '', image = false): string | undefined {
    if (/[\s\\]/.test(value)) return undefined;
    if (!image && /^\/(?!\/)/.test(value)) return value;
    try {
        const url = new URL(value);
        if (url.protocol === 'https:') return value;
    } catch {
        /* incomplete URL in preview */
    }
    return undefined;
}
export function ContentBlocks({ body, format }: { body: string; format?: string }) {
    if (format !== 'blocks') return <div className="leading-8 break-words whitespace-pre-wrap">{body}</div>;
    return (
        <div className="cms-content space-y-6 break-words">
            {readBlocks(body, format).map((block, index) => {
                switch (block.type) {
                    case 'heading':
                        return (
                            <h2 key={index} className="pt-4 text-2xl font-bold">
                                {block.text}
                            </h2>
                        );
                    case 'paragraph':
                        return (
                            <p key={index} className="leading-8 whitespace-pre-wrap">
                                {block.text}
                            </p>
                        );
                    case 'quote':
                        return (
                            <blockquote
                                key={index}
                                className="border-l-4 border-[var(--uff-highlight)] bg-[var(--uff-light-gray)] p-5 leading-8 whitespace-pre-wrap italic"
                            >
                                {block.text}
                            </blockquote>
                        );
                    case 'list': {
                        const items = (block.text ?? '').split('\n').filter((line) => line.trim());
                        const className = 'space-y-2 pl-6 leading-7';
                        return block.ordered ? (
                            <ol key={index} className={className + ' list-decimal'}>
                                {items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ol>
                        ) : (
                            <ul key={index} className={className + ' list-disc'}>
                                {items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        );
                    }
                    case 'link':
                        return (
                            <p key={index}>
                                <a className="font-medium text-[var(--uff-dark-blue)] underline underline-offset-4" href={safeUrl(block.url)}>
                                    {block.text || 'Texto do link'}
                                </a>
                            </p>
                        );
                    case 'image':
                        return (
                            <figure key={index}>
                                {safeUrl(block.url, true) ? (
                                    <img
                                        className="mx-auto max-h-[480px] max-w-full rounded-lg object-contain"
                                        src={safeUrl(block.url, true)}
                                        alt={block.alt ?? ''}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <p className="rounded-lg bg-[var(--uff-light-gray)] p-6 text-[var(--uff-text-muted)]">
                                        Informe o endereço HTTPS da imagem.
                                    </p>
                                )}
                                {block.caption && (
                                    <figcaption className="mt-3 text-center text-sm text-[var(--uff-text-muted)]">{block.caption}</figcaption>
                                )}
                            </figure>
                        );
                    case 'table':
                        return (
                            <div key={index} className="overflow-x-auto">
                                <table className="w-full border-collapse text-left text-sm">
                                    <caption className="mb-3 text-left font-semibold">{block.caption}</caption>
                                    <thead>
                                        <tr>
                                            {block.rows?.[0]?.map((cell, i) => (
                                                <th key={i} scope="col" className="border border-[var(--uff-border)] bg-[var(--uff-light-gray)] p-3">
                                                    {cell}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {block.rows?.slice(1).map((row, i) => (
                                            <tr key={i}>
                                                {row.map((cell, j) => (
                                                    <td key={j} className="border border-[var(--uff-border)] p-3">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
