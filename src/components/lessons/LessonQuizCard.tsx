import { useState } from 'react';
import { CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '@/src/types/academy';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { cn } from '@/src/lib/utils';

interface LessonQuizCardProps {
  lessonId: string;
  xpReward: number;
  questions: QuizQuestion[];
  onCompleted?: () => void;
}

export function LessonQuizCard({ lessonId, xpReward, questions, onCompleted }: LessonQuizCardProps) {
  const { completedLessons, completeLesson } = useAcademyStore();
  const isAlreadyDone = completedLessons.includes(lessonId);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const passed = submitted && correctCount === questions.length;

  const handleSubmit = () => {
    setSubmitted(true);
    if (correctCount === questions.length) {
      completeLesson(lessonId, xpReward);
      onCompleted?.();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Knowledge Check
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Answer cleanly to record this lesson and earn {xpReward} XP.
          </p>
        </div>
        {isAlreadyDone && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </span>
        )}
      </div>

      <div className="mt-5 space-y-6">
        {questions.map((q, idx) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {idx + 1}. {q.prompt}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, oIdx) => {
                  const isPicked = selected === oIdx;
                  const showRight = submitted && oIdx === q.correctIndex;
                  const showWrong = submitted && isPicked && oIdx !== q.correctIndex;

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                      className={cn(
                        'rounded-lg border px-4 py-3 text-left text-sm transition-colors cursor-pointer disabled:cursor-default',
                        showRight
                          ? 'border-emerald-500 bg-emerald-500/10 text-[var(--text-primary)] font-medium'
                          : showWrong
                          ? 'border-red-500 bg-red-500/10 text-[var(--text-primary)]'
                          : isPicked
                          ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)] font-medium'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div
                  className={cn(
                    'flex items-start gap-2 rounded-lg p-3 text-xs',
                    isCorrect
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'bg-amber-500/10 text-amber-800 dark:text-amber-300'
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  )}
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-4">
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className="rounded-lg bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Check Answers
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {passed ? (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Passed ({correctCount}/{questions.length}) · Lesson marked complete
              </span>
            ) : (
              <>
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  Score: {correctCount}/{questions.length} — Review explanations above and try again.
                </span>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface)] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Try Again
                </button>
              </>
            )}
          </div>
        )}

        {!isAlreadyDone && !passed && (
          <button
            type="button"
            onClick={() => {
              completeLesson(lessonId, xpReward);
              onCompleted?.();
            }}
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 cursor-pointer"
          >
            Mark lesson studied
          </button>
        )}
      </div>
    </div>
  );
}
