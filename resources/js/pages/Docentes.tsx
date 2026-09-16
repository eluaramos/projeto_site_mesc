import React from 'react';
import { Mail, UserRound } from 'lucide-react';

import Footer from '../components/Footer';
import Header from '../components/Header';

interface Docente {
    id: number;
    nome: string;
    email: string;
    grupo: 'principal' | 'apoio';
    ordem: number;
}

interface DocentesProps {
    docentes: Docente[];
}

function Initials({ name }: { name: string }) {
    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

    return (
        <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold"
            style={{
                backgroundColor: 'var(--uff-highlight-light, #e8f0fe)',
                color: 'var(--uff-highlight, #007bff)',
            }}
            aria-hidden="true"
        >
            {initials}
        </div>
    );
}

function FacultyGrid({ faculty }: { faculty: Docente[] }) {
    if (faculty.length === 0) {
        return (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-500">
                Nenhum docente cadastrado neste grupo.
            </div>
        );
    }

    return (
        <div className="grid gap-5 md:grid-cols-2">
            {faculty.map((docente) => (
                <article
                    key={docente.id}
                    className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                    <Initials name={docente.nome} />

                    <div className="min-w-0 flex-1">
                        <h3
                            className="text-base font-semibold leading-snug"
                            style={{ color: 'var(--uff-dark-blue, #003366)' }}
                        >
                            {docente.nome}
                        </h3>

                        <a
                            href={`mailto:${docente.email}`}
                            className="mt-2 flex items-center gap-2 break-all text-sm text-gray-500 transition-colors hover:underline"
                            style={{ textDecorationColor: 'var(--uff-highlight, #007bff)' }}
                        >
                            <Mail size={15} className="shrink-0" />
                            {docente.email}
                        </a>
                    </div>
                </article>
            ))}
        </div>
    );
}

const Docentes: React.FC<DocentesProps> = ({ docentes }) => {
    const quadroPrincipal = docentes.filter(
        (docente) => docente.grupo === 'principal',
    );

    const quadroApoio = docentes.filter(
        (docente) => docente.grupo === 'apoio',
    );

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans">
            <Header />

            <main className="flex-1">
                <section
                    className="border-b border-white/10 py-16 text-white"
                    style={{ backgroundColor: 'var(--uff-dark-blue, #003366)' }}
                >
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-4 flex items-center gap-3 text-sm font-medium text-white/70">
                            <UserRound size={18} />
                            <span>Pessoas</span>
                        </div>

                        <h1
                            className="text-4xl font-bold md:text-5xl"
                            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
                        >
                            Docentes
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
                            Conheça o corpo docente do Mestrado Profissional em Engenharia
                            de Produção e Sistemas Computacionais da Universidade Federal
                            Fluminense.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10">
                            <p
                                className="text-sm font-semibold uppercase tracking-wider"
                                style={{ color: 'var(--uff-highlight, #007bff)' }}
                            >
                                Corpo docente
                            </p>

                            <h2
                                className="mt-2 text-3xl font-bold"
                                style={{
                                    color: 'var(--uff-dark-blue, #003366)',
                                    fontFamily: 'var(--font-serif, Georgia, serif)',
                                }}
                            >
                                Quadro Principal
                            </h2>

                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500">
                                Professores integrantes do quadro principal do MESC.
                            </p>
                        </div>

                        <FacultyGrid faculty={quadroPrincipal} />
                    </div>
                </section>

                <section className="border-t border-gray-100 bg-gray-50 py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10">
                            <p
                                className="text-sm font-semibold uppercase tracking-wider"
                                style={{ color: 'var(--uff-highlight, #007bff)' }}
                            >
                                Colaboração
                            </p>

                            <h2
                                className="mt-2 text-3xl font-bold"
                                style={{
                                    color: 'var(--uff-dark-blue, #003366)',
                                    fontFamily: 'var(--font-serif, Georgia, serif)',
                                }}
                            >
                                Quadro de Apoio
                            </h2>

                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500">
                                Professores integrantes do quadro de apoio do MESC.
                            </p>
                        </div>

                        <FacultyGrid faculty={quadroApoio} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Docentes;
