export type ExerciseCategory =
  | "warm up"
  | "movement"
  | "strength"
  | "breath"
  | "rest";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  defaultDurationSec: number;
  target?: string;
}

export interface SessionSection {
  id: string;
  name: string;
  category: ExerciseCategory;
  durationSec: number;
  target?: string;
}

export interface MonthPlan {
  id: number;
  title: string;
  subtitle: string;
  totalMinutes: number;
  sections: SessionSection[];
  note?: string;
}

export const CATEGORY_COLORS: Record<
  ExerciseCategory,
  { bg: string; text: string }
> = {
  "warm up": { bg: "bg-amber-100", text: "text-amber-800" },
  movement: { bg: "bg-teal-100", text: "text-teal-800" },
  strength: { bg: "bg-blue-100", text: "text-blue-800" },
  breath: { bg: "bg-purple-100", text: "text-purple-800" },
  rest: { bg: "bg-orange-100", text: "text-orange-800" },
};

export const EXERCISE_LIBRARY: Exercise[] = [
  {
    id: "joint-loosening",
    name: "Joint loosening — neck, shoulders, wrists, ankles",
    category: "warm up",
    defaultDurationSec: 180,
    target: "Every joint moved",
  },
  {
    id: "surya-namaskar",
    name: "Surya Namaskar",
    category: "movement",
    defaultDurationSec: 600,
    target: "Slow with breath sync",
  },
  {
    id: "plank-hold",
    name: "Plank hold",
    category: "strength",
    defaultDurationSec: 180,
    target: "3 sets × hold",
  },
  {
    id: "push-ups",
    name: "Push ups",
    category: "strength",
    defaultDurationSec: 240,
    target: "3 sets, slow reps",
  },
  {
    id: "ujjayi",
    name: "Ujjayi (ocean breath)",
    category: "breath",
    defaultDurationSec: 180,
    target: "4 count inhale, 6 count exhale",
  },
  {
    id: "anulom-vilom",
    name: "Anulom Vilom",
    category: "breath",
    defaultDurationSec: 300,
    target: "4-4 count, continuous",
  },
  {
    id: "bhramari",
    name: "Bhramari",
    category: "breath",
    defaultDurationSec: 180,
    target: "8 rounds, humming exhale",
  },
  {
    id: "udgeet",
    name: "Udgeet (OM chanting)",
    category: "breath",
    defaultDurationSec: 120,
    target: "6 rounds, long exhale",
  },
  {
    id: "kapalbhati",
    name: "Kapalbhati",
    category: "breath",
    defaultDurationSec: 180,
    target: "Start slow, build gradually",
  },
  {
    id: "shavasana",
    name: "Shavasana — do not skip",
    category: "rest",
    defaultDurationSec: 180,
    target: "Flat, eyes closed, no phone",
  },
];

function section(
  id: string,
  name: string,
  category: ExerciseCategory,
  minutes: number,
  target?: string
): SessionSection {
  return {
    id,
    name,
    category,
    durationSec: minutes * 60,
    target,
  };
}

export const MONTH_PLANS: MonthPlan[] = [
  {
    id: 1,
    title: "Month 1 — Build the base",
    subtitle: "Form over speed. Consistency over intensity.",
    totalMinutes: 35,
    note: "Never do pranayama before Surya Namaskar. Body must be warm first.",
    sections: [
      section(
        "m1-warmup",
        "Joint loosening — neck, shoulders, wrists, ankles",
        "warm up",
        3,
        "Every joint moved"
      ),
      section(
        "m1-surya",
        "Surya Namaskar",
        "movement",
        10,
        "4 rounds, slow with breath sync"
      ),
      section("m1-plank", "Plank hold", "strength", 3, "3 sets × 20 sec hold"),
      section(
        "m1-pushups",
        "Push ups",
        "strength",
        4,
        "3 sets × 5 reps, slow"
      ),
      section(
        "m1-ujjayi",
        "Ujjayi (ocean breath)",
        "breath",
        3,
        "4 count inhale, 6 count exhale"
      ),
      section(
        "m1-anulom",
        "Anulom Vilom",
        "breath",
        5,
        "4-4 count, continuous"
      ),
      section(
        "m1-bhramari",
        "Bhramari",
        "breath",
        3,
        "8 rounds, humming exhale"
      ),
      section(
        "m1-udgeet",
        "Udgeet (OM chanting)",
        "breath",
        2,
        "6 rounds, long exhale"
      ),
      section(
        "m1-shavasana",
        "Shavasana — do not skip",
        "rest",
        3,
        "Flat, eyes closed, no phone"
      ),
    ],
  },
  {
    id: 2,
    title: "Month 2 — Build endurance",
    subtitle: "Longer runs. Stronger holds. Deeper breathing.",
    totalMinutes: 40,
    note: "Add Kapalbhati only in month 2 — once DNS breathing has improved from Anulom Vilom practice.",
    sections: [
      section(
        "m2-warmup",
        "Joint loosening",
        "warm up",
        3,
        "Same as month 1"
      ),
      section(
        "m2-surya",
        "Surya Namaskar",
        "movement",
        12,
        "6 rounds, breath fully synced"
      ),
      section("m2-plank", "Plank hold", "strength", 4, "3 sets × 30 sec hold"),
      section(
        "m2-pushups",
        "Push ups",
        "strength",
        4,
        "3 sets × 8–10 reps"
      ),
      section("m2-ujjayi", "Ujjayi", "breath", 3, "4 count in, 8 count out"),
      section(
        "m2-anulom",
        "Anulom Vilom",
        "breath",
        5,
        "4 in, hold 2, 8 out"
      ),
      section("m2-bhramari", "Bhramari", "breath", 3, "10 rounds"),
      section("m2-udgeet", "Udgeet", "breath", 2, "8 rounds"),
      section(
        "m2-kapalbhati",
        "Kapalbhati — add now",
        "breath",
        3,
        "Start slow, 60 breaths/min"
      ),
      section("m2-shavasana", "Shavasana", "rest", 3, "Do not skip"),
    ],
  },
  {
    id: 3,
    title: "Month 3 — Unlock performance",
    subtitle: "Speed up. Go longer. Feel the shift.",
    totalMinutes: 45,
    sections: [
      section(
        "m3-warmup",
        "Joint loosening",
        "warm up",
        3,
        "Full body, dynamic"
      ),
      section(
        "m3-surya",
        "Surya Namaskar",
        "movement",
        15,
        "10 rounds at good pace"
      ),
      section("m3-plank", "Plank hold", "strength", 4, "3 sets × 45 sec hold"),
      section(
        "m3-pushups",
        "Push ups",
        "strength",
        5,
        "3 sets × 15–20 reps"
      ),
      section("m3-ujjayi", "Ujjayi", "breath", 3, "Full breath control"),
      section(
        "m3-anulom",
        "Anulom Vilom",
        "breath",
        5,
        "4 in, hold 4, 8 out — advanced ratio"
      ),
      section(
        "m3-bhramari",
        "Bhramari",
        "breath",
        3,
        "12 rounds, deep vibration"
      ),
      section("m3-udgeet", "Udgeet", "breath", 2, "Extended OM, long exhale"),
      section(
        "m3-kapalbhati",
        "Kapalbhati",
        "breath",
        5,
        "Build to 90–100 breaths/min"
      ),
      section("m3-shavasana", "Shavasana", "rest", 5, "Longer rest for deeper recovery"),
    ],
  },
];

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function parseDurationInput(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 60;

  const mmss = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (mmss) {
    return parseInt(mmss[1], 10) * 60 + parseInt(mmss[2], 10);
  }

  const minMatch = trimmed.match(/^(\d+)\s*min/i);
  if (minMatch) return parseInt(minMatch[1], 10) * 60;

  const secMatch = trimmed.match(/^(\d+)\s*s(ec)?$/i);
  if (secMatch) return parseInt(secMatch[1], 10);

  const asNumber = parseInt(trimmed, 10);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : 60;
}

export const CUSTOM_SEQUENCE_KEY = "yoga-custom-sequence";
export const CUSTOM_SESSION_KEY = "yoga-custom-session";

export function saveCustomSequence(sections: SessionSection[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOM_SEQUENCE_KEY, JSON.stringify(sections));
}

export function saveCustomSession(sections: SessionSection[]): void {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify(sections);
  localStorage.setItem(CUSTOM_SEQUENCE_KEY, payload);
  sessionStorage.setItem(CUSTOM_SESSION_KEY, payload);
}

export function loadCustomSequence(): SessionSection[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_SEQUENCE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SessionSection[];
  } catch {
    return [];
  }
}

export function loadCustomSession(): SessionSection[] {
  if (typeof window === "undefined") return [];
  try {
    const sessionRaw = sessionStorage.getItem(CUSTOM_SESSION_KEY);
    if (sessionRaw) return JSON.parse(sessionRaw) as SessionSection[];
    return loadCustomSequence();
  } catch {
    return loadCustomSequence();
  }
}
