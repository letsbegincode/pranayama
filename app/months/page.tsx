import Link from "next/link";
import { GlassCard, PageHeader } from "@/components/ui";
import { MONTH_PLANS } from "@/lib/data";

const monthAccents = [
  "from-emerald-500/20 to-teal-600/10",
  "from-indigo-500/20 to-purple-600/10",
  "from-amber-500/20 to-orange-600/10",
];

export default function MonthsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <PageHeader
        badge="Monthly progression"
        title="Choose your month"
        subtitle="Each month has a fixed morning yoga schedule. Select one to preview and start your guided session."
      />

      <div className="grid gap-5">
        {MONTH_PLANS.map((plan, i) => (
          <Link key={plan.id} href={`/months/${plan.id}`}>
            <GlassCard
              hover
              className={`group relative overflow-hidden p-6 sm:p-8`}
            >
              <div
                className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${monthAccents[i]} blur-2xl transition group-hover:scale-110`}
              />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-emerald-500/80">
                    Month {plan.id}
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-normal">
                    {plan.title.split("—")[1]?.trim() ?? plan.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{plan.subtitle}</p>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
                  {plan.totalMinutes} min · {plan.sections.length} sections
                </span>
              </div>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-emerald-400 opacity-0 transition group-hover:opacity-100">
                View schedule
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  );
}
