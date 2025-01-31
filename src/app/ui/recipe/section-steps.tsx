import type { Section } from "@/app/types/types";

export function SectionSteps({ section }: { section: Section }) {
  return (
    <div>
      <h3 className=" text-xl">{section.name}</h3>
      {section.steps.map((step) => (
        <div key={step.id}>
          <p>
            <span>{step.step_number}.</span>
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
