import { GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import { education, languages } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function EducationLanguages() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Reveal className="glass-card rounded-2xl p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-2">
          <GraduationCap size={15} />
          Образование
        </h3>
        <ul className="space-y-4">
          {education.map((item) => (
            <li key={`${item.degree}-${item.year}`}>
              <p className="text-sm font-medium text-foreground">
                {item.degree} · {item.year}
              </p>
              <p className="text-sm text-muted">{item.school}</p>
              <p className="text-sm text-muted">{item.field}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.06} className="glass-card rounded-2xl p-6">
        <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-2">
          <LanguagesIcon size={15} />
          Языки
        </h3>
        <ul className="space-y-3">
          {languages.map((lang) => (
            <li key={lang.name} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{lang.name}</span>
              <span className="text-muted">{lang.level}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
