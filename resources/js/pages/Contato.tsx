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
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
