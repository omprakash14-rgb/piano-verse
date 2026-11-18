import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { MODULE_LESSONS } from '@/src/data/lessons';
import { TUTORIAL_CHAPTERS } from '@/src/data/tutorials';
import { useAcademyStore } from '@/src/store/useAcademyStore';

const MODULES = [
  {
    id: 'intro' as const,
    number: 'Module 01',
    title: 'Introduction to Piano',
    description:
      'Discover how acoustic and digital pianos work, explore three centuries of keyboard history, compare six piano types, meet seven iconic pianists, and animate the sound mechanism.',
    route: '/learn/history',
  },
  {
    id: 'keyboard' as const,
    number: 'Module 02',
    title: 'Understand the Piano Keyboard',
    description:
      'Master the 88-key layout (52 white, 36 black), locate Middle C via black-key clusters, understand sharps/flats and enharmonic equivalents, and play the keyboard identification game.',
    route: '/learn/keyboard',
  },
  {
    id: 'posture' as const,
    number: 'Module 03',
    title: 'Sitting Posture & Playing Techniques',
    description:
      'Set bench height and distance, shape natural curved fingers, learn standard 1–5 finger numbering for both hands, and build legato finger independence.',
    route: '/learn/posture',
  },
  {
    id: 'theory' as const,
    number: 'Module 04',
    title: 'Music Theory Fundamentals',
    description:
      'Read the 5-line Grand Staff, compare rhythmic note durations, practice with a live BPM metronome, highlight Major/Minor scales, and play triads.',
    route: '/learn/theory',
  },
];

export function LearnOverviewPage() {
  const completedLessons = useAcademyStore((s) => s.completedLessons);

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 space-y-12">
      <div className="border-b border-[var(--border-hairline)] pb-8">
        <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
          PianoVerse Syllabus
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
          Piano Fundamentals & Course Overview
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Work through all four foundational modules before advancing to the six practical classroom tutorial chapters and three assessment levels.
        </p>
      </div>

      {/* 4 Foundation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map((mod) => {
          const lessons = MODULE_LESSONS.filter((l) => l.moduleId === mod.id);
          const doneCount = lessons.filter((l) => completedLessons.includes(l.id)).length;

          return (
            <div
              key={mod.id}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tabular font-semibold text-[var(--accent-gold)]">
                    {mod.number}
                  </span>
                  <span className="font-mono-tabular text-[var(--text-secondary)]">
                    {doneCount} / {lessons.length} lessons completed
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {mod.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {mod.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-[var(--border-hairline)] pt-4">
                  {lessons.map((l) => {
                    const isDone = completedLessons.includes(l.id);
                    return (
                      <li
                        key={l.id}
                        className="flex items-center justify-between text-xs text-[var(--text-secondary)]"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2
                            className={
                              isDone
                                ? 'h-4 w-4 text-emerald-500 shrink-0'
                                : 'h-4 w-4 text-[var(--border-hairline)] shrink-0'
                            }
                          />
                          <span className={isDone ? 'text-[var(--text-primary)] font-medium' : ''}>
                            {l.numberLabel}: {l.title}
                          </span>
                        </span>
                        <span className="font-mono-tabular">{l.durationMinutes}m</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  to={mod.route}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors"
                >
                  Open {mod.number}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tutorials Preview Banner */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)]">
            <BookOpen className="h-4 w-4" />
            <span>Next Step · Module 6 Classroom</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
            Structured Piano Tutorials (Chapters 1–6)
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Put fundamentals into action with guided right-hand, left-hand, C Major scale, triad progression, and full-song recitals ({TUTORIAL_CHAPTERS.filter((c) => completedLessons.includes(c.id)).length}/{TUTORIAL_CHAPTERS.length} completed).
          </p>
        </div>
        <Link
          to="/tutorials"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors whitespace-nowrap shrink-0"
        >
          Go to Tutorials
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
