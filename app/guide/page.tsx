import { PageHeader } from "@/components/ui";

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <PageHeader
        title="Full yoga — how to do each correctly"
        subtitle="No guru needed. Follow these cues."
      />

      <section className="mb-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Surya Namaskar — key form cues
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500 dark:border-white/10 dark:bg-white/10 dark:text-gray-400">
                <th className="px-4 py-3">Step</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Breath</th>
                <th className="hidden px-4 py-3 sm:table-cell">Common mistake</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "Stand tall, palms together at chest", "Neutral", "Slouching shoulders"],
                ["2", "Arms up, slight backbend", "Inhale", "Compressing lower back"],
                ["3", "Forward fold, hands to floor", "Exhale", "Forcing straight legs — bend knees if needed"],
                ["4", "Right leg step back, low lunge", "Inhale", "Knee past ankle"],
                ["5", "Plank position", "Hold briefly", "Hips too high or sagging"],
                ["6", "Lower chest to floor", "Exhale", "Dropping hips first"],
                ["7", "Cobra — chest up, elbows soft", "Inhale", "Straightening arms fully"],
                ["8", "Downward dog — hips high", "Exhale", "Rounding the back"],
                ["9", "Left leg forward, low lunge", "Inhale", "Rushing this step"],
                ["10", "Forward fold again", "Exhale", "Jerking up fast"],
                ["11", "Arms up, slight backbend", "Inhale", "Same as step 2"],
                ["12", "Back to start, palms together", "Exhale", "Not pausing to breathe"],
              ].map(([step, position, breath, mistake]) => (
                <tr key={step} className="border-b border-gray-100 last:border-0 dark:border-white/5">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{step}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{position}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{breath}</td>
                  <td className="hidden px-4 py-3 text-gray-500 dark:text-gray-400 sm:table-cell">{mistake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Pranayama — timing and technique
        </h2>
        <div className="space-y-0 rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 dark:border-white/10 dark:bg-white/5 dark:divide-white/5">
          {[
            {
              name: "Ujjayi — ocean breath",
              detail:
                "Inhale nose → constrict throat slightly → exhale nose with soft hissing sound. 4 count in, 6 count out. Do first — calms the nervous system before deeper work.",
              time: "3 min",
            },
            {
              name: "Anulom Vilom — alternate nostril",
              detail:
                "Right thumb closes right → inhale left 4 counts. Close both, hold 2. Ring finger closes left → exhale right 4 counts. Reverse. Most important for DNS. Never force the blocked side.",
              time: "5 min",
            },
            {
              name: "Bhramari — humming bee",
              detail:
                "Thumbs on ears, fingers over eyes gently. Inhale fully. Exhale with mmmmm humming — feel vibration in skull. Directly reduces anxiety and mental heaviness. 8–10 rounds.",
              time: "3 min",
            },
            {
              name: "Udgeet — OM chanting",
              detail:
                "Inhale deeply. Exhale with OOOOmmmm — O for 3 sec, M for 3 sec. Long slow exhale. Eyes closed. Very meditative. 6–8 rounds. Best done last before Shavasana.",
              time: "2 min",
            },
            {
              name: "Kapalbhati — add in month 2 only",
              detail:
                "Passive inhale, sharp forceful exhale through nose. Start 60/min, build to 90–100/min by month 3. Skip if DNS feels irritated. Never do on a full stomach.",
              time: "Month 2+",
            },
          ].map((item) => (
            <div key={item.name} className="flex gap-4 p-5">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{item.detail}</p>
              </div>
              <span className="shrink-0 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Non-negotiable rules
        </h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500 dark:border-white/10 dark:bg-white/10 dark:text-gray-400">
                <th className="px-4 py-3">Rule</th>
                <th className="px-4 py-3">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Empty stomach — always", "Minimum 3 hrs after a meal. Pranayama on a full stomach causes nausea."],
                ["Spine straight during pranayama", "Slouched back restricts lung capacity by 30%"],
                ["Never skip Shavasana", "This is when the nervous system actually absorbs the session"],
                ["Breath leads movement in Surya Namaskar", "If you're moving faster than your breath, slow down"],
                ["20 min daily beats 1 hr occasionally", "Consistency is the only thing that works"],
                ["Morning 6–7am is ideal", "Cortisol is naturally high — body is primed for movement"],
              ].map(([rule, why]) => (
                <tr key={rule} className="border-b border-gray-100 last:border-0 dark:border-white/5">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{rule}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
