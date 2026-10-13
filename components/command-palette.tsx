"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Copy,
  FolderOpen,
  Languages,
  LayoutGrid,
  Mail,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppState } from "@/components/app-state";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Dictionary } from "@/content/dictionary";
import type { Project } from "@/content/site";
import { otherLocale, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  email: string;
  linkedin: string;
  projects: Pick<Project, "slug" | "title" | "stack">[];
  dict: Pick<Dictionary, "nav" | "palette" | "contact" | "intro">;
};

// cmdk's default fuzzy scoring matches scattered letters ("ruang" hit the
// email address); plain substring matching keeps results predictable.
function matchSubstring(value: string, search: string, keywords?: string[]) {
  const haystack = [value, ...(keywords ?? [])].join(" ").toLowerCase();
  return haystack.includes(search.trim().toLowerCase()) ? 1 : 0;
}

export function CommandPalette({
  locale,
  email,
  linkedin,
  projects,
  dict,
}: Props) {
  const { paletteOpen, setPaletteOpen, setProjectSlug } = useAppState();
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen, setPaletteOpen]);

  // Close first, then act, so focus restoration does not fight the action.
  const run = (action: () => void) => {
    setPaletteOpen(false);
    window.setTimeout(action, 80);
  };

  const goTo = (id: string) =>
    run(() => {
      document.getElementById(id)?.scrollIntoView();
      window.history.replaceState(null, "", `#${id}`);
    });

  const sections = [
    { id: "work", label: dict.nav.work, icon: LayoutGrid },
    { id: "experience", label: dict.nav.experience, icon: Briefcase },
    { id: "skills", label: dict.nav.skills, icon: BadgeCheck },
    { id: "contact", label: dict.nav.contact, icon: Mail },
  ];

  return (
    <Dialog open={paletteOpen} onOpenChange={setPaletteOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="inset-0 sm:inset-auto sm:top-[14vh] sm:left-1/2 sm:w-[min(35rem,calc(100%-2rem))] sm:-translate-x-1/2 sm:rounded-md sm:border"
      >
        <DialogTitle className="sr-only">{dict.palette.title}</DialogTitle>
        <Command label={dict.palette.title} loop filter={matchSubstring}>
          <CommandInput
            placeholder={dict.palette.placeholder}
            trailing={
              <DialogClose
                aria-label={dict.palette.close}
                className="grid size-10 shrink-0 cursor-pointer place-items-center text-muted sm:size-auto"
              >
                <X aria-hidden className="size-4 sm:hidden" />
                <kbd aria-hidden className="kbd hidden sm:inline-grid">
                  esc
                </kbd>
              </DialogClose>
            }
          />
          <CommandList>
            <CommandEmpty>{dict.palette.empty}</CommandEmpty>

            <CommandGroup heading={dict.palette.sections}>
              {sections.map(({ id, label, icon: Icon }) => (
                <CommandItem key={id} value={label} onSelect={() => goTo(id)}>
                  <Icon aria-hidden />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={dict.palette.projects}>
              {projects.map((project) => (
                <CommandItem
                  key={project.slug}
                  value={project.title}
                  keywords={project.stack}
                  onSelect={() =>
                    run(() => {
                      document.getElementById("work")?.scrollIntoView();
                      setProjectSlug(project.slug);
                    })
                  }
                >
                  <FolderOpen aria-hidden />
                  <span className="min-w-0 flex-1 truncate">
                    {project.title}
                  </span>
                  {project.stack[0] ? (
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {project.stack[0]}
                    </span>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={dict.palette.contact}>
              <CommandItem
                value={dict.intro.sendEmail}
                keywords={[email]}
                onSelect={() =>
                  run(() => {
                    window.location.href = `mailto:${email}`;
                  })
                }
              >
                <Mail aria-hidden />
                <span className="min-w-0 flex-1 truncate">
                  {dict.intro.sendEmail}
                </span>
                <span className="hidden shrink-0 font-mono text-xs text-muted sm:inline">
                  {email}
                </span>
              </CommandItem>
              <CommandItem
                value={dict.contact.copy}
                onSelect={() =>
                  run(() => {
                    void navigator.clipboard?.writeText(email);
                  })
                }
              >
                <Copy aria-hidden />
                {dict.contact.copy}
              </CommandItem>
              <CommandItem
                value={dict.contact.linkedin}
                onSelect={() =>
                  run(() => {
                    window.open(linkedin, "_blank", "noopener,noreferrer");
                  })
                }
              >
                <ArrowUpRight aria-hidden />
                {dict.contact.linkedin}
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading={dict.palette.language}>
              <CommandItem
                value={dict.palette.switchTo}
                keywords={["language", "bahasa", "english", "indonesia"]}
                onSelect={() => run(() => router.push(`/${otherLocale(locale)}`))}
              >
                <Languages aria-hidden />
                {dict.palette.switchTo}
              </CommandItem>
            </CommandGroup>
          </CommandList>

          <div
            aria-hidden
            className="hidden shrink-0 items-center gap-4 border-t border-rule px-4 py-2.5 font-mono text-xs text-muted sm:flex"
          >
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">↑</kbd>
              <kbd className="kbd">↓</kbd>
              {dict.palette.navigate}
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">↵</kbd>
              {dict.palette.open}
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">esc</kbd>
              {dict.palette.close}
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
