// Все текстовые данные "обо мне" вынесены сюда — обновляй резюме, просто редактируя этот файл.

export const personal = {
  name: "Данила Кузин",
  role: "DevOps / Platform Engineer",
  location: "Краснодар, Россия",
  summary:
    "Backend-разработчик, который полюбил инфраструктуру и переходит в SRE/DevOps. Уверенный опыт разработки отказоустойчивых сервисов на Go, профилирования и работы с базами данных под нагрузкой. Понимаю, как приложения работают изнутри, потребляют память и сеть, почему они падают в продакшене и как это предотвращать. В последнее время сфокусирован на observability (Jaeger/OpenTelemetry), оркестрации в Kubernetes и оптимизации архитектуры — на текущем месте перенёс логику нескольких legacy-сервисов в KrakenD, успешно выведя их из эксплуатации без даунтайма. В свободное время углубляюсь в администрирование Linux, копаюсь в сетях. Люблю автоматизировать рутину и строить системы, которые умеют чинить себя сами.",
  yearsOfExperience: "2 года 7 месяцев",
  availability: "Открыт к предложениям — удалённо, гибрид или офис",
};

export const contacts = {
  telegram: { label: "@d_kuzin4", href: "https://t.me/d_kuzin4", primary: true },
  email: { label: "kuzin.danil4@yandex.ru", href: "mailto:kuzin.danil4@yandex.ru" },
  github: { label: "github.com/JemZee04", href: "https://github.com/JemZee04" },
  phone: { label: "+7 918 023-43-35", href: "tel:+79180234335" },
};

export type Experience = {
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  duration: string;
  title: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    company: "AERO",
    companyUrl: "https://www.aeroidea.ru",
    location: "Москва",
    period: "Декабрь 2023 — настоящее время",
    duration: "2 года 7 месяцев",
    title: "Программист отдела бэкенд-разработки / Платформенный инженер",
    bullets: [
      "Участвовал в развитии внутренней платформы e-commerce, обеспечивая отказоустойчивость интеграций и оптимизацию производительности микросервисной архитектуры.",
      "Выполнил миграцию логики проксирования, кэширования и авторизации в API Gateway (KrakenD) с использованием кастомных хуков — вывел из эксплуатации два legacy-микросервиса без даунтайма.",
      "Внедрил распределённую трассировку на базе Jaeger и OpenTelemetry в Go-микросервисы для ускорения диагностики сетевых задержек и инцидентов в production.",
      "Настраивал health check эндпоинты (liveness/readiness probes) и graceful shutdown для корректного завершения работы сервисов при деплое и рестарте подов в Kubernetes.",
      "Спроектировал отказоустойчивый флоу взаимодействия с внешней системой клиента: фоновые джобы и ретраи значительно повысили процент успешных заказов при сетевых сбоях на стороне партнёра.",
      "Оптимизировал критический API-метод, ускорив его в 13 раз (с 800мс до 60мс) за счёт декомпозиции тяжёлых SQL-запросов и их конкурентного выполнения через Goroutines и WaitGroup.",
      "Реализовал защиту от циклических HTTP-редиректов на уровне БД с помощью PostgreSQL-триггера и рекурсивного обхода (WITH RECURSIVE), перенеся критическую валидацию из приложения в БД.",
      "Разработал сервис автоматизации встреч (Go + Zoom API + Yandex Calendar) с пулингом аккаунтов — сократил затраты компании на лицензии Zoom в 2 раза.",
      "Создал Kafka-консьюмер для асинхронного партиционированного импорта данных и систему генерации Sitemap, минимизировав ручной труд смежных отделов.",
      "Развивал базовый шаблон Go-приложения для команды: миграция DI-контейнера с google/wire на sarulabs/di и универсальная ролевая модель (RBAC), интегрированная с Keycloak.",
    ],
  },
];

export type Education = {
  degree: string;
  year: string;
  school: string;
  location: string;
  field: string;
};

export const education: Education[] = [
  {
    degree: "Магистр",
    year: "2026",
    school: "Кубанский государственный технологический университет",
    location: "Краснодар",
    field: "ИТ и кибербезопасность, Прикладная информатика",
  },
  {
    degree: "Бакалавр",
    year: "2024",
    school: "Кубанский государственный технологический университет",
    location: "Краснодар",
    field: "ИТ и кибербезопасность, Программная инженерия",
  },
];

export const languages = [
  { name: "Русский", level: "Родной" },
  { name: "Английский", level: "B1 — Средний" },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Инфраструктура и оркестрация",
    items: ["Docker", "Kubernetes", "Linux", "GitLab CI/CD", "Bash"],
  },
  {
    category: "Observability",
    items: ["Prometheus", "Grafana", "Jaeger", "OpenTelemetry"],
  },
  {
    category: "Backend и данные",
    items: ["Go", "SQL", "PostgreSQL", "Kafka", "Redis", "MongoDB", "Elasticsearch"],
  },
  {
    category: "Архитектура и платформа",
    items: ["Микросервисная архитектура", "KrakenD", "Keycloak"],
  },
];
