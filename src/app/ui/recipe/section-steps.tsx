import type { Section } from "@/app/types/types";

export function SectionSteps({ section }: { section: Section }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className=" text-xl">{section.name}</h3>
      {section.steps.map((step) => (
        <div key={step.id} className=" px-4 py-4 bg-background-1 rounded-md">
          <p className="font-thin">
            <span>{step.step_number}.</span> {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
