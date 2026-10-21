# ==============================================================================
# Multi-stage Dockerfile para SoftForge Landing Page (Next.js 16 Standalone)
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. Base image
# ------------------------------------------------------------------------------
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ------------------------------------------------------------------------------
# 2. Dependencies stage
# ------------------------------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ------------------------------------------------------------------------------
# 3. Builder stage
# ------------------------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilita telemetria do Next.js durante a compilação
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Suporte a build arguments para customização opcional de URLs públicas
ARG NEXT_PUBLIC_SITE_URL="https://softforge.com.br"
ARG NEXT_PUBLIC_CONTACT_EMAIL="contato@softforge.com.br"
ARG NEXT_PUBLIC_WHATSAPP_NUMBER="5585900000000"
ARG NEXT_PUBLIC_PHONE_DISPLAY="+55 (85) 90000-0000"

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_CONTACT_EMAIL=${NEXT_PUBLIC_CONTACT_EMAIL}
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=${NEXT_PUBLIC_WHATSAPP_NUMBER}
ENV NEXT_PUBLIC_PHONE_DISPLAY=${NEXT_PUBLIC_PHONE_DISPLAY}

RUN npm run build

# ------------------------------------------------------------------------------
# 4. Runner stage (Produção enxuta e segura)
# ------------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Criação de usuário sem privilégios root para segurança (least privilege)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copia arquivos estáticos públicos
COPY --from=builder /app/public ./public

# Copia a saída standalone enxuta gerada pelo Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Healthcheck do container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
