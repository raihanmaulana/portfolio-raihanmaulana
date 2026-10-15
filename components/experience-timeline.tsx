"use client";

import { ChevronDown, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { Dictionary } from "@/content/dictionary";
import type { Content } from "@/content/site";

type Props = {
  jobs: Content["experience"];
  labels: Dictionary["experience"];
};

// Three photo slots per role. A slot without a file shows a labelled
// placeholder until the photo is added under public/images/experience/.
function PhotoSlots({
  job,
  labels,
}: {
  job: Content["experience"][number];
  labels: Dictionary["experience"];
}) {
  return (
    <ul className="grid max-w-[40rem] grid-cols-3 gap-2 pb-6 sm:gap-3">
      {job.images.map((src, index) => (
        <li
          key={index}
          className={
            src
              ? "relative aspect-[4/3] overflow-hidden rounded-sm border border-rule bg-paper-2"
              : "grid aspect-[4/3] place-items-center rounded-sm border border-dashed border-rule-2 bg-paper-2 text-muted"
          }
        >
          {src ? (
            <Image
              src={src}
              alt={`${labels.photo} ${index + 1}: ${job.role}, ${job.company}`}
              fill
              sizes="(min-width: 40rem) 13rem, 30vw"
              className="object-cover"
            />
          ) : (
            <span className="flex flex-col items-center gap-1.5 px-1 text-center">
              <ImageIcon aria-hidden className="size-4" />
              <span className="font-mono text-[0.6875rem] leading-tight">
                {labels.photo} {index + 1}
                <span className="hidden sm:inline"> · {labels.pending}</span>
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceTimeline({ jobs, labels }: Props) {
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
              <div className="min-h-0 overflow-hidden">
                <ul className="flex max-w-[68ch] flex-col gap-1.5">
                  {job.points.map((point, pointIndex) => (
                    <li
                      key={point}
                      className={`flex gap-3 text-sm ${pointIndex === job.points.length - 1 ? "pb-4" : ""}`}
                    >
                      <span
                        aria-hidden
                        className="mt-[0.55rem] size-1.5 shrink-0 bg-rule-2"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <PhotoSlots job={job} labels={labels} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
