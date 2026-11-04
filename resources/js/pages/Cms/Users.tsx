import { Link, useForm } from '@inertiajs/react';
import { Plus, Search, Users as UsersIcon } from 'lucide-react';
import { type FormEvent } from 'react';
import CmsLayout from '../../Layouts/CmsLayout';

export const roleLabels: Record<string, string> = { admin: 'Administrador', editor: 'Editor', revisor: 'Revisor', colaborador: 'Colaborador' };
interface UserRow {
    id: number;
    name: string;
    email: string;
    roles: string[];
}
export default function Users({
    users,
    filters,
}: {
    users: { data: UserRow[]; total: number; current_page: number; last_page: number; prev_page_url: string | null; next_page_url: string | null };
    filters: { q?: string };
}) {
    const form = useForm({ q: filters.q ?? '' });
    function search(event: FormEvent) {
        event.preventDefault();
        form.get('/cms/users', { preserveState: true, replace: true });
    }
    return (
        <CmsLayout title="Usuários" section="users">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Usuários</h1>
                    <p className="mt-2 text-sm text-[var(--uff-text-muted)]">Gerencie as contas e os perfis de acesso ao portal.</p>
                </div>
                <Link href="/cms/users/create" className="cms-primary">
                    <Plus size={17} />
                    Novo usuário
                </Link>
            </div>
            <section className="cms-card overflow-hidden">
                <form onSubmit={search} className="flex flex-wrap items-end gap-3 border-b border-[var(--uff-border)] p-5">
                    <div className="min-w-48 flex-1">
                        <label htmlFor="user-search">Buscar por nome ou e-mail</label>
                        <input id="user-search" value={form.data.q} onChange={(e) => form.setData('q', e.target.value)} maxLength={200} />
                    </div>
                    <button className="cms-secondary" disabled={form.processing}>
                        <Search size={16} />
                        Buscar
                    </button>
                    <Link href="/cms/users" className="cms-secondary">
                        Limpar
                    </Link>
                </form>
                {users.data.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[var(--uff-light-gray)]">
                                <tr>
                                    <th className="px-5 py-3">Nome</th>
                                    <th className="px-5 py-3">E-mail</th>
                                    <th className="px-5 py-3">Perfis</th>
                                    <th className="px-5 py-3">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--uff-border)]">
                                {users.data.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-5 py-4 font-semibold">{user.name}</td>
                                        <td className="px-5 py-4">{user.email}</td>
                                        <td className="px-5 py-4">{user.roles.map((role) => roleLabels[role] ?? role).join(', ') || 'Sem perfil'}</td>
                                        <td className="px-5 py-4">
                                            <Link
                                                href={'/cms/users/' + user.id + '/edit'}
                                                className="font-semibold text-[var(--uff-dark-blue)] underline"
                                            >
                                                Gerenciar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <UsersIcon className="mx-auto mb-4" />
                        <p>Nenhum usuário encontrado.</p>
                    </div>
                )}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--uff-border)] p-5 text-sm">
                    <p>
                        {users.total} usuário(s) · Página {users.current_page} de {users.last_page}
                    </p>
                    <nav aria-label="Paginação" className="flex gap-2">
                        {users.prev_page_url && (
                            <Link className="cms-secondary" href={users.prev_page_url}>
                                Anterior
                            </Link>
                        )}
                        {users.next_page_url && (
                            <Link className="cms-secondary" href={users.next_page_url}>
                                Próxima
                            </Link>
                        )}
                    </nav>
                </div>
            </section>
        </CmsLayout>
    );
}
