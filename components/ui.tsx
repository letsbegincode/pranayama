import Link from "next/link";
import { ReactNode } from "react";

export function CategoryTag({ category }: { category: string }) {
  const colors: Record<string, string> = {
    "warm up":
      "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25",
    movement:
      "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/25",
    strength:
      "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/25",
    breath:
      "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/25",
    rest:
      "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/25",
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${colors[category] ?? "bg-white/10 text-muted ring-1 ring-white/10"}`}
    >
      {category}
    </span>
  );
}

export function PrimaryButton({
  href,
  onClick,
  disabled,
  children,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const base = `btn-primary ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  href,
  onClick,
  children,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  const base = `btn-secondary ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
  backHref = "/",
  badge,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  badge?: string;
}) {
  return (
    <header className="mb-10">
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[var(--foreground)]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      {badge ? (
        <span className="mb-3 inline-block rounded-full border border-theme glass px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-400">
          {badge}
        </span>
      ) : null}
      <h1 className="font-display text-4xl font-normal tracking-tight sm:text-5xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function GlassCard({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass-strong rounded-2xl ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
