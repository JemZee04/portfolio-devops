const items = [
  { label: "Точка входа", className: "border-accent-2/40 text-accent-2" },
  { label: "Сервер (VPS)", className: "border-border-strong text-foreground" },
  { label: "Сервис", className: "border-accent/40 text-accent" },
  { label: "База данных", className: "border-accent-2/40 text-accent-2" },
  { label: "Планируется", className: "border-warning/40 border-dashed text-warning" },
];

export function InfraLegend() {
  return (
    <div className="flex flex-wrap gap-3 text-xs">
      {items.map((item) => (
        <span
          key={item.label}
          className={`rounded-full border bg-background-elevated px-3 py-1 ${item.className}`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
