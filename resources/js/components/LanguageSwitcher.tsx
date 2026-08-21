import { useTranslation } from '../hooks/useTranslation';

const languages = [
    { code: 'pt_BR', label: 'PT', full: 'Português' },
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'es', label: 'ES', full: 'Español' },
];

export default function LanguageSwitcher() {
    const { locale } = useTranslation();

    function switchLocale(code: string) {
        // Força reload completo para o Laravel processar a sessão corretamente
        window.location.href = `/lang/${code}`;
    }

    return (
        <div className="flex items-center gap-1">
            {languages.map((lang, index) => (
                <span key={lang.code} className="flex items-center">
                    <button
                        onClick={() => switchLocale(lang.code)}
                        title={lang.full}
                        className={`text-xs font-semibold transition-colors hover:opacity-100 ${
                            locale === lang.code
                                ? 'opacity-100 underline underline-offset-2'
                                : 'opacity-50'
                        }`}
                        style={{
                            color: 'var(--uff-dark-blue)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        {lang.label}
                    </button>
                    {index < languages.length - 1 && (
                        <span className="mx-1 text-xs opacity-30">&nbsp;|&nbsp;</span>
                    )}
                </span>
            ))}
        </div>
    );
}

