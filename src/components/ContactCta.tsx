import { GitFork, Mail, Phone, Send } from "lucide-react";
import { contacts } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

const items = [
  { icon: Send, ...contacts.telegram },
  { icon: Mail, ...contacts.email },
  { icon: GitFork, ...contacts.github },
  { icon: Phone, ...contacts.phone },
];

export function ContactCta() {
  return (
    <Reveal className="glass-card rounded-2xl p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-foreground">На связи</h3>
      <p className="mt-1 text-sm text-muted">
        Быстрее всего ответить получится в Telegram — это предпочитаемый способ связи.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center gap-3 rounded-xl border border-border bg-background-elevated px-4 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Icon size={16} className="text-accent-2" />
            {label}
          </a>
        ))}
      </div>
    </Reveal>
  );
}
