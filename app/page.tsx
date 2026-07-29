import { Hero } from "@/components/hero/Hero";
import { Principles } from "@/components/about/Principles";
import { Section } from "@/components/ui/Section";
import { SkillMatrix } from "@/components/skills/SkillMatrix";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { TechTimeline } from "@/components/timeline/TechTimeline";
import { Research } from "@/components/research/Research";
import { ContactCTA } from "@/components/contact/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />

      <Principles />

      <Section
        id="skills"
        eyebrow="Skill Matrix // Capability"
        title="Interactive Tech Stack"
        description="Capability expressed as internal access tiers and surface-area descriptors — not percentage bars. Filter by domain to inspect the matrix."
      >
        <SkillMatrix />
      </Section>

      <Section
        id="projects"
        eyebrow="Engine Showcase // Featured"
        title="Featured Projects"
        description="High-impact work across custom runtimes, memory tooling, and autonomous agent fleets — with execution-flow architecture and measured benchmarks."
      >
        <ProjectShowcase />
      </Section>

      <Section
        id="timeline"
        eyebrow="Capability Trace // Evolution"
        title="Technical Timeline"
        description="A chronological trace from scripting fundamentals to autonomous agent development. Select a node to inspect the phase."
      >
        <TechTimeline />
      </Section>

      <Research />

      <ContactCTA />
    </>
  );
}
