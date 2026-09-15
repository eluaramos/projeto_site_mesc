import React from 'react';
import { Phone } from 'lucide-react';
import GoogleMap from './GoogleMap';

const institutionalLinks = [
    { label: 'Universidade Federal Fluminense', href: 'https://www.uff.br/' },
    { label: 'Instituto de Ciência e Tecnologia', href: 'https://ict.uff.br/' },
    { label: 'Portal IDUFF', href: 'https://app.uff.br/iduff/' },
    { label: 'PROGRAD / PROPPi', href: '#' },
    { label: 'Sociedade Brasileira de Computação', href: 'https://www.sbc.org.br/' },
];

const socialLinks = [
    { name: 'YouTube', icon: '/images/youtube.png', href: '#' },
    { name: 'Twitter', icon: '/images/twitter.png', href: '#' },
    { name: 'Instagram', icon: '/images/instagram.png', href: '#' },
];

const Footer: React.FC = () => {
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const coordinates = { lat: -22.503, lng: -41.923611 };

    return (
        <footer
            style={{ backgroundColor: 'var(--uff-dark-blue)', borderTop: '4px solid var(--uff-highlight)' }}
            className="mt-auto pt-12 text-white"
        >
            <div className="mx-auto max-w-7xl px-4 pb-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                    {/* Coluna 1: ICT UFF e Mapa */}
                    <div className="md:col-span-5">
                        <div className="mb-4 h-40 overflow-hidden rounded border border-white/10 shadow-sm">
                            <GoogleMap apiKey={GOOGLE_MAPS_API_KEY} lat={coordinates.lat} lng={coordinates.lng} />
                        </div>

                        <h5
                            className="mb-3 font-bold"
                            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.5px', color: 'var(--uff-highlight)' }}
                        >
                            ICT UFF
                        </h5>

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                            <div className="border-white/10 pb-3 lg:border-r lg:pb-0 lg:pr-4">
                                <p className="mb-0 text-sm font-bold leading-snug opacity-90">
                                    Instituto de Ciência e Tecnologia
                                    <br />
                                    Universidade Federal Fluminense
                                </p>
                            </div>
                            <div>
                                <p className="mb-0 text-sm leading-relaxed opacity-70">
                                    Rua Recife, s/n, Jardim Bela Vista
                                    <br />
                                    Rio das Ostras – RJ | CEP: 28895-532
                                    <br />
                                    <span className="mt-1 inline-flex items-center gap-2">
                                        <Phone size={14} /> (22) 2764-9081
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2: Links Institucionais */}
                    <div className="md:col-span-3">
                        <h5 className="mb-0 text-sm font-bold uppercase tracking-widest text-white">
                            Links Institucionais
                        </h5>
                        <hr className="my-3 border-t border-white/15" />

                        <ul className="list-none space-y-3 p-0">
                            {institutionalLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noreferrer"
                                        className="block text-sm text-white/80 no-underline transition-opacity hover:text-white hover:opacity-100"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 3: Conecte-se e Apoio */}
                    <div className="md:col-span-4">
                        <h5 className="mb-0 text-sm font-bold uppercase tracking-widest text-white">
                            Redes e Contato
                        </h5>
                        <hr className="my-3 border-t border-white/15" />

                        <div className="mb-4 flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    title={social.name}
                                    className="opacity-80 transition-opacity hover:opacity-100"
                                >
                                    <img
                                        src={social.icon}
                                        alt={social.name}
                                        className="w-5"
                                        style={{ filter: 'brightness(0) invert(1)' }}
                                    />
                                </a>
                            ))}
                        </div>

                        <p className="text-sm opacity-60">
                            Para dúvidas sobre o processo seletivo ou editais, entre em contato via e-mail corporativo do
                            programa.
                        </p>
                    </div>
                </div>
            </div>

            {/* BASE DO FOOTER: Copyright e Legal */}
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} className="py-5">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center md:flex-row md:justify-between md:text-left">
                    <p className="mb-0 text-xs tracking-wide opacity-50">
                        © {new Date().getFullYear()} Mestrado Profissional em Engenharia de Produção e Sistemas
                        Computacionais - UFF. Todos os direitos reservados.
                    </p>
                    <img
                        src="/images/Logo_MESC.png"
                        alt="Logo MESC"
                        className="h-8 opacity-40"
                        style={{ filter: 'brightness(0) invert(1)' }}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
