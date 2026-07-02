# --- ЭТАП 1: Установка зависимостей ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем только файлы пакетов для эффективного кэширования слоев
COPY package*.json ./
RUN npm ci

# --- ЭТАП 2: Сборка приложения ---
FROM node:20-alpine AS builder
WORKDIR /app

# Забираем установленные node_modules из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules
# Копируем абсолютно весь проект целиком
COPY . .

# Отключаем телеметрию Next.js на этапе сборки
ENV NEXT_TELEMETRY_DISABLED=1

# Компилируем Next.js (он создаст папку .next/standalone)
RUN npm run build

# --- ЭТАП 3: Финальный легковесный образ для запуска ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Создаем безопасного системного пользователя, чтобы не запускать контейнер из-под root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только те файлы, которые необходимы для запуска standalone-сервера
COPY --from=builder /app/package.json ./package.json

# Автоматически копируем собранный сервер и необходимые модули
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключаемся на безопасного пользователя
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# В режиме standalone приложение запускается напрямую через node server.js
CMD ["node", "server.js"]