import React from 'react';
import { Mail, Phone } from 'lucide-react';
import UniversityMap from './UniversityMap';

const institutionalLinks = [
    {
        label: 'Universidade Federal Fluminense',
        href: 'https://www.uff.br/',
    },
    {
        label: 'Instituto de Ciência e Tecnologia',
        href: 'https://ict.uff.br/',
    },
    {
        label: 'CAPES',
        href: 'https://www.gov.br/capes/',
    },
    {
        label: 'CNPq',
        href: 'https://www.gov.br/cnpq/',
    },
    {
        label: 'Sociedade Brasileira de Computação',
        href: 'https://www.sbc.org.br/',
    },
];

const socialLinks = [
    {
        name: 'YouTube',
        icon: '/images/youtube.png',
        href: '#',
    },
    {
        name: 'x',
        icon: '/images/x.png',
        href: '#',
    },
    {
        name: 'Instagram',
        icon: '/images/instagram.png',
        href: '#',
    },
];

const sectionTitleStyle = {
    fontFamily: 'var(--font-serif)',
    color: 'var(--uff-highlight)',
};

const Footer: React.FC = () => {
    return (
        <footer
            className="mt-auto text-white"
            style={{
                backgroundColor: 'var(--uff-dark-blue)',
                borderTop: '4px solid var(--uff-highlight)',
            }}
        >
            <div className="mx-auto max-w-7xl px-5 py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
                    {/* COLUNA 1 — MAPA */}
                    <div className="md:col-span-4">
                        <h5
                            className="mb-4 text-lg font-semibold"
                            style={sectionTitleStyle}
                        >
                            Localização
                        </h5>

                        <div className="h-56 overflow-hidden rounded-sm border border-white/10 shadow">
                            <UniversityMap
                                lat={-22.50305788028608}
                                lng={-41.9235926249422}
                            />
                        </div>
                    </div>

                    {/* COLUNA 2 — ENDEREÇO E CONTATO */}
                    <div className="md:col-span-3">
                        <h5
                            className="mb-4 text-lg font-semibold"
                            style={sectionTitleStyle}
                        >
                            Endereço e Contato
                        </h5>

                        <address className="not-italic">
                            <p className="mb-3 text-sm font-semibold leading-relaxed text-white">
                                Instituto de Ciência e Tecnologia
                                <br />
                                Universidade Federal Fluminense
                            </p>

                            <p className="mb-4 text-sm leading-relaxed text-white/70">
                                Rua Recife, s/n – Jardim Bela Vista
                                <br />
                                Rio das Ostras – RJ
                                <br />
                                CEP: 28895-532
                            </p>

                            <div className="space-y-2 text-sm text-white/70">
                                <a
                                    href="tel:+552227649081"
                                    className="flex w-fit items-center gap-2 transition-colors hover:text-white"
                                >
                                    <Phone size={14} />
                                    (22) 2764-9081
                                </a>

                                <a
                                    href="mailto:mesc@id.uff.br"
                                    className="flex w-fit items-center gap-2 transition-colors hover:text-white"
                                >
                                    <Mail size={14} />
                                    mesc@id.uff.br
                                </a>
                            </div>
                        </address>
                    </div>

                    {/* COLUNA 3 — LINKS */}
                    <div className="md:col-span-3">
                        <h5
                            className="mb-4 text-lg font-semibold"
                            style={sectionTitleStyle}
                        >
                            Links
                        </h5>

                        <ul className="m-0 list-none space-y-2.5 p-0">
                            {institutionalLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-white/70 no-underline transition-colors duration-150 hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUNA 4 — CONECTE-SE */}
                    <div className="md:col-span-2">
                        <h5
                            className="mb-4 text-lg font-semibold"
                            style={sectionTitleStyle}
                        >
                            Conecte-se:
                        </h5>

                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.name}
                                    aria-label={social.name}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-200 hover:border-white/50 hover:bg-white/10"
                                >
                                    {social.name === 'X' ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4 fill-current text-white"
                                            aria-hidden="true"
                                        >
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                                        </svg>
                                    ) : (
                                        <img
                                            src={social.icon ?? ''}
                                            alt=""
                                            className="h-4 w-4 object-contain"
                                        />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-7xl px-5 py-5">
                    <p className="m-0 text-center text-xs text-white/45 md:text-left">
                        © {new Date().getFullYear()} Todos os direitos reservados
                        — Mestrado Profissional em Engenharia de Produção e
                        Sistemas Computacionais — UFF
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
