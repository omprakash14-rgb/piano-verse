import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Music, Piano, ShieldCheck, Trophy } from 'lucide-react';
import { VirtualPiano88 } from '@/src/components/piano/VirtualPiano88';
import { ResilientImage } from '@/src/components/ui/ResilientImage';
import { ACADEMY_IMAGES } from '@/src/lib/utils';
import { useAcademyStore } from '@/src/store/useAcademyStore';

const ROADMAP_STAGES = [
  'Discover Piano',
  'Keyboard Basics',
  'Playing Techniques',
  'Music Theory',
  'Virtual Practice',
  'Piano Tutorials',
  'Level 1 Exam',
  'Level 2 Exam',
  'Level 3 Exam',
  'Course Completion',
];

const CURRICULUM_CARDS = [
  {
    index: '01',
    title: 'Introduction & Mechanics',
    description: 'Explore 300 years of piano history, compare six piano types, meet seven iconic pianists, and animate the hammer-and-string action.',
    meta: '5 Interactive Lessons · Module 1',
    to: '/learn/history',
  },
  {
    index: '02',
    title: 'Keyboard & Pitch Landmarks',
    description: 'Decode the 88 keys (52 white, 36 black), locate Middle C in seconds, test sharps and flats, and play octave comparisons.',
    meta: '4 Lessons + Key Game · Module 2',
    to: '/learn/keyboard',
  },
  {
    index: '03',
    title: 'Posture & Finger Control',
    description: 'Align bench height and forearm balance, curve your fingertips cleanly, and master 1–5 mirror finger numbering.',
    meta: '4 Lessons + Hand Lab · Module 3',
    to: '/learn/posture',
  },
  {
    index: '04',
    title: 'Theory, Rhythm & Harmony',
    description: 'Read the Grand Staff, practise steady BPM with a live metronome, highlight Major/Minor scales, and sound triads together.',
    meta: '5 Lessons + Theory Lab · Module 4',
    to: '/learn/theory',
  },
];

export function HomePage() {
  const { xp, streakDays, completedLessons, unlockedBadges, getCourseCompletionPercent } =
    useAcademyStore();
  const completionPercent = getCourseCompletionPercent();

  return (
    <div className="divide-y divide-[var(--border-hairline)]">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-[1320px] px-5 pt-10 pb-14 md:px-8 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
              Discover. Learn. Play. Master.
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold leading-[1.06] tracking-tight text-[var(--text-primary)] [text-wrap:balance]">
              Your Piano Journey Starts Here.
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              From your very first note to your first complete melody, learn piano through interactive lessons, guided practice, and real musical experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-gold)] px-6 py-3 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors whitespace-nowrap"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/piano"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors whitespace-nowrap"
              >
                <Piano className="h-4 w-4 text-[var(--accent-gold)]" />
                Explore Virtual Piano
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-secondary)]">
              <span>Zero prior musical knowledge required</span>
              <span aria-hidden="true">·</span>
              <span>Real-time Web Audio 88-key studio</span>
              <span aria-hidden="true">·</span>
              <span>Three progressive certification levels</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ResilientImage
              src={ACADEMY_IMAGES.heroGrand}
              alt="Concert grand piano on an oak conservatory stage under warm lighting"
              title="PianoVerse Conservatory Grand"
              aspectClassName="h-full min-h-[260px]"
              className="border border-[var(--border-hairline)]"
            />
          </div>
        </div>

        {/* Immediate Live Playable Hero Keyboard */}
        <div className="mt-10">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              Try It Now — Click Any Key or Use Your Computer Keyboard (A–L)
            </p>
            <Link
              to="/piano"
              className="text-xs font-semibold text-[var(--accent-gold)] hover:underline underline-offset-4"
            >
              Open Full 88-Key Studio →
            </Link>
          </div>
          <VirtualPiano88 variant="focused" midiRange={[48, 76]} defaultLabels="all" />
        </div>
      </section>

      {/* 2. Introduction to PianoVerse & Quantitative Overview */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
              01. Academy Philosophy
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] [text-wrap:balance]">
              A Real Digital Piano Classroom Built for First-Time Players.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              PianoVerse replaces dry textbook walls with an interactive conservatory workflow: <strong className="text-[var(--text-primary)]">Teach → Explain → Demonstrate → Interact → Practise → Assess</strong>. Every lesson pairs clear teacher explanations with live diagrams, synthesized audio demonstrations, and instant keyboard exercises.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
                <p className="font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">88</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">Interactive Keys (A0–C8)</p>
              </div>
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
                <p className="font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">18</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">Core Foundation Lessons</p>
              </div>
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
                <p className="font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">6</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">Guided Tutorial Chapters</p>
              </div>
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
                <p className="font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">3</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">Progressive Assessments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What You Will Learn */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
              02. Core Curriculum
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)]">
              What You Will Learn
            </h2>
          </div>
          <Link
            to="/learn"
            className="text-sm font-semibold text-[var(--accent-gold)] hover:underline underline-offset-4"
          >
            View Complete Syllabus →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CURRICULUM_CARDS.map((card) => (
            <Link
              key={card.index}
              to={card.to}
              className="group rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 hover:border-[var(--accent-gold)] transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span className="font-mono-tabular font-semibold text-[var(--accent-gold)]">
                  Module {card.index}
                </span>
                <span>{card.meta}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Learning Roadmap */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8">
        <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
          03. Structured Path
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)]">
          Ten-Stage Learning Roadmap
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
          Follow a clear conservatory sequence from discovering how hammers strike strings to earning your signed PianoVerse graduation certificate.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {ROADMAP_STAGES.map((stage, idx) => (
            <div
              key={stage}
              className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
            >
              <span className="font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                Step {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">{stage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 & 6. Explore Virtual Piano + Structured Tutorials Split */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)]">
                <Music className="h-4 w-4" />
                <span>04. Five Interactive Modes</span>
              </div>
              <h3 className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
                88-Key Virtual Piano & Practice Studio
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Switch between Concert Grand, Electric, and Harpsichord voices, hold sustain, and practice with real-time feedback across Free Play, Guided Notes, Scale Practice, Chord Practice, and Melody Practice.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/piano"
                className="rounded-lg bg-[var(--accent-gold)] px-4 py-2 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors"
              >
                Launch Virtual Piano
              </Link>
              <Link
                to="/practice"
                className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
              >
                Open Practice Studio
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)]">
                <BookOpen className="h-4 w-4" />
                <span>05. Guided Classroom Tutorials</span>
              </div>
              <h3 className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
                Six Progressive Beginner Chapters
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Every chapter follows a complete teacher-led structure: lesson objectives, instructor explanation, visual audio demo, interactive piano exercise, guided practice, independent drills, summary, and knowledge check.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/tutorials"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-gold)] transition-colors"
              >
                Attend Chapter 1
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Three Assessment Levels & Student Progress */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)]">
              <ShieldCheck className="h-4 w-4" />
              <span>06. Progressive Mastery Verification</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--text-primary)]">
              Three Assessment Levels with Practical Keyboard Tasks
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Each assessment unlocks sequentially once you pass the previous milestone—combining music theory questions with live virtual keyboard tasks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { lvl: 'Level 1 · Beginner', req: '70% passing score', desc: 'History, parts, keyboard landmarks, posture, finger numbers.' },
                { lvl: 'Level 2 · Intermediate', req: '75% passing score', desc: 'Sharps/flats, octaves, notation, durations, scales, triads.' },
                { lvl: 'Level 3 · Final Practical', req: '80% passing score', desc: 'Perform C Major scale, chords, melody, and two-hand cadence.' },
              ].map((item) => (
                <div
                  key={item.lvl}
                  className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{item.lvl}</p>
                  <p className="mt-1 font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                    {item.req}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold)]">
                <Trophy className="h-4 w-4" />
                <span>07. Your Live Progress</span>
              </div>
              <Link to="/progress" className="text-xs font-semibold text-[var(--accent-gold)] hover:underline">
                Details →
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[var(--bg-subtle)] p-4">
                <p className="text-xs text-[var(--text-secondary)]">Course Completion</p>
                <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--text-primary)]">
                  {completionPercent}%
                </p>
              </div>
              <div className="rounded-lg bg-[var(--bg-subtle)] p-4">
                <p className="text-xs text-[var(--text-secondary)]">Total XP Earned</p>
                <p className="mt-1 font-mono-tabular text-2xl font-bold text-[var(--accent-gold)]">
                  {xp} XP
                </p>
              </div>
              <div className="rounded-lg bg-[var(--bg-subtle)] p-4">
                <p className="text-xs text-[var(--text-secondary)]">Lessons Completed</p>
                <p className="mt-1 font-mono-tabular text-xl font-bold text-[var(--text-primary)]">
                  {completedLessons.length}
                </p>
              </div>
              <div className="rounded-lg bg-[var(--bg-subtle)] p-4">
                <p className="text-xs text-[var(--text-secondary)]">Streak & Badges</p>
                <p className="mt-1 font-mono-tabular text-xl font-bold text-[var(--text-primary)]">
                  {streakDays}d · {unlockedBadges.length}/6
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Progress persists automatically across page refreshes.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final Call to Action */}
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 text-center">
        <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold)]">
          08. Begin Today
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] [text-wrap:balance]">
          Sit Down at the Keys and Play Your First Note.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[var(--text-secondary)]">
          Start from Lesson 1.1 in Piano Fundamentals or jump directly into our 88-key Virtual Piano studio.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <Link
            to="/learn/history"
            className="rounded-lg bg-[var(--accent-gold)] px-6 py-3 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors"
          >
            Start Module 1: Introduction
          </Link>
          <Link
            to="/assessments"
            className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            Explore Assessments
          </Link>
        </div>
      </section>
    </div>
  );
}
