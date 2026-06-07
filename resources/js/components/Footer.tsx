// resources/js/Components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    // Estilo reutilizável para os links
    const linkStyle = {
        color: '#ffffff',
        textDecoration: 'none',
        display: 'block',
        marginBottom: '12px',
        fontSize: '0.9rem',
        opacity: 0.8,
        transition: '0.2s'
    };

    // Estilo reutilizável para as linhas divisórias
    const dividerStyle = {
        borderTop: '1px solid rgba(255,255,255,0.15)',
        opacity: 1,
        margin: '8px 0 20px 0',
        width: '100%'
    };

    return (
        <footer style={{ backgroundColor: 'var(--uff-dark-blue)', borderTop: '3px solid var(--uff-highlight)' }} className="text-white pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row justify-content-between">
                    
                    {/* Coluna 1: ICT UFF */}
                    <div className="col-md-5 mb-4">
                        <div className="mb-4 text-center text-md-start">
                            <img 
                                src="/images/map.png" 
                                alt="Mapa de Localização" 
                                style={{ width: '60px', filter: 'brightness(0) invert(1)', opacity: 0.7 }} 
                            />
                        </div>
                        
                        <h5 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>ICT UFF</h5>
                        <p className="mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.8 }}>
                            Instituto de Ciência e Tecnologia – Universidade Federal Fluminense
                        </p>
                        <p className="mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.8 }}>
                            Rua Recife, s/n, Bairro Jardim Bela Vista<br />
                            Rio das Ostras – RJ<br />
                            CEP: 28895-532<br />
                            Tel: (22) 2764-9081
                        </p>
                    </div>

                    {/* Coluna 2: Links */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-white fw-bold mb-0" style={{ fontSize: '1rem', letterSpacing: '1px' }}>LINKS</h5>
                        <hr style={dividerStyle} />
                        
                        <ul className="list-unstyled">
                            <li><a href="https://www.uff.br/" target="_blank" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--uff-highlight)'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>UFF</a></li>
                            <li><a href="https://ict.uff.br/" target="_blank" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--uff-highlight)'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>ICT</a></li>
                            <li><a href="https://app.uff.br/iduff/" target="_blank" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--uff-highlight)'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>IDUFF</a></li>
                            <li><a href="#" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--uff-highlight)'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>PROGRAD</a></li>
                            <li><a href="https://www.sbc.org.br/" target="_blank" style={linkStyle} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--uff-highlight)'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>SBC</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Conecte-se */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-white fw-bold mb-0" style={{ fontSize: '1rem', letterSpacing: '1px' }}>CONECTE-SE</h5>
                        <hr style={dividerStyle} />
                        
                        <div className="d-flex gap-2">
                            {/* Caixas com borda suave para os ícones sociais */}
                            <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--uff-highlight)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}>
                                <img src="/images/youtube.png" alt="YouTube" style={{ width: '18px', filter: 'brightness(0) invert(1)' }} />
                            </a>
                            <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--uff-highlight)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}>
                                <img src="/images/twitter.png" alt="X (Twitter)" style={{ width: '18px', filter: 'brightness(0) invert(1)' }} />
                            </a>
                            <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', textDecoration: 'none', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--uff-highlight)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}>
                                <img src="/images/instagram.png" alt="Instagram" style={{ width: '18px', filter: 'brightness(0) invert(1)' }} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;