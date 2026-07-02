import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { InfraDiagram } from "@/components/infra/InfraDiagram";
import { InfraLegend } from "@/components/infra/InfraLegend";
import { Reveal } from "@/components/Reveal";
import { ShieldCheck, Boxes, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Инфраструктура — Данила Кузин",
  description: "Схема инфраструктуры, на которой развёрнут этот сайт: два VPS, nginx, Go-приложение, PostgreSQL и мониторинг.",
};

const highlights = [
  {
    icon: ShieldCheck,
    title: "Изоляция базы данных",
    text: "PostgreSQL живёт на отдельном VPS без публичного доступа — только по приватному IP от сервера приложения.",
  },
  {
    icon: Boxes,
    title: "Docker Compose",
    text: "Оба сервера подняты через docker-compose: воспроизводимо, декларативно, легко пересобрать с нуля.",
  },
  {
    icon: Network,
    title: "TLS на границе",
    text: "Домен с выпущенным SSL-сертификатом принимает весь трафик на 443 порту, дальше — reverse proxy через nginx.",
  },
];

export default function InfrastructurePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Пример из практики"
        title="Инфраструктура этого сайта"
        description="Реальная схема того, на чём развёрнут этот портфолио: два VPS, разделение по приватной сети, reverse proxy, мониторинг и планы на CI/CD. Кликайте по узлам диаграммы, чтобы увидеть детали."
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
