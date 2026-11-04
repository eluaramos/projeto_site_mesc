import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, FolderOpen } from 'lucide-react';
import '../../../css/news-article.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { newsDate } from '../../components/NewsCard';
import { ContentBlocks } from '../../components/cms/ContentBlocks';
import { safeUrl } from '../../components/cms/contentUrls';

export default function PublicNews({
    content,
    publishedAt,
}: {
    content: {
        title: string;
        summary: string;
        category: string;
        image: string | null;
        image_alt: string | null;
        body: string;
        body_format: string;
        locale: string;
    };
    publishedAt: string;
}) {
    const cover = content.image ? safeUrl(content.image, true) : undefined;
    return (
        <div className="news-story flex min-h-screen flex-col">
            <Head title={content.title}>
                <meta name="description" content={content.summary} />
                <meta property="og:title" content={content.title} />
                <meta property="og:description" content={content.summary} />
                <meta property="og:type" content="article" />
            </Head>
            <Header />
            <main id="conteudo" className="news-story-main">
                <nav aria-label="Caminho de navegação" className="news-story-breadcrumb">
                    <Link href="/">Início</Link>
                    <span aria-hidden="true">/</span>
                    <Link href="/noticias">Notícias</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">Notícia</span>
                </nav>
                <article lang={content.locale === 'en' ? 'en' : 'pt-BR'} aria-labelledby="news-story-title">
                    <header className="news-story-heading">
                        <p className="news-story-kicker">
                            Notícia <span aria-hidden="true">·</span> {content.category}
                        </p>
                        <h1 id="news-story-title">{content.title}</h1>
                        <p className="news-story-summary">{content.summary}</p>
                        <div className="news-story-meta">
                            <span>
                                <CalendarDays size={16} aria-hidden="true" />
                                Publicado em <time dateTime={publishedAt}>{newsDate(publishedAt)}</time>
                            </span>
                            <span>
                                <FolderOpen size={16} aria-hidden="true" />
                                {content.category}
                            </span>
                        </div>
                    </header>
                    {cover && (
                        <figure className="news-story-cover">
                            <img src={cover} alt={content.image_alt ?? ''} referrerPolicy="no-referrer" fetchPriority="high" />
                        </figure>
                    )}
                    <div className="news-story-content">
                        <ContentBlocks body={content.body} format={content.body_format} />
                    </div>
                    <footer className="news-story-end">
                        <span className="news-story-category">
                            <FolderOpen size={17} aria-hidden="true" />
                            {content.category}
                        </span>
                        <Link href="/noticias">
                            <ArrowLeft size={17} aria-hidden="true" />
                            Voltar para todas as notícias
                        </Link>
                    </footer>
                </article>
            </main>
            <Footer />
        </div>
    );
}
