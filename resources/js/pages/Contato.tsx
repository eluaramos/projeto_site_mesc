import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Contato: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <main className="mx-0 my-0 p-0 bg-white">
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
