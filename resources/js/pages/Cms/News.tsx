import { Link, router, useForm } from '@inertiajs/react';
import { ArrowRight, FileText, Plus, Search } from 'lucide-react';
import { type FormEvent } from 'react';
import CmsLayout from '../../Layouts/CmsLayout';

import { StatusBadge, dateLabel, statuses } from './Pages';
interface PageRow {
    last_editor: string | null;
    id: number;
    title: string;
    slug: string;
    locale: string;
    status: string;
    updated_at: string;
    published_at: string | null;
}
export default function News({
    pages,
    canEdit,
    canCreate,
    filters,
    counts,
}: {
    pages: { data: PageRow[]; total: number; current_page: number; last_page: number; prev_page_url: string | null; next_page_url: string | null };
    canEdit: boolean;
    canCreate: boolean;
    filters: { q?: string; status?: string; locale?: string };
    counts: Record<string, number>;
}) {
    const form = useForm({ q: filters.q ?? '', status: filters.status ?? '', locale: filters.locale ?? '' });
    function search(event: FormEvent) {
        event.preventDefault();
        form.get('/cms/news', { preserveState: true, replace: true });
    }
    const total = Object.values(counts).reduce((sum, value) => sum + Number(value), 0);
    return (
        <CmsLayout title="Notícias" section="news">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-widest text-[var(--uff-highlight)] uppercase">Conteúdo de divulgação</p>
                    <h1 className="text-3xl font-bold tracking-tight">Notícias</h1>
                    <p className="mt-2 text-sm text-[var(--uff-text-muted)]">Organize o conteúdo do portal, da primeira ideia à publicação.</p>
                </div>
                {canCreate && (
                    <Link href="/cms/news/create" className="cms-primary">
                        <Plus size={17} />
                        Nova notícia
                    </Link>
                )}
            </div>
            <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
                {Object.entries(statuses).map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => {
                            form.setData('status', key);
                            router.get('/cms/news', { ...form.data, status: key }, { preserveState: true, replace: true });
                        }}
                        className={'cms-card p-4 text-left ' + (filters.status === key ? 'ring-2 ring-[var(--uff-highlight)]' : '')}
                    >
                        <span className="block text-xs text-[var(--uff-text-muted)]">{label}</span>
                        <strong className="mt-1 block text-2xl text-[var(--uff-text-dark)]">{counts[key] ?? 0}</strong>
                    </button>
                ))}
            </div>
            <section className="cms-card overflow-hidden" aria-label="Lista de notícias">
                <form
                    onSubmit={search}
                    className="grid items-end gap-3 border-b border-[var(--uff-border)] p-5 sm:grid-cols-2 xl:grid-cols-[1fr_170px_160px_auto_auto]"
                >
                    <div>
                        <label htmlFor="search">Buscar por título</label>
                        <input id="search" placeholder="Ex.: O Programa" value={form.data.q} onChange={(e) => form.setData('q', e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="status-filter">Estado editorial</label>
                        <select id="status-filter" value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                            <option value="">Todos ({total})</option>
                            {Object.entries(statuses).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="locale-filter">Idioma</label>
                        <select id="locale-filter" value={form.data.locale} onChange={(e) => form.setData('locale', e.target.value)}>
                            <option value="">Todos os idiomas</option>
                            <option value="pt_BR">Português</option>
                            <option value="en">Inglês</option>
                        </select>
                    </div>
                    <button className="cms-secondary" disabled={form.processing}>
                        <Search size={16} />
                        Filtrar
                    </button>
                    <Link href="/cms/news" className="py-3 text-center text-sm text-[var(--uff-text-muted)] underline">
                        Limpar
                    </Link>
                </form>
                {!pages.data.length ? (
                    <div className="px-6 py-16 text-center">
                        <FileText size={36} className="mx-auto mb-4 text-slate-300" />
                        <h2 className="font-semibold">Nenhuma página encontrada</h2>
                        <p className="mt-2 text-sm text-[var(--uff-text-muted)]">
                            {total ? 'Ajuste os filtros para encontrar o conteúdo.' : 'Comece criando a primeira notícia institucional do MESC.'}
                        </p>
                        {canCreate && !total && (
                            <Link className="cms-primary mt-5" href="/cms/news/create">
                                Criar primeira notícia
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[var(--uff-light-gray)] text-xs tracking-wide text-[var(--uff-text-muted)] uppercase">
                                <tr>
                                    <th className="px-5 py-3">Notícia</th>
                                    <th className="px-5 py-3">Estado</th>
                                    <th className="px-5 py-3">Idioma</th>
                                    <th className="px-5 py-3">Última edição</th>
                                    <th className="px-5 py-3">
                                        <span className="sr-only">Ação</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--uff-border)]">
                                {pages.data.map((page) => (
                                    <tr key={page.id} className="hover:bg-[var(--uff-light-gray)]">
                                        <td className="min-w-52 px-5 py-5">
                                            <Link
                                                className="font-semibold text-[var(--uff-text-dark)] hover:underline"
                                                href={'/cms/news/' + page.id + '/edit'}
                                            >
                                                {page.title}
                                            </Link>
                                            <p className="mt-1 text-xs text-[var(--uff-text-muted)]">/noticias/{page.slug}</p>
                                        </td>
                                        <td className="px-5 py-5">
                                            <StatusBadge status={page.status} />
                                            {page.published_at && page.status !== 'published' && (
                                                <p className="mt-1 text-xs text-[var(--uff-text-muted)]">Versão anterior no ar</p>
                                            )}
                                        </td>
                                        <td className="px-5 py-5">{page.locale === 'en' ? 'EN' : 'PT'}</td>
                                        <td className="px-5 py-5 whitespace-nowrap text-[var(--uff-text-muted)]">
                                            {dateLabel(page.updated_at)}
                                            <p className="mt-1 text-xs text-[var(--uff-text-muted)]">{page.last_editor ?? 'Autor não registrado'}</p>
                                        </td>
                                        <td className="px-5 py-5">
                                            <Link
                                                className="inline-flex items-center gap-2 font-medium text-[var(--uff-dark-blue)]"
                                                href={'/cms/news/' + page.id + '/edit'}
                                            >
                                                {canEdit ? 'Editar' : 'Revisar'}
                                                <ArrowRight size={15} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--uff-border)] px-5 py-4 text-sm text-[var(--uff-text-muted)]">
                    <p>
                        {pages.total} resultado(s) · Página {pages.current_page} de {pages.last_page}
                    </p>
                    <nav aria-label="Paginação" className="flex gap-2">
                        {pages.prev_page_url && (
                            <Link className="cms-secondary" href={pages.prev_page_url}>
                                Anterior
                            </Link>
                        )}
                        {pages.next_page_url && (
                            <Link className="cms-secondary" href={pages.next_page_url}>
                                Próxima
                            </Link>
                        )}
                    </nav>
                </div>
            </section>
        </CmsLayout>
    );
}
