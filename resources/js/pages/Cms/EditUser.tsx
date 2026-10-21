import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import CmsLayout from '../../Layouts/CmsLayout';
import { roleLabels } from './Users';

interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}
export default function EditUser({ user, availableRoles }: { user: User | null; availableRoles: string[] }) {
    const { auth } = usePage<{ auth: { user: { id: number } } }>().props;
    const self = user?.id === auth.user.id;
    const [confirmDelete, setConfirmDelete] = useState(false);
    const form = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',
        roles: user?.roles ?? ['colaborador'],
    });
    const deletion = useForm({});
    function submit(event: FormEvent) {
        event.preventDefault();
        const options = { preserveScroll: true, onSuccess: () => form.reset('password', 'password_confirmation') };
        if (user) form.put('/cms/users/' + user.id, options);
        else form.post('/cms/users', options);
    }
    return (
        <CmsLayout title={user ? 'Editar usuário' : 'Novo usuário'} section="users">
            <Link href="/cms/users" className="mb-5 inline-flex items-center gap-2 text-sm underline">
                <ArrowLeft size={16} />
                Todos os usuários
            </Link>
            <h1 className="mb-6 text-3xl font-bold">{user ? 'Editar usuário' : 'Novo usuário'}</h1>
            {form.hasErrors && (
                <div role="alert" className="mb-5 rounded border border-red-200 bg-red-50 p-4 text-red-800">
                    <p className="font-semibold">Revise os dados informados.</p>
                    {Object.entries(form.errors).map(([field, error]) => (
                        <p key={field}>{error}</p>
                    ))}
                </div>
            )}
            <form onSubmit={submit} className="cms-card max-w-3xl space-y-5 p-6">
                <fieldset disabled={form.processing || deletion.processing} className="space-y-5">
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            autoComplete="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            required
                            maxLength={255}
                            aria-invalid={!!form.errors.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="off"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value.toLowerCase())}
                            required
                            maxLength={255}
                            aria-invalid={!!form.errors.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">{user ? 'Nova senha (opcional)' : 'Senha inicial'}</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            required={!user}
                            minLength={12}
                            maxLength={255}
                            aria-describedby="password-help"
                        />
                        <p id="password-help" className="mt-2 text-xs text-[var(--uff-text-muted)]">
                            Use pelo menos 12 caracteres, com letras e números. {user && 'Deixe vazio para manter a senha atual.'}
                        </p>
                    </div>
                    <div>
                        <label htmlFor="password_confirmation">Confirmar senha</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                            required={!user || !!form.data.password}
                        />
                    </div>
                    <fieldset>
                        <legend className="mb-3 font-semibold text-[var(--uff-dark-blue)]">Perfis de acesso</legend>
                        <div className="flex flex-wrap gap-5">
                            {availableRoles.map((role) => (
                                <label key={role} className="flex! items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.data.roles.includes(role)}
                                        disabled={self && role === 'admin'}
                                        onChange={(e) =>
                                            form.setData(
                                                'roles',
                                                e.target.checked ? [...form.data.roles, role] : form.data.roles.filter((value) => value !== role),
                                            )
                                        }
                                    />
                                    {roleLabels[role] ?? role}
                                </label>
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-[var(--uff-text-muted)]">
                            Administrador gerencia usuários; editor prepara páginas; revisor publica; colaborador não acessa o CMS de páginas.
                        </p>
                        {self && <p className="mt-2 text-xs text-[var(--uff-text-muted)]">Seu próprio perfil de administrador deve ser mantido.</p>}
                    </fieldset>
                    <button className="cms-primary">
                        <Save size={16} />
                        {form.processing ? 'Salvando…' : 'Salvar usuário'}
                    </button>
                </fieldset>
                {form.recentlySuccessful && (
                    <p role="status" className="text-emerald-800">
                        Usuário salvo.
                    </p>
                )}
            </form>
            {user && !self && (
                <section className="cms-card mt-6 max-w-3xl p-6">
                    <h2 className="font-semibold">Excluir conta</h2>
                    <p className="my-3 text-sm text-[var(--uff-text-muted)]">
                        A exclusão é permanente. Confira o nome e o e-mail antes de confirmar.
                    </p>
                    {confirmDelete ? (
                        <div className="space-y-3">
                            <p>
                                Excluir a conta de <strong>{user.name}</strong> ({user.email})?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    disabled={deletion.processing || form.processing}
                                    onClick={() => deletion.delete('/cms/users/' + user.id)}
                                    className="cms-secondary text-red-800!"
                                >
                                    Confirmar exclusão
                                </button>
                                <button type="button" className="cms-secondary" onClick={() => setConfirmDelete(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button type="button" className="cms-secondary text-red-800!" onClick={() => setConfirmDelete(true)}>
                            Excluir usuário
                        </button>
                    )}
                    {deletion.hasErrors && (
                        <div role="alert" className="mt-3 text-red-800">
                            {Object.values(deletion.errors).join(' ')}
                        </div>
                    )}
                </section>
            )}
        </CmsLayout>
    );
}
