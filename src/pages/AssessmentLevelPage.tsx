import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { LEVEL_1_QUESTIONS, LEVEL_2_QUESTIONS, LEVEL_3_QUESTIONS } from '@/src/data/questions';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { AssessmentRunner } from '@/src/components/assessments/AssessmentRunner';

export function AssessmentLevelPage({ level }: { level: 1 | 2 | 3 }) {
  const isLevelUnlocked = useAcademyStore((s) => s.isLevelUnlocked);
  const unlocked = isLevelUnlocked(level);

  const meta =
    level === 1
      ? {
          title: 'Beginner Assessment',
          subtitle: 'Tests piano history, components, keyboard layout, posture, and finger numbering.',
          questions: LEVEL_1_QUESTIONS,
        }
      : level === 2
      ? {
          title: 'Intermediate Assessment',
          subtitle: 'Tests sharps/flats, octaves, notation, durations, major scales, and triads.',
          questions: LEVEL_2_QUESTIONS,
        }
      : {
          title: 'Final Practical Assessment',
          subtitle: 'Tests practical scale performance, chord voicing, melody playing, and two-hand coordination.',
          questions: LEVEL_3_QUESTIONS,
        };

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8">
      {!unlocked ? (
        <div className="mx-auto max-w-lg rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[var(--accent-gold)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
            Level {level} Is Locked
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Please pass Level {level - 1} first to unlock this assessment.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to={`/assessments/level-${level - 1}`}
              className="rounded-lg bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[#12100E]"
            >
              Go to Level {level - 1}
            </Link>
            <Link
              to="/assessments"
              className="rounded-lg border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)]"
            >
              Overview
            </Link>
          </div>
        </div>
      ) : (
        <AssessmentRunner
          level={level}
          title={meta.title}
          subtitle={meta.subtitle}
          questions={meta.questions}
        />
      )}
    </div>
  );
}
