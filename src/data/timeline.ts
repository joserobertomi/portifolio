export const timelineCategories = [
  "Experiência",
  "Pesquisa",
  "Formação",
  "Conquistas",
] as const;

export interface TimelineEvent {
  category: (typeof timelineCategories)[number];
  date: string;
  title: string;
  institution: string;
  period?: string;
  description: string[];
}

export const timeline: TimelineEvent[] = [
  {
    category: "Pesquisa",
    date: "out. 2026",
    title: "Pesquisador voluntário",
    institution: "PMI Goiás Chapter",
    period: "out. 2026 – atual",
    description: [
      "Desde outubro de 2026, participo do PMI Goiás como pesquisador voluntário na área de ciência e tecnologia.",
    ],
  },
  {
    category: "Experiência",
    date: "ago. 2026",
    title: "Mentoria em inteligência artificial",
    institution: "Colégio Verum",
    period: "ago. 2026 – atual",
    description: [
      "Oriento estudantes na Olimpíada de Inteligência Artificial Aplicada. Apoio as equipes na compreensão dos desafios, na organização do trabalho e na construção de soluções próprias em visão computacional, processamento de linguagem natural e aprendizado de máquina.",
      "Uma equipe sob minha mentoria avançou para a segunda fase da competição, ficando entre as 50 melhores.",
    ],
  },
  {
    category: "Experiência",
    date: "jan. 2026",
    title: "Engenharia de software na SADI",
    institution: "SADI · São Paulo, remoto",
    period: "jan. 2026 – atual",
    description: [
      "Na SADI, contribuo para uma plataforma educacional de visão computacional e inteligência artificial que acompanha mais de 240 mil estudantes. A plataforma transforma dados do ambiente escolar em informações que apoiam decisões pedagógicas.",
      "Atuo na evolução da arquitetura de microsserviços em nuvem, com foco em escala e confiabilidade, e na construção de pipelines distribuídos para processar os dados da plataforma.",
    ],
  },
  {
    category: "Experiência",
    date: "out. 2025",
    title: "Produtos e projetos de inovação",
    institution: "Instituto de Tecnologia Anexo Brasil · Goiânia, híbrido",
    period: "out. 2025 – atual",
    description: [
      "Como engenheiro de software, atuo no desenvolvimento de novos produtos e na gestão de projetos de inovação, conectando objetivos de negócio, decisões técnicas e entregas.",
      "Trabalhei na SADI Indústria, com visão computacional e IoT para acompanhar ativos, colaboradores e o uso de EPIs, e no Transporte Inteligente, uma solução de localização e logística para a segurança de alunos no transporte escolar.",
      "Também montei um time de agentes de IA para planejamento de conteúdo, copywriting e acompanhamento de indicadores de marketing. No MedScript, participei de uma solução para apoiar médicos e facilitar a jornada do paciente.",
    ],
  },
  {
    category: "Experiência",
    date: "abr. 2025",
    title: "Automações e desenvolvimento web",
    institution: "CDI Premium · Goiânia, presencial",
    period: "abr. 2025 – out. 2025",
    description: [
      "Desenvolvi automações para o financeiro com técnicas de RPA, web scraping e APIs. Tarefas recorrentes que levavam dias passaram a ser executadas em poucas horas.",
      "Projetei uma arquitetura para integrar e otimizar processos da clínica e um sistema de controle de contraste para apoiar a compra e a gestão de insumos. Também trabalhei com dados e indicadores para apoiar a gestão da operação.",
    ],
  },
  {
    category: "Pesquisa",
    date: "set. 2024",
    title: "Pesquisa em inteligência artificial",
    institution: "Instituto Federal de Goiás · Anápolis",
    period: "set. 2024 – ago. 2025",
    description: [
      "Como bolsista de pesquisa, desenvolvi um identificador de perdas na produção de leite a partir de perturbações nas curvas de lactação, em parceria com a pós-graduação em Inteligência Artificial do IFG.",
      "Estruturei o estudo pela metodologia KDD e tratei séries temporais com NumPy, SciPy e scikit-learn. Comparei métodos estatísticos e modelos de aprendizado de máquina para distinguir quedas persistentes das variações normais da produção.",
      "Estudei arquiteturas de redes neurais, incluindo MLPs e autoencoders, e aprofundei meus conhecimentos em aprendizado profundo com PyTorch.",
    ],
  },
  {
    category: "Pesquisa",
    date: "set. 2023",
    title: "Um veículo autônomo para aprender construindo",
    institution: "Instituto Federal de Goiás · Anápolis",
    period: "set. 2023 – ago. 2024",
    description: [
      "Como bolsista de pesquisa em robótica, desenvolvi um protótipo de veículo autônomo que seguia uma pista modular por visão computacional, mesmo com reflexos e variações de luminosidade.",
      "Integrei Raspberry Pi, câmera e motores, programei a navegação com Python e OpenCV e usei detecção de bordas e um controlador simples para orientar o veículo. Construí o chassi com impressão 3D e organizei o projeto com Git.",
      "Os testes e a investigação de falhas de hardware e software aprofundaram meus conhecimentos em Linux, redes, robótica e IoT.",
    ],
  },
  {
    category: "Pesquisa",
    date: "jan. 2023",
    title: "Primeiros passos na pesquisa em IA",
    institution: "Instituto Federal de Goiás · Oficinas 4.0",
    period: "jan. 2023 – out. 2023",
    description: [
      "Como pesquisador voluntário, participei do Oficinas 4.0, um projeto em parceria com a Prefeitura de Anápolis para criar uma plataforma inteligente de recomendação de vagas e candidatos.",
      "Realizei testes e atividades de QA, validando funcionalidades e identificando falhas para orientar melhorias. Nesse período, aprofundei meus conhecimentos em modelos de linguagem e participei de cursos de gestão de projetos, programação, IA e Indústria 4.0.",
    ],
  },
  {
    category: "Formação",
    date: "set. 2022",
    title: "Inovação em uma equipe multidisciplinar",
    institution: "IFG · Lapassion em Rede – Metodologia Brampssol",
    period: "set. 2022 – dez. 2022",
    description: [
      "Como bolsista de intercâmbio, participei de um programa que reuniu estudantes do Brasil e de Portugal. Integrei a equipe do desafio de qualificação para a Indústria 4.0 da CANPACK, uma multinacional de origem polonesa.",
      "Aplicamos design thinking para pesquisar o problema, construir uma proposta e apresentá-la no Demoday. A experiência fortaleceu minha liderança, comunicação e colaboração. Em 2023, o programa recebeu o ouro na categoria Cidadania Global do Awards of Excellence da WFCP.",
    ],
  },
  {
    category: "Formação",
    date: "mar. 2022",
    title: "Ciência da Computação",
    institution: "Instituto Federal de Goiás",
    period: "mar. 2022 – 2026",
    description: [
      "Em março de 2022, iniciei o bacharelado em Ciência da Computação no IFG. A graduação reúne minha formação em programação, redes de computadores e bancos de dados às experiências de pesquisa e desenvolvimento de produtos.",
    ],
  },
  {
    category: "Conquistas",
    date: "dez. 2021",
    title: "Prata nacional na Olimpíada Brasileira de Robótica",
    institution: "Olimpíada Brasileira de Robótica",
    description: [
      "Conquistei a medalha de prata na etapa nacional da OBR em uma prova individual de conhecimentos em tecnologia.",
    ],
  },
  {
    category: "Conquistas",
    date: "nov. 2021",
    title: "Robótica, programação e a primeira conquista em equipe",
    institution: "Olimpíada Brasileira de Robótica",
    description: [
      "Com minha equipe, conquistei a medalha de prata na etapa estadual da OBR. Programamos um robô em um ambiente virtual para seguir um percurso e resgatar vítimas simuladas. Foi nesse projeto que aprendi lógica de programação e a resolver desafios técnicos em equipe.",
    ],
  },
];

export function filterTimeline(category: string) {
  return timeline.filter(
    (event) => category === "Tudo" || event.category === category,
  );
}
