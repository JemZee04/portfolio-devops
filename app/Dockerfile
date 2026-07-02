# --- ЭТАП 1: Сборка Go-бинарника ---
FROM golang:1.23-alpine AS builder
WORKDIR /app

# Кэшируем зависимости отдельным слоем
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Статически линкуем бинарник — не нужен рантайм Go в финальном образе
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

# --- ЭТАП 2: Финальный легковесный образ для запуска ---
FROM alpine:3.20 AS runner
WORKDIR /app

# ca-certificates нужны для проверки TLS-сертификатов внешних URL, которые опрашивает сервис
RUN apk add --no-cache ca-certificates

RUN addgroup --system --gid 1001 app && adduser --system --uid 1001 app

COPY --from=builder --chown=app:app /app/server ./server
COPY --from=builder --chown=app:app /app/data ./data

USER app

EXPOSE 8090

CMD ["./server"]
