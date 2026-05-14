// resources/js/Pages/Home.tsx
import React from 'react';

// Importando nossos componentes refatorados
import Header from '../components/Header';
import Main from '../components/Main';

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
      <Header />

      <Main>

      </Main>

      <div>
        
      </div>

    </div>
  );
};

export default Home;


