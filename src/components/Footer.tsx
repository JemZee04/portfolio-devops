import { contacts, personal } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personal.name}. {personal.role}.
        </p>
        <div className="flex items-center gap-4">
          <a href={contacts.github.href} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
            GitHub
          </a>
          <a href={contacts.telegram.href} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
            Telegram
          </a>
          <a href={contacts.email.href} className="hover:text-accent transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
