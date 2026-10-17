/**
 * Configuração central da SoftForge.
 * Todo conteúdo editável da landing page (contatos, serviços, cases reais, depoimentos, FAQ)
 * fica aqui para facilitar a manutenção sem mexer nos componentes.
 */

import { publicEnv } from "./env";

export const siteConfig = {
  name: publicEnv.companyName,
  legalName: publicEnv.companyLegalName,
  cnpj: publicEnv.companyCnpj,
  url: publicEnv.siteUrl,
  slogan: "Forjamos software que impulsiona o seu negócio.",
  subSlogan: "Da ideia à solução, engenharia de software para gerar resultados.",
  title: "Fábrica de Software, SaaS e Landing Pages | SoftForge",
  description:
    "Desenvolvemos sistemas, SaaS, sites, landing pages e APIs sob medida, além de produtos próprios como PRAXIS e catchVagas. Do protótipo ao deploy ✓",
  locale: "pt_BR",
  email: publicEnv.contactEmail,
  founderName: publicEnv.founderName,
  founderEmail: publicEnv.founderEmail,
  instagramHandle: publicEnv.instagramHandle,
  phoneDisplay: publicEnv.phoneDisplay,
  whatsapp: publicEnv.whatsappNumber,
  city: publicEnv.city,
  social: publicEnv.social,
} as const;

export const whatsappLink = (text = "Olá, SoftForge! Gostaria de um orçamento.") =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;

export const navItems = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#cases", label: "Cases" },
  { href: "/#processo", label: "Processo" },
  { href: "/#diferenciais", label: "Diferenciais" },
  { href: "/#depoimentos", label: "Clientes" },
  { href: "/#faq", label: "FAQ" },
] as const;

export type IconName =
  | "factory"
  | "rocket"
  | "cart"
  | "phone"
  | "pen"
  | "wrench"
  | "search"
  | "layers"
  | "code"
  | "check"
  | "shield"
  | "gauge"
  | "users"
  | "chat"
  | "cloud";

export type Service = {
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    icon: "factory",
    title: "Fábrica de Software",
    description:
      "Desenvolvimento de sistemas web, SaaS B2B e APIs sob medida para automatizar processos e escalar a sua operação.",
    bullets: ["SaaS multi-tenant, ERPs e portais", "APIs RESTful e integrações", "Arquitetura limpa e escalável"],
  },
  {
    icon: "rocket",
    title: "Landing Pages de Alta Conversão",
    description:
      "Páginas rápidas, otimizadas para SEO e pensadas para transformar visitantes em oportunidades comerciais.",
    bullets: ["Copy orientada a conversão", "Nota 90+ no Lighthouse", "Integração com CRM, WhatsApp e Ads"],
  },
  {
    icon: "cart",
    title: "Sites Institucionais e E-commerce",
    description:
      "Presença digital com identidade forte e lojas virtuais completas, com cobrança recorrente ou avulsa.",
    bullets: ["PIX, cartão e assinaturas (Asaas/Stripe)", "Painel administrativo", "SEO técnico e dados estruturados"],
  },
  {
    icon: "phone",
    title: "Aplicativos Mobile",
    description:
      "Apps Android e iOS em React Native / Expo integrados à nuvem, prontos para operação em campo.",
    bullets: ["React Native & Expo", "Câmera, QR Code e modo ágil", "Publicação nas lojas"],
  },
  {
    icon: "pen",
    title: "UI/UX & Design Systems",
    description:
      "Identidade visual, interfaces editoriais minimalistas e Design Systems acessíveis validados antes do código.",
    bullets: ["Brand Board & protótipos no Figma", "Design Tokens reutilizáveis", "Acessibilidade WCAG 2.2 AA"],
  },
  {
    icon: "wrench",
    title: "Automações, Bots & Sustentação",
    description:
      "Bots inteligentes (Telegram/WhatsApp), scrapers, cloud DevOps e evolução contínua do seu produto digital.",
    bullets: ["Bots e rastreadores em Python", "Containers Docker e Cloud", "SLA de suporte e evolução"],
  },
];

export type ProjectCase = {
  slug: "praxis" | "catchvagas";
  name: string;
  subtitle: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: { value: string; label: string }[];
  features: string[];
  stack: string[];
};

export const projects: ProjectCase[] = [
  {
    slug: "praxis",
    name: "PRAXIS",
    subtitle: "Inteligência em Ação · Gestão de RT e Segurança dos Alimentos",
    category: "SaaS B2B Vertical · Web + Mobile",
    summary:
      "Plataforma SaaS multi-tenant que digitaliza todo o ciclo regulatório da ANVISA (RDC 216/2004 e RDC 275) e dos Conselhos de Nutricionistas (CFN/CRN) para consultorias e nutricionistas de Food Service.",
    challenge:
      "Consultorias e nutricionistas perdiam de 2 a 3 horas por visita digitando laudos manualmente no Word, espalhando fotos no WhatsApp e correndo risco de autuações por perda de prazos de ART e validade de alimentos.",
    solution:
      "Ecossistema completo com app mobile para auditoria em cozinhas, cálculo automático de conformidade sanitária, emissão de Laudo Técnico em PDF com 1 clique, Plano de Ação 5W2H e módulo de Etiquetagem com QR Code público.",
    highlights: [
      { value: "1 clique", label: "Para emitir laudos técnicos em PDF" },
      { value: "RDC 216", label: "Checklists e POPs ANVISA nativos" },
      { value: "QR Code", label: "Rastreabilidade pública de validade" },
    ],
    features: [
      "Auditoria mobile em campo com captura de evidências fotográficas (Cloudflare R2 com Presigned URLs)",
      "Controle de ARTs junto ao CRN com alertas automáticos de vencimento (30 dias de antecedência)",
      "Gestão de Não Conformidades com Plano de Ação 5W2H e comparativo fotográfico Antes & Depois",
      "Etiquetas térmicas com regras de validade ANVISA e verificação pública instantânea via QR Code",
      "Isolamento multi-tenant rigoroso (EF Core Global Query Filters) e billing recorrente via Asaas (PIX/Cartão)",
    ],
    stack: [
      ".NET 8 Web API",
      "Clean Architecture",
      "PostgreSQL 16",
      "Cloudflare R2",
      "React 19 + Tailwind",
      "React Native / Expo",
      "Asaas Billing",
    ],
  },
  {
    slug: "catchvagas",
    name: "catchVagas",
    subtitle: "Rastreador e Bot Inteligente de Oportunidades",
    category: "Automação & Bot Multi-Usuário · Python",
    summary:
      "Motor automatizado em Python que monitora, filtra, deduplica e alerta em tempo real sobre novas vagas no LinkedIn, Indeed, Glassdoor e Google Jobs, com controle interativo via Telegram e WhatsApp.",
    challenge:
      "Profissionais perdiam horas vasculhando múltiplos portais de emprego repetidamente e recebendo vagas duplicadas, irrelevantes ou de banco de talentos genérico.",
    solution:
      "Bot multi-usuário com varredura contínua agendada, filtragem por palavras-chave obrigatórias/excluídas, deduplicação individual no SQLite e painel de controle por botões inline no Telegram.",
    highlights: [
      { value: "4 portais", label: "LinkedIn, Indeed, Glassdoor e Google" },
      { value: "Multi-Chat", label: "Perfis e alertas 100% isolados" },
      { value: "12+ áreas", label: "Categorias prontas + busca livre" },
    ],
    features: [
      "Painel interativo no Telegram (/config, /categoria, /cargo, /remoto, /local, /buscar e paginação /vagas)",
      "Suporte multi-usuário isolado: preferências em user_settings e deduplicação por par (chat_id, job_url)",
      "12 perfis pré-configurados (.NET, Python, TI, UI/UX, Finanças, Nutrição, Saúde, RH) ou qualquer cargo customizado",
      "Persistência local resiliente em SQLite e execução contínua em background via Docker Compose",
    ],
    stack: [
      "Python 3.10+",
      "Telegram Bot API",
      "Multi-Site Scraper",
      "SQLite",
      "YAML Config",
      "Docker Compose",
    ],
  },
];

export const processSteps = [
  {
    icon: "search" as IconName,
    title: "Imersão",
    description: "Entendemos o seu negócio, regras do setor e objetivos para definir o escopo ideal.",
  },
  {
    icon: "pen" as IconName,
    title: "Design & Protótipo",
    description: "Wireframes, identidade e protótipos navegáveis para validar a solução antes do código.",
  },
  {
    icon: "code" as IconName,
    title: "Engenharia",
    description: "Arquitetura limpa, sprints curtas com entregas semanais e acompanhamento transparente.",
  },
  {
    icon: "check" as IconName,
    title: "Testes e Qualidade",
    description: "Testes automatizados E2E, revisão de código, acessibilidade WCAG e checagem de segurança.",
  },
  {
    icon: "cloud" as IconName,
    title: "Deploy e Evolução",
    description: "Publicação em nuvem, monitoramento contínuo e evolução guiada por métricas reais.",
  },
];

export const differentials = [
  {
    icon: "layers" as IconName,
    title: "Criadores de produtos reais",
    description:
      "Além de projetos sob medida, desenvolvemos nossos próprios SaaS e automações como o PRAXIS e o catchVagas.",
  },
  {
    icon: "gauge" as IconName,
    title: "Performance de verdade",
    description: "Código otimizado e Core Web Vitals no verde: mais velocidade, melhor SEO e mais conversão.",
  },
  {
    icon: "shield" as IconName,
    title: "Segurança e LGPD by Design",
    description:
      "Isolamento multi-tenant, criptografia, boas práticas OWASP e tratamento de dados alinhado à LGPD.",
  },
  {
    icon: "users" as IconName,
    title: "Trato direto com a engenharia",
    description: "Você fala direto com quem projeta e constrói. Sem intermediários, sem telefone sem fio.",
  },
];

export const techStack = [
  ".NET 8 / C#",
  "Next.js",
  "React 19",
  "TypeScript",
  "React Native / Expo",
  "Python",
  "Node.js",
  "PostgreSQL",
  "SQLite",
  "Tailwind CSS",
  "Cloudflare R2 / AWS",
  "Docker",
];

export const stats = [
  { value: "2", label: "Produtos próprios no ar" },
  { value: "100%", label: "Código sob medida e auditável" },
  { value: "98/100", label: "Meta de performance Web Vitals" },
  { value: "24h", label: "Para resposta do orçamento" },
];

export const testimonials = [
  {
    quote:
      "Com o PRAXIS, o laudo técnico com fotos e plano 5W2H que antes tomava 3 horas no Word agora sai em 1 clique antes mesmo de eu sair do restaurante.",
    name: "Dra. Camila Ferreira",
    role: "Nutricionista RT · Consultoria em Segurança dos Alimentos",
  },
  {
    quote:
      "O catchVagas filtrou exatamente as vagas remotas da minha stack e me avisou no Telegram minutos depois da publicação, sem repetição.",
    name: "Lucas Moura",
    role: "Engenheiro de Software Backend (.NET & Python)",
  },
  {
    quote:
      "A SoftForge estruturou nossa landing page e integrações com uma clareza técnica rara. Entregas semanais pontuais e performance impecável.",
    name: "Rafael Almeida",
    role: "Diretor de Operações · Setor de Serviços B2B",
  },
];

export const faqs = [
  {
    question: "Quanto custa desenvolver um software, SaaS ou landing page?",
    answer:
      "Depende do escopo, das integrações e do prazo. Após uma conversa rápida de diagnóstico, enviamos uma proposta comercial detalhada e sem compromisso em até 24 horas úteis.",
  },
  {
    question: "A SoftForge desenvolve produtos completos como o PRAXIS para clientes?",
    answer:
      "Sim. Projetamos e construímos desde landing pages de alta conversão e bots de automação (como o catchVagas) até plataformas SaaS B2B completas com backend .NET/Node, painel web React/Next.js, aplicativo mobile React Native e cobrança integrada.",
  },
  {
    question: "Qual o prazo médio de entrega?",
    answer:
      "Landing pages ficam prontas em 1 a 3 semanas. Sistemas, automações e aplicativos são entregues em etapas: o primeiro módulo funcional (MVP) costuma entrar no ar entre 4 e 10 semanas.",
  },
  {
    question: "O código-fonte e a propriedade intelectual ficam com a minha empresa?",
    answer:
      "Sim. Nos projetos sob encomenda, todo o código-fonte, documentação técnica, banco de dados e acessos de nuvem são transferidos para a sua empresa, com propriedade intelectual garantida em contrato.",
  },
  {
    question: "Vocês oferecem suporte e evolução depois do deploy?",
    answer:
      "Sim. Todos os projetos contam com garantia técnica, e oferecemos planos de sustentação e evolução contínua com SLA para novas funcionalidades, monitoramento e infraestrutura.",
  },
  {
    question: "Atendem empresas de qualquer lugar do Brasil?",
    answer:
      "Sim. Atuamos de forma 100% remota com clientes de todo o Brasil e do exterior, com ritos semanais por videochamada e acompanhamento em tempo real.",
  },
];

export const serviceOptions = [
  "Fábrica de Software",
  "Landing Page",
  "Site / E-commerce",
  "Aplicativo Mobile",
  "Automação / Bot",
  "UI/UX Design",
  "Sustentação / Consultoria",
  "Conhecer o PRAXIS / catchVagas",
  "Outro",
] as const;
