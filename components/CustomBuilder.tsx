"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { CategoryTag, GlassCard, PageHeader, PrimaryButton } from "@/components/ui";
import {
  EXERCISE_LIBRARY,
  formatTime,
  loadCustomSequence,
  parseDurationInput,
  saveCustomSequence,
  saveCustomSession,
  SessionSection,
} from "@/lib/data";

function SortableItem({
  item,
  onRemove,
  onDurationChange,
}: {
  item: SessionSection;
  onRemove: (id: string) => void;
  onDurationChange: (id: string, value: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 rounded-xl border p-4 ${
        isDragging
          ? "border-emerald-500/50 bg-emerald-500/5 shadow-lg"
          : "border-theme bg-surface-elevated"
      }`}
    >
      <button
        type="button"
        className="mt-1 cursor-grab touch-none text-muted hover:text-[var(--foreground)] active:cursor-grabbing"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="7" cy="5" r="1.5" />
          <circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryTag category={item.category} />
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        {item.target ? (
          <p className="mt-1 text-xs text-muted">{item.target}</p>
        ) : null}
        <div className="mt-3 flex items-center gap-2">
          <label className="text-xs text-muted" htmlFor={`dur-${item.id}`}>
            Timer
          </label>
          <input
            id={`dur-${item.id}`}
            type="text"
            key={`${item.id}-${item.durationSec}`}
            defaultValue={formatTime(item.durationSec)}
            onBlur={(e) => onDurationChange(item.id, e.target.value)}
            className="w-24 rounded-lg border border-theme bg-surface px-2 py-1 font-mono text-sm"
            placeholder="MM:SS"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="rounded-full p-2 text-muted transition hover:bg-red-500/10 hover:text-red-400"
        aria-label="Remove exercise"
      >
        ✕
      </button>
    </li>
  );
}

export default function CustomBuilder() {
  const router = useRouter();
  const [sequence, setSequence] = useState<SessionSection[]>([]);
  const [mounted, setMounted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setSequence(loadCustomSequence());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveCustomSequence(sequence);
  }, [sequence, mounted]);

  const addExercise = (exerciseId: string) => {
    const exercise = EXERCISE_LIBRARY.find((e) => e.id === exerciseId);
    if (!exercise) return;

    const newItem: SessionSection = {
      id: `${exercise.id}-${Date.now()}`,
      name: exercise.name,
      category: exercise.category,
      durationSec: exercise.defaultDurationSec,
      target: exercise.target,
    };

    setSequence((prev) => [...prev, newItem]);
  };

  const removeExercise = (id: string) => {
    setSequence((prev) => prev.filter((item) => item.id !== id));
  };

  const updateDuration = (id: string, value: string) => {
    const durationSec = parseDurationInput(value);
    setSequence((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, durationSec } : item
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSequence((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const startSession = () => {
    saveCustomSession(sequence);
    router.push("/session/custom");
  };

  const totalMinutes = Math.round(
    sequence.reduce((sum, s) => sum + s.durationSec, 0) / 60
  );

  return (
    <div>
      <PageHeader
        badge="Custom"
        title="Build your sequence"
        subtitle="Add exercises, drag to reorder, and set your own timers."
        backHref="/"
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {sequence.length} exercises · ~{totalMinutes} min total
        </p>
        <PrimaryButton onClick={startSession} disabled={sequence.length === 0}>
          Start session
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </PrimaryButton>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
            Exercise library
          </h2>
          <ul className="space-y-3">
            {EXERCISE_LIBRARY.map((exercise) => (
              <li key={exercise.id}>
                <GlassCard className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <CategoryTag category={exercise.category} />
                      <span className="text-sm font-medium">{exercise.name}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      Default {formatTime(exercise.defaultDurationSec)}
                      {exercise.target ? ` · ${exercise.target}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addExercise(exercise.id)}
                    className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25 transition hover:bg-emerald-500/25"
                  >
                    Add
                  </button>
                </GlassCard>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
            Your sequence
          </h2>

          {sequence.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-theme bg-surface/50 p-10 text-center text-sm text-muted">
              Add exercises from the library to build your custom flow.
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sequence.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-3">
                  {sequence.map((item, i) => (
                    <div key={item.id}>
                      <span className="mb-1 ml-1 inline-block font-mono text-[10px] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <SortableItem
                        item={item}
                        onRemove={removeExercise}
                        onDurationChange={updateDuration}
                      />
                    </div>
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          )}

          {sequence.length > 0 ? (
            <p className="mt-4 text-xs text-muted">
              Drag the handle to reorder. Edit timer as MM:SS (e.g. 03:00) or
              minutes (e.g. 5 min).
            </p>
          ) : null}
        </section>
      </div>

      <div className="mt-10">
        <Link
          href="/guide"
          className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          View full yoga technique guide →
        </Link>
      </div>
    </div>
  );
}
