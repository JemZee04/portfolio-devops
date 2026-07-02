import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { InfraDiagram } from "@/components/infra/InfraDiagram";
import { InfraLegend } from "@/components/infra/InfraLegend";
import { Reveal } from "@/components/Reveal";
import { ShieldCheck, Workflow, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Инфраструктура — Данила Кузин",
  description: "Схема инфраструктуры, на которой развёрнут этот сайт: nginx, Next.js, Go API, PostgreSQL, мониторинг и CI/CD через GitHub Actions.",
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "Изоляция базы данных",
    text: "PostgreSQL вынесен за пределы App Server — отдельная машина/приватная подсеть, недоступная из интернета напрямую.",
  },
  {
    icon: Workflow,
    title: "CI/CD на GitHub Actions",
    text: "Пуш в main собирает образ фронтенда, пушит в GHCR и деплоит на VPS по SSH — без ручных действий.",
  },
  {
    icon: Network,
    title: "TLS на границе",
    text: "Домен с SSL-сертификатом (Let's Encrypt) принимает весь трафик на 443 порту, дальше nginx разводит его по сервисам.",
  },
];

export default function InfrastructurePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Пример из практики"
        title="Инфраструктура этого сайта"
        description="Реальная схема того, на чём развёрнут этот портфолио: один App Server с nginx, фронтендом и бэкендом, отдельная база данных и CI/CD-пайплайн на GitHub Actions. Кликайте по узлам диаграммы, чтобы увидеть детали."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {highlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06} className="glass-card rounded-2xl p-5">
            <item.icon size={18} className="text-accent" />
            <h3 className="mt-3 text-sm font-medium text-foreground">{item.title}</h3>
            <p className="mt-1 text-sm text-muted">{item.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mb-4">
        <InfraLegend />
      </div>

      <InfraDiagram />
    </div>
  );
}
