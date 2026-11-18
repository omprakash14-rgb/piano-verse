import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2, Flame, Lock, Music2, Trophy } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MODULE_LESSONS } from '@/src/data/lessons';
import { TUTORIAL_CHAPTERS } from '@/src/data/tutorials';
import { ACHIEVEMENTS, TOTAL_CURRICULUM_ITEMS, useAcademyStore } from '@/src/store/useAcademyStore';
import { cn } from '@/src/lib/utils';

export function DashboardPage() {
  const {
    studentName,
    setStudentName,
    completedLessons,
    xp,
    streakDays,
    practiceMinutes,
    dailyPracticeLog,
    unlockedBadges,
    isLevelUnlocked,
    hasPassedLevel,
    getBestScoreForLevel,
    getCourseCompletionPercent,
  } = useAcademyStore();

  const completionPercent = getCourseCompletionPercent();

  // Determine current next recommended lesson
  const nextFoundation = MODULE_LESSONS.find((l) => !completedLessons.includes(l.id));
  const nextTutorial = TUTORIAL_CHAPTERS.find((c) => !completedLessons.includes(c.id));

  const nextStepLink = nextFoundation
    ? {
        label: `${nextFoundation.numberLabel}: ${nextFoundation.title}`,
        to:
          nextFoundation.moduleId === 'intro'
            ? '/learn/history'
            : nextFoundation.moduleId === 'keyboard'
            ? '/learn/keyboard'
            : nextFoundation.moduleId === 'posture'
            ? '/learn/posture'
            : '/learn/theory',
      }
    : nextTutorial
    ? { label: `Chapter ${nextTutorial.chapterNumber}: ${nextTutorial.title}`, to: '/tutorials' }
    : !hasPassedLevel(3)
    ? { label: 'Complete Level Assessments', to: '/assessments' }
    : { label: 'View Your Graduation Certificate', to: '/certificate' };

  const pathNodes = [
    { label: 'Discover Piano', done: completedLessons.some((id) => id.startsWith('1.')) },
    { label: 'Keyboard Basics', done: completedLessons.some((id) => id.startsWith('2.')) },
    { label: 'Playing Techniques', done: completedLessons.some((id) => id.startsWith('3.')) },
    { label: 'Music Theory', done: completedLessons.some((id) => id.startsWith('4.')) },
    { label: 'Virtual Practice', done: practiceMinutes > 0 },
    { label: 'Piano Tutorials', done: completedLessons.some((id) => id.startsWith('ch-')) },
    { label: 'Level 1', done: hasPassedLevel(1) },
    { label: 'Level 2', done: hasPassedLevel(2) },
    { label: 'Level 3', done: hasPassedLevel(3) },
    { label: 'Course Completion', done: hasPassedLevel(3) },
  ];

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      {/* Header & Student Profile Name */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Student Conservatory Portal
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            Welcome back, {studentName || 'Pianist'}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Continue from where you left off or review your mastery metrics below.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs text-[var(--text-secondary)]">
            <span className="block mb-1">Student Name (used on Certificate)</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your full name"
              className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-gold)]"
            />
          </label>
          <Link
            to={nextStepLink.to}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] whitespace-nowrap"
          >
            Continue Lesson
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs text-[var(--text-secondary)]">Course Completion</p>
          <p className="mt-1.5 font-mono-tabular text-3xl font-bold text-[var(--text-primary)]">
            {completionPercent}%
          </p>
          <p className="mt-1 font-mono-tabular text-xs text-[var(--text-secondary)]">
            {completedLessons.length} / {TOTAL_CURRICULUM_ITEMS} lessons & chapters
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs text-[var(--text-secondary)]">Total Academy XP</p>
          <p className="mt-1.5 font-mono-tabular text-3xl font-bold text-[var(--accent-gold)]">
            {xp}
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Earned across lessons & drills</p>
        </div>

        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs text-[var(--text-secondary)]">Learning Streak</p>
          <p className="mt-1.5 flex items-center gap-2 font-mono-tabular text-3xl font-bold text-[var(--text-primary)]">
            <Flame className="h-6 w-6 text-[var(--accent-gold)]" />
            {streakDays}d
          </p>
          <p className="mt-1 font-mono-tabular text-xs text-[var(--text-secondary)]">
            {practiceMinutes} total practice min
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5">
          <p className="text-xs text-[var(--text-secondary)]">Recommended Next</p>
          <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)] line-clamp-2">
            {nextStepLink.label}
          </p>
          <Link to={nextStepLink.to} className="mt-2 inline-block text-xs font-semibold text-[var(--accent-gold)] hover:underline">
            Open now →
          </Link>
        </div>
      </div>

      {/* 10-Stage Progress Path */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Academy Progress Path
          </h2>
          <Link to="/progress" className="text-xs font-semibold text-[var(--accent-gold)] hover:underline">
            Full Progress Report →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {pathNodes.map((node, idx) => (
            <div
              key={node.label}
              className={cn(
                'rounded-lg border p-3 text-center',
                node.done
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)]'
              )}
            >
              <span className="font-mono-tabular text-[10px] text-[var(--text-secondary)]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="mt-1 text-xs font-semibold text-[var(--text-primary)] leading-snug">
                {node.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart + Assessment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            7-Day Practice Activity (Minutes)
          </h2>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyPracticeLog}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(166,123,46,0.18)" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#9C9488' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9C9488' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181C',
                    border: '1px solid #2C2C34',
                    borderRadius: '8px',
                    color: '#F4F0E8',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  fill="#D4AF37"
                  fillOpacity={0.18}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Assessment Status
            </h2>
            <Link to="/certificate" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-gold)] hover:underline">
              <Award className="h-3.5 w-3.5" />
              Certificate
            </Link>
          </div>
          <div className="space-y-3">
            {([1, 2, 3] as const).map((lvl) => {
              const unlocked = isLevelUnlocked(lvl);
              const passed = hasPassedLevel(lvl);
              const best = getBestScoreForLevel(lvl);
              return (
                <Link
                  key={lvl}
                  to={`/assessments/level-${lvl}`}
                  className="flex items-center justify-between rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 hover:border-[var(--accent-gold)] transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Level {lvl} Assessment
                    </p>
                    <p className="font-mono-tabular text-xs text-[var(--text-secondary)]">
                      {best !== null ? `Best Score: ${best}%` : 'Not attempted yet'}
                    </p>
                  </div>
                  {passed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                      Passed
                    </span>
                  ) : unlocked ? (
                    <span className="text-xs font-semibold text-[var(--accent-gold)]">Ready →</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[var(--accent-gold)]" />
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Academy Milestones & Badges ({unlockedBadges.length}/{ACHIEVEMENTS.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((badge) => {
            const isEarned = unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={cn(
                  'rounded-lg border p-4 space-y-1.5',
                  isEarned
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] opacity-65'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)]">
                    <Music2 className="h-4 w-4 text-[var(--accent-gold)]" />
                    {badge.title}
                  </span>
                  <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                    +{badge.xpBonus} XP
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{badge.description}</p>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  {isEarned ? 'Unlocked' : `Unlock: ${badge.criteria}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
