import React from 'react';
import { CheckCircle2, Eye, GraduationCap, Lightbulb, Share2, Target } from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const historico = [
    'Os cursos de engenharia da Universidade Federal Fluminense (UFF) têm sua origem em 1952, com a criação da Escola Fluminense de Engenharia (em Niterói) pelo Governo do Estado do Rio de Janeiro. Em 1960, a Escola Fluminense de Engenharia passou a integrar a recém-criada Universidade Federal Fluminense na forma de Escola de Engenharia da UFF. As atividades na área de Engenharia de Produção iniciaram em 1960 com a criação do Grupo de Estudos de Produtividade Industrial (GEPI), na Escola de Engenharia. O objetivo do grupo era desenvolver pesquisas e prestar serviços de consultoria e de desenvolvimento de recursos humanos às empresas do Estado do Rio de Janeiro. Posteriormente, os professores e técnicos do GEPI passaram a integrar os departamentos de Engenharia Mecânica e de Produção. Em novembro de 1974 foi criado o Departamento de Engenharia de Produção (TEP), e em 1981 foi criado o curso de Mestrado em Engenharia de Produção. Em 1993 entrou em funcionamento o curso de graduação em Engenharia de Produção, reconhecido pelo Ministério da Educação em 27 de março de 1997. Em 2000 foi dado início ao curso de Graduação em Engenharia de Produção da UFF em Volta Redonda.',
    'No Plano de Desenvolvimento Institucional (PDI) da UFF de 2004 foram definidas novas prioridades institucionais. A primeira dessas prioridades era a expansão da graduação e pós-graduação. Os cursos de graduação em Engenharia de Produção e Ciência da Computação da UFF em Rio das Ostras, cursos base para este Programa de Mestrado, foram criados no ano de 2004 com o intuito de atender às características e demandas socioeconômicas da região das Baixadas Litorâneas. Hoje ambos os cursos estão sediados no Instituto de Ciência e Tecnologia da UFF (ICT), em Rio das Ostras. Por sua vez, o Programa de Mestrado em Engenharia de Produção e Sistemas Computacionais (MESC), criado em 2013 e também vinculado ao ICT, foi o primeiro programa de Pós-Graduação Stricto Sensu implementado em Rio das Ostras. Assim, a instalação da UFF na cidade de Rio das Ostras e a implementação de um programa de pós-graduação pioneiro na região contribuíram para o atendimento das prioridades dessa instituição.',
    'A cidade de Rio das Ostras, onde está instalado o Programa de Mestrado, situa-se na chamada "Bacia de Campos", uma região responsável por cerca de 70% da produção e distribuição nacional de petróleo e gás natural. A Bacia de Campos engloba diversos municípios sob a influência da economia do petróleo, particularmente dos royalties decorrentes da exploração desse recurso, estendendo-se desde o Norte do Estado do Rio de Janeiro até a cidade de Maricá. Constitui também um aglomerado empresarial, com extenso tecido industrial, contando com diversas empresas que atuam em diferentes níveis da cadeia de fornecimento do setor. Particularmente na cidade de Rio das Ostras, na fronteira com a cidade de Macaé, existe uma região industrial chamada Zona Especial de Negócios (ZEN). Na ZEN está situado o Centro de Qualificação Profissional da Prefeitura Municipal de Rio das Ostras, um dos locais onde são ministradas as aulas do programa. O uso das instalações do Centro de Qualificação Profissional (CEQUAP) foi obtido por meio de uma frutífera parceria formalizada entre UFF e a Prefeitura Municipal de Rio das Ostras.',
    'O Mestrado Profissionalizante em Engenharia de Produção e Sistemas Computacionais (MESC), cujas atividades iniciaram em 2013, é um curso gratuito que tem como missão "Desenvolver pessoas e formar mestres, para atuarem de maneira técnica, tecnológica e inovadora em organizações públicas e privadas, contribuindo para o progresso regional e do país.". Em 2015 os primeiros discentes concluíram o curso de pós-graduação. Porém, uma recessão na economia nacional e problemas específicos ao setor de petróleo e gás natural acarretaram uma onda de desemprego e encerramento das atividades de diversas empresas na região, afetando o andamento de pesquisas e a conclusão dos cursos de alguns alunos que ingressaram no programa entre 2014 e 2015. Muitos alunos perderam seus empregos, enquanto outros foram transferidos para outras regiões e até outros países, causando um número inesperado de abandonos, dificuldades de orientação e descontinuidade de pesquisas.',
    'Mesmo com as dificuldades enfrentadas, a partir de 2015 o programa começou a se recuperar. De 2016 em diante, como um esforço para a recuperação dos impactos da crise econômica na região, verificou-se um aumento significativo na busca por melhorias nos processos produtivos e de gestão das empresas instaladas na Bacia de Campos. Como consequência, nos últimos anos a maioria das dissertações e pesquisas foram aplicadas às empresas públicas e privadas da região, em diferentes campos de conhecimento relacionados ao Programa. Isso propiciou uma maior aproximação entre o Programa de Mestrado em Engenharia de Produção e Sistemas Computacionais e muitas grandes empresas e multinacionais instaladas em Rio das Ostras e Macaé, tais como: Petróleo Brasileiro S.A., Vallourec Transporte e Serviços LTDA, Constellation Oil (antiga Queiroz Galvão Óleo e Gás), Aker Solutions do Brasil LTDA e MHWirth Brasil.',
    'A parceria com a Constellation Oil (antiga Queiroz Galvão Óleo e Gás), iniciada no final de 2016, resultou num projeto de extensão chamado de "Projeto de Modelagem de Processo de Análise de Falhas e Manutenção em Blowout Preventers (BOPs)". O projeto propiciou, em 2017, além de recursos para pesquisas e extensão acadêmicos, bolsas para alunos de graduação e artigos relacionados ao projeto. Os expressivos resultados alcançados no supracitado projeto, apresentado à comunidade científica e empresarial, suscitou interesse da Petrobras, ocasionando assinatura de convênio de pesquisa de 36 meses para o Desenvolvimento de Metodologia para Manutenção Baseada em Condição para BOP, iniciado em agosto de 2018 com previsão de término em agosto de 2021. Além de recursos para pesquisa e laboratório, o projeto prevê bolsas para alunos de graduação e mestrado, fomentando a troca de conhecimento entre docentes e discentes tanto do mestrado quanto da graduação, de ambos os cursos de Engenharia de Produção e Ciência da Computação, além de empresas da região como estudo piloto.',
    'Um outro projeto que cabe destaque é a Gestão do Prêmio Nacional de Inovação 2018/2019, promovido pela Confederação Nacional da Indústria, Sebrae/Nacional e Mobilização Empresarial pela Inovação. O ICT/UFF é responsável pela condução do prêmio, suporte às empresas e processo de avaliação e diagnóstico dos participantes. O projeto possui apoio financeiro para atividades de pesquisa e extensão de professores e alunos de graduação e mestrado dos cursos de Engenharia de Produção e Ciência da Computação.',
    'A partir dessa e de outras importantes iniciativas e dos resultados já obtidos, o Programa de Mestrado Profissionalizante em Engenharia de Produção e Sistemas Computacionais consolida-se como importante instrumento de ensino, pesquisa e extensão na pós-graduação regional, promovendo a integração entre a Universidade Federal Fluminense — particularmente o seu Instituto de Ciência e Tecnologia — os poderes públicos municipais e estaduais, empresas regionais e nacionais e a comunidade local. É importante ressaltar que as iniciativas e os resultados obtidos estão alinhados com o PDI 2018-2022 da universidade, que apresenta dentro de suas perspectivas de desenvolvimento a formação de grupos de excelência com vistas ao aumento da competitividade da UFF no cenário nacional e internacional, a elevação da qualidade do ensino da pós-graduação Stricto Sensu, o cumprimento das metas e objetivos do Plano Institucional de Internacionalização e a consolidação do potencial de inovação da UFF.',
];

const valores = [
    'Busca constante pela atualização de conhecimento',
    'Incentivo à integração da pós-graduação e graduação',
    'Estímulo a atitudes inovadoras de ensino e pesquisa',
    'Comprometimento com os objetivos estabelecidos no processo de ensino e aprendizagem',
    'Balizamento ético nas relações interpessoais e organizacionais',
    'Valorização da produção científica e tecnológica nacional',
    'Incentivo à utilização de recursos considerando a sustentabilidade econômica, social e ambiental',
    'Cooperação Universidade, Organizações e Sociedade',
];

const objetivos = [
    {
        icon: <GraduationCap size={26} />,
        title: 'Formação Técnica',
        text: 'Desenvolver pessoas com capacidade de aplicar conhecimento em atividades técnicas e tecnológicas nos ambientes de trabalho das organizações públicas e privadas.',
    },
    {
        icon: <Lightbulb size={26} />,
        title: 'Inovação',
        text: 'Formar mestres capazes de desenvolver e disseminar conhecimento técnico, tecnológico e científico voltados principalmente à inovação.',
    },
    {
        icon: <Share2 size={26} />,
        title: 'Integração Regional',
        text: 'Fortalecer o fluxo de conhecimento técnico, tecnológico e científico entre o Instituto de Ciência e Tecnologia da UFF de Rio das Ostras, as empresas, a sociedade e suas legítimas representações.',
    },
];

const publicoAlvo = [
    'Profissionais, principalmente, das áreas de Engenharia de Produção e Ciência da Computação',
    'Profissionais de áreas afins, tais como outras Engenharias, Administração, etc.',
];

const perfilEgresso = [
    'Possuir habilidades e competências necessárias para atender às demandas técnicas, tecnológicas e científicas das organizações públicas ou privadas',
    'Ser capaz de promover a inovação dentro da sociedade e do ambiente de trabalho',
    'Dominar conhecimentos acadêmicos para atuar como mestre na formação de profissionais dentro das áreas de competências desenvolvidas em sua formação',
];

const Sobre: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col font-sans" style={{ backgroundColor: 'var(--uff-light-gray)' }}>
            <Header />

            <main className="m-0 bg-white p-0">
                {/* PAGE HEADER BANNER */}
                <section className="page-header-banner">
                    <img src="/images/ict.jpg" alt="Instituto de Ciência e Tecnologia - UFF" />
                    <div className="page-header-overlay"></div>
                    <div className="relative z-10 mx-auto max-w-5xl px-4">
                        <h1 style={{ fontFamily: 'var(--font-serif)' }}>Sobre o MESC</h1>
                        <div className="page-header-breadcrumb">
                            <a href="/">Home</a> <span className="mx-1">/</span> <span>Sobre</span>
                        </div>
                    </div>
                </section>

                {/* HISTÓRICO */}
                <section id="historia" className="py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start">
                            <div className="md:w-1/3">
                                <h2
                                    className="text-3xl font-bold"
                                    style={{ color: 'var(--uff-dark-blue)', fontFamily: 'var(--font-serif)' }}
                                >
                                    Histórico
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4 md:w-2/3">
                                {historico.map((paragraph, i) => (
                                    <p key={i} className="text-base leading-relaxed text-gray-600">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* MISSÃO, VISÃO E VALORES */}
                <section id="missao" className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10 text-center">
                            <h2 className="serif-title">Missão, Visão e Valores</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div
                                className="rounded-xl p-8 text-white shadow-sm"
                                style={{ backgroundColor: 'var(--uff-dark-blue)' }}
                            >
                                <Target size={28} style={{ color: 'var(--uff-highlight)' }} />
                                <h5
                                    className="mb-3 mt-4 font-bold uppercase tracking-wide"
                                    style={{ color: 'var(--uff-highlight)' }}
                                >
                                    Missão
                                </h5>
                                <p className="italic leading-relaxed opacity-90">
                                    "Desenvolver pessoas, para atuarem de maneira técnica, tecnológica e inovadora em
                                    organizações públicas e privadas, contribuindo para o progresso regional e do
                                    país."
                                </p>
                            </div>

                            <div
                                className="rounded-xl p-8 text-white shadow-sm"
                                style={{ backgroundColor: 'var(--uff-dark-blue)' }}
                            >
                                <Eye size={28} style={{ color: 'var(--uff-highlight)' }} />
                                <h5
                                    className="mb-3 mt-4 font-bold uppercase tracking-wide"
                                    style={{ color: 'var(--uff-highlight)' }}
                                >
                                    Visão
                                </h5>
                                <p className="italic leading-relaxed opacity-90">
                                    "Ser um programa com excelência reconhecida pela academia, sociedade e
                                    organizações."
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                            <h5 className="mb-5 font-bold" style={{ color: 'var(--uff-dark-blue)' }}>
                                Valores
                            </h5>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                                {valores.map((valor) => (
                                    <div key={valor} className="flex items-start gap-3">
                                        <CheckCircle2
                                            size={18}
                                            className="mt-0.5 shrink-0"
                                            style={{ color: 'var(--uff-highlight)' }}
                                        />
                                        <p className="text-sm leading-relaxed text-gray-600">{valor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* OBJETIVOS */}
                <section id="objetivos" className="py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10 text-center">
                            <h2 className="serif-title">Objetivos</h2>
                            <p className="text-gray-500">Os principais objetivos do MESC são:</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {objetivos.map((objetivo) => (
                                <div key={objetivo.title} className="custom-card">
                                    <div className="card-icon">{objetivo.icon}</div>
                                    <h5>{objetivo.title}</h5>
                                    <p>{objetivo.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PÚBLICO-ALVO E PERFIL DO EGRESSO */}
                <section id="publico" className="bg-gray-50 py-16">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="mb-10 text-center">
                            <h2 className="serif-title">Público-Alvo e Perfil do Egresso</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h5 className="mb-5 font-bold" style={{ color: 'var(--uff-dark-blue)' }}>
                                    Público Alvo
                                </h5>
                                <div className="flex flex-col gap-4">
                                    {publicoAlvo.map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 shrink-0"
                                                style={{ color: 'var(--uff-highlight)' }}
                                            />
                                            <p className="text-sm leading-relaxed text-gray-600">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h5 className="mb-5 font-bold" style={{ color: 'var(--uff-dark-blue)' }}>
                                    Perfil do Egresso
                                </h5>
                                <div className="flex flex-col gap-4">
                                    {perfilEgresso.map((item) => (
                                        <div key={item} className="flex items-start gap-3">
                                            <CheckCircle2
                                                size={18}
                                                className="mt-0.5 shrink-0"
                                                style={{ color: 'var(--uff-highlight)' }}
                                            />
                                            <p className="text-sm leading-relaxed text-gray-600">{item}</p>
                                        </div>
                                    ))}
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

export default Sobre;
