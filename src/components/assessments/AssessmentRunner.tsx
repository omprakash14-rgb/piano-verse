import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { getKeyByMidi } from '@/src/data/piano-notes';
import { PASSING_THRESHOLDS, useAcademyStore } from '@/src/store/useAcademyStore';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { AssessmentAttempt, AssessmentQuestion, PianoKeyData } from '@/src/types/academy';
import { cn } from '@/src/lib/utils';

interface AssessmentRunnerProps {
  level: 1 | 2 | 3;
  title: string;
  subtitle: string;
  questions: AssessmentQuestion[];
}

export function AssessmentRunner({ level, title, subtitle, questions }: AssessmentRunnerProps) {
  const recordAssessmentAttempt = useAcademyStore((s) => s.recordAssessmentAttempt);
  const passingThreshold = PASSING_THRESHOLDS[level];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedKeyMidi, setSelectedKeyMidi] = useState<number | null>(null);
  const [playedSequence, setPlayedSequence] = useState<number[]>([]);
  const [questionEvaluated, setQuestionEvaluated] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);

  const [results, setResults] = useState<AssessmentAttempt['results']>([]);
  const [finishedAttempt, setFinishedAttempt] = useState<AssessmentAttempt | null>(null);

  const q = questions[currentIdx];

  const handlePianoPlay = (key: PianoKeyData) => {
    if (questionEvaluated || finishedAttempt) return;

    if (q.type === 'identify-key') {
      setSelectedKeyMidi(key.midi);
      return;
    }

    if (q.type === 'play-sequence' && q.targetSequence) {
      setPlayedSequence((prev) => {
        if (prev.length >= q.targetSequence!.length) return prev;
        return [...prev, key.midi];
      });
    }
  };

  const canEvaluate =
    (q.type === 'multiple-choice' || q.type === 'true-false')
      ? selectedOption !== null
      : q.type === 'identify-key'
      ? selectedKeyMidi !== null
      : q.type === 'play-sequence'
      ? playedSequence.length === (q.targetSequence?.length ?? 0)
      : false;

  const evaluateCurrent = () => {
    if (!canEvaluate || questionEvaluated) return;

    let correct = false;
    let userLabel = '';
    let correctLabel = '';

    if ((q.type === 'multiple-choice' || q.type === 'true-false') && q.options) {
      correct = selectedOption === q.correctOptionIndex;
      userLabel = q.options[selectedOption!] ?? '';
      correctLabel = q.options[q.correctOptionIndex!] ?? '';
    } else if (q.type === 'identify-key' && q.targetMidi !== undefined) {
      const targetKey = getKeyByMidi(q.targetMidi);
      const userKey = selectedKeyMidi ? getKeyByMidi(selectedKeyMidi) : undefined;
      correct = q.allowAnyOctave
        ? selectedKeyMidi! % 12 === q.targetMidi % 12
        : selectedKeyMidi === q.targetMidi;
      userLabel = userKey?.note ?? 'None';
      correctLabel = q.allowAnyOctave ? `Any ${targetKey?.pitchClass}` : targetKey?.note ?? '';
    } else if (q.type === 'play-sequence' && q.targetSequence) {
      correct =
        playedSequence.length === q.targetSequence.length &&
        playedSequence.every((m, idx) => m === q.targetSequence![idx]);
      userLabel = playedSequence.map((m) => getKeyByMidi(m)?.note ?? m).join(' → ');
      correctLabel = q.targetSequence.map((m) => getKeyByMidi(m)?.note ?? m).join(' → ');
    }

    setIsCurrentCorrect(correct);
    setQuestionEvaluated(true);
    setResults((prev) => [
      ...prev,
      {
        questionId: q.id,
        correct,
        userAnswerLabel: userLabel,
        correctAnswerLabel: correctLabel,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setSelectedKeyMidi(null);
      setPlayedSequence([]);
      setQuestionEvaluated(false);
      setIsCurrentCorrect(false);
    } else {
      const correctCount = results.filter((r) => r.correct).length;
      const scorePercent = Math.round((correctCount / questions.length) * 100);
      const passed = scorePercent >= passingThreshold;

      const attempt: AssessmentAttempt = {
        id: `attempt-l${level}-${Date.now()}`,
        level,
        scorePercent,
        correctCount,
        totalCount: questions.length,
        passed,
        timestamp: new Date().toISOString(),
        results,
      };
      recordAssessmentAttempt(attempt);
      setFinishedAttempt(attempt);
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSelectedKeyMidi(null);
    setPlayedSequence([]);
    setQuestionEvaluated(false);
    setIsCurrentCorrect(false);
    setResults([]);
    setFinishedAttempt(null);
  };

  if (finishedAttempt) {
    return (
      <div className="mx-auto max-w-[960px] space-y-8">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 text-center space-y-4">
          <div
            className={cn(
              'mx-auto flex h-14 w-14 items-center justify-center rounded-full',
              finishedAttempt.passed
                ? 'bg-emerald-500/15 text-emerald-500'
                : 'bg-amber-500/15 text-amber-500'
            )}
          >
            {finishedAttempt.passed ? <Award className="h-7 w-7" /> : <AlertCircle className="h-7 w-7" />}
          </div>

          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Level {level} Assessment Result
          </p>
          <h2 className="font-display text-4xl font-semibold text-[var(--text-primary)]">
            {finishedAttempt.passed ? 'Assessment Passed!' : 'Keep Practising — Almost There'}
          </h2>
          <p className="font-mono-tabular text-3xl font-bold text-[var(--text-primary)]">
            {finishedAttempt.scorePercent}%{' '}
            <span className="text-base font-normal text-[var(--text-secondary)]">
              ({finishedAttempt.correctCount} / {finishedAttempt.totalCount} correct · Required: {passingThreshold}%)
            </span>
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleRetake}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Level {level}
            </button>

            {finishedAttempt.passed && level < 3 && (
              <Link
                to={`/assessments/level-${level + 1}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)]"
              >
                Proceed to Level {level + 1}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {finishedAttempt.passed && level === 3 && (
              <Link
                to="/certificate"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)]"
              >
                Claim Your Certificate
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <Link
              to="/assessments"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              All Assessments
            </Link>
          </div>
        </div>

        {/* Question-by-Question Review */}
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Detailed Answer Review
          </h3>
          <div className="space-y-3">
            {questions.map((question, idx) => {
              const res = finishedAttempt.results[idx];
              return (
                <div
                  key={question.id}
                  className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {idx + 1}. {question.prompt}
                    </p>
                    <span
                      className={cn(
                        'shrink-0 text-xs font-semibold',
                        res?.correct ? 'text-emerald-500' : 'text-red-500'
                      )}
                    >
                      {res?.correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Your answer: <span className="text-[var(--text-primary)]">{res?.userAnswerLabel}</span>
                    {!res?.correct && (
                      <>
                        {' · '}Expected: <strong className="text-emerald-500">{res?.correctAnswerLabel}</strong>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{question.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1040px] space-y-6">
      {/* Assessment Header & Progress */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[var(--accent-gold)]">
              Level {level} Assessment · Passing Score {passingThreshold}%
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold text-[var(--text-primary)]">
              {title}
            </h1>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{subtitle}</p>
          </div>
          <div className="text-right font-mono-tabular">
            <p className="text-sm font-bold text-[var(--text-primary)]">
              Question {currentIdx + 1} of {questions.length}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{q.topic}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]">
          <div
            className="h-full bg-[var(--accent-gold)] transition-all duration-300"
            style={{ width: `${((currentIdx + (questionEvaluated ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Active Question Card */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-6">
        <div>
          <p className="text-xs font-semibold text-[var(--text-secondary)]">
            {q.type === 'identify-key'
              ? 'Keyboard Identification Task'
              : q.type === 'play-sequence'
              ? 'Practical Playing Task'
              : q.type === 'true-false'
              ? 'True / False'
              : 'Multiple Choice'}
          </p>
          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
            {q.prompt}
          </h2>
          {q.instructionHint && (
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{q.instructionHint}</p>
          )}
        </div>

        {/* MCQ / True-False Options */}
        {(q.type === 'multiple-choice' || q.type === 'true-false') && q.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              const isPicked = selectedOption === idx;
              const isRight = questionEvaluated && idx === q.correctOptionIndex;
              const isWrong = questionEvaluated && isPicked && idx !== q.correctOptionIndex;

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={questionEvaluated}
                  onClick={() => setSelectedOption(idx)}
                  className={cn(
                    'rounded-lg border px-4 py-3.5 text-left text-sm transition-colors cursor-pointer disabled:cursor-default',
                    isRight
                      ? 'border-emerald-500 bg-emerald-500/10 font-semibold text-[var(--text-primary)]'
                      : isWrong
                      ? 'border-red-500 bg-red-500/10 text-[var(--text-primary)]'
                      : isPicked
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] font-semibold text-[var(--text-primary)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Interactive Piano Tasks */}
        {(q.type === 'identify-key' || q.type === 'play-sequence') && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--bg-subtle)] px-4 py-3 text-xs">
              {q.type === 'identify-key' ? (
                <span className="text-[var(--text-primary)]">
                  Selected key:{' '}
                  <strong className="font-mono-tabular text-[var(--accent-gold)]">
                    {selectedKeyMidi ? getKeyByMidi(selectedKeyMidi)?.note : 'Click a key below'}
                  </strong>
                </span>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[var(--text-secondary)]">
                    Played ({playedSequence.length}/{q.targetSequence?.length}):
                  </span>
                  <span className="font-mono-tabular font-semibold text-[var(--accent-gold)]">
                    {playedSequence.length
                      ? playedSequence.map((m) => getKeyByMidi(m)?.note).join(' → ')
                      : 'Play the sequence on the keyboard below'}
                  </span>
                </div>
              )}

              {!questionEvaluated && (playedSequence.length > 0 || selectedKeyMidi !== null) && (
                <button
                  type="button"
                  onClick={() => {
                    setPlayedSequence([]);
                    setSelectedKeyMidi(null);
                  }}
                  className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <VirtualPiano88
              variant="focused"
              midiRange={[48, 76]}
              defaultLabels={level === 3 ? 'c-only' : 'none'}
              highlightedMidi={
                q.type === 'identify-key' && selectedKeyMidi
                  ? [selectedKeyMidi]
                  : q.type === 'play-sequence'
                  ? playedSequence
                  : []
              }
              targetMidi={
                questionEvaluated && !isCurrentCorrect && q.targetMidi
                  ? [q.targetMidi]
                  : questionEvaluated && !isCurrentCorrect && q.targetSequence
                  ? q.targetSequence
                  : []
              }
              onNotePlay={handlePianoPlay}
              compactControls
            />
          </div>
        )}

        {/* Evaluation Feedback */}
        {questionEvaluated && (
          <div
            className={cn(
              'flex items-start gap-3 rounded-lg border p-4 text-sm',
              isCurrentCorrect
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300'
            )}
          >
            {isCurrentCorrect ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">
                {isCurrentCorrect ? 'Correct!' : 'Incorrect — Explanation:'}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex justify-end border-t border-[var(--border-hairline)] pt-5">
          {!questionEvaluated ? (
            <button
              type="button"
              disabled={!canEvaluate}
              onClick={evaluateCurrent}
              className="rounded-lg bg-[var(--accent-gold)] px-6 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
            >
              Submit Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-6 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer"
            >
              {currentIdx + 1 < questions.length ? 'Next Question' : 'View Final Score'}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
