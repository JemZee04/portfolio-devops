import { skills } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function SkillsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skills.map((group, index) => (
        <Reveal key={group.category} delay={index * 0.06} className="glass-card rounded-2xl p-6">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-2">
            {group.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background-elevated px-3 py-1 text-sm text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
