# Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app

# Сначала копируем зависимости
COPY package*.json ./
RUN npm ci

# Явно копируем ВСЕ файлы конфигураций из корня
COPY next.config.ts ./
COPY tsconfig.json ./
COPY eslint.config.mjs ./ 2>/dev/null || true
COPY postcss.config.mjs ./ 2>/dev/null || true
COPY tailwind.config.ts ./ 2>/dev/null || true
COPY next-env.d.ts ./

# Копируем исходный код страниц и компонентов
COPY src ./src

# Запускаем сборку продакшна
RUN npm run build

# Запуск приложения
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["npm", "run", "start"]