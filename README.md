# SoftForge — Landing Page Institucional

Landing page institucional da **SoftForge** (`Forjamos software que impulsiona o seu negócio.`), apresentando nossos serviços de engenharia de software sob medida e nossos produtos autorais em operação (**PRAXIS** e **catchVagas**).

## Identidade Visual Oficial (Guia de Marca)

- **Paleta:** Azul Principal (`#0066FF`), Azul Marca (`#0750B5`), Azul Escuro (`#0B1F44`), Fundo Profundo (`#050D1F`), Branco (`#FFFFFF`) e Cinza Técnico (`#A0A7B8`).
- **Tipografia:** **Montserrat** (títulos e destaques) + **Inter** (textos, formulários e interface) via `next/font/google`.
- **Símbolo:** "S" geométrico chanfrado + lettering em caixa alta `SOFTFORGE`.

## Produtos & Cases Reais Destacados

1. **PRAXIS (`#cases`):** SaaS B2B Vertical para Gestão de Responsabilidade Técnica (RT), Segurança dos Alimentos (ANVISA RDC 216/2004 e RDC 275) e controle de ARTs (CFN/CRN), com auditoria mobile, laudos técnicos em PDF com 1 clique, Plano de Ação 5W2H, etiquetagem com QR Code público e billing recorrente Asaas (`.NET 8`, `Clean Architecture`, `PostgreSQL 16`, `Cloudflare R2`, `React 19`, `React Native / Expo`).
2. **catchVagas (`#cases`):** Rastreador e bot inteligente multi-usuário em Python que monitora LinkedIn, Indeed, Glassdoor e Google Jobs, aplica filtros e deduplicação por usuário no SQLite e envia alertas interativos via Telegram e WhatsApp (`Python 3.10+`, `Telegram Bot API`, `SQLite`, `Docker Compose`).

## Configuração via `.env`

Todas as chaves de API, e-mails, dados da empresa, WhatsApp, redes sociais e limites de segurança estão centralizados no arquivo [`.env`](.env) (com modelo versionado em [`.env.example`](.env.example)) e tipados em [`src/lib/env.ts`](src/lib/env.ts):

| Variável | Escopo | Descrição |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Público | URL canônica do site (SEO, Sitemap, Open Graph) |
| `NEXT_PUBLIC_COMPANY_NAME` | Público | Nome fantasia da marca (`SoftForge`) |
| `NEXT_PUBLIC_COMPANY_LEGAL_NAME` | Público | Razão social (rodapé e Política de Privacidade) |
| `NEXT_PUBLIC_COMPANY_CNPJ` | Público | CNPJ exibido no rodapé e na página legal |
| `NEXT_PUBLIC_CITY` | Público | Cidade/UF exibida nos canais de atendimento |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Público | E-mail comercial exibido no site |
| `NEXT_PUBLIC_FOUNDER_NAME` / `EMAIL` | Público | Nome e e-mail institucional do fundador |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Público | Telefone formatado para exibição |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Público | Número com DDI/DDD (apenas dígitos) para o link `wa.me` |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Público | `@` do Instagram |
| `NEXT_PUBLIC_LINKEDIN_URL` / `INSTAGRAM_URL` / `GITHUB_URL` | Público | URLs das redes sociais no rodapé e JSON-LD |
| `RESEND_API_KEY` | Servidor | Chave da API do [Resend](https://resend.com) para envio de e-mails |
| `RESEND_API_URL` | Servidor | Endpoint da API do Resend |
| `CONTACT_FROM_EMAIL` | Servidor | Remetente verificado no Resend |
| `CONTACT_TO_EMAIL` | Servidor | E-mail destinatário que recebe os leads |
| `CONTACT_WEBHOOK_URL` | Servidor | Webhook opcional (n8n, Slack, Discord, CRM) disparado a cada novo lead |
| `CONTACT_RATE_LIMIT_MAX` / `WINDOW_MS` | Servidor | Limite de requisições por IP na rota `/api/contact` |

## Começando

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e servidor de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | Checagem de tipos |
| `npm run test:e2e` | Testes E2E + a11y (desktop e mobile) — requer `npm run build` antes |
| `npm run verify` | Tudo acima em sequência |
