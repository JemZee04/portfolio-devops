// Описание текущей инфраструктуры проекта — используется страницей /infrastructure
// для построения интерактивной диаграммы (React Flow).

export type InfraNodeKind = "edge" | "server" | "service" | "database" | "cicd" | "registry";

export type InfraNodeData = {
  id: string;
  title: string;
  subtitle: string;
  kind: InfraNodeKind;
  details: string;
  tech: string[];
};

export const infraNodes: InfraNodeData[] = [
  {
    id: "user",
    title: "Пользователь",
    subtitle: "Браузер",
    kind: "edge",
    details:
      "Запрос уходит на доменное имя по HTTPS. Никаких прямых обращений к контейнерам в обход домена и SSL нет.",
    tech: ["HTTPS"],
  },
  {
    id: "dns-ssl",
    title: "Домен + SSL",
    subtitle: "Let's Encrypt / Certbot",
    kind: "edge",
    details:
      "Домен указывает на VPS, сертификат выпущен и продлевается через Let's Encrypt/Certbot. Весь входящий трафик принимается только по HTTPS.",
    tech: ["DNS", "TLS 1.3", "443"],
  },
  {
    id: "vps",
    title: "VPS — App Server",
    subtitle: "Docker Compose стек",
    kind: "server",
    details:
      "Единственный публичный сервер проекта. Nginx, фронтенд, бэкенд и мониторинг — четыре сервиса одного docker-compose стека на одной машине.",
    tech: ["Docker Compose"],
  },
  {
    id: "nginx",
    title: "Nginx",
    subtitle: "Reverse proxy · 80/443",
    kind: "service",
    details:
      "Контейнер nginx:alpine. Терминирует TLS и по location-правилам маршрутизирует трафик: основные роуты — во фронтенд, API — в бэкенд, /monitoring/ — в Glances.",
    tech: ["Nginx", "TLS-терминация"],
  },
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "Next.js · standalone · :3000",
    kind: "service",
    details:
      "Портфолио-сайт (эта страница и есть его часть). Собран в режиме output: standalone, обслуживает клиентские роуты / и /infrastructure. Образ приходит из GHCR и обновляется по CI/CD.",
    tech: ["Next.js", "standalone"],
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Go API · :8090",
    kind: "service",
    details:
      "Go-сервис, собранный из ./backend. Отдаёт API-эндпоинт и обращается к PostgreSQL за данными. Пересобирается на сервере из исходников при деплое.",
    tech: ["Go"],
  },
  {
    id: "monitoring",
    title: "Glances",
    subtitle: "pid: host · 61208-61209",
    kind: "service",
    details:
      "Контейнер nicolargo/glances, поднят в режиме pid: host — видит процессы и метрики самого сервера, а не только своего контейнера. Доступен через Nginx по /monitoring/.",
    tech: ["Glances"],
  },
  {
    id: "db-server",
    title: "Private / DB сеть",
    subtitle: "192.168.0.240",
    kind: "server",
    details:
      "PostgreSQL вынесен за пределы App Server — отдельная машина или изолированная приватная подсеть, недоступная из интернета напрямую.",
    tech: ["Приватная сеть"],
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    subtitle: "База данных",
    kind: "database",
    details:
      "Единственная точка хранения состояния. Принимает подключения только от Backend по приватному адресу 192.168.0.240.",
    tech: ["PostgreSQL"],
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    subtitle: "CI/CD",
    kind: "cicd",
    details:
      "При пуше в main: сборка Docker-образа фронтенда, push в GHCR, затем SSH на VPS — docker compose pull frontend и docker compose up -d, выкатывающие новую версию без ручных действий.",
    tech: ["GitHub Actions", "SSH deploy"],
  },
  {
    id: "ghcr",
    title: "GHCR",
    subtitle: "GitHub Container Registry",
    kind: "registry",
    details: "Хранит собранный образ фронтенда. VPS подтягивает из него свежий тег при каждом деплое.",
    tech: ["Container Registry"],
  },
];

export type InfraEdgeData = {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  dashed?: boolean;
};

export const infraEdges: InfraEdgeData[] = [
  { id: "e-user-dns", source: "user", target: "dns-ssl", label: "HTTPS", animated: true },
  { id: "e-dns-nginx", source: "dns-ssl", target: "nginx", label: "443", animated: true },
  { id: "e-nginx-frontend", source: "nginx", target: "frontend", label: "proxy_pass /" },
  { id: "e-nginx-backend", source: "nginx", target: "backend", label: "proxy_pass /api" },
  { id: "e-nginx-monitoring", source: "nginx", target: "monitoring", label: "/monitoring/" },
  {
    id: "e-backend-postgres",
    source: "backend",
    target: "postgres",
    label: "192.168.0.240",
    dashed: true,
  },
  { id: "e-gha-ghcr", source: "github-actions", target: "ghcr", label: "build & push", animated: true },
  { id: "e-gha-vps", source: "github-actions", target: "vps", label: "ssh: pull + up -d", dashed: true },
  { id: "e-ghcr-frontend", source: "ghcr", target: "frontend", label: "docker pull", dashed: true },
];
