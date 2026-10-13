import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AppStateProvider } from "@/components/app-state";
import { CommandPalette } from "@/components/command-palette";
import { CopyEmail } from "@/components/copy-email";
import { SiteNav } from "@/components/site-nav";
import { WorkGrid } from "@/components/work-grid";
import { dictionaries } from "@/content/dictionary";
import { getContent } from "@/content/site";
import { hasLocale } from "@/lib/i18n";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex max-w-[68ch] flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm">
          <span
            aria-hidden
            className="mt-[0.55rem] size-1.5 shrink-0 bg-rule-2"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = dictionaries[lang];
  const content = getContent(lang);
  const { profile } = content;

  const facts = [
    { label: dict.intro.now, value: profile.current },
    { label: dict.intro.based, value: profile.location },
    { label: dict.intro.studied, value: profile.degree },
  ];

  return (
    <AppStateProvider>
      <SiteNav
        locale={lang}
        name={profile.shortName}
        email={profile.email}
        dict={dict.nav}
      />

      <main id="main" className="flex-1">
        <section className="shell grid gap-10 pt-12 pb-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:items-end md:gap-14 md:pt-20 md:pb-24">
          <div>
            <p
              className="label rise flex items-center gap-2.5"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <span aria-hidden className="size-1.5 shrink-0 bg-accent" />
              {profile.role}
            </p>
            <h1
              className="rise mt-4 max-w-[17ch] text-display font-semibold"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {profile.headline}
            </h1>
            <p
              className="rise mt-5 max-w-[60ch]"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {profile.lede}
            </p>
            <div
              className="rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <a href={`mailto:${profile.email}`} className="btn btn--primary">
                {dict.intro.sendEmail}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1 text-sm"
              >
                LinkedIn
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </div>
            <dl
              className="rise mt-10 grid gap-x-8 gap-y-1 border-t border-rule pt-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-y-3"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="contents">
                  <dt className="label pt-0.5 not-first:mt-3 sm:not-first:mt-0">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure
            className="rise relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md border border-rule bg-paper-2 md:justify-self-end"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <Image
              src={profile.portrait}
              alt={dict.intro.portraitAlt}
              fill
              priority
              sizes="(min-width: 48rem) 24rem, 100vw"
              className="origin-[47%_26%] scale-[1.7] object-cover object-top"
            />
          </figure>
        </section>

        <section id="work" className="shell border-t border-rule py-16 md:py-20">
          <h2 className="text-xl font-semibold">{dict.work.title}</h2>
          <p className="mt-2 max-w-[60ch]">{dict.work.tagline}</p>
          <WorkGrid projects={content.projects} dict={dict.work} />
        </section>

        <section id="experience" className="shell pt-8 pb-20 md:pb-28">
          <h2 className="text-xl font-semibold">{dict.experience.title}</h2>
          <ol className="mt-8 border-t border-rule">
            {content.experience.map((job) => (
              <li
                key={`${job.company}-${job.period}`}
                className="grid gap-2 border-b border-rule py-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8"
              >
                <p className="label pt-1 tabular-nums">
                  {job.period}
                  <span className="mt-1 block">{job.place}</span>
                </p>
                <div>
                  <h3 className="text-lg font-semibold">{job.role}</h3>
                  <p className="mt-0.5 text-sm text-ink">{job.company}</p>
                  <Points items={job.points} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="border-y border-rule bg-paper-2">
          <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:py-20">
            <div>
              <h2 className="text-xl font-semibold">{dict.skills.title}</h2>
              {content.skillGroups.map((group) => (
                <div key={group.title} className="mt-8">
                  <h3 className="text-base font-semibold">{group.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex h-8 items-center rounded-sm border border-rule bg-paper px-2.5 font-mono text-xs text-ink-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <h3 className="mt-10 text-base font-semibold">
                {dict.skills.languages}
              </h3>
              <p className="mt-2 text-sm">{content.languages.join(" · ")}</p>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h3 className="text-base font-semibold">
                  {dict.skills.education}
                </h3>
                <p className="mt-3 text-ink">{content.education.school}</p>
                <p className="text-sm">{content.education.degree}</p>
                <p className="label mt-1 tabular-nums">
                  {content.education.period}
                </p>
                <Points items={content.education.points} />
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  {dict.skills.certifications}
                </h3>
                <ul className="mt-3 border-t border-rule">
                  {content.certifications.map((cert) => (
                    <li
                      key={cert.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-rule py-2.5 text-sm"
                    >
                      <span className="text-ink">{cert.name}</span>
                      {cert.issuer ? (
                        <span className="font-mono text-xs text-muted">
                          {cert.issuer}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  {dict.skills.organizations}
                </h3>
                <ul className="mt-3 border-t border-rule">
                  {content.organizations.map((org) => (
                    <li
                      key={org.name}
                      className="border-b border-rule py-2.5 text-sm"
                    >
                      <span className="text-ink">{org.role}</span>
                      <span className="block">{org.name}</span>
                      <span className="label mt-1 block tabular-nums">
                        {org.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-graphite text-graphite-muted">
          <div className="shell grid gap-10 py-20 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end md:gap-14 md:py-28">
            <div>
              <h2 className="max-w-[17ch] text-display font-semibold text-graphite-ink">
                {dict.contact.title}
              </h2>
              <p className="mt-4 max-w-[46ch]">{dict.contact.body}</p>
            </div>
            <div className="flex flex-col gap-5">
              <a
                href={`mailto:${profile.email}`}
                className="self-start font-mono text-base whitespace-nowrap text-graphite-ink underline decoration-graphite-accent underline-offset-[6px] sm:text-lg"
              >
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="btn btn--light">
                  {dict.intro.sendEmail}
                </a>
                <CopyEmail
                  email={profile.email}
                  label={dict.contact.copy}
                  copiedLabel={dict.contact.copied}
                />
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--on-graphite"
                >
                  {dict.contact.linkedin}
                  <ArrowUpRight aria-hidden className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell py-6">
        <p className="font-mono text-xs text-muted">
          © 2026 {profile.name} · {profile.location} · {dict.footer.built}
        </p>
      </footer>

      <CommandPalette
        locale={lang}
        email={profile.email}
        linkedin={profile.linkedin}
        projects={content.projects.map(({ slug, title, stack }) => ({
          slug,
          title,
          stack,
        }))}
        dict={{
          nav: dict.nav,
          palette: dict.palette,
          contact: dict.contact,
          intro: dict.intro,
        }}
      />
    </AppStateProvider>
  );
}
