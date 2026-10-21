import { BookOpen, Briefcase, FlaskConical, GraduationCap, Lightbulb, Search, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { safeUrl } from './cms/contentUrls';

export interface PortalItem {
    title: string;
    text?: string;
    image?: string;
    alt?: string;
    url?: string;
    button?: string;
    icon?: string;
    value?: string;
}
export type PortalVariant = 'card' | 'cards' | 'carousel' | 'stats' | 'banner';
export const portalIcons = {
    book: BookOpen,
    target: Target,
    lightbulb: Lightbulb,
    graduation: GraduationCap,
    flask: FlaskConical,
    briefcase: Briefcase,
    users: Users,
    search: Search,
};
export function PortalCard({ item }: { item: PortalItem }) {
    const Icon = portalIcons[item.icon as keyof typeof portalIcons];
    return (
        <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            {safeUrl(item.image, true) && (
                <img
                    src={safeUrl(item.image, true)}
                    alt={item.alt ?? ''}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
            )}
            <div className="p-6">
                {Icon && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--uff-light-gray)] text-[var(--uff-highlight)]">
                        <Icon size={24} />
                    </div>
                )}
                <h3 className="mb-2 text-xl font-semibold text-[var(--uff-dark-blue)]">{item.title}</h3>
                {item.text && <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--uff-text-muted)]">{item.text}</p>}
                {safeUrl(item.url) && (
                    <a className="mt-4 inline-flex font-semibold text-[var(--uff-dark-blue)] underline underline-offset-4" href={safeUrl(item.url)}>
                        {item.button || item.title}
                    </a>
                )}
            </div>
        </article>
    );
}
export function PortalStats({ items }: { items: PortalItem[] }) {
    return (
        <dl className="grid grid-cols-2 gap-6 rounded-lg bg-[var(--uff-dark-blue)] px-5 py-10 text-center md:grid-cols-4">
            {items.map((item, index) => (
                <div key={index} className="flex flex-col">
                    <dt className="order-2 mt-2 text-sm text-white/85">{item.title}</dt>
                    <dd className="font-[family-name:var(--font-serif)] text-4xl font-bold text-white">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}
function Hero({ item }: { item: PortalItem }) {
    return (
        <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[var(--uff-dark-blue)] px-12 py-16 text-center sm:min-h-96 sm:px-16">
            {safeUrl(item.image, true) && (
                <img
                    src={safeUrl(item.image, true)}
                    alt={item.alt ?? ''}
                    className="absolute inset-0 h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                />
            )}
            <div className="absolute inset-0 bg-black/65" />
            <div className="relative max-w-3xl text-white">
                <h2 className="mb-4 text-3xl font-bold text-white! sm:text-4xl">{item.title}</h2>
                {item.text && <p className="mb-6 leading-relaxed whitespace-pre-wrap text-white/90">{item.text}</p>}
                {safeUrl(item.url) && (
                    <a
                        href={safeUrl(item.url)}
                        className="inline-flex rounded-md bg-[var(--uff-highlight)] px-6 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                        {item.button || 'Saiba mais'}
                    </a>
                )}
            </div>
        </div>
    );
}
export function PortalCarousel({ items, title = 'Destaques' }: { items: PortalItem[]; title?: string }) {
    const [current, setCurrent] = useState(0);
    if (!items.length) return null;
    const selected = Math.min(current, items.length - 1);
    return (
        <section aria-roledescription="carrossel" aria-label={title || 'Destaques'} className="relative overflow-hidden rounded-lg">
            <div aria-live="polite" aria-atomic="true">
                <div role="group" aria-roledescription="slide" aria-label={selected + 1 + ' de ' + items.length}>
                    <Hero item={items[selected]} />
                </div>
            </div>
            {items.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-3 bg-[var(--uff-dark-blue)] p-3 text-white">
                    <button
                        type="button"
                        aria-label="Slide anterior"
                        className="min-h-11 rounded border border-white/50 px-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                        onClick={() => setCurrent((selected - 1 + items.length) % items.length)}
                    >
                        ← Anterior
                    </button>
                    <span className="text-sm">
                        {selected + 1} / {items.length}
                    </span>
                    <button
                        type="button"
                        aria-label="Próximo slide"
                        className="min-h-11 rounded border border-white/50 px-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                        onClick={() => setCurrent((selected + 1) % items.length)}
                    >
                        Próximo →
                    </button>
                </div>
            )}
        </section>
    );
}
export function PortalBlock({ type, items, title, columns = 3 }: { type: PortalVariant; items: PortalItem[]; title?: string; columns?: number }) {
    const grid = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3';
    if (!items.length) return <p className="rounded border border-dashed p-5 text-sm">Adicione conteúdo a este bloco.</p>;
    if (type === 'carousel') return <PortalCarousel items={items} title={title} />;
    if (type === 'banner')
        return (
            <div className="overflow-hidden rounded-lg">
                <Hero item={items[0]} />
            </div>
        );
    if (type === 'stats')
        return (
            <section aria-label={title || 'Indicadores'}>
                {title && <h2 className="mb-5 text-2xl font-bold">{title}</h2>}
                <PortalStats items={items} />
            </section>
        );
    if (type === 'card') return <PortalCard item={items[0]} />;
    return (
        <section aria-label={title || 'Cards'}>
            {title && <h2 className="mb-5 text-2xl font-bold">{title}</h2>}
            <div className={'grid gap-6 ' + grid}>
                {items.map((item, index) => (
                    <PortalCard key={index} item={item} />
                ))}
            </div>
        </section>
    );
}
