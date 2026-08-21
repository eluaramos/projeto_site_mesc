import {
    BookOpen,
    Briefcase,
    FlaskConical,
    GraduationCap,
    Lightbulb,
    Search,
    Target,
    UserCheck,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTranslation } from '../hooks/useTranslation';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    image: string;
    category: string;
}

interface EventItem {
    id: number;
    day: string;
    month: string;
    title: string;
}

interface CarouselSlide {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
}

function Carousel({ slides }: { slides: CarouselSlide[] }) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);

    useEffect(() => {
        if (paused) return;
        timerRef.current = setTimeout(() => goTo(current + 1), 5000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [current, paused]);

    return (
        <div
            className="relative w-full overflow-hidden"
            style={{ height: '520px' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
                    aria-hidden={i !== current}
                >
                    <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                        <h1
                            className="mb-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl"
                            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
                        >
                            {slide.title}
                        </h1>
                        <p className="mb-8 max-w-xl text-base text-white/85 md:text-lg">{slide.subtitle}</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <a
                                href="#"
                                className="rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                style={{ backgroundColor: 'var(--uff-highlight, #007bff)' }}
                            >
                                {slide.primaryCta}
                            </a>
                            <a
                                href="#"
                                className="rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                            >
                                {slide.secondaryCta}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={() => goTo(current - 1)}
                aria-label="Slide anterior"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => goTo(current + 1)}
                aria-label="Proximo slide"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Ir para slide ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
}

const Home: React.FC = () => {
    const { t } = useTranslation();

    const slides: CarouselSlide[] = [
        {
            image: '/images/lab_presentation.png',
            alt: 'Laboratorio MESC',
            title: t('home.hero_title'),
            subtitle: t('home.hero_subtitle'),
            primaryCta: t('nav.selection'),
            secondaryCta: t('nav.about'),
        },
        {
            image: '/images/banner_01.png',
            alt: 'Pesquisa Avancada',
            title: t('home.hero_title'),
            subtitle: t('home.hero_subtitle'),
            primaryCta: t('nav.research'),
            secondaryCta: t('nav.faculty'),
        },
        {
            image: '/images/banner_02.png',
            alt: 'Engenharia de Producao',
            title: t('home.hero_title'),
            subtitle: t('home.hero_subtitle'),
            primaryCta: t('nav.faculty'),
            secondaryCta: t('nav.news'),
        },
    ];

    const stats = [
        { label: t('home.stats.years'), value: '22' },
        { label: t('home.stats.capes'), value: '4' },
        { label: t('home.stats.dissertations'), value: '+500' },
        { label: t('home.stats.labs'), value: '12' },
    ];

    const news: NewsItem[] = [
        {
            id: 1,
            title: 'MESC abre inscricoes para Aluno Especial 2026.2',
            date: '15 Mai 2026',
            image: '/images/data_science.png',
            category: 'Editais',
        },
        {
            id: 2,
            title: 'Workshop de Inteligencia Artificial aplicada a Industria 4.0',
            date: '10 Mai 2026',
            image: '/images/data_science_research.png',
            category: 'Eventos',
        },
    ];

    const events: EventItem[] = [
        { id: 1, day: '25', month: 'JUN', title: 'Defesa de Dissertacao: Joao Silva' },
        { id: 2, day: '02', month: 'JUL', title: 'Seminario de Pesquisa Operacional' },
        { id: 3, day: '15', month: 'JUL', title: 'Prazo Final: Qualificacao 2026.1' },
    ];

    const gateways = [
        { icon: <UserCheck size={28} />, label: t('gateway.future_students'), link: '#' },
        { icon: <GraduationCap size={28} />, label: t('gateway.regular_students'), link: '#' },
        { icon: <Briefcase size={28} />, label: t('gateway.alumni'), link: '#' },
        { icon: <Search size={28} />, label: t('gateway.researchers'), link: '#' },
    ];

    const labs = [
        { name: 'Laboratorio de Sistemas Inteligentes', image: '/images/lab_presentation.png' },
        { name: 'Otimizacao e Pesquisa Operacional', image: '/images/data_science_research.png' },
        { name: 'Engenharia de Software Avancada', image: '/images/data_science.png' },
    ];

    const missionCards = [
        { icon: <Target size={24} />, title: t('home.mission_title'), text: t('home.mission_text') },
        { icon: <BookOpen size={24} />, title: t('home.vision_title'), text: t('home.vision_text') },
        { icon: <Lightbulb size={24} />, title: t('home.values_title'), text: t('home.values_text') },
    ];

    return (
        <div className="flex min-h-screen flex-col font-sans" style={{ backgroundColor: 'var(--uff-light-gray, #f5f5f5)' }}>
            <Header />
            <main className="m-0 bg-white p-0">
                <Carousel slides={slides} />

                <section className="py-10" style={{ backgroundColor: 'var(--uff-dark-blue, #003366)' }}>
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-white">
                                    <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>{stat.value}</p>
                                    <p className="mt-1 text-sm text-white/75">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start">
                            <div className="md:w-1/3">
                                <h2 className="text-3xl font-bold" style={{ color: 'var(--uff-dark-blue, #003366)', fontFamily: 'var(--font-serif, Georgia, serif)' }}>
                                    {t('home.presentation_title')}
                                </h2>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-base leading-relaxed text-gray-600">{t('home.presentation_text')}</p>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {missionCards.map((card, i) => (
                                <div key={i} className="rounded-xl border border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--uff-highlight-light, #e8f0fe)', color: 'var(--uff-highlight, #007bff)' }}>
                                        {card.icon}
                                    </div>
                                    <h5 className="mb-2 font-semibold" style={{ color: 'var(--uff-dark-blue, #003366)' }}>{card.title}</h5>
                                    <p className="text-sm leading-relaxed text-gray-500">{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gray-50 py-12">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {gateways.map((gate, i) => (
                                <a key={i} href={gate.link} className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ color: 'var(--uff-dark-blue, #003366)', textDecoration: 'none' }}>
                                    <span style={{ color: 'var(--uff-highlight, #007bff)' }}>{gate.icon}</span>
                                    <span className="text-sm font-medium">{gate.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="flex flex-col gap-10 lg:flex-row">
                            <div className="lg:w-2/3">
                                <div className="mb-6 flex items-end justify-between">
                                    <h2 className="text-2xl font-bold" style={{ color: 'var(--uff-dark-blue, #003366)', fontFamily: 'var(--font-serif, Georgia, serif)' }}>{t('home.news_title')}</h2>
                                    <a href="#" className="text-sm font-medium hover:underline" style={{ color: 'var(--uff-highlight, #007bff)' }}>{t('home.news_all')} </a>
                                </div>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {news.map((item) => (
                                        <div key={item.id} className="overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                                            <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
                                            <div className="p-4">
                                                <span className="text-xs text-gray-400">{item.date} &middot; {item.category}</span>
                                                <h4 className="mt-2 text-sm font-semibold leading-snug" style={{ color: 'var(--uff-dark-blue, #003366)' }}>{item.title}</h4>
                                                <a href="#" className="mt-3 inline-block text-xs font-medium hover:underline" style={{ color: 'var(--uff-highlight, #007bff)' }}>{t('home.read_more')} </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/3">
                                <h2 className="mb-6 text-2xl font-bold" style={{ color: 'var(--uff-dark-blue, #003366)', fontFamily: 'var(--font-serif, Georgia, serif)' }}>{t('home.events_title')}</h2>
                                <div className="rounded-xl bg-gray-50 p-5">
                                    <div className="flex flex-col gap-4">
                                        {events.map((ev) => (
                                            <div key={ev.id} className="flex items-start gap-4">
                                                <div className="flex min-w-12 flex-col items-center rounded-lg py-2 text-center text-white" style={{ backgroundColor: 'var(--uff-highlight, #007bff)' }}>
                                                    <span className="text-lg font-bold leading-none">{ev.day}</span>
                                                    <span className="text-xs">{ev.month}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--uff-dark-blue, #003366)' }}>{ev.title}</p>
                                                    <a href="#" className="mt-1 text-xs text-gray-400 hover:underline">{t('home.learn_more')}</a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <a href="#" className="mt-6 block w-full rounded-lg border py-2 text-center text-sm font-medium transition-colors hover:bg-gray-100" style={{ borderColor: 'var(--uff-highlight, #007bff)', color: 'var(--uff-highlight, #007bff)' }}>{t('home.events_all')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-gray-100 bg-white py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10 text-center">
                            <h2 className="text-2xl font-bold" style={{ color: 'var(--uff-dark-blue, #003366)', fontFamily: 'var(--font-serif, Georgia, serif)' }}>{t('home.labs_title')}</h2>
                            <p className="mt-2 text-sm text-gray-500">{t('home.labs_subtitle')}</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {labs.map((lab, i) => (
                                <div key={i} className="group relative overflow-hidden rounded-xl">
                                    <img src={lab.image} alt={lab.name} className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <div className="flex items-center gap-2 text-white">
                                            <FlaskConical size={16} className="shrink-0" />
                                            <p className="text-sm font-semibold leading-snug">{lab.name}</p>
                                        </div>
                                    </div>
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

export default Home;

