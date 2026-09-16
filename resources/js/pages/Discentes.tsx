import React from 'react';
import {GraduationCap, UsersRound } from 'lucide-react';

import Footer from '../components/Footer';
import Header from '../components/Header';

interface Discente {
    id: number;
    nome: string;
    ordem: number;
}

interface Turma {
    id: number;
    ano: number;
    discentes: Discente[];
}

interface DiscentesProps {
    turmas: Turma[];
}

const Discentes: React.FC<DiscentesProps> = ({ turmas }) => {
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
                            <UsersRound size={18} />
                            <span>Pessoas</span>
                        </div>

                        <h1
                            className="text-4xl font-bold md:text-5xl"
                            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
                        >
                            Discentes
                        </h1>

                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
                            Consulte os alunos e egressos do MESC organizados por turma de ingresso.
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
                                Comunidade acadêmica
                            </p>

                            <h2
                                className="mt-2 text-3xl font-bold"
                                style={{
                                    color: 'var(--uff-dark-blue, #003366)',
                                    fontFamily: 'var(--font-serif, Georgia, serif)',
                                }}
                            >
                                Turmas do MESC
                            </h2>

                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-500">
                                Os discentes são apresentados de acordo com sua turma de ingresso no programa.
                            </p>
                        </div>

                        {turmas.length === 0 ? (
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-500">
                                Nenhuma turma cadastrada.
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {turmas.map((turma) => (
                                    <article
                                        key={turma.id}
                                        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                                    >
                                        <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="flex h-11 w-11 items-center justify-center rounded-lg"
                                                    style={{
                                                        backgroundColor:
                                                            'var(--uff-highlight-light, #e8f0fe)',
                                                        color: 'var(--uff-highlight, #007bff)',
                                                    }}
                                                >
                                                    <GraduationCap size={23} />
                                                </div>

                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                        Turma
                                                    </p>

                                                    <h3
                                                        className="text-xl font-bold"
                                                        style={{
                                                            color: 'var(--uff-dark-blue, #003366)',
                                                        }}
                                                    >
                                                        {turma.ano}
                                                    </h3>
                                                </div>
                                            </div>

                                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm">
                                                {turma.discentes.length}{' '}
                                                {turma.discentes.length === 1
                                                    ? 'discente'
                                                    : 'discentes'}
                                            </span>
                                        </div>

                                        {turma.discentes.length === 0 ? (
                                            <div className="px-6 py-5 text-sm text-gray-500">
                                                Nenhum discente cadastrado nesta turma.
                                            </div>
                                        ) : (
                                            <div className="grid gap-x-8 gap-y-0 px-6 py-3 md:grid-cols-2">
                                                {turma.discentes.map((discente) => (
                                                    <div
                                                        key={discente.id}
                                                        className="flex items-center gap-3 border-b border-gray-100 py-4 last:border-0 md:[&:nth-last-child(-n+2)]:border-0"
                                                    >
                                                        <span
                                                            className="h-2 w-2 shrink-0 rounded-full"
                                                            style={{
                                                                backgroundColor:
                                                                    'var(--uff-highlight, #007bff)',
                                                            }}
                                                        />

                                                        <span className="text-sm leading-snug text-gray-700">
                                                            {discente.nome}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Discentes;
