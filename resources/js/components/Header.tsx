import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { menuData } from '../data/menuData';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';



interface MenuItem {
    id: string;
    label: string;
    link?: string;
    children?: MenuItem[];
}

interface PageProps {
    auth: { user: { name: string; email: string; roles: string[] } | null };
    [key: string]: unknown;
}

const Header: React.FC = () => {
    const [activeTopId, setActiveTopId] = useState<string | null>(null);
    const [activeSubId, setActiveSubId] = useState<string | null>(null);
    const [activeGrandId, setActiveGrandId] = useState<string | null>(null);
    const { t } = useTranslation();

    const closeAll = () => {
        setActiveTopId(null);
        setActiveSubId(null);
        setActiveGrandId(null);
    };

    return (
        <header className="relative z-30 w-full bg-white shadow-sm">
            {/* BARRA SUPERIOR: logo + títulos + idioma + auth */}
            <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:text-left">
                        <img
                            src="/images/Logo_MESC.png"
                            alt="Logo do Programa MESC"
                            className="h-20 object-contain"
                        />
                        <div
                            className="hidden h-16 w-px md:block"
                            style={{ backgroundColor: 'var(--uff-highlight)' }}
                        />
                        <div>
                            <h1
                                className="text-2xl font-bold leading-tight"
                                style={{ color: 'var(--uff-dark-blue)', fontFamily: 'var(--font-serif)' }}
                            >
                                Mestrado Profissional em Engenharia de Produção
                            </h1>
                            <h2
                                className="text-xl font-light"
                                style={{ color: 'var(--uff-dark-blue)', fontFamily: 'var(--font-serif)' }}
                            >
                                e Sistemas Computacionais
                            </h2>
                        </div>
                    </div>

                    {/* Idioma + Auth */}
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <AuthNav />
                    </div>
                </div>
            </div>

            {/* NAVEGAÇÃO */}
            <nav
                className="relative z-20 w-full border-y border-gray-100"
                onMouseLeave={closeAll}
            >
                <div className="mx-auto flex max-w-7xl flex-wrap justify-center">
                    {(menuData as MenuItem[]).map((topItem) => (
                        <div
                            key={topItem.id}
                            className="relative"
                            onMouseEnter={() => {
                                setActiveTopId(topItem.id);
                                setActiveSubId(null);
                                setActiveGrandId(null);
                            }}
                        >
                            {/* NÍVEL 1 */}
                            <div
                                className="flex cursor-pointer items-center justify-center px-4 py-3 text-xs font-semibold uppercase tracking-wide transition-all"
                                style={{
                                    color: 'var(--uff-dark-blue)',
                                    backgroundColor:
                                        activeTopId === topItem.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                                    borderBottom:
                                        activeTopId === topItem.id
                                            ? '2px solid var(--uff-highlight)'
                                            : '2px solid transparent',
                                }}
                            >
                                {topItem.link && !topItem.children ? (
                                    <a
                                        href={topItem.link}
                                        style={{ color: 'var(--uff-dark-blue)', textDecoration: 'none' }}
                                    >
                                        {topItem.label}
                                    </a>
                                ) : (
                                    topItem.label
                                )}
                            </div>

                            {/* NÍVEL 2 */}
                            {activeTopId === topItem.id && topItem.children && (
                                <div
                                    className="absolute left-0 top-full z-50 min-w-64 bg-white shadow-lg"
                                    style={{ borderLeft: '4px solid var(--uff-highlight)' }}
                                >
                                    {topItem.children.map((subItem) => (
                                        <div
                                            key={subItem.id}
                                            className="relative"
                                            onMouseEnter={() => {
                                                setActiveSubId(subItem.id);
                                                setActiveGrandId(null);
                                            }}
                                        >
                                            <div
                                                className="flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 text-sm transition-colors"
                                                style={{
                                                    color: 'var(--uff-dark-blue)',
                                                    backgroundColor:
                                                        activeSubId === subItem.id
                                                            ? 'rgba(0,0,0,0.05)'
                                                            : 'white',
                                                }}
                                            >
                                                {subItem.link && !subItem.children ? (
                                                    <a
                                                        href={subItem.link}
                                                        className="block w-full"
                                                        style={{ color: 'inherit', textDecoration: 'none' }}
                                                    >
                                                        {subItem.label}
                                                    </a>
                                                ) : (
                                                    <span>{subItem.label}</span>
                                                )}
                                                {subItem.children && (
                                                    <span className="ml-2 text-xs">›</span>
                                                )}
                                            </div>

                                            {/* NÍVEL 3 */}
                                            {activeSubId === subItem.id && subItem.children && (
                                                <div
                                                    className="absolute left-full top-0 z-50 min-w-64 bg-white shadow-lg"
                                                    style={{ borderLeft: '2px solid var(--uff-highlight)' }}
                                                >
                                                    {subItem.children.map((grandItem) => (
                                                        <div
                                                            key={grandItem.id}
                                                            className="relative"
                                                            onMouseEnter={() =>
                                                                setActiveGrandId(grandItem.id)
                                                            }
                                                        >
                                                            <div
                                                                className="flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 text-sm transition-colors"
                                                                style={{
                                                                    color: 'var(--uff-dark-blue)',
                                                                    backgroundColor:
                                                                        activeGrandId === grandItem.id
                                                                            ? 'rgba(0,0,0,0.05)'
                                                                            : 'white',
                                                                }}
                                                            >
                                                                {grandItem.link && !grandItem.children ? (
                                                                    <a
                                                                        href={grandItem.link}
                                                                        className="block w-full"
                                                                        style={{
                                                                            color: 'inherit',
                                                                            textDecoration: 'none',
                                                                        }}
                                                                    >
                                                                        {grandItem.label}
                                                                    </a>
                                                                ) : (
                                                                    <span>{grandItem.label}</span>
                                                                )}
                                                                {grandItem.children && (
                                                                    <span className="ml-2 text-xs">›</span>
                                                                )}
                                                            </div>

                                                            {/* NÍVEL 4 */}
                                                            {activeGrandId === grandItem.id &&
                                                                grandItem.children && (
                                                                    <div
                                                                        className="absolute left-full top-0 z-50 min-w-72 bg-white shadow-lg"
                                                                        style={{
                                                                            borderLeft:
                                                                                '2px solid var(--uff-highlight)',
                                                                        }}
                                                                    >
                                                                        {grandItem.children.map(
                                                                            (greatItem) => (
                                                                                <a
                                                                                    key={greatItem.id}
                                                                                    href={greatItem.link}
                                                                                    className="block border-b border-gray-100 px-4 py-3 text-sm transition-colors hover:bg-black/5"
                                                                                    style={{
                                                                                        color: 'var(--uff-dark-blue)',
                                                                                        textDecoration: 'none',
                                                                                    }}
                                                                                >
                                                                                    {greatItem.label}
                                                                                </a>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    );
};


function AuthNav() {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{user.name}</span>
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--uff-dark-blue)' }}
                >
                    Sair
                </Link>
            </div>
        );
    }

    return (
        
            <a href="/login"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--uff-highlight)' }}
        >
            Entrar
        </a>
    );
}

export default Header;
