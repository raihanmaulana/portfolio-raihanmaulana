"use client";

import { ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useAppState } from "@/components/app-state";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dictionary } from "@/content/dictionary";
import {
  filterIds,
  filterLabels,
  type FilterId,
  type Project,
} from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
  dict: Dictionary["work"];
};

function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((item) => (
        <li
          key={item}
          className="inline-flex h-6 items-center rounded-sm border border-rule px-1.5 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function WorkGrid({ projects, dict }: Props) {
  const [filter, setFilter] = useState<FilterId | "all">("all");
  const { projectSlug, setProjectSlug } = useAppState();

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.filters.includes(filter));
  const active = projects.find((project) => project.slug === projectSlug);

  const chips = [
    { id: "all" as const, label: dict.all, count: projects.length },
    ...filterIds.map((id) => ({
      id,
      label: filterLabels[id],
      count: projects.filter((project) => project.filters.includes(id)).length,
    })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label={dict.filterLabel}
        className="mt-8 flex flex-wrap gap-2"
      >
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className="chip"
            aria-pressed={filter === chip.id}
            onClick={() => setFilter(chip.id)}
          >
            {chip.label}
            <span className="ml-2 font-mono text-xs tabular-nums opacity-70">
              {chip.count}
            </span>
          </button>
        ))}
      </div>

      <ul
        key={filter}
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project, index) => {
          const wide = filter === "all" && index === 0;
          return (
            <li
              key={project.slug}
              className={cn(
                "card card-fade relative flex flex-col overflow-hidden rounded-md border border-rule bg-paper",
                wide && "lg:col-span-2",
              )}
            >
              <div className="relative aspect-[15/8] border-b border-rule bg-paper-2">
                <Image
                  src={project.images[0]}
                  alt=""
                  fill
                  sizes={
                    wide
                      ? "(min-width: 64rem) 46rem, (min-width: 40rem) 50vw, 100vw"
                      : "(min-width: 64rem) 23rem, (min-width: 40rem) 50vw, 100vw"
                  }
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                {project.context ? (
                  <p className="label">{project.context}</p>
                ) : null}
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="line-clamp-3 text-sm">{project.summary}</p>
                <StackTags stack={project.stack} />
                <button
                  type="button"
                  className="link mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start pt-2 text-sm after:absolute after:inset-0"
                  onClick={() => setProjectSlug(project.slug)}
                >
                  {dict.view}
                  <ArrowRight aria-hidden className="size-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Dialog
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setProjectSlug(null);
        }}
      >
        {active ? (
          <DialogContent className="inset-0 sm:inset-auto sm:top-[6vh] sm:left-1/2 sm:max-h-[88vh] sm:w-[min(46rem,calc(100%-2rem))] sm:-translate-x-1/2 sm:rounded-md sm:border">
            <div className="flex shrink-0 items-start gap-4 border-b border-rule px-5 py-4">
              <div className="min-w-0 flex-1">
                {active.context ? (
                  <p className="label mb-1">{active.context}</p>
                ) : null}
                <DialogTitle className="text-xl font-semibold">
                  {active.title}
                </DialogTitle>
              </div>
              <DialogClose aria-label={dict.close} className="btn w-10 px-0">
                <X aria-hidden className="size-4" />
              </DialogClose>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <DialogDescription className="max-w-[65ch] text-ink-2">
                {active.summary}
              </DialogDescription>

              <div className="mt-5">
                <StackTags stack={active.stack} />
              </div>

              <h3 className="mt-7 text-base font-semibold">{dict.whatIDid}</h3>
              <ul className="mt-3 flex max-w-[65ch] flex-col gap-2">
                {active.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm">
                    <span
                      aria-hidden
                      className="mt-[0.55rem] size-1.5 shrink-0 bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid grid-cols-1 gap-4">
                {active.images.map((src, index) => (
                  <figure
                    key={src}
                    className="relative aspect-[15/8] overflow-hidden rounded-md border border-rule bg-paper-2"
                  >
                    <Image
                      src={src}
                      alt={`${dict.screenshot} ${index + 1}: ${active.title}`}
                      fill
                      sizes="(min-width: 40rem) 43rem, 100vw"
                      className="object-cover object-top"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
