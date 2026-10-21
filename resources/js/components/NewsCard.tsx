import { Link } from '@inertiajs/react';
import { safeUrl } from './cms/contentUrls';
export interface NewsCardData {
    id: number;
    slug: string;
    title: string;
    summary: string;
    category: string;
    image: string | null;
    image_alt: string | null;
    published_at: string;
    locale?: string;
}
export function newsDate(value: string) {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeZone: 'America/Sao_Paulo' }).format(new Date(value));
}
export default function NewsCard({ item, readMore = 'Leia mais' }: { item: NewsCardData; readMore?: string }) {
    return (
        <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            {item.image && safeUrl(item.image, true) && (
                <img
                    src={safeUrl(item.image, true)}
                    alt={item.image_alt ?? ''}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
            )}
            <div className="p-4">
                <p className="text-xs text-[var(--uff-text-muted)]">
                    <time dateTime={item.published_at}>{newsDate(item.published_at)}</time> · {item.category}
                </p>
                <h3 className="mt-2 leading-snug font-semibold text-[var(--uff-dark-blue)]">
                    <Link href={'/noticias/' + item.slug}>{item.title}</Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--uff-text-muted)]">{item.summary}</p>
                <Link
                    href={'/noticias/' + item.slug}
                    className="mt-3 inline-block text-sm font-medium text-[var(--uff-dark-blue)] underline"
                    aria-label={readMore + ': ' + item.title}
                >
                    {readMore}
                </Link>
            </div>
        </article>
    );
}
