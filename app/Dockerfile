# --- ЭТАП 1: Установка зависимостей ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# --- ЭТАП 2: Сборка приложения ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Собираем проект ( package.json мы обновим на флаг --webpack )
RUN npm run build

# --- ЭТАП 3: Финальный легковесный образ для запуска ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем конфиг пакетов
COPY --from=builder /app/package.json ./package.json

# Гарантированно забираем все три артефакта standalone режима, о которых писал Claude
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public 2>/dev/null || true

# Переключаемся на безопасного пользователя
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# В режиме standalone запускаем сервер напрямую через node
CMD ["node", "server.js"]