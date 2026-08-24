import React from 'react';
import { Clock, FolderOpen, MapPin, Phone, UserCog, Wrench } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const sectoralContacts = [
    {
        icon: <UserCog size={26} />,
        title: 'Coordenação do Programa',
        lines: ['coordenacao@mesc.uff.br', '(22) 2764-9081'],
    },
    {
        icon: <FolderOpen size={26} />,
        title: 'Secretaria Acadêmica',
        lines: ['secretaria@mesc.uff.br', 'Segunda a sexta, das 8h às 17h'],
    },
    {
        icon: <Wrench size={26} />,
        title: 'Suporte Técnico e Laboratórios',
        lines: ['suporte@mesc.uff.br'],
    },
];

const Contato: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
            <Header />

            <main className="m-0 bg-white p-0">
                {/* PAGE HEADER BANNER */}
                <section className="page-header-banner">
                    <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
                    <div className="page-header-overlay"></div>
                    <div className="relative z-10 mx-auto max-w-5xl px-4">
                        <h1 style={{ fontFamily: 'var(--font-serif)' }}>Contato</h1>
                        <div className="page-header-breadcrumb">
                            <a href="/">Home</a> <span className="mx-1">/</span> <span>Contato</span>
                        </div>
                    </div>
                </section>

                {/* FORM + CONTACT INFO SECTION */}
                <section className="contact-section">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                                <div className="contact-form-card">
                                    <h2 className="section-title">Envie uma Mensagem</h2>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="nome" className="block">
                                                    Nome
                                                </label>
                                                <input
                                                    type="text"
                                                    id="nome"
                                                    name="nome"
                                                    className="form-control w-full"
                                                    placeholder="Seu nome completo"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block">
                                                    E-mail
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control w-full"
                                                    placeholder="seu@email.com"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="assunto" className="block">
                                            Assunto
                                        </label>
                                        <input
                                            type="text"
                                            id="assunto"
                                            name="assunto"
                                            className="form-control w-full"
                                            placeholder="Sobre o que deseja falar?"
                                        />
                                        <label htmlFor="mensagem" className="block">
                                            Mensagem
                                        </label>
                                        <textarea
                                            id="mensagem"
                                            name="mensagem"
                                            className="form-control w-full"
                                            rows={5}
                                            placeholder="Escreva sua mensagem..."
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                            style={{ backgroundColor: 'var(--uff-highlight)' }}
                                        >
                                            Enviar Mensagem
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="contact-info-card">
                                    <h5 className="font-bold">Informações de Contato</h5>

                                    <div className="contact-info-item">
                                        <MapPin size={20} />
                                        <p>
                                            Rua Recife, s/n, Jardim Bela Vista
                                            <br />
                                            Rio das Ostras – RJ | CEP: 28895-532
                                        </p>
                                    </div>

                                    <div className="contact-info-item">
                                        <Phone size={20} />
                                        <p>(22) 2764-9081</p>
                                    </div>

                                    <div className="contact-info-item">
                                        <Clock size={20} />
                                        <p>Segunda a sexta, das 8h às 17h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTORAL CONTACTS SECTION */}
                <section className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10 text-center">
                            <h2 className="serif-title">Contatos Setoriais</h2>
                            <p className="text-gray-500">Fale diretamente com o setor responsável pelo seu assunto.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {sectoralContacts.map((contact) => (
                                <div key={contact.title} className="custom-card">
                                    <div className="card-icon">{contact.icon}</div>
                                    <h5>{contact.title}</h5>
                                    <p>
                                        {contact.lines.map((line, i) => (
                                            <React.Fragment key={line}>
                                                {i > 0 && <br />}
                                                {line}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contato;
