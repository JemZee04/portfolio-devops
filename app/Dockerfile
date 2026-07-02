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
