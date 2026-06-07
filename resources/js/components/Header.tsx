// resources/js/Components/Header.tsx
import React, { useState } from 'react';
import { menuData } from '../data/menuData';

const Header: React.FC = () => {
  // Estados de controlo do Navbar
  const [activeTopId, setActiveTopId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [activeGrandId, setActiveGrandId] = useState<string | null>(null);

  const handleMouseLeaveNav = () => {
    setActiveTopId(null);
    setActiveSubId(null);
    setActiveGrandId(null);
  };

  return (
    // Bloco único que envolve tanto a Logo/Título como o Menu. 
    // A sombra (shadow-sm) agora aplica-se apenas no final de tudo.
    <header className="bg-white w-100 position-relative z-3 shadow-sm">
      
      {/* SEÇÃO SUPERIOR: Logo e Títulos */}
      <div className="pt-4 pb-2 px-3">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4 text-center text-md-start">
          
          <img 
            src="/images/Logo_MESC.png" 
            alt="Logo do Programa MESC" 
            style={{ maxHeight: '90px', objectFit: 'contain' }} 
          />

          <div 
            className="d-none d-md-block rounded" 
            style={{ width: '2px', height: '70px', backgroundColor: 'var(--uff-highlight)' }}
          ></div>

          <div>
            <h1 
              className="mb-1 fw-bold" 
              style={{ color: 'var(--uff-dark-blue)', fontSize: '1.6rem', lineHeight: '1.2', fontFamily: 'var(--font-serif)' }}
            >
              Mestrado Profissional em Engenharia de Produção
            </h1>
            <h2 
              className="mb-0 fw-light" 
              style={{ color: 'var(--uff-dark-blue)', fontSize: '1.4rem', fontFamily: 'var(--font-serif)' }}
            >
              e Sistemas Computacionais
            </h2>
          </div>

        </div>
      </div>

      {/* SEÇÃO INFERIOR: Menu de Navegação */}
      <nav 
        className="w-100 position-relative z-2 border-top border-bottom" 
        style={{ borderColor: '#f0f0f0' }}
        onMouseLeave={handleMouseLeaveNav}
      >
        <div className="container d-flex flex-wrap justify-content-center">
          {menuData.map(topItem => (
            <div 
              key={topItem.id} 
              className="position-relative"
              onMouseEnter={() => {
                setActiveTopId(topItem.id);
                setActiveSubId(null);
                setActiveGrandId(null);
              }}
            >
              {/* NÍVEL 1 */}
              <div 
                className="px-4 py-3 d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: activeTopId === topItem.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                  color: 'var(--uff-dark-blue)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s',
                  borderBottom: activeTopId === topItem.id ? '2px solid var(--uff-highlight)' : '2px solid transparent'
                }}
              >
                {topItem.link && !topItem.children ? (
                  <a href={topItem.link} className="text-decoration-none" style={{ color: 'var(--uff-dark-blue)' }}>
                    {topItem.label}
                  </a>
                ) : (
                  topItem.label
                )}
              </div>

              {/* NÍVEL 2 */}
              {activeTopId === topItem.id && topItem.children && (
                <div 
                  className="position-absolute shadow"
                  style={{
                    top: '100%',
                    left: 0,
                    backgroundColor: 'var(--uff-white)',
                    borderLeft: '5px solid var(--uff-highlight)',
                    minWidth: '280px',
                    zIndex: 1000
                  }}
                >
                  {topItem.children.map(subItem => (
                    <div 
                      key={subItem.id}
                      className="position-relative"
                      onMouseEnter={() => {
                        setActiveSubId(subItem.id);
                        setActiveGrandId(null);
                      }}
                    >
                      <div
                        className="px-4 py-3 d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: activeSubId === subItem.id ? 'rgba(0,0,0,0.05)' : 'var(--uff-white)',
                          color: 'var(--uff-dark-blue)',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          borderBottom: '1px solid #f0f0f0'
                        }}
                      >
                        {subItem.link && !subItem.children ? (
                           <a href={subItem.link} className="text-decoration-none d-block w-100" style={{ color: 'inherit' }}>
                             {subItem.label}
                           </a>
                        ) : (
                          <span>{subItem.label}</span>
                        )}
                        {subItem.children && <span>›</span>}
                      </div>

                      {/* NÍVEL 3 */}
                      {activeSubId === subItem.id && subItem.children && (
                        <div 
                          className="position-absolute shadow"
                          style={{
                            top: 0,
                            left: '100%',
                            backgroundColor: 'var(--uff-white)',
                            borderLeft: '2px solid var(--uff-highlight)',
                            minWidth: '280px',
                            zIndex: 1001
                          }}
                        >
                          {subItem.children.map(grandItem => (
                            <div
                              key={grandItem.id}
                              className="position-relative"
                              onMouseEnter={() => setActiveGrandId(grandItem.id)}
                            >
                              <div 
                                className="px-4 py-3 d-flex justify-content-between align-items-center"
                                style={{ 
                                  backgroundColor: activeGrandId === grandItem.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                                  color: 'var(--uff-dark-blue)',
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  borderBottom: '1px solid #f0f0f0'
                                }}
                              >
                                {grandItem.link && !grandItem.children ? (
                                  <a href={grandItem.link} className="text-decoration-none d-block w-100" style={{ color: 'var(--uff-dark-blue)' }}>
                                    {grandItem.label}
                                  </a>
                                ) : (
                                  <span>{grandItem.label}</span>
                                )}
                                {grandItem.children && <span>›</span>}
                              </div>

                              {/* NÍVEL 4 */}
                              {activeGrandId === grandItem.id && grandItem.children && (
                                <div 
                                  className="position-absolute shadow"
                                  style={{
                                    top: 0,
                                    left: '100%',
                                    backgroundColor: 'var(--uff-white)',
                                    borderLeft: '2px solid var(--uff-highlight)',
                                    minWidth: '320px',
                                    zIndex: 1002
                                  }}
                                >
                                  {grandItem.children.map(greatItem => (
                                    <a 
                                      key={greatItem.id}
                                      href={greatItem.link}
                                      className="d-block px-4 py-3 text-decoration-none"
                                      style={{ 
                                        fontSize: '0.85rem',
                                        color: 'var(--uff-dark-blue)',
                                        borderBottom: '1px solid #f0f0f0'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                      {greatItem.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;