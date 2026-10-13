"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useAppState } from "@/components/app-state";
import type { Dictionary } from "@/content/dictionary";
import { locales, type Locale } from "@/lib/i18n";

const noopSubscribe = () => () => {};

// ⌘ on Apple keyboards, Ctrl elsewhere. Resolved on the client only.
function useIsApple() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => false,
  );
}

type Props = {
  locale: Locale;
  name: string;
  email: string;
  dict: Dictionary["nav"];
};

export function SiteNav({ locale, name, email, dict }: Props) {
  const { setPaletteOpen } = useAppState();
  const isApple = useIsApple();

  const links = [
    { href: "#work", label: dict.work },
    { href: "#experience", label: dict.experience },
    { href: "#skills", label: dict.skills },
  ];

  return (
    <header className="sticky top-0 z-(--z-sticky) border-b border-rule bg-paper-veil backdrop-blur-[8px]">
      <div className="shell flex h-16 items-center gap-3 md:gap-6">
        <Link
          href={`/${locale}`}
          className="font-display text-base font-semibold tracking-[-0.02em] whitespace-nowrap text-ink"
        >
          {name}
        </Link>

        <button
          type="button"
          className="searchpill hidden max-w-[19rem] md:flex"
          onClick={() => setPaletteOpen(true)}
          aria-keyshortcuts="Meta+K Control+K"
        >
          <Search aria-hidden className="size-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-left">
            {dict.search}
          </span>
          <span aria-hidden className="flex shrink-0 gap-1">
            <kbd className="kbd">{isApple ? "⌘" : "Ctrl"}</kbd>
            <kbd className="kbd">K</kbd>
          </span>
        </button>

        <nav className="ml-auto flex items-center gap-3 md:gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link hidden text-sm lg:inline"
            >
              {link.label}
            </a>
          ))}

          <div
            role="group"
            aria-label={dict.language}
            className="flex items-center font-mono text-xs"
          >
            {locales.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                hrefLang={code}
                aria-current={code === locale ? "true" : undefined}
                className="grid h-10 min-w-8 place-items-center px-1 text-muted uppercase aria-[current=true]:text-ink aria-[current=true]:underline aria-[current=true]:decoration-accent aria-[current=true]:underline-offset-4"
              >
                {code}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="btn w-10 px-0 md:hidden"
            onClick={() => setPaletteOpen(true)}
            aria-label={dict.search}
          >
            <Search aria-hidden className="size-4" />
          </button>

          <a
            href={`mailto:${email}`}
            className="btn btn--primary hidden min-[22.5rem]:inline-flex"
          >
            {dict.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
