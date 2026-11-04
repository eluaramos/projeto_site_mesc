import { Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, Eye, FileText, Save, Send } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import CmsLayout from '../../Layouts/CmsLayout';
import BlockEditor from '../../components/cms/BlockEditor';
import { ContentBlocks, readBlocks } from '../../components/cms/ContentBlocks';
import { safeUrl } from '../../components/cms/contentUrls';
import { dateLabel, StatusBadge } from './Pages';

interface Page {
    id: number;
    title: string;
    slug: string;
    body: string;
    body_format: string;
    locale: string;
    status: string;
    published_content: unknown;
    updated_at: string;
    published_at: string | null;
    summary: string;
    category: string;
    image: string | null;
    image_alt: string | null;
    show_on_home: boolean;
}
interface Event {
    id: number;
    action: string;
    created_at: string;
    user_name: string | null;
}
const actions: Record<string, string> = {
    created: 'Notícia criada',
    updated: 'Rascunho salvo',
    review: 'Enviada para revisão',
    publish: 'Versão publicada',
    archive: 'Notícia arquivada',
};
export default function EditNews({
    page,
    canEdit,
    canPublish,
    events,
}: {
    page: Page | null;
    canEdit: boolean;
    canPublish: boolean;
    events: Event[];
}) {
    const initial = useRef(readBlocks(page?.body ?? '', page?.body_format));
    const form = useForm({
        title: page?.title ?? '',
        slug: page?.slug ?? '',
        body: JSON.stringify(initial.current),
        body_format: 'blocks',
        locale: page?.locale ?? 'pt_BR',
        summary: page?.summary ?? '',
        category: page?.category ?? '',
        image: page?.image ?? '',
        image_alt: page?.image_alt ?? '',
        show_on_home: page?.show_on_home ?? true,
    });
    const [tab, setTab] = useState<'editor' | 'preview'>('editor');
    const [busy, setBusy] = useState(false);
    const [transitionError, setTransitionError] = useState('');
    const [confirmArchive, setConfirmArchive] = useState(false);
    const dirty = form.isDirty;
    // Keep the default values in sync after a successful save so review becomes available.
    function saved() {
        form.setDefaults();
    }
    function submit(event: FormEvent) {
        event.preventDefault();
        if (busy || form.processing) return;
        if (page) form.put('/cms/news/' + page.id, { preserveScroll: true, onSuccess: saved });
        else form.post('/cms/news', { onSuccess: saved });
    }
    useEffect(() => {
        const unsubscribe = router.on('before', (event) => {
            if (form.isDirty && event.detail.visit.method === 'get' && !window.confirm('Há alterações não salvas. Deseja sair desta notícia?'))
                event.preventDefault();
        });
        function beforeUnload(event: BeforeUnloadEvent) {
            if (form.isDirty) {
                event.preventDefault();
                event.returnValue = '';
            }
        }
        window.addEventListener('beforeunload', beforeUnload);
        return () => {
            unsubscribe();
            window.removeEventListener('beforeunload', beforeUnload);
        };
    }, [form.isDirty]);
    function transition(action: string) {
        if (!page || busy || form.processing) return;
        setTransitionError('');
        router.post(
            '/cms/news/' + page.id + '/transition',
            { action },
            {
                preserveScroll: true,
                onStart: () => setBusy(true),
                onFinish: () => setBusy(false),
                onError: () => setTransitionError('Não foi possível concluir a ação. Atualize a página e tente novamente.'),
                onSuccess: () => setConfirmArchive(false),
            },
        );
    }
    const disabled = busy || form.processing;
    const slugFromTitle = (title: string) =>
        title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 160);
    return (
        <CmsLayout title={page ? 'Editar notícia' : 'Nova notícia'} section="news">
            <Link
                href="/cms/news"
                className="mb-5 inline-flex items-center gap-2 text-sm text-[var(--uff-text-muted)] hover:text-[var(--uff-dark-blue)]"
            >
                <ArrowLeft size={16} />
                Todas as notícias
            </Link>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{page ? 'Editar notícia' : 'Nova notícia'}</h1>
                    <p className="mt-2 text-sm text-[var(--uff-text-muted)]">
                        {canEdit ? 'Construa o conteúdo em blocos e acompanhe a prévia.' : 'Confira a prévia do conteúdo salvo antes de publicar.'}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span role="status" className="text-sm text-[var(--uff-text-muted)]">
                        {form.processing
                            ? 'Salvando…'
                            : form.recentlySuccessful
                              ? 'Alterações salvas'
                              : dirty
                                ? 'Alterações não salvas'
                                : 'Conteúdo salvo'}
                    </span>
                    {canEdit && (
                        <button type="submit" form="page-form" className="cms-primary" disabled={disabled}>
                            <Save size={16} />
                            Salvar rascunho
                        </button>
                    )}
                </div>
            </div>
            {(Object.keys(form.errors).length > 0 || transitionError) && (
                <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-semibold">{transitionError || 'Não foi possível salvar. Revise os campos abaixo.'}</p>
                    {Object.entries(form.errors).map(([key, error]) => (
                        <p key={key}>{error}</p>
                    ))}
                </div>
            )}
            <form id="page-form" onSubmit={submit} className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0 space-y-5">
                    <section className="cms-card p-6">
                        <label htmlFor="page-title">Título da notícia</label>
                        <input
                            id="page-title"
                            className="text-xl! font-semibold"
                            required
                            maxLength={200}
                            disabled={!canEdit || disabled}
                            value={form.data.title}
                            onChange={(e) => {
                                const value = e.target.value;
                                const auto = !page && (form.data.slug === slugFromTitle(form.data.title) || !form.data.slug);
                                form.setData((data) => ({ ...data, title: value, slug: auto ? slugFromTitle(value) : data.slug }));
                            }}
                            placeholder="Ex.: O Programa"
                            aria-invalid={!!form.errors.title}
                            aria-describedby="title-error"
                        />
                        <p id="title-error" className="mt-1 text-sm text-red-700">
                            {form.errors.title}
                        </p>
                    </section>
                    <section className="cms-card space-y-4 p-6">
                        <h2 className="font-semibold">Apresentação da notícia</h2>
                        <fieldset disabled={!canEdit || disabled} className="space-y-4">
                            <div>
                                <label htmlFor="news-summary">Resumo</label>
                                <textarea
                                    id="news-summary"
                                    rows={3}
                                    maxLength={500}
                                    required
                                    value={form.data.summary}
                                    onChange={(e) => form.setData('summary', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="news-category">Categoria</label>
                                <input
                                    id="news-category"
                                    maxLength={80}
                                    required
                                    placeholder="Ex.: Editais, Pesquisa, Eventos"
                                    value={form.data.category}
                                    onChange={(e) => form.setData('category', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="news-image">Imagem de capa (HTTPS ou /images/...)</label>
                                <input
                                    id="news-image"
                                    maxLength={2048}
                                    value={form.data.image}
                                    onChange={(e) => form.setData('image', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="news-image-alt">Descrição da imagem</label>
                                <input
                                    id="news-image-alt"
                                    maxLength={1000}
                                    required={!!form.data.image}
                                    value={form.data.image_alt}
                                    onChange={(e) => form.setData('image_alt', e.target.value)}
                                />
                            </div>
                            <label className="flex! items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.data.show_on_home}
                                    onChange={(e) => form.setData('show_on_home', e.target.checked)}
                                />
                                Exibir na Home após a publicação
                            </label>
                            <p className="text-xs text-[var(--uff-text-muted)]">
                                A Home exibe até duas notícias publicadas mais recentes marcadas para destaque. Imagens usam endereços existentes;
                                uploads ainda não estão disponíveis.
                            </p>
                        </fieldset>
                    </section>
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-sm font-semibold text-[var(--uff-dark-blue)]">Conteúdo da notícia</h2>
                        <div role="tablist" aria-label="Modo de edição" className="flex rounded-lg border border-[var(--uff-border)] bg-white p-1">
                            <button
                                type="button"
                                role="tab"
                                id="editor-tab"
                                aria-controls="editor-panel"
                                aria-selected={tab === 'editor'}
                                onClick={() => setTab('editor')}
                                className={
                                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm ' +
                                    (tab === 'editor' ? 'bg-[var(--uff-light-gray)] font-semibold' : 'text-[var(--uff-text-muted)]')
                                }
                            >
                                <FileText size={15} />
                                Editor
                            </button>
                            <button
                                type="button"
                                role="tab"
                                id="preview-tab"
                                aria-controls="preview-panel"
                                aria-selected={tab === 'preview'}
                                onClick={() => setTab('preview')}
                                className={
                                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm ' +
                                    (tab === 'preview' ? 'bg-[var(--uff-light-gray)] font-semibold' : 'text-[var(--uff-text-muted)]')
                                }
                            >
                                <Eye size={15} />
                                Prévia
                            </button>
                        </div>
                    </div>
                    <div role="tabpanel" id="editor-panel" aria-labelledby="editor-tab" hidden={tab !== 'editor'}>
                        <BlockEditor
                            initial={initial.current}
                            disabled={!canEdit || disabled}
                            onChange={(blocks) => form.setData('body', JSON.stringify(blocks))}
                        />
                    </div>
                    <section
                        role="tabpanel"
                        id="preview-panel"
                        aria-labelledby="preview-tab"
                        hidden={tab !== 'preview'}
                        className="cms-card p-6 sm:p-10"
                    >
                        <p className="mb-8 border-b border-[var(--uff-border)] pb-3 text-xs font-medium tracking-widest text-[var(--uff-text-muted)] uppercase">
                            Prévia · conteúdo ainda não publicado
                        </p>
                        <article lang={form.data.locale === 'en' ? 'en' : 'pt-BR'}>
                            <h1 className="mb-8 text-3xl font-bold">{form.data.title || 'Título da notícia'}</h1>
                            <p className="mb-3 text-sm">{form.data.category}</p>
                            <p className="mb-6 text-lg">{form.data.summary}</p>
                            {form.data.image && safeUrl(form.data.image, true) && (
                                <img
                                    className="mb-6 max-h-80 w-full object-contain"
                                    src={safeUrl(form.data.image, true)}
                                    alt={form.data.image_alt}
                                    referrerPolicy="no-referrer"
                                />
                            )}
                            <ContentBlocks body={form.data.body} format="blocks" />
                        </article>
                    </section>
                </div>
                <aside className="space-y-5">
                    <section className="cms-card p-5">
                        <h2 className="mb-4 font-semibold">Publicação</h2>
                        <StatusBadge status={page?.status ?? 'draft'} />
                        <dl className="my-5 space-y-3 text-xs">
                            <div className="flex justify-between gap-2">
                                <dt className="text-[var(--uff-text-muted)]">Última edição</dt>
                                <dd>{dateLabel(page?.updated_at ?? null)}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                                <dt className="text-[var(--uff-text-muted)]">Publicação</dt>
                                <dd>{dateLabel(page?.published_at ?? null)}</dd>
                            </div>
                        </dl>
                        <div className="space-y-3 border-t border-[var(--uff-border)] pt-4">
                            {!page && (
                                <p className="text-xs leading-6 text-[var(--uff-text-muted)]">Salve o primeiro rascunho para iniciar a revisão.</p>
                            )}
                            {page && canEdit && page.status === 'draft' && (
                                <button
                                    type="button"
                                    className="cms-primary w-full"
                                    disabled={dirty || disabled}
                                    onClick={() => transition('review')}
                                >
                                    <Send size={15} />
                                    Enviar para revisão
                                </button>
                            )}
                            {page && canPublish && page.status === 'review' && (
                                <button
                                    type="button"
                                    className="cms-primary w-full"
                                    disabled={dirty || disabled}
                                    onClick={() => transition('publish')}
                                >
                                    <Check size={16} />
                                    Publicar versão salva
                                </button>
                            )}
                            {page && dirty && (
                                <p className="text-xs leading-5 text-amber-800">Salve as alterações para enviar ou publicar esta versão.</p>
                            )}
                            {page && !!page.published_content && (
                                <>
                                    <p className="text-xs leading-6 text-emerald-800">
                                        Uma versão aprovada está no ar. Edições só aparecem no portal após nova publicação.
                                    </p>
                                    <a href={'/noticias/' + page.slug} target="_blank" rel="noreferrer" className="cms-secondary w-full">
                                        <Eye size={15} />
                                        Ver no portal
                                    </a>
                                </>
                            )}
                            {page && canPublish && !!page.published_content && (
                                <button
                                    type="button"
                                    className="w-full p-2 text-sm text-red-700 underline"
                                    disabled={disabled}
                                    onClick={() => setConfirmArchive(true)}
                                >
                                    Arquivar notícia
                                </button>
                            )}
                            {confirmArchive && (
                                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-900">
                                    <p>Retirar esta notícia do portal? O histórico será preservado.</p>
                                    <div className="mt-3 flex gap-3">
                                        <button
                                            type="button"
                                            className="font-semibold underline"
                                            disabled={disabled}
                                            onClick={() => transition('archive')}
                                        >
                                            Confirmar
                                        </button>
                                        <button type="button" onClick={() => setConfirmArchive(false)}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="cms-card space-y-4 p-5">
                        <h2 className="font-semibold">Configurações</h2>
                        <div>
                            <label htmlFor="page-slug">Endereço da notícia</label>
                            <input
                                id="page-slug"
                                value={form.data.slug}
                                onChange={(e) => form.setData('slug', e.target.value)}
                                readOnly={!!page}
                                disabled={!canEdit || disabled}
                                required
                                maxLength={160}
                                aria-invalid={!!form.errors.slug}
                            />
                            <p className="mt-2 text-xs break-all text-[var(--uff-text-muted)]">/noticias/{form.data.slug || 'endereco-da-pagina'}</p>
                            <p className="mt-1 text-xs text-red-700">{form.errors.slug}</p>
                            {page && <p className="mt-2 text-xs text-[var(--uff-text-muted)]">Endereço fixo para preservar os links.</p>}
                        </div>
                        <div>
                            <label htmlFor="page-locale">Idioma do conteúdo</label>
                            <select
                                id="page-locale"
                                value={form.data.locale}
                                disabled={!canEdit || disabled}
                                onChange={(e) => form.setData('locale', e.target.value)}
                            >
                                <option value="pt_BR">Português</option>
                                <option value="en">Inglês</option>
                            </select>
                        </div>
                    </section>
                    <section className="cms-card p-5">
                        <h2 className="mb-4 font-semibold">Atividade recente</h2>
                        {!events.length && <p className="text-xs text-[var(--uff-text-muted)]">As ações serão registradas após salvar.</p>}
                        <ol className="space-y-4">
                            {events.map((event) => (
                                <li key={event.id} className="border-l-2 border-[var(--uff-highlight)] pl-3">
                                    <p className="text-xs font-semibold">{actions[event.action] ?? event.action}</p>
                                    <p className="mt-1 text-xs text-[var(--uff-text-muted)]">{event.user_name ?? 'Usuário removido'}</p>
                                    <time className="text-xs text-[var(--uff-text-muted)]">
                                        {dateLabel(event.created_at.endsWith('Z') ? event.created_at : event.created_at.replace(' ', 'T') + 'Z')}
                                    </time>
                                </li>
                            ))}
                        </ol>
                    </section>
                </aside>
            </form>
        </CmsLayout>
    );
}
