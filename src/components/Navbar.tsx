"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";
import { personal } from "@/data/profile";

const links = [
  { href: "/", label: "Обо мне" },
  { href: "/infrastructure", label: "Инфраструктура" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border-strong bg-background-elevated text-accent">
            <Terminal size={15} />
          </span>
          <span className="hidden sm:inline">{personal.name}</span>
        </Link>

        <nav className="flex items-center gap-1 rounded-full border border-border bg-background-elevated/60 p-1 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  isActive
                    ? "bg-accent text-background font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
