"use client";

import { ArrowRight, ArrowUpRight, X } from "lucide-react";
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
import { filterIds, filterLabels, type FilterId } from "@/content/filters";
import type { Project } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
  dict: Dictionary["work"];
};

const INITIAL_COUNT = 5;

const WASHES = ["bg-wash-1", "bg-wash-2", "bg-wash-3"];

function StackTags({ stack, max }: { stack: string[]; max?: number }) {
  if (stack.length === 0) return null;
  const shown = max ? stack.slice(0, max) : stack;
  const hidden = stack.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li
          key={item}
          className="inline-flex h-6 items-center rounded-sm border border-rule px-1.5 font-mono text-xs text-muted"
        >
          {item}
        </li>
      ))}
      {hidden > 0 ? (
        <li className="inline-flex h-6 items-center font-mono text-xs text-muted">
          +{hidden}
        </li>
      ) : null}
    </ul>
  );
}

export function WorkGrid({ projects, dict }: Props) {
  const [filter, setFilter] = useState<FilterId | "all">("all");
  const { projectSlug, setProjectSlug } = useAppState();

  const [showAll, setShowAll] = useState(false);

  const matching =
    filter === "all"
      ? projects
      : projects.filter((project) => project.filters.includes(filter));
  // The unfiltered view opens on a short selection so the page is not a wall
  // of cards; one wide card plus four fills two rows exactly.
  const collapsible = filter === "all" && projects.length > INITIAL_COUNT;
  const visible =
    collapsible && !showAll ? matching.slice(0, INITIAL_COUNT) : matching;
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
                wide && "card--wide sm:col-span-2 lg:flex-row",
              )}
              style={
                {
                  animationDelay: `${Math.min(index, 8) * 40}ms`,
                } as React.CSSProperties
              }
            >
              <div
                className={cn(
                  "relative aspect-[15/10] shrink-0 overflow-hidden border-b border-rule",
                  WASHES[index % WASHES.length],
                  wide &&
                    "lg:aspect-auto lg:min-h-[21rem] lg:w-[58%] lg:border-r lg:border-b-0",
                )}
              >
                {project.images.map((src, shot) => (
                  <div
                    key={src}
                    className={cn(
                      "card__shot",
                      shot === 0 ? "card__shot--a" : "card__shot--b",
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes={
                        wide
                          ? "(min-width: 64rem) 30rem, 80vw"
                          : "(min-width: 64rem) 18rem, (min-width: 40rem) 40vw, 80vw"
                      }
                      className="object-cover object-left-top"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                {project.context || project.demos.length > 0 ? (
                  <div className="flex items-center justify-between gap-3">
                    <p className="label">{project.context}</p>
                    {project.demos[0] ? (
                      <a
                        href={project.demos[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-(--z-base) inline-flex h-7 shrink-0 items-center gap-1.5 rounded-sm border border-rule px-2 font-mono text-xs text-ink-2 hover:border-accent hover:text-accent-strong"
                      >
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-accent"
                        />
                        {dict.live}
                        <span className="sr-only">: {project.title}</span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className={cn("text-sm", !wide && "line-clamp-2")}>
                  {project.summary}
                </p>
                <StackTags stack={project.stack} max={3} />
                <button
                  type="button"
                  className="link mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start pt-2 text-sm after:absolute after:inset-0"
                  onClick={() => setProjectSlug(project.slug)}
                >
                  {dict.view}
                  <ArrowRight aria-hidden className="card__arrow size-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {collapsible ? (
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            className="btn"
            aria-expanded={showAll}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? dict.showLess : dict.showAll}
            {showAll ? null : (
              <span className="font-mono text-xs text-muted tabular-nums">
                {projects.length}
              </span>
            )}
          </button>
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </div>
      ) : null}

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

              {active.demos.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {active.demos.map((href, index) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("btn", index === 0 && "btn--primary")}
                    >
                      {index === 0 ? dict.openDemo : dict.otherVersion}
                      <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  ))}
                </div>
              ) : null}

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
