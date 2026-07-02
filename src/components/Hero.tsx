"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Mail, Send } from "lucide-react";
import { contacts, personal } from "@/data/profile";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3 py-1 font-mono text-xs text-accent"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {personal.availability}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {personal.name}
        <span className="block gradient-text">{personal.role}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mt-6 max-w-2xl text-balance text-lg text-muted"
      >
        {personal.summary}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <a
          href={contacts.telegram.href}
          target="_blank"
          rel="noreferrer"
          className="glow inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
        >
          <Send size={16} />
          Написать в Telegram
        </a>
        <a
          href={contacts.github.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <GitFork size={16} />
          GitHub
        </a>
        <a
          href={contacts.email.href}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Mail size={16} />
          Email
        </a>
        <a
          href="/infrastructure"
          className="inline-flex items-center gap-1 px-2 py-2.5 text-sm text-muted transition-colors hover:text-accent"
        >
          Смотреть инфраструктуру
          <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </section>
  );
}
