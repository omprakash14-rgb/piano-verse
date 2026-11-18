import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Volume2 } from 'lucide-react';
import {
  FAMOUS_PIANISTS,
  HISTORY_TIMELINE,
  MODULE_LESSONS,
  PIANO_TYPES,
} from '@/src/data/lessons';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { LessonQuizCard } from '@/src/components/lessons/LessonQuizCard';
import { SoundActionDiagram } from '@/src/components/lessons/SoundActionDiagram';
import { ResilientImage } from '@/src/components/ui/ResilientImage';
import { cn } from '@/src/lib/utils';

export function LearnHistoryPage() {
  const completedLessons = useAcademyStore((s) => s.completedLessons);
  const introLessons = MODULE_LESSONS.filter((l) => l.moduleId === 'intro');
  const [activeLessonId, setActiveLessonId] = useState(introLessons[0].id);
  const [selectedTimelineId, setSelectedTimelineId] = useState(HISTORY_TIMELINE[3].id); // Cristofori default

  const activeLesson = introLessons.find((l) => l.id === activeLessonId) ?? introLessons[0];
  const activeEra =
    HISTORY_TIMELINE.find((t) => t.id === selectedTimelineId) ?? HISTORY_TIMELINE[0];

  return (
    <div className="mx-auto max-w-[1320px] px-5 py-10 md:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-hairline)] pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
            Module 01 · Introduction to Piano
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[var(--text-primary)]">
            Discover the Instrument, Its History & Sound
          </h1>
        </div>
        <Link
          to="/learn/keyboard"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
        >
          Next: Module 2 (Keyboard)
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lesson Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {introLessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          const isActive = lesson.id === activeLesson.id;
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => setActiveLessonId(lesson.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap',
                isActive
                  ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--text-primary)] font-semibold'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
              <span>{lesson.numberLabel}: {lesson.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Lesson Content */}
      <article className="space-y-8">
        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-6">
          <div className="border-b border-[var(--border-hairline)] pb-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--accent-gold)]">{activeLesson.numberLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeLesson.durationMinutes} min read & activity</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">+{activeLesson.xpReward} XP</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
              {activeLesson.title}
            </h2>
            <p className="mt-1.5 text-base text-[var(--text-secondary)]">{activeLesson.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {activeLesson.sections.map((sec) => (
                <section key={sec.heading} className="space-y-3">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{sec.heading}</h3>
                  {sec.body.map((p, i) => (
                    <p key={i} className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                      {p}
                    </p>
                  ))}
                  {sec.keyTakeaway && (
                    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 text-sm text-[var(--text-primary)]">
                      <strong>Key Takeaway:</strong> {sec.keyTakeaway}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <aside className="lg:col-span-4 space-y-5">
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5">
                <h4 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
                  Lesson Objectives
                </h4>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {activeLesson.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)] shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-5">
                <h4 className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
                  Key Terminology
                </h4>
                <dl className="mt-3 space-y-3 text-xs">
                  {activeLesson.terminology.map((t) => (
                    <div key={t.term}>
                      <dt className="font-semibold text-[var(--text-primary)]">{t.term}</dt>
                      <dd className="mt-0.5 text-[var(--text-secondary)]">{t.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>

          <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 text-sm text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Lesson Summary:</strong> {activeLesson.summary}
          </div>
        </div>

        {/* Lesson-Specific Interactive Experiences */}
        {activeLesson.id === '1.1' && <SoundActionDiagram />}

        {activeLesson.id === '1.2' && (
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-6">
            <div>
              <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                Chronological History Timeline (c. 14th Century – Present)
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Select any milestone to inspect innovations, archival imagery, and hear its representative keyboard voice.
              </p>
            </div>

            {/* Timeline Stepper */}
            <div className="flex gap-2 overflow-x-auto pb-2 piano-scroll">
              {HISTORY_TIMELINE.map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedTimelineId(ev.id)}
                  className={cn(
                    'shrink-0 rounded-lg border px-3.5 py-2.5 text-left transition-colors cursor-pointer',
                    selectedTimelineId === ev.id
                      ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]'
                  )}
                >
                  <p className="font-mono-tabular text-[11px] font-semibold text-[var(--accent-gold)]">
                    {ev.period}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">
                    {ev.title}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Era Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              <div className="lg:col-span-5">
                <ResilientImage
                  src={activeEra.imageUrl}
                  alt={activeEra.imageAlt}
                  title={activeEra.title}
                />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                      {activeEra.period} {activeEra.isApproximate ? '(Approximate period)' : ''} · {activeEra.figureOrOrigin}
                    </p>
                    <h4 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
                      {activeEra.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      pianoAudio.setVoice(activeEra.demoVoice);
                      pianoAudio.playSequence(activeEra.demoMidiNotes, 300);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-gold)] px-3.5 py-2 text-xs font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer whitespace-nowrap"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    Hear Era Voice
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {activeEra.background}
                </p>

                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">Key Innovations</p>
                  <ul className="mt-1.5 space-y-1.5 text-sm text-[var(--text-secondary)]">
                    {activeEra.innovations.map((inv) => (
                      <li key={inv}>· {inv}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 text-xs leading-relaxed text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Why It Mattered:</strong> {activeEra.whyItMattered}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLesson.id === '1.3' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PIANO_TYPES.map((pt) => (
              <div
                key={pt.id}
                className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden flex flex-col"
              >
                <ResilientImage
                  src={pt.imageUrl}
                  alt={pt.imageAlt}
                  title={pt.name}
                  className="rounded-none"
                />
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span className="font-mono-tabular font-semibold text-[var(--accent-gold)]">
                        {pt.keyCount}
                      </span>
                      <span>{pt.footprint}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold text-[var(--text-primary)]">
                      {pt.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {pt.description}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-[var(--text-secondary)] border-t border-[var(--border-hairline)] pt-3">
                      {pt.features.map((f) => (
                        <li key={f}>· {f}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-[var(--text-primary)]">
                    <strong>Best for:</strong> {pt.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeLesson.id === '1.4' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FAMOUS_PIANISTS.map((pianist) => (
              <div
                key={pianist.id}
                className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--accent-gold)]">
                      {pianist.era} · {pianist.lifespan}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--text-primary)]">
                      {pianist.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => pianoAudio.playSequence(pianist.sampleNotes, 270)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] cursor-pointer whitespace-nowrap"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
                    Play Motif
                  </button>
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {pianist.signatureContribution}
                </p>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {pianist.biography}
                </p>
                <p className="rounded-lg bg-[var(--bg-subtle)] p-3 text-xs text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Listening Focus:</strong> {pianist.listeningTip}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeLesson.id === '1.5' && <SoundActionDiagram />}

        <LessonQuizCard
          lessonId={activeLesson.id}
          xpReward={activeLesson.xpReward}
          questions={activeLesson.knowledgeCheck}
        />
      </article>
    </div>
  );
}
