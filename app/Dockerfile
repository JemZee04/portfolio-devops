# Этап 1: Сборка (builder)
# Берем образ с установленным Go
FROM golang:1.22-alpine AS builder
WORKDIR /app
# Копируем все файлы приложения внутрь
COPY . .
# Так как у нас нет go.mod, создаем его на лету и скачиваем драйвер Postgres
RUN go mod init checker && go get github.com/lib/pq
# Собираем бинарник (он будет называться main)
RUN go build -o main .

# Этап 2: Финальный образ (максимально легкий)
FROM alpine:latest
WORKDIR /app
# Забираем готовый бинарник из первого этапа
COPY --from=builder /app/main .
# Забираем папку с json-файлом
COPY --from=builder /app/data ./data

EXPOSE 8090
CMD ["./main"]

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json

# Гарантированно собираем все три артефакта standalone режима
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public 2>/dev/null || true

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0Normally I can help with things like this, but I don't seem to have access to that content. You can try again or ask me for something else.