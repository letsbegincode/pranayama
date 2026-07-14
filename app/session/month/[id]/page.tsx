"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import TimerSession from "@/components/TimerSession";
import { MONTH_PLANS } from "@/lib/data";

export default function MonthSessionPage() {
  const params = useParams();
  const id = Number(params.id);

  const plan = useMemo(
    () => MONTH_PLANS.find((p) => p.id === id),
    [id]
  );

  if (!plan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Plan not found.
      </div>
    );
  }

  return (
    <TimerSession
      sections={plan.sections}
      exitHref={`/months/${plan.id}`}
      title={plan.title}
    />
  );
}
