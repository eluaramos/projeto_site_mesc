import { useTranslation } from '../hooks/useTranslation';

const languages = [
    { code: 'pt_BR', label: 'PT', full: 'Português' },
    { code: 'en',    label: 'EN', full: 'English' },
    { code: 'es',    label: 'ES', full: 'Español' },
];

export default function LanguageSwitcher() {
    const { locale } = useTranslation();

    const switchLanguage = (lang: string) => {
        window.location.href = `/lang/${lang}`;
    };

    return (
        <div className="flex items-center gap-1">
            {languages.map((lang, index) => (
                <span key={lang.code} className="flex items-center">
                    <button
                        onClick={() => switchLanguage(lang.code)}
                        title={lang.full}
                        className={`text-xs font-semibold transition-colors hover:opacity-100 ${
                            locale === lang.code
                                ? 'opacity-100 underline underline-offset-2'
                                : 'opacity-50 hover:opacity-80'
                        }`}
                    >
                        {lang.label}
                    </button>
                    {index < languages.length - 1 && (
                        <span className="mx-1 opacity-30 text-xs">|</span>
                    )}
                </span>
            ))}
        </div>
    );
}