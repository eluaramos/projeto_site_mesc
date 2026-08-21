import { usePage } from '@inertiajs/react';

type NestedTranslations = {
    [key: string]: string | NestedTranslations;
};

interface PageProps {
    locale: string;
    translations: NestedTranslations;
    [key: string]: unknown;
}

export function useTranslation() {
    const { locale, translations } = usePage<PageProps>().props;

    function t(key: string): string {
        const keys = key.split('.');
        let result: string | NestedTranslations = translations;

        for (const k of keys) {
            if (typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return key;
            }
        }

        return typeof result === 'string' ? result : key;
    }

    return { t, locale };
}