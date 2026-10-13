"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  email: string;
  label: string;
  copiedLabel: string;
};

export function CopyEmail({ email, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className="btn btn--on-graphite"
      data-state={copied ? "success" : undefined}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        } catch {
          // Clipboard blocked: the address is visible right above to copy by hand.
        }
      }}
    >
      {copied ? (
        <Check aria-hidden className="size-4" />
      ) : (
        <Copy aria-hidden className="size-4" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
