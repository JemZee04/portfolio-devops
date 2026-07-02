import { MousePointerClick } from "lucide-react";
import type { InfraNodeData } from "@/data/infrastructure";

const kindLabel: Record<InfraNodeData["kind"], string> = {
  edge: "Точка входа",
  server: "Сервер",
  service: "Сервис",
  database: "База данных",
  cicd: "CI/CD",
  registry: "Реестр образов",
};

export function InfraDetails({ node }: { node: InfraNodeData | null }) {
  if (!node) {
    return (
      <div className="glass-card flex h-[640px] flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center text-muted">
        <MousePointerClick size={22} className="text-accent" />
        <p className="text-sm">
          Кликните по узлу на диаграмме, чтобы увидеть подробности о компоненте инфраструктуры.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card h-[640px] overflow-y-auto rounded-2xl p-6">
      <p className="font-mono text-xs uppercase tracking-wider text-accent">{kindLabel[node.kind]}</p>
      <h3 className="mt-2 text-xl font-semibold text-foreground">{node.title}</h3>
      <p className="text-sm text-muted">{node.subtitle}</p>

      <p className="mt-4 text-sm leading-relaxed text-muted">{node.details}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {node.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border bg-background-elevated px-3 py-1 text-xs text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
