import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
        {/* PAGE HEADER BANNER */}
        <section className="page-header-banner">
          <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
          <div className="page-header-overlay"></div>
          <div className="container">
            <h1 style={{ fontFamily: 'var(--font-serif)' }}>Contato</h1>
            <div className="page-header-breadcrumb">
              <a href="/">Home</a> <span className="mx-1">/</span> <span>Contato</span>
            </div>
          </div>
        </section>

        {/* FORM + CONTACT INFO SECTION */}
        <section className="contact-section">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="contact-form-card">
                  <h2 className="section-title">Envie uma Mensagem</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="nome" className="form-label d-block">Nome</label>
                        <input type="text" id="nome" name="nome" className="form-control" placeholder="Seu nome completo" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label d-block">E-mail</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <label htmlFor="assunto" className="form-label d-block">Assunto</label>
                    <input type="text" id="assunto" name="assunto" className="form-control" placeholder="Sobre o que deseja falar?" />
                    <label htmlFor="mensagem" className="form-label d-block">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" className="form-control" rows={5} placeholder="Escreva sua mensagem..."></textarea>
                    <button type="submit" className="btn btn-primary btn-lg px-4 border-0" style={{ backgroundColor: 'var(--uff-highlight)' }}>
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="contact-info-card">
                  <h5 className="fw-bold">Informações de Contato</h5>

                  <div className="contact-info-item">
                    <i className="bi bi-geo-alt"></i>
                    <p>Rua Recife, s/n, Jardim Bela Vista<br />Rio das Ostras – RJ | CEP: 28895-532</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-telephone"></i>
                    <p>(22) 2764-9081</p>
                  </div>

                  <div className="contact-info-item">
                    <i className="bi bi-clock"></i>
                    <p>Segunda a sexta, das 8h às 17h</p>
                  </div>
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

export default Contato;
