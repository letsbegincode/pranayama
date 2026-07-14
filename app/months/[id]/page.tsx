import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTag, GlassCard, PageHeader, PrimaryButton } from "@/components/ui";
import { formatTime, MONTH_PLANS } from "@/lib/data";

export function generateStaticParams() {
  return MONTH_PLANS.map((plan) => ({ id: String(plan.id) }));
}

export default async function MonthDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = MONTH_PLANS.find((p) => p.id === Number(id));

  if (!plan) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <PageHeader
        badge={`Month ${plan.id}`}
        title={plan.title}
        subtitle={plan.subtitle}
        backHref="/months"
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Morning yoga — {plan.totalMinutes} min · {plan.sections.length}{" "}
          sections
        </p>
        <PrimaryButton href={`/session/month/${plan.id}`}>
          Start session
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </PrimaryButton>
      </div>

      <GlassCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-theme bg-surface-elevated text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-4">Phase</th>
              <th className="px-5 py-4">Practice</th>
              <th className="px-5 py-4">Duration</th>
              <th className="hidden px-5 py-4 sm:table-cell">Target</th>
            </tr>
          </thead>
          <tbody>
            {plan.sections.map((section, i) => (
              <tr
                key={section.id}
                className="border-b border-theme last:border-0 transition hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <CategoryTag category={section.category} />
                </td>
                <td className="px-5 py-4 font-medium">
                  <span className="mr-2 font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.name}
                </td>
                <td className="px-5 py-4 font-mono text-emerald-400">
                  {formatTime(section.durationSec)}
                </td>
                <td className="hidden px-5 py-4 text-muted sm:table-cell">
                  {section.target ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      {plan.note ? (
        <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-muted">
          <span className="font-medium text-emerald-400">Note · </span>
          {plan.note}
        </div>
      ) : null}

      <div className="mt-10">
        <Link
          href="/guide"
          className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          View technique guide →
        </Link>
      </div>
    </main>
  );
}
