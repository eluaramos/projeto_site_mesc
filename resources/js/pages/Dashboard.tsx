import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, FileText, Plus, ShieldCheck } from 'lucide-react';
import CmsLayout from '../Layouts/CmsLayout';
export default function Dashboard() {
    const { auth } = usePage<{
        auth: {
            user: { name: string; roles: string[]; can_view_pages: boolean; can_edit_pages: boolean; is_admin: boolean; can_view_news: boolean };
        };
    }>().props;
    const canView = auth.user.can_view_pages;
    const canEdit = auth.user.can_edit_pages;
    return (
        <CmsLayout title="Visão geral" section="dashboard">
            <p className="mb-2 text-xs font-semibold tracking-widest text-[var(--uff-highlight)] uppercase">Gestão do portal MESC</p>
            <h1 className="text-3xl font-bold tracking-tight">Olá, {auth.user.name.split(' ')[0]}.</h1>
            <p className="mt-3 text-[var(--uff-text-muted)]">Este é o seu espaço para cuidar das páginas institucionais.</p>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <section className="cms-card p-7">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--uff-light-gray)] text-[var(--uff-dark-blue)]">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-xl font-semibold">Conteúdo que informa e conecta</h2>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--uff-text-muted)]">
                        Crie páginas, organize o conteúdo em blocos e envie para revisão. Cada publicação passa por um fluxo de aprovação.
                    </p>
                    {canView ? (
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link href="/cms/pages" className="cms-primary">
                                Gerenciar páginas
                                <ArrowRight size={16} />
                            </Link>
                            {canEdit && (
                                <Link href="/cms/pages/create" className="cms-secondary">
                                    <Plus size={16} />
                                    Nova página
                                </Link>
                            )}
                        </div>
                    ) : (
                        <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
                            Sua conta ainda não tem acesso editorial. Solicite ao administrador o perfil adequado.
                        </p>
                    )}
                </section>
                <section className="cms-card p-7">
                    <ShieldCheck className="mb-6 text-[var(--uff-highlight)]" size={28} />
                    <h2 className="text-lg font-semibold">Como funciona a publicação</h2>
                    <ol className="mt-5 space-y-5 text-sm">
                        {[
                            ['01', 'Rascunho', 'Prepare o texto e confira a prévia.'],
                            ['02', 'Revisão', 'Envie o conteúdo para avaliação.'],
                            ['03', 'Publicação', 'Um revisor publica a versão aprovada.'],
                        ].map(([number, title, text]) => (
                            <li key={number} className="flex gap-4">
                                <span className="font-semibold text-[var(--uff-highlight)]">{number}</span>
                                <div>
                                    <strong className="block font-semibold">{title}</strong>
                                    <p className="mt-1 text-[var(--uff-text-muted)]">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
            {auth.user.can_view_news && (
                <section className="cms-card mt-6 p-7">
                    <h2 className="text-xl font-semibold">Notícias da Home</h2>
                    <p className="my-3 text-sm text-[var(--uff-text-muted)]">
                        Crie notícias, envie para revisão e escolha quais publicações aparecem na Home.
                    </p>
                    <Link href="/cms/news" className="cms-primary">
                        Gerenciar notícias
                        <ArrowRight size={16} />
                    </Link>
                </section>
            )}
            {auth.user.is_admin && (
                <section className="cms-card mt-6 p-7">
                    <h2 className="text-xl font-semibold">Gerenciamento de usuários</h2>
                    <p className="my-3 text-sm text-[var(--uff-text-muted)]">Cadastre contas e defina os perfis de acesso da equipe.</p>
                    <Link href="/cms/users" className="cms-primary">
                        Gerenciar usuários
                        <ArrowRight size={16} />
                    </Link>
                </section>
            )}
        </CmsLayout>
    );
}
