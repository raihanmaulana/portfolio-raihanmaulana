import type { Dictionary } from "@/content/dictionary";
import type { Content } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  disciplines: Content["disciplines"];
  dict: Dictionary["twoSides"];
};

function Column({
  discipline,
  align,
}: {
  discipline: Content["disciplines"][number];
  align: "left" | "right";
}) {
  return (
    <div className={cn(align === "right" && "lg:text-right")}>
      <h3 className="font-mono text-xs tracking-[0.06em] text-graphite-accent uppercase">
        {discipline.title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {discipline.items.map((item) => (
          <li
            key={item.title}
            className="rounded-md border border-graphite-rule bg-graphite-2 p-4"
          >
            <p className="font-display text-lg font-semibold text-graphite-ink">
              {item.title}
            </p>
            <p className="mt-1 text-sm">{item.body}</p>
            <ul
              className={cn(
                "mt-3 flex flex-wrap gap-1.5",
                align === "right" && "lg:justify-end",
              )}
            >
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex h-6 items-center rounded-sm border border-graphite-rule px-1.5 font-mono text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The page's one dark band: build on the left, audit on the right, and the
// analyst role as the node where the two meet.
export function TwoSides({ disciplines, dict }: Props) {
  const [build, audit] = disciplines;

  return (
    <section className="bg-graphite text-graphite-muted">
      <div className="shell py-20 md:py-28">
        <div className="reveal max-w-[44rem]">
          <h2 className="text-display leading-[1.05] font-semibold tracking-[-0.035em] text-graphite-ink">
            {dict.title}
          </h2>
          <p className="mt-5 max-w-[60ch]">{dict.lede}</p>
        </div>

        <div className="reveal mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_11rem_minmax(0,1fr)] lg:items-center lg:gap-0">
          <Column discipline={build} align="left" />

          <div
            aria-hidden
            className="relative flex h-28 items-center justify-center lg:h-auto lg:self-stretch"
          >
            {/* Connectors: horizontal on desktop, vertical when stacked */}
            <span
              className="connector absolute top-1/2 left-0 hidden h-px w-[calc(50%-3rem)] bg-graphite-accent lg:block"
              style={{ "--from": "left" } as React.CSSProperties}
            />
            <span
              className="connector absolute top-1/2 right-0 hidden h-px w-[calc(50%-3rem)] bg-graphite-accent lg:block"
              style={{ "--from": "right" } as React.CSSProperties}
            />
            <span className="connector connector--v absolute inset-y-0 left-1/2 w-px bg-graphite-accent lg:hidden" />
            <span className="relative grid size-24 place-items-center rounded-full border border-graphite-accent bg-graphite">
              <span className="node-ring absolute inset-0 rounded-full border border-graphite-accent" />
              <span className="font-display text-base font-semibold text-graphite-ink">
                {dict.node}
              </span>
            </span>
          </div>

          <Column discipline={audit} align="right" />
        </div>
      </div>
    </section>
  );
}
