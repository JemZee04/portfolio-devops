// Описание текущей инфраструктуры проекта — используется страницей /infrastructure
// для построения интерактивной диаграммы (React Flow).

export type InfraNodeKind = "edge" | "server" | "service" | "database" | "planned";

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
      "Запрос уходит на доменное имя по HTTPS. Никаких прямых обращений к серверам в обход домена и SSL нет.",
    tech: ["HTTPS"],
  },
  {
    id: "dns-ssl",
    title: "Домен + SSL",
    subtitle: "443 / TLS-терминация",
    kind: "edge",
    details:
      "Зарегистрирован домен, настроен SSL-сертификат и приём трафика на 443 порту. Весь входящий трафик идёт только по HTTPS.",
    tech: ["DNS", "TLS 1.3", "443"],
  },
  {
    id: "vps2",
    title: "VPS #2 — App Server",
    subtitle: "Публичный сервер",
    kind: "server",
    details:
      "Публичный VPS, поднятый через docker-compose. Принимает весь входящий трафик, проксирует его в приложение и не хранит данные — только вычисления и раздача.",
    tech: ["Docker Compose", "Публичный IP"],
  },
  {
    id: "nginx",
    title: "Nginx",
    subtitle: "Reverse proxy",
    kind: "service",
    details:
      "Терминирует SSL, проксирует запросы во внутренний Go-сервис и отдаёт статику. Первая точка входа внутри VPS #2.",
    tech: ["Nginx"],
  },
  {
    id: "go-app",
    title: "Go-приложение",
    subtitle: "1 API-метод",
    kind: "service",
    details:
      "Минималистичный сервис на Go с одним методом API. Обращается к PostgreSQL на VPS #1 по приватной сети.",
    tech: ["Go"],
  },
  {
    id: "monitoring",
    title: "Мониторинг",
    subtitle: "Метрики и дашборды",
    kind: "service",
    details:
      "Стек мониторинга поднят рядом с приложением в том же docker-compose и следит за состоянием сервисов на обеих машинах.",
    tech: ["Prometheus", "Grafana"],
  },
  {
    id: "vps1",
    title: "VPS #1 — DB Server",
    subtitle: "Приватный сервер",
    kind: "server",
    details:
      "Отдельный VPS, недоступный извне напрямую. Принимает подключения только от VPS #2 по приватному IP — снижает поверхность атаки на базу данных.",
    tech: ["Docker Compose", "Приватный IP"],
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    subtitle: "База данных",
    kind: "database",
    details: "Единственная точка хранения состояния приложения, изолирована в приватной сети.",
    tech: ["PostgreSQL"],
  },
  {
    id: "cicd",
    title: "GitHub Actions",
    subtitle: "CI/CD — в разработке",
    kind: "planned",
    details:
      "Планируется автоматическая сборка, тесты и деплой на VPS #2 через GitHub Actions. Пока деплой выполняется вручную.",
    tech: ["GitHub Actions", "план"],
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
  { id: "e-nginx-app", source: "nginx", target: "go-app", label: "proxy_pass" },
  { id: "e-nginx-monitoring", source: "nginx", target: "monitoring", label: "метрики", dashed: true },
  { id: "e-app-monitoring", source: "go-app", target: "monitoring", label: "метрики", dashed: true },
  {
    id: "e-app-postgres",
    source: "go-app",
    target: "postgres",
    label: "приватный IP",
    dashed: true,
  },
  { id: "e-cicd-nginx", source: "cicd", target: "vps2", label: "deploy", dashed: true },
];
