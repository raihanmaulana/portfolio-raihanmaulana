"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { Content } from "@/content/site";

type Props = {
  jobs: Content["experience"];
};

export function ExperienceTimeline({ jobs }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <ol className="relative mt-8 ml-1 border-l border-rule">
      {jobs.map((job, index) => {
        const isOpen = open === index;
        const panelId = `job-${index}`;
        return (
          <li
            key={`${job.company}-${job.period}`}
            className="timeline__item relative border-b border-rule pl-6 md:pl-8"
            data-open={isOpen}
          >
            <span
              aria-hidden
              className="timeline__dot absolute top-[1.6rem] -left-[4.5px] size-2 bg-rule-2"
            />
            <h3>
              <button
                type="button"
                className="group grid w-full cursor-pointer gap-x-6 gap-y-1 py-4 text-left md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-baseline"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className="label tabular-nums">{job.period}</span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-semibold text-ink">
                    {job.role}
                  </span>
                  <span className="block font-body text-sm font-normal tracking-normal text-ink-2">
                    {job.company} · {job.place}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className="timeline__chevron absolute top-5 right-0 size-4 text-muted group-hover:text-ink md:static md:self-center"
                />
              </button>
            </h3>
            <div
              id={panelId}
              className="timeline__panel md:pl-[12.5rem]"
              inert={!isOpen}
            >
              <ul className="flex min-h-0 max-w-[68ch] flex-col gap-1.5 overflow-hidden">
                {job.points.map((point, pointIndex) => (
                  <li
                    key={point}
                    className={`flex gap-3 text-sm ${pointIndex === job.points.length - 1 ? "pb-5" : ""}`}
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55rem] size-1.5 shrink-0 bg-rule-2"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
