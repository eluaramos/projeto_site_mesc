import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, FolderOpen, Newspaper } from 'lucide-react';
import '../../../css/news.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { type NewsCardData, newsDate } from '../../components/NewsCard';
import { safeUrl } from '../../components/cms/contentUrls';

interface NewsPagination {
    data: NewsCardData[];
    total: number;
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}
export default function PublicNewsIndex({ news }: { news: NewsPagination }) {
    const pageNumbers = Array.from(new Set([1, news.last_page, ...Array.from({ length: 5 }, (_, i) => news.current_page - 2 + i)]))
        .filter((page) => page >= 1 && page <= news.last_page)
        .sort((a, b) => a - b);
    return (
        <div className="news-archive flex min-h-screen flex-col">
            <Head title="Todas as notícias">
                <meta name="description" content="Notícias do MESC: pesquisa, editais, eventos e novidades do programa." />
            </Head>
            <Header />
            <main id="conteudo" className="news-archive-main">
                <nav aria-label="Caminho de navegação" className="news-breadcrumb">
                    <Link href="/">Início</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">Notícias</span>
                </nav>
                <div className="news-archive-heading">
                    <h1>Todas as notícias</h1>
                    <p>Acompanhe as novidades do MESC.</p>
                </div>
                {news.data.length ? (
                    <div className="news-archive-grid">
                        {news.data.map((item) => (
                            <article key={item.id} className="news-archive-item" lang={item.locale === 'en' ? 'en' : 'pt-BR'}>
                                <Link className="news-archive-image" href={'/noticias/' + item.slug} tabIndex={-1} aria-hidden="true">
                                    {item.image && safeUrl(item.image, true) ? (
                                        <img src={safeUrl(item.image, true)} alt={item.image_alt ?? ''} loading="lazy" referrerPolicy="no-referrer" />
                                    ) : (
                                        <div className="news-archive-placeholder">
                                            <Newspaper size={48} strokeWidth={1.25} />
                                        </div>
                                    )}
                                    <span className="news-archive-overlay">
                                        <Newspaper size={32} aria-hidden="true" />
                                    </span>
                                </Link>
                                <div className="news-archive-text">
                                    <h2>
                                        <Link href={'/noticias/' + item.slug}>{item.title}</Link>
                                    </h2>
                                    <p className="news-archive-summary">{item.summary}</p>
                                    <div className="news-archive-meta">
                                        <span className="news-archive-category">
                                            <FolderOpen size={15} aria-hidden="true" />
                                            {item.category}
                                        </span>
                                        <time dateTime={item.published_at}>{newsDate(item.published_at)}</time>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="news-archive-empty">
                        <Newspaper size={40} aria-hidden="true" />
                        <h2>Nenhuma notícia publicada no momento.</h2>
                        <p>As próximas publicações do programa aparecerão aqui.</p>
                        <Link href="/">Voltar para o início</Link>
                    </div>
                )}
                {news.total > 0 && (
                    <div className="news-archive-bottom">
                        <p>
                            {news.total} {news.total === 1 ? 'notícia publicada' : 'notícias publicadas'}
                        </p>
                        <nav aria-label="Paginação das notícias" className="news-pagination">
                            {news.prev_page_url ? (
                                <Link className="news-page-control" href={news.prev_page_url} aria-label="Página anterior">
                                    <ArrowLeft size={16} />
                                    <span>Anterior</span>
                                </Link>
                            ) : (
                                <span className="news-page-control is-disabled" aria-disabled="true">
                                    <ArrowLeft size={16} />
                                    <span>Anterior</span>
                                </span>
                            )}
                            {pageNumbers.map((page, i) => (
                                <span key={page} className="news-page-group">
                                    {i > 0 && page - pageNumbers[i - 1] > 1 && (
                                        <span className="news-page-ellipsis" aria-hidden="true">
                                            …
                                        </span>
                                    )}
                                    {page === news.current_page ? (
                                        <span className="news-page-number is-current" aria-current="page" aria-label={'Página ' + page}>
                                            {page}
                                        </span>
                                    ) : (
                                        <Link className="news-page-number" href={'/noticias?page=' + page} aria-label={'Ir para página ' + page}>
                                            {page}
                                        </Link>
                                    )}
                                </span>
                            ))}
                            {news.next_page_url ? (
                                <Link className="news-page-control" href={news.next_page_url} aria-label="Próxima página">
                                    <span>Próxima</span>
                                    <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <span className="news-page-control is-disabled" aria-disabled="true">
                                    <span>Próxima</span>
                                    <ArrowRight size={16} />
                                </span>
                            )}
                        </nav>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
