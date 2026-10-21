import { Head } from '@inertiajs/react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ContentBlocks } from '../../components/cms/ContentBlocks';
export default function PublicPage({ content }: { content: { title: string; body: string; body_format?: string; locale: string } }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Head title={content.title} />
            <Header />
            <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
                <article lang={content.locale === 'en' ? 'en' : 'pt-BR'}>
                    <h1 className="mb-8 text-3xl font-bold">{content.title}</h1>
                    <ContentBlocks body={content.body} format={content.body_format} />
                </article>
            </main>
            <Footer />
        </div>
    );
}
