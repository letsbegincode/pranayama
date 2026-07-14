"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryTag } from "@/components/ui";
import { formatTime, SessionSection } from "@/lib/data";

interface TimerSessionProps {
  sections: SessionSection[];
  exitHref: string;
  title?: string;
}

function playBeatSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(250, ctx.currentTime);
    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

function playTransitionSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const playBowl = (freq: number, delay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };
    playBowl(432, 0, 2.0); // 432Hz healing frequency
    playBowl(648, 0, 2.0); // Perfect fifth harmony
  } catch {}
}

function playStartSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const playNote = (freq: number, delay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };
    playNote(528, 0, 1.5);
    playNote(659.25, 0.2, 1.5);
    playNote(792, 0.4, 2.0);
  } catch {}
}

function playEndSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const playDeep = (freq: number, delay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + delay + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };
    playDeep(216, 0, 4.0);
    playDeep(324, 0, 4.0);
  } catch {}
}

function playPauseSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch {}
}

export default function TimerSession({
  sections,
  exitHref,
  title,
}: TimerSessionProps) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(() => sections[0]?.durationSec ?? 0);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const prevIndexRef = useRef(-1);

  const current = sections[index];
  const totalSections = sections.length;
  const totalDuration = sections.reduce((sum, s) => sum + s.durationSec, 0);

  indexRef.current = index;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goToSection = useCallback(
    (nextIndex: number) => {
      clearTimer();
      if (nextIndex >= totalSections) {
        setCompleted(true);
        playEndSound();
        return;
      }
      setIndex(nextIndex);
      setRemaining(sections[nextIndex].durationSec);
    },
    [clearTimer, sections, totalSections]
  );

  const skipToNext = useCallback(() => {
    goToSection(index + 1);
  }, [goToSection, index]);

  const exitSession = useCallback(() => {
    clearTimer();
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    router.push(exitHref);
  }, [clearTimer, exitHref, router]);

  const beginSession = useCallback(() => {
    setStarted(true);
    setPaused(false);
    setIndex(0);
    setRemaining(sections[0]?.durationSec ?? 0);
    setCompleted(false);
    playStartSound();
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, [sections]);

  const togglePause = useCallback(() => {
    playPauseSound();
    setPaused((p) => !p);
  }, []);

  useEffect(() => {
    if (!started || paused || completed || !current) return;

    clearTimer();
    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          window.setTimeout(() => goToSection(indexRef.current + 1), 0);
          return 0;
        }
        if (prev <= 6) {
          playBeatSound();
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [started, paused, index, completed, current, clearTimer, goToSection]);

  useEffect(() => {
    if (!started || index === prevIndexRef.current) return;
    if (prevIndexRef.current >= 0 && index > 0) {
      playTransitionSound();
    }
    prevIndexRef.current = index;
  }, [index, started]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
    };
  }, [clearTimer]);

  if (!sections.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#07070b] px-6 text-center text-white">
        <p className="text-lg">No exercises in this session.</p>
        <button type="button" onClick={exitSession} className="btn-secondary mt-6">
          Exit
        </button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[#07070b] text-white">
        <div className="page-bg" />
        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
            {title ?? "Yoga session"}
          </p>
          <h1 className="font-display mt-4 text-4xl font-normal sm:text-5xl">
            Ready to begin?
          </h1>
          <p className="mt-4 max-w-md text-muted">
            {totalSections} sections · {formatTime(totalDuration)} total. Tap start
            when you are in position — the timer will run through each section
            automatically.
          </p>

          <ul className="mt-8 max-w-lg space-y-2 text-left text-sm text-muted">
            {sections.slice(0, 4).map((section, i) => (
              <li key={section.id} className="flex items-center gap-3">
                <span className="font-mono text-xs text-emerald-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{section.name}</span>
                <span className="ml-auto shrink-0 font-mono text-xs">
                  {formatTime(section.durationSec)}
                </span>
              </li>
            ))}
            {sections.length > 4 ? (
              <li className="pl-8 text-xs">+ {sections.length - 4} more sections</li>
            ) : null}
          </ul>

          <button
            type="button"
            onClick={beginSession}
            className="btn-primary mt-10 px-10 py-4 text-base"
          >
            Start session
          </button>
          <button
            type="button"
            onClick={exitSession}
            className="btn-secondary mt-4"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-emerald-950 px-6 text-center text-white">
        <p className="text-sm uppercase tracking-widest text-emerald-300">
          Session complete
        </p>
        <h1 className="font-display mt-4 text-4xl font-normal">Well done</h1>
        <p className="mt-3 max-w-md text-emerald-100">
          You finished all {totalSections} sections. Take a moment before you
          move on.
        </p>
        <button
          type="button"
          onClick={exitSession}
          className="btn-primary mt-10 bg-white text-emerald-900"
        >
          Exit to home
        </button>
      </div>
    );
  }

  const progress =
    current.durationSec > 0
      ? ((current.durationSec - remaining) / current.durationSec) * 100
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[#07070b] text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            {title ?? "Yoga session"} · {index + 1} / {totalSections}
            {paused ? " · Paused" : ""}
          </p>
          <CategoryTag category={current.category} />
        </div>
      </div>

      <div className="section-enter flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-2xl font-bold leading-tight sm:text-4xl">
          {current.name}
        </h1>
        {current.target ? (
          <p className="mt-4 max-w-xl text-sm text-gray-400 sm:text-base">
            {current.target}
          </p>
        ) : null}

        <div
          className={`timer-glow mt-12 font-mono text-7xl font-light tabular-nums tracking-tight sm:text-8xl ${
            paused ? "opacity-50" : ""
          }`}
          aria-live="polite"
        >
          {formatTime(remaining)}
        </div>

        <div className="mt-10 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={togglePause}
            className="btn-secondary border-white/25 bg-white/5 text-white"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button type="button" onClick={skipToNext} className="btn-primary">
            {index + 1 >= totalSections ? "Finish session" : "Skip to next"}
          </button>
          <button
            type="button"
            onClick={exitSession}
            className="btn-secondary border-white/25 bg-white/5 text-white"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
