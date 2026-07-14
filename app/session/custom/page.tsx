"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TimerSession from "@/components/TimerSession";
import { loadCustomSession, SessionSection } from "@/lib/data";

export default function CustomSessionPage() {
  const [sections, setSections] = useState<SessionSection[] | null>(null);

  useEffect(() => {
    setSections(loadCustomSession());
  }, []);

  if (sections === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <p className="text-sm text-gray-400">Loading your sequence…</p>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-6 text-center text-white">
        <p className="text-lg">No exercises in your custom sequence.</p>
        <Link
          href="/custom"
          className="mt-6 rounded-full border border-white/30 px-6 py-3 text-sm font-medium"
        >
          Build a sequence
        </Link>
      </div>
    );
  }

  return (
    <TimerSession
      sections={sections}
      exitHref="/custom"
      title="Custom sequence"
    />
  );
}
