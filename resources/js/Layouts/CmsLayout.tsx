import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, FileText, LayoutDashboard, LogOut, Newspaper, Users } from 'lucide-react';
import { type ReactNode } from 'react';
import '../../css/cms.css';

export default function CmsLayout({
    children,
    title,
    section = 'pages',
}: {
    children: ReactNode;
    title: string;
    section?: 'dashboard' | 'pages' | 'users' | 'news' | 'news';
}) {
    const { auth } = usePage<{
        auth: { user: { name: string; roles: string[]; can_view_pages: boolean; can_view_news: boolean; is_admin: boolean } | null };
    }>().props;
    const canView = auth.user?.can_view_pages;
    return (
        <div className="cms-shell min-h-screen bg-[var(--uff-page-background)] text-[var(--uff-text-dark)]">
            <Head title={title + ' | CMS MESC'}>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <a href="#cms-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-3">
                Pular para o conteúdo
            </a>
            <aside className="cms-sidebar border-b border-[var(--uff-border)] text-white lg:fixed lg:inset-y-0 lg:w-60">
                <Link href="/dashboard" className="flex items-center gap-3 px-6 py-7">
                    <img src="/images/Logo_MESC.png" alt="" className="h-12 w-12 rounded bg-white object-contain p-1" />
                    <span>
                        <strong className="block text-lg tracking-wide">MESC</strong>
                        <span className="text-xs text-slate-300">Gestão do portal</span>
                    </span>
                </Link>
                <nav aria-label="Administração" className="flex flex-wrap gap-2 px-3 pb-4 lg:block lg:space-y-2">
                    <Link
                        href="/dashboard"
                        aria-current={section === 'dashboard' ? 'page' : undefined}
                        className={
                            'flex items-center gap-3 rounded-lg px-4 py-3 text-sm ' +
                            (section === 'dashboard' ? 'cms-nav-active font-semibold' : 'cms-nav-link text-slate-200')
                        }
                    >
                        <LayoutDashboard size={18} />
                        Visão geral
                    </Link>
                    {canView && (
                        <Link
                            href="/cms/pages"
                            aria-current={section === 'pages' ? 'page' : undefined}
                            className={
                                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm ' +
                                (section === 'pages' ? 'cms-nav-active font-semibold' : 'cms-nav-link text-slate-200')
                            }
                        >
                            <FileText size={18} />
                            Páginas
                        </Link>
                    )}
                    {auth.user?.can_view_news && (
                        <Link
                            href="/cms/news"
                            aria-current={section === 'news' ? 'page' : undefined}
                            className={
                                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm ' +
                                (section === 'news' ? 'cms-nav-active font-semibold' : 'cms-nav-link text-slate-200')
                            }
                        >
                            <Newspaper size={18} />
                            Notícias
                        </Link>
                    )}
                    {auth.user?.is_admin && (
                        <Link
                            href="/cms/users"
                            aria-current={section === 'users' ? 'page' : undefined}
                            className={
                                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm ' +
                                (section === 'users' ? 'cms-nav-active font-semibold' : 'cms-nav-link text-slate-200')
                            }
                        >
                            <Users size={18} />
                            Usuários
                        </Link>
                    )}
                </nav>
                <div className="hidden border-t border-white/10 px-6 py-6 text-xs leading-6 text-slate-300 lg:block">
                    Portal institucional
                    <br />
                    Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais
                </div>
                <a href="/" className="hidden items-center gap-2 px-6 py-3 text-sm text-slate-200 lg:flex">
                    Visitar portal <ArrowUpRight size={16} />
                </a>
            </aside>
            <div className="lg:pl-60">
                <header className="flex items-center justify-between gap-4 border-b border-[var(--uff-border)] bg-white px-5 py-4 lg:px-9">
                    <span className="text-sm text-[var(--uff-text-muted)]">
                        Administração <span className="mx-2 text-slate-300">/</span>{' '}
                        <span className="text-[var(--uff-text-dark)]">
                            {section === 'pages' ? 'Páginas' : section === 'users' ? 'Usuários' : section === 'news' ? 'Notícias' : 'Visão geral'}
                        </span>
                    </span>
                    <div className="flex items-center gap-4">
                        <span className="hidden text-sm font-medium sm:block">{auth.user?.name}</span>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2 text-sm text-[var(--uff-text-muted)] hover:text-[var(--uff-dark-blue)]"
                        >
                            <LogOut size={16} />
                            Sair
                        </Link>
                    </div>
                </header>
                <main id="cms-main" className="mx-auto max-w-[1440px] p-5 lg:p-9">
                    {children}
                </main>
            </div>
        </div>
    );
}
