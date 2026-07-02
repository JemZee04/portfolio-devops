import { Briefcase, Check } from "lucide-react";
import { experience } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {experience.map((job, index) => (
        <Reveal key={job.company} delay={index * 0.08}>
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-foreground">
                  <Briefcase size={16} className="text-accent" />
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold hover:text-accent transition-colors"
                  >
                    {job.company}
                  </a>
                  <span className="text-muted">· {job.location}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{job.title}</p>
              </div>
              <div className="rounded-full border border-border bg-background-elevated px-3 py-1 font-mono text-xs text-muted">
                {job.period}
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent-2" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
