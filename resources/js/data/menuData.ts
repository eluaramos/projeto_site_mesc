// resources/js/data/menuData.ts

export interface MenuItem {
  id: string;
  label: string;
  link?: string;
  children?: MenuItem[];
}

export const menuData: MenuItem[] = [
  { id: 'home', label: 'HOME', link: '/' },
  {
    id: 'mesc', label: 'O MESC',
    children: [
      { id: 'historia', label: 'História', link: '/sobre#historia' },
      {
        id: 'objetivos', label: 'Objetivos',
        children: [
          { id: 'missao', label: 'Missão, Visão e Valores', link: '/sobre#missao' },
          { id: 'obj-lista', label: 'Objetivos do Programa', link: '/sobre#objetivos' }
        ]
      },
      {
        id: 'estrutura', label: 'Estrutura Organizacional',
        children: [
          { id: 'coord', label: 'Coordenação', link: '#coord' },
          {
            id: 'comissoes', label: 'Comissões',
            children: [
              { id: 'c-sel', label: 'Comissão de Seleção', link: '#c-sel' },
              { id: 'c-capes', label: 'Comissão de Avaliação CAPES (verificar existência)', link: '#c-capes' },
              { id: 'c-plan', label: 'Comissão de Planejamento Estratégico (verificar existência)', link: '#c-plan' },
              { id: 'ouvidoria', label: 'Ouvidoria', link: '#ouvidoria' }
            ]
          }
        ]
      },
      { id: 'publico', label: 'Público-Alvo e Perfil do Egresso', link: '/sobre#publico' },
      { id: 'planejamento', label: 'Planejamento Estratégico (avaliar necessidade da página)', link: '#planejamento' }
    ]
  },
  {
    id: 'curso', label: 'CURSO',
    children: [
      {
        id: 'est-curric', label: 'Estrutura Curricular',
        children: [
          { id: 'areas', label: 'Áreas de Concentração', link: '#areas' },
          { id: 'linhas', label: 'Linhas de Pesquisa', link: '#linhas' },
          { id: 'disciplinas', label: 'Disciplinas e Ementas', link: '#disciplinas' }
        ]
      },
      { id: 'laboratorios', label: 'Laboratórios', link: '#laboratorios' },
      { id: 'biblioteca', label: 'Biblioteca', link: '#biblioteca' },
      {
        id: 'representacao', label: 'Representação',
        children: [
          { id: 'rep-geral', label: 'Representantes', link: '#rep-geral' },
          { id: 'rep-disc', label: 'Representação Discente', link: '#rep-disc' }
        ]
      }
    ]
  },
  {
    id: 'pessoas', label: 'PESSOAS',
    children: [
      {
        id: 'docentes', label: 'Docentes',
        children: [
          { id: 'quad-princ', label: 'Quadro Principal', link: '#quad-princ' },
          { id: 'quad-apoio', label: 'Quadro de Apoio', link: '#quad-apoio' }
        ]
      },
      { id: 'taes', label: 'Técnicos-Administrativos', link: '#taes' },
      {
        id: 'discentes', label: 'Discentes',
        children: [
          { id: 'ativos', label: 'Ativos', link: '#ativos' },
          { id: 'concluintes', label: 'Concluintes', link: '#concluintes' }
        ]
      }
    ]
  },
  {
    id: 'academico', label: 'ACADÊMICO',
    children: [
      { id: 'calendario', label: 'Calendário Acadêmico', link: '#calendario' },
      { id: 'matricula', label: 'Matrícula', link: '#matricula' },
      { id: 'inscricao', label: 'Inscrição em Disciplinas', link: '#inscricao' },
      {
        id: 'solicitacoes', label: 'Solicitações Acadêmicas',
        children: [
          { id: 'aproveitamento', label: 'Aproveitamento de Disciplinas', link: '#aproveitamento' },
          { id: 'prorrogacao', label: 'Prorrogação de Prazo para Defesa', link: '#prorrogacao' },
          {
            id: 'qualificacao', label: 'Qualificação',
            children: [
              { id: 'proc-qual', label: 'Procedimentos para Banca de Qualificação', link: '#proc-qual' }
            ]
          },
          {
            id: 'defesa', label: 'Defesa',
            children: [
              { id: 'proc-defesa', label: 'Procedimentos para Aprovação de Banca', link: '#proc-defesa' }
            ]
          },
          { id: 'outros-proc', label: 'Outros Procedimentos', link: '#outros-proc' }
        ]
      },
      {
        id: 'normas', label: 'Normas e Diretrizes',
        children: [
          { id: 'regimento', label: 'Regimento e Regulamento', link: '#regimento' },
          { id: 'resolucoes', label: 'Resoluções e Normas', link: '#resolucoes' },
          { id: 'regulamentacao', label: 'Regulamentação do Curso', link: '#regulamentacao' }
        ]
      },
      {
        id: 'producao', label: 'Produção Acadêmica',
        children: [
          { id: 'publicacoes', label: 'Publicações', link: '#publicacoes' },
          { id: 'dissertacoes', label: 'Dissertações', link: '#dissertacoes' }
        ]
      }
    ]
  },
  {
    id: 'destaques', label: 'DESTAQUES',
    children: [
      { id: 'noticias', label: 'Notícias', link: '#noticias' },
      { id: 'eventos', label: 'Eventos', link: '#eventos' },
      {
        id: 'projetos', label: 'Projetos',
        children: [
          { id: 'pesquisa', label: 'Pesquisa', link: '#pesquisa' },
          { id: 'extensao', label: 'Extensão', link: '#extensao' }
        ]
      },
      { id: 'intercambios', label: 'Intercâmbios', link: '#intercambios' },
      { id: 'parceiros', label: 'Parceiros', link: '#parceiros' },
      { id: 'premiacoes', label: 'Premiações', link: '#premiacoes' }
    ]
  },
  {
    id: 'selecao', label: 'SELEÇÃO',
    children: [
      { id: 'aluno-regular', label: 'Aluno Regular', link: '#aluno-regular' },
      { id: 'aluno-especial', label: 'Aluno Especial', link: '#aluno-especial' }
    ]
  },
  { id: 'contato', label: 'CONTATO', link: '/contato' }
];