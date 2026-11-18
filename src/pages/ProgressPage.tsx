import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { MODULE_LESSONS } from '@/src/data/lessons';
import { TUTORIAL_CHAPTERS } from '@/src/data/tutorials';
import { ACHIEVEMENTS, useAcademyStore } from '@/src/store/useAcademyStore';

export function ProgressPage() {
  const {
    completedLessons,
    xp,
    notesPlayedCount,
    practiceMinutes,
    unlockedBadges,
    assessmentHistory,
    getCourseCompletionPercent,
    resetProgress,
  } = useAcademyStore();

  const [confirmReset, setConfirmReset] = useState(false);

  const moduleBreakdown = [
    {
      name: 'Intro (M1)',
      completed: MODULE_LESSONS.filter((l) => l.moduleId === 'intro' && completedLessons.includes(l.id)).length,
      total: MODULE_LESSONS.filter((l) => l.moduleId === 'intro').length,
    },
    {
      name: 'Keyboard (M2)',
      completed: MODULE_LESSONS.filter((l) => l.moduleId === 'keyboard' && completedLessons.includes(l.id)).length,
      total: MODULE_LESSONS.filter((l) => l.moduleId === 'keyboard').length,
    },
    {
      name: 'Posture (M3)',
      completed: MODULE_LESSONS.filter((l) => l.moduleId === 'posture' && completedLessons.includes(l.id)).length,
      total: MODULE_LESSONS.filter((l) => l.moduleId === 'posture').length,
    },
    {
      name: 'Theory (M4)',
      completed: MODULE_LESSONS.filter((l) => l.moduleId === 'theory' && completedLessons.includes(l.id)).length,
      total: MODULE_LESSONS.filter((l) => l.moduleId === 'theory').length,
    },
    {
      name: 'Tutorials',
      completed: TUTORIAL_CHAPTERS.filter((c) => completedLessons.includes(c.id)).length,
      total: TUTORIAL_CHAPTERS.length,
    },
  ].map((m) => ({
    ...m,
    percent: Math.round((m.completed / m.total) * 100),
  }));

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Learning Analytics
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            My Learning Progress
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Detailed completion across all modules, practical tutorials, keys played, and assessment attempts.
          </p>
        </div>

        <div>
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-red-500 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Progress
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs">
              <span className="text-[var(--text-primary)]">Erase saved progress?</span>
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
                className="font-semibold text-red-500 hover:underline cursor-pointer"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="text-[var(--text-secondary)] hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <p className="text-xs text-[var(--text-secondary)]">Overall Mastery</p>
          <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">
            {getCourseCompletionPercent()}%
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <p className="text-xs text-[var(--text-secondary)]">Total XP</p>
          <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--accent-gold)]">
            {xp}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <p className="text-xs text-[var(--text-secondary)]">Keys Struck</p>
          <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">
            {notesPlayedCount}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <p className="text-xs text-[var(--text-secondary)]">Practice Time</p>
          <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">
            {practiceMinutes} min
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <p className="text-xs text-[var(--text-secondary)]">Badges & Exams</p>
          <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">
            {unlockedBadges.length}/{ACHIEVEMENTS.length} · {assessmentHistory.filter((a) => a.passed).length}/3
          </p>
        </div>
      </div>

      {/* Module Mastery Chart */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Module Completion Percentage
        </h2>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moduleBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(166,123,46,0.18)" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9C9488' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#9C9488' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181C',
                  border: '1px solid #2C2C34',
                  borderRadius: '8px',
                  color: '#F4F0E8',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="percent" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Syllabus Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Fundamentals Checklist (Modules 1–4)
          </h3>
          <ul className="space-y-2 text-sm">
            {MODULE_LESSONS.map((l) => {
              const done = completedLessons.includes(l.id);
              return (
                <li
                  key={l.id}
                  className="flex items-center justify-between border-b border-[var(--border-hairline)] py-2 last:border-0"
                >
                  <span className="flex items-center gap-2.5 text-[var(--text-primary)]">
                    <CheckCircle2
                      className={done ? 'h-4 w-4 text-emerald-500 shrink-0' : 'h-4 w-4 text-[var(--border-hairline)] shrink-0'}
                    />
                    <span>
                      {l.numberLabel}: {l.title}
                    </span>
                  </span>
                  <span className="font-mono-tabular text-xs text-[var(--text-secondary)]">
                    {done ? 'Completed' : 'Pending'}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Tutorial Chapters & Certification
          </h3>
          <ul className="space-y-2 text-sm">
            {TUTORIAL_CHAPTERS.map((ch) => {
              const done = completedLessons.includes(ch.id);
              return (
                <li
                  key={ch.id}
                  className="flex items-center justify-between border-b border-[var(--border-hairline)] py-2 last:border-0"
                >
                  <span className="flex items-center gap-2.5 text-[var(--text-primary)]">
                    <CheckCircle2
                      className={done ? 'h-4 w-4 text-emerald-500 shrink-0' : 'h-4 w-4 text-[var(--border-hairline)] shrink-0'}
                    />
                    <span>
                      Chapter {ch.chapterNumber}: {ch.title}
                    </span>
                  </span>
                  <span className="font-mono-tabular text-xs text-[var(--text-secondary)]">
                    {done ? 'Completed' : 'Pending'}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="pt-4">
            <Link
              to="/certificate"
              className="inline-flex items-center rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-xs font-semibold text-[#12100E]"
            >
              Go to Course Certificate →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
