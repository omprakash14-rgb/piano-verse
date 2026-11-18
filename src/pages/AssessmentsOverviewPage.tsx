import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, Lock } from 'lucide-react';
import { PASSING_THRESHOLDS, useAcademyStore } from '@/src/store/useAcademyStore';
import { cn } from '@/src/lib/utils';

const LEVELS = [
  {
    level: 1 as const,
    title: 'Level 1 — Beginner Assessment',
    subtitle: 'Fundamentals, History, Keyboard Landmarks, Posture & Finger Numbers',
    threshold: PASSING_THRESHOLDS[1],
    topics: ['Piano history & components', '88-key structure & notes', 'Middle C landmark', 'Sitting posture & 1–5 finger numbers'],
    route: '/assessments/level-1',
  },
  {
    level: 2 as const,
    title: 'Level 2 — Intermediate Assessment',
    subtitle: 'Sharps/Flats, Octaves, Notation, Rhythm, Scales & Chords',
    threshold: PASSING_THRESHOLDS[2],
    topics: ['Sharps, flats & enharmonic notes', 'Octaves & Treble Clef', 'Note durations & time signatures', 'Major scales & triads'],
    route: '/assessments/level-2',
  },
  {
    level: 3 as const,
    title: 'Level 3 — Final Practical Assessment',
    subtitle: 'Live Keyboard Mastery, Scale Execution, Chords, Melody & Two-Hand Cadence',
    threshold: PASSING_THRESHOLDS[3],
    topics: ['C Major scale performance', 'G & F Major chord tasks', 'Ode to Joy melody execution', 'Two-hand coordination pattern'],
    route: '/assessments/level-3',
  },
];

export function AssessmentsOverviewPage() {
  const { isLevelUnlocked, hasPassedLevel, getBestScoreForLevel, assessmentHistory } =
    useAcademyStore();

  const allPassed = hasPassedLevel(1) && hasPassedLevel(2) && hasPassedLevel(3);

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Module 07 · Progressive Mastery Verification
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[var(--text-primary)]">
            Three-Level Piano Assessments
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Complete each assessment in order. Passing Level 1 (70%) unlocks Level 2 (75%), and passing Level 2 unlocks the Level 3 Final Practical Exam (80%) for your graduation certificate.
          </p>
        </div>

        <Link
          to="/certificate"
          className={cn(
            'inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap',
            allPassed
              ? 'bg-[var(--accent-gold)] text-[#12100E] hover:bg-[var(--accent-gold-hover)]'
              : 'border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
          )}
        >
          <Award className="h-4 w-4" />
          {allPassed ? 'View Certificate' : 'Certificate (Pass Level 3)'}
        </Link>
      </div>

      {/* 3 Level Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {LEVELS.map((item) => {
          const unlocked = isLevelUnlocked(item.level);
          const passed = hasPassedLevel(item.level);
          const bestScore = getBestScoreForLevel(item.level);

          return (
            <div
              key={item.level}
              className={cn(
                'rounded-xl border p-6 flex flex-col justify-between space-y-6',
                unlocked
                  ? 'border-[var(--border-hairline)] bg-[var(--bg-surface)]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] opacity-80'
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tabular font-semibold text-[var(--accent-gold)]">
                    Pass threshold: {item.threshold}%
                  </span>
                  {passed ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                      Passed
                    </span>
                  ) : !unlocked ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--text-secondary)]">
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  ) : (
                    <span className="font-semibold text-[var(--text-primary)]">Unlocked</span>
                  )}
                </div>

                <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h2>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {item.subtitle}
                </p>

                <ul className="space-y-1.5 border-t border-[var(--border-hairline)] pt-3 text-xs text-[var(--text-secondary)]">
                  {item.topics.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                {bestScore !== null && (
                  <p className="font-mono-tabular text-xs text-[var(--text-secondary)]">
                    Best Score: <strong className="text-[var(--text-primary)]">{bestScore}%</strong>
                  </p>
                )}

                {unlocked ? (
                  <Link
                    to={item.route}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors"
                  >
                    {passed ? `Retake Level ${item.level}` : `Start Level ${item.level}`}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 text-center text-xs font-medium text-[var(--text-secondary)]">
                    Pass Level {item.level - 1} to unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assessment History Table */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Assessment History
        </h3>
        {assessmentHistory.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            No assessment attempts recorded yet. Start Level 1 above when you are ready!
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-hairline)] text-xs text-[var(--text-secondary)]">
                  <th className="py-2.5 pr-4">Level</th>
                  <th className="py-2.5 pr-4">Score</th>
                  <th className="py-2.5 pr-4">Questions</th>
                  <th className="py-2.5 pr-4">Outcome</th>
                  <th className="py-2.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-hairline)] font-mono-tabular text-xs">
                {assessmentHistory.map((attempt) => (
                  <tr key={attempt.id}>
                    <td className="py-3 pr-4 font-sans font-semibold text-[var(--text-primary)]">
                      Level {attempt.level}
                    </td>
                    <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">
                      {attempt.scorePercent}%
                    </td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">
                      {attempt.correctCount} / {attempt.totalCount}
                    </td>
                    <td className="py-3 pr-4 font-sans">
                      <span
                        className={cn(
                          'font-semibold',
                          attempt.passed ? 'text-emerald-500' : 'text-amber-500'
                        )}
                      >
                        {attempt.passed ? 'Passed' : 'Needs Review'}
                      </span>
                    </td>
                    <td className="py-3 text-[var(--text-secondary)]">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
