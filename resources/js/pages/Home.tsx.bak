import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  // Dados fictícios para fácil alteração futura
  const stats = [
    { label: 'Anos de Excelência', value: '22' },
    { label: 'Nota CAPES', value: '4' },
    { label: 'Dissertações', value: '+500' },
    { label: 'Laboratórios', value: '12' },
  ];

  const news = [
    {
      id: 1,
      title: 'MESC abre inscrições para Aluno Especial 2026.2',
      date: '15 Mai 2026',
      image: '/images/data_science.png',
      category: 'Editais',
    },
    {
      id: 2,
      title: 'Workshop de Inteligência Artificial aplicada à Indústria 4.0',
      date: '10 Mai 2026',
      image: '/images/data_science_research.png',
      category: 'Eventos',
    },
  ];

  const events = [
    { id: 1, day: '25', month: 'JUN', title: 'Defesa de Dissertação: João Silva' },
    { id: 2, day: '02', month: 'JUL', title: 'Seminário de Pesquisa Operacional' },
    { id: 3, day: '15', month: 'JUL', title: 'Prazo Final: Qualificação 2026.1' },
  ];

  const gateways = [
    { icon: 'bi-person-badge', label: 'Futuros Alunos', link: '#' },
    { icon: 'bi-mortarboard', label: 'Alunos Regulares', link: '#' },
    { icon: 'bi-briefcase', label: 'Egressos', link: '#' },
    { icon: 'bi-search', label: 'Pesquisadores', link: '#' },
  ];

  const labs = [
    { name: 'Laboratório de Sistemas Inteligentes', image: '/images/lab_presentation.png' },
    { name: 'Otimização e Pesquisa Operacional', image: '/images/data_science_research.png' },
    { name: 'Engenharia de Software Avançada', image: '/images/data_science.png' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
        {/* HERO SECTION */}
        <Carousel fade controls indicators>
            <Carousel.Item>
                <div className="carousel-wrapper">
                    <img className="carousel-image" src="/images/lab_presentation.png" alt="Laboratório MESC" />
                    <div className="carousel-overlay"></div>
                    <Carousel.Caption>
                        <h1 style={{ fontFamily: 'var(--font-serif)' }}>Impacto Tecnológico e Excelência Acadêmica</h1>
                        <p>Formando líderes em Engenharia de Produção e Sistemas Computacionais para os desafios do futuro.</p>
                        <div className="mt-4">
                            <a href="#" className="btn btn-primary btn-lg px-4 me-3 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>Processo Seletivo</a>
                            <a href="#" className="btn btn-outline-light btn-lg px-4">Conheça o Programa</a>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-wrapper">
                    <img className="carousel-image" src="/images/banner_01.png" alt="Pesquisa Avançada" />
                    <div className="carousel-overlay"></div>
                    <Carousel.Caption>
                        <h1 style={{ fontFamily: 'var(--font-serif)' }}>Inovação em Sistemas Computacionais</h1>
                        <p>Pesquisa de ponta aplicada à resolução de problemas complexos da indústria 4.0.</p>
                        <div className="mt-4">
                            <a href="#" className="btn btn-primary btn-lg px-4 me-3 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>Nossas Áreas</a>
                            <a href="#" className="btn btn-outline-light btn-lg px-4">Laboratórios</a>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-wrapper">
                    <img className="carousel-image" src="/images/banner_02.png" alt="Engenharia de Produção" />
                    <div className="carousel-overlay"></div>
                    <Carousel.Caption>
                        <h1 style={{ fontFamily: 'var(--font-serif)' }}>Excelência em Engenharia de Produção</h1>
                        <p>Otimização de processos e gestão estratégica com foco em resultados e sustentabilidade.</p>
                        <div className="mt-4">
                            <a href="#" className="btn btn-primary btn-lg px-4 me-3 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>Corpo Docente</a>
                            <a href="#" className="btn btn-outline-light btn-lg px-4">Publicações</a>
                        </div>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>

        {/* STATS SECTION */}
        <section className="stats-section">
            <div className="container">
                <div className="row text-center g-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-md-3 stat-item">
                            <h3 className="serif-title">{stat.value}</h3>
                            <p className="mb-0">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* PRESENTATION SECTION */}
        <section className="presentation-section">
            <div className="container">
                <div className="row align-items-center mb-5">
                    <div className="col-lg-4">
                        <h2 className="section-title">Apresentação</h2>
                    </div>
                    <div className="col-lg-8">
                        <p className="presentation-text mb-0">
                            O Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais da UFF
                            integra conhecimentos avançados para solucionar problemas complexos da indústria moderna,
                            aliando rigor acadêmico com aplicação prática imediata.
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center info-cards g-4">
                    <div className="col-md-4">
                        <div className="custom-card">
                            <div className="card-icon"><i className="bi bi-bullseye"></i></div>
                            <h5>Nossa Missão</h5>
                            <p>Desenvolver talentos técnicos e inovadores para impulsionar a sociedade tecnológica.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custom-card">
                            <div className="card-icon"><i className="bi bi-eye"></i></div>
                            <h5>Nossa Visão</h5>
                            <p>Ser referência nacional em mestrados profissionais pela qualidade e impacto de suas pesquisas.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="custom-card">
                            <div className="card-icon"><i className="bi bi-lightbulb"></i></div>
                            <h5>Nossos Valores</h5>
                            <p>Ética, excelência acadêmica, inovação constante e compromisso com o desenvolvimento regional.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* GATEWAYS SECTION */}
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row g-4">
                    {gateways.map((gate, index) => (
                        <div key={index} className="col-6 col-md-3">
                            <a href={gate.link} className="gateway-card text-decoration-none">
                                <i className={`bi ${gate.icon}`}></i>
                                <span>{gate.label}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* NEWS & EVENTS SECTION */}
        <section className="news-section">
            <div className="container">
                <div className="row g-5">
                    {/* News Column */}
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-end mb-4">
                            <h2 className="serif-title mb-0">Notícias Recentes</h2>
                            <a href="#" className="text-decoration-none" style={{ color: 'var(--uff-highlight)' }}>Ver todas ›</a>
                        </div>
                        <div className="row g-4">
                            {news.map(item => (
                                <div key={item.id} className="col-md-6">
                                    <div className="news-card">
                                        <img src={item.image} alt={item.title} className="card-img-top" />
                                        <div className="card-body p-4">
                                            <span className="news-date">{item.date} | {item.category}</span>
                                            <h4 className="news-title">{item.title}</h4>
                                            <a href="#" className="btn btn-link p-0 mt-2 text-decoration-none" style={{ color: 'var(--uff-highlight)' }}>Leia mais</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Events Column */}
                    <div className="col-lg-4">
                        <h2 className="serif-title mb-4">Agenda</h2>
                        <div className="bg-light p-4 rounded">
                            {events.map(event => (
                                <div key={event.id} className="event-item d-flex gap-3 align-items-start">
                                    <div className="event-date-box">
                                        <span className="day">{event.day}</span>
                                        <span className="month">{event.month}</span>
                                    </div>
                                    <div>
                                        <h6 className="mb-1 fw-bold" style={{ color: 'var(--uff-dark-blue)' }}>{event.title}</h6>
                                        <a href="#" className="small text-muted text-decoration-none">Saiba mais</a>
                                    </div>
                                </div>
                            ))}
                            <a href="#" className="btn btn-outline-primary w-100 mt-4 border-uff-highlight" style={{ color: 'var(--uff-highlight)' }}>Ver Calendário Completo</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* LABS SECTION */}
        <section className="py-5 bg-white border-top">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="serif-title">Laboratórios e Pesquisa</h2>
                    <p className="text-muted">Infraestrutura de ponta para o desenvolvimento de soluções tecnológicas.</p>
                </div>
                <div className="row g-4">
                    {labs.map((lab, index) => (
                        <div key={index} className="col-md-4">
                            <div className="lab-card">
                                <img src={lab.image} alt={lab.name} />
                                <div className="lab-overlay">
                                    <h5 className="mb-0 fw-bold">{lab.name}</h5>
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


