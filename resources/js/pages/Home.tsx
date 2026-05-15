import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-1 p-0 bg-white rounded shadow-sm border-top border-uff-highlight" style={{ borderWidth: '4px !important' }}>
        <Carousel fade controls indicators >
            <Carousel.Item>
                <div className="carousel-wrapper">
                <img
                    className="carousel-image"
                    src="/images/ict.jpg"
                    alt="ICT"
                />

                <div className="carousel-overlay"></div>

                <Carousel.Caption>
                    <h1>Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais</h1>
                    <p>O MESC, localizado no ICT, convida você a participar do processo seletivo para aluno especial. Não perca essa chance! Garanta sua inscrição agora mesmo.</p>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
        <section className="presentation-section">

            <div className="container">

            <div className="row mb-5">

                <div className="col-lg-4">
                <h2 className="section-title">
                    APRESENTAÇÃO
                </h2>
                </div>

                <div className="col-lg-8">
                <p className="presentation-text">
                    O Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais
                    da Universidade Federal Fluminense (UFF) é um programa com raízes profundas,
                    remontando à criação da Escola Fluminense de Engenharia em 1952.
                </p>
                </div>

            </div>

            <div className="row justify-content-center info-cards g-4">

                <div className="col-md-3">
                <div className="custom-card">

                    <div className="card-icon">
                    <i className="bi bi-bullseye"></i>
                    </div>

                    <h5>Nossa Missão</h5>

                    <p>
                    Desenvolver pessoas, para atuarem de maneira técnica,
                    tecnológica e inovadora.
                    </p>

                </div>
                </div>

                <div className="col-md-3">
                <div className="custom-card">

                    <div className="card-icon">
                    <i className="bi bi-eye"></i>
                    </div>

                    <h5>Nossa Visão</h5>

                    <p>
                    Ser um programa com excelência reconhecida pela academia.
                    </p>

                </div>
                </div>

                <div className="col-md-3">
                <div className="custom-card">

                    <div className="card-icon">
                    <i className="bi bi-lightbulb"></i>
                    </div>

                    <h5>Nossos Valores</h5>

                    <p>
                    Busca constante pela atualização do conhecimento e incentivo
                    à inovação.
                    </p>

                </div>
                </div>

            </div>

            </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;


