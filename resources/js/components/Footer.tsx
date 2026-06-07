// resources/js/Components/Footer.tsx
import React from 'react';
import GoogleMap from './GoogleMap';

const Footer: React.FC = () => {
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const coordinates = { lat: -22.503, lng: -41.923611 };

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
        <footer style={{ backgroundColor: 'var(--uff-dark-blue)', borderTop: '4px solid var(--uff-highlight)' }} className="text-white pt-5 mt-auto">
            <div className="container pb-4">
                <div className="row justify-content-between g-4">
                    
                    {/* Coluna 1: ICT UFF e Mapa */}
                    <div className="col-md-5">
                        <div className="mb-4 overflow-hidden rounded shadow-sm border border-secondary border-opacity-25" style={{ height: '160px' }}>
                            <GoogleMap 
                                apiKey={GOOGLE_MAPS_API_KEY}
                                lat={coordinates.lat}
                                lng={coordinates.lng}
                            />
                        </div>
                        
                        <h5 className="fw-bold mb-3" style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.5px', color: 'var(--uff-highlight)' }}>ICT UFF</h5>
                        
                        <div className="d-flex flex-column flex-lg-row gap-lg-4 align-items-lg-center">
                            <div className="pb-3 pb-lg-0 border-lg-end pe-lg-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                <p className="mb-0 fw-bold" style={{ fontSize: '0.85rem', lineHeight: '1.4', opacity: 0.9 }}>
                                    Instituto de Ciência e Tecnologia<br />
                                    Universidade Federal Fluminense
                                </p>
                            </div>
                            <div className="pt-2 pt-lg-0">
                                <p className="mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.6', opacity: 0.7 }}>
                                    Rua Recife, s/n, Jardim Bela Vista<br />
                                    Rio das Ostras – RJ | CEP: 28895-532<br />
                                    <i className="bi bi-telephone me-2"></i>(22) 2764-9081
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2: Links Institucionais */}
                    <div className="col-md-3">
                        <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.9rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Links Institucionais</h5>
                        <hr style={dividerStyle} />
                        
                        <ul className="list-unstyled">
                            <li><a href="https://www.uff.br/" target="_blank" style={linkStyle} className="footer-link">Universidade Federal Fluminense</a></li>
                            <li><a href="https://ict.uff.br/" target="_blank" style={linkStyle} className="footer-link">Instituto de Ciência e Tecnologia</a></li>
                            <li><a href="https://app.uff.br/iduff/" target="_blank" style={linkStyle} className="footer-link">Portal IDUFF</a></li>
                            <li><a href="#" style={linkStyle} className="footer-link">PROGRAD / PROPPi</a></li>
                            <li><a href="https://www.sbc.org.br/" target="_blank" style={linkStyle} className="footer-link">Sociedade Brasileira de Computação</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Conecte-se e Apoio */}
                    <div className="col-md-3">
                        <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.9rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Redes e Contato</h5>
                        <hr style={dividerStyle} />
                        
                        <div className="d-flex gap-3 mb-4">
                            <a href="#" className="social-icon" title="YouTube">
                                <img src="/images/youtube.png" alt="YouTube" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
                            </a>
                            <a href="#" className="social-icon" title="Twitter">
                                <img src="/images/twitter.png" alt="Twitter" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
                            </a>
                            <a href="#" className="social-icon" title="Instagram">
                                <img src="/images/instagram.png" alt="Instagram" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
                            </a>
                        </div>

                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                            Para dúvidas sobre o processo seletivo ou editais, entre em contato via e-mail corporativo do programa.
                        </p>
                    </div>

                </div>
            </div>

            {/* BASE DO FOOTER: Copyright e Legal */}
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px 0' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-8 text-center text-md-start">
                            <p className="mb-0" style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.5px' }}>
                                © {new Date().getFullYear()} Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais - UFF. Todos os direitos reservados.
                            </p>
                        </div>
                        <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
                            <img src="/images/Logo_MESC.png" alt="Logo MESC" style={{ height: '30px', filter: 'brightness(0) invert(1)', opacity: 0.4 }} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;