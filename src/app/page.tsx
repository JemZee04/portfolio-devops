import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsGrid } from "@/components/SkillsGrid";
import { EducationLanguages } from "@/components/EducationLanguages";
import { ContactCta } from "@/components/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Опыт" title="Где я работал" />
        <ExperienceTimeline />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Стек" title="С чем я работаю" />
        <SkillsGrid />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Бэкграунд" title="Образование и языки" />
        <EducationLanguages />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <ContactCta />
      </section>
    </>
  );
}
