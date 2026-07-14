"use client";

import Link from "next/link";

const stats = [
  { value: "3", label: "Progressive months" },
  { value: "10+", label: "Guided exercises" },
  { value: "∞", label: "Custom sequences" },
];

export default function HomeHero() {
  return (
    <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-20">
      {/* Hero */}
      <section className="relative mb-20 text-center sm:mb-28">
        <div className="animate-fade-in-up mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-theme glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Guided practice · Timed sessions
        </div>

        <div className="animate-fade-in-up delay-100 relative mx-auto max-w-4xl">
          {/* Breathing ring decoration */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div className="breathe-ring absolute inset-0 rounded-full border border-emerald-500/20" />
            <div
              className="breathe-ring absolute inset-8 rounded-full border border-emerald-400/15"
              style={{ animationDelay: "-2s" }}
            />
            <div
              className="breathe-ring absolute inset-16 rounded-full border border-emerald-300/10"
              style={{ animationDelay: "-4s" }}
            />
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl">
            Move with intention.
            <br />
            <span className="gradient-text">Breathe with precision.</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            A premium step-by-step yoga companion. Choose your month, follow
            timed sections in fullscreen, or craft a custom flow — all designed
            for deep, consistent practice.
          </p>
        </div>

        <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/months" className="btn-primary px-8 py-3.5 text-base">
            Start monthly plan
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link href="/custom" className="btn-secondary px-8 py-3.5 text-base">
            Build custom flow
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up delay-400 mx-auto mt-16 grid max-w-lg grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl px-4 py-5">
              <div className="font-display text-3xl font-semibold text-emerald-400">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/months"
          className="animate-fade-in-up delay-400 card-hover group glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:bg-emerald-500/20" />
          <div className="relative">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 ring-1 ring-emerald-500/30">
              <svg className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold">Monthly plan</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Three progressive months — from building your base to unlocking
              performance. Preview the schedule, then launch a fullscreen guided
              session with auto-advancing timers.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition group-hover:gap-3">
              Explore plans
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>

        <Link
          href="/custom"
          className="animate-fade-in-up delay-500 card-hover group glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />
          <div className="relative">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/20 to-purple-600/20 ring-1 ring-indigo-500/30">
              <svg className="h-7 w-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold">Custom sequence</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Pick exercises from the library, drag to reorder, set your own
              timers, and run the same immersive fullscreen experience — your
              practice, your rules.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition group-hover:gap-3">
              Create sequence
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </Link>
      </section>

      {/* How it works */}
      <section className="animate-fade-in-up delay-600 mt-20">
        <h2 className="font-display mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-muted">
          How it works
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose your path",
              desc: "Monthly progression or a custom-built sequence tailored to you.",
            },
            {
              step: "02",
              title: "Enter fullscreen",
              desc: "Each section opens immersive — name, target, and countdown front and center.",
            },
            {
              step: "03",
              title: "Flow through",
              desc: "Timer auto-advances. Skip ahead or exit anytime. Stay present.",
            },
          ].map((item) => (
            <div key={item.step} className="glass rounded-2xl p-6">
              <span className="font-mono text-xs font-medium text-emerald-500/80">
                {item.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="animate-fade-in delay-600 mt-20 border-t border-theme pt-10 text-center">
        <Link
          href="/guide"
          className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          Full yoga technique guide →
        </Link>
        <p className="mt-4 text-xs text-muted">
          Consistency beats intensity. 20 minutes daily changes everything.
        </p>
      </footer>
    </main>
  );
}
