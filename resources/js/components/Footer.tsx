// resources/js/Components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    // Estilo reutilizável para os links azuis
    const linkStyle = {
        color: '#3ba4f6', // Cor azul clara que imita a da imagem
        fontWeight: 'bold' as const,
        textDecoration: 'none',
        display: 'block',
        marginBottom: '12px',
        fontSize: '0.95rem'
    };

    // Estilo reutilizável para as linhas divisórias azuis
    const dividerStyle = {
        borderTop: '2px solid #3ba4f6',
        opacity: 1,
        margin: '8px 0 20px 0',
        width: '100%'
    };

    return (
        <footer style={{ backgroundColor: 'var(--uff-dark-blue)' }} className="text-white pt-5 pb-4 mt-auto">
            <div className="container">
                <div className="row justify-content-between">
                    
                    {/* Coluna 1: ICT UFF */}
                    <div className="col-md-5 mb-4">
                        <div className="mb-4 text-center">
                            <img 
                                src="/images/map.png" 
                                alt="Mapa de Localização" 
                                style={{ width: '80px' }} 
                            />
                        </div>
                        
                        <h5 className="fw-bold mb-3">ICT UFF</h5>
                        <p className="mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Instituto de Ciência e Tecnologia – Universidade Federal Fluminense
                        </p>
                        <p className="mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Rua Recife, s/n, Bairro Jardim Bela Vista<br />
                            Rio das Ostras – RJ<br />
                            CEP: 28895-532<br />
                            Tel: (22) 2764-9081
                        </p>
                        
                        {/* Linha azul no fundo da primeira coluna */}
                        <hr style={{ ...dividerStyle, marginTop: '25px', width: '90%' }} />
                    </div>

                    {/* Coluna 2: Links */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-white fw-bold mb-0">LINKS</h5>
                        <hr style={dividerStyle} />
                        
                        <ul className="list-unstyled">
                            <li><a href="https://www.uff.br/" target="_blank" style={linkStyle}>UFF</a></li>
                            <li><a href="https://ict.uff.br/" target="_blank" style={linkStyle}>ICT</a></li>
                            <li><a href="https://app.uff.br/iduff/" target="_blank" style={linkStyle}>IDUFF</a></li>
                            <li><a href="#" style={linkStyle}>PROGRAD</a></li>
                            <li><a href="https://www.sbc.org.br/" target="_blank" style={linkStyle}>SBC</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Conecte-se */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-white fw-bold mb-0">CONECTE-SE</h5>
                        <hr style={dividerStyle} />
                        
                        <div className="d-flex gap-2">
                            {/* Caixas com borda branca para os ícones sociais */}
                            <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', border: '1px solid white', borderRadius: '4px', textDecoration: 'none' }}>
                                <img src="/images/youtube.png" alt="YouTube" style={{ width: '22px' }} />
                            </a>
                            <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', border: '1px solid white', borderRadius: '4px', textDecoration: 'none' }}>
                                <img src="/images/twitter.png" alt="X (Twitter)" style={{ width: '22px' }} />
                            </a>
                            <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', border: '1px solid white', borderRadius: '4px', textDecoration: 'none' }}>
                                <img src="/images/instagram.png" alt="Instagram" style={{ width: '22px' }} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;