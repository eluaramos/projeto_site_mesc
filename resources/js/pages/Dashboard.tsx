import Header from '../components/Header';
import Footer from '../components/Footer';
import { usePage } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface PageProps {
    auth: { user: User };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-gray-50 py-12">
                <div className="mx-auto max-w-5xl px-4">
                    <h1
                        className="mb-2 text-3xl font-bold"
                        style={{ color: 'var(--uff-dark-blue)', fontFamily: 'var(--font-serif)' }}
                    >
                        Painel Administrativo
                    </h1>
                    <p className="mb-8 text-gray-500">
                        Bem-vindo(a), {auth.user.name}.
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="font-semibold" style={{ color: 'var(--uff-dark-blue)' }}>
                                Notícias
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Gerenciar publicações</p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="font-semibold" style={{ color: 'var(--uff-dark-blue)' }}>
                                Documentos
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Upload e gestão de arquivos</p>
                        </div>
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="font-semibold" style={{ color: 'var(--uff-dark-blue)' }}>
                                Usuários
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Gerenciar acessos</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}