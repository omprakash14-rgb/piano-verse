import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { cn } from '@/src/lib/utils';

type PostureState = 'correct' | 'slumped' | 'too-low';

const FINGERS = [
  { num: 1, name: 'Thumb', rhNote: 'C4', rhMidi: 60, lhNote: 'G3', lhMidi: 55 },
  { num: 2, name: 'Index', rhNote: 'D4', rhMidi: 62, lhNote: 'F3', lhMidi: 53 },
  { num: 3, name: 'Middle', rhNote: 'E4', rhMidi: 64, lhNote: 'E3', lhMidi: 52 },
  { num: 4, name: 'Ring', rhNote: 'F4', rhMidi: 65, lhNote: 'D3', lhMidi: 50 },
  { num: 5, name: 'Little', rhNote: 'G4', rhMidi: 67, lhNote: 'C3', lhMidi: 48 },
];

export function PostureAndHandLab() {
  const [posture, setPosture] = useState<PostureState>('correct');
  const [hand, setHand] = useState<'right' | 'left'>('right');
  const [activeFinger, setActiveFinger] = useState<number>(1);
  const [handShape, setHandShape] = useState<'curved' | 'flat'>('curved');

  const handleFingerClick = (f: (typeof FINGERS)[number]) => {
    setActiveFinger(f.num);
    pianoAudio.playQuickNote(hand === 'right' ? f.rhMidi : f.lhMidi, 480);
  };

  const animateFiveFingers = () => {
    const sequence = hand === 'right' ? FINGERS : [...FINGERS].reverse();
    sequence.forEach((f, idx) => {
      setTimeout(() => {
        setActiveFinger(f.num);
        pianoAudio.playQuickNote(hand === 'right' ? f.rhMidi : f.lhMidi, 320);
      }, idx * 320);
    });
  };

  return (
    <div className="space-y-8">
      {/* Sitting Posture Interactive Comparison */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Sitting Posture Visual Guide
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Compare balanced conservatory alignment against common beginner habits.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1">
            {(
              [
                { id: 'correct', label: 'Correct Alignment' },
                { id: 'slumped', label: 'Too Close / Slumped' },
                { id: 'too-low', label: 'Bench Too Low' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPosture(opt.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer',
                  posture === opt.id
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 rounded-xl border border-[var(--border-hairline)] bg-[#141311] p-4">
            <svg viewBox="0 0 420 250" className="w-full h-auto" role="img" aria-label="Pianist sitting posture diagram">
              {/* Floor */}
              <line x1="20" y1="226" x2="400" y2="226" stroke="#44403C" strokeWidth="2" />
              {/* Piano body */}
              <rect x="275" y="70" width="115" height="156" rx="4" fill="#292524" stroke="#57534E" />
              <rect x="245" y="132" width="42" height="14" rx="2" fill="#FAF7F2" />
              <text x="332" y="102" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="600">
                Keyboard
              </text>

              {/* Bench */}
              <rect
                x={posture === 'slumped' ? '155' : '115'}
                y={posture === 'too-low' ? '186' : '168'}
                width="74"
                height="12"
                rx="2"
                fill="#57534E"
              />
              <line
                x1={posture === 'slumped' ? '168' : '128'}
                y1={posture === 'too-low' ? '198' : '180'}
                x2={posture === 'slumped' ? '168' : '128'}
                y2="226"
                stroke="#57534E"
                strokeWidth="4"
              />
              <line
                x1={posture === 'slumped' ? '216' : '176'}
                y1={posture === 'too-low' ? '198' : '180'}
                x2={posture === 'slumped' ? '216' : '176'}
                y2="226"
                stroke="#57534E"
                strokeWidth="4"
              />

              {/* Pianist Silhouette */}
              {posture === 'correct' && (
                <g stroke="#D4AF37" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="152" cy="64" r="16" fill="#2A2622" />
                  {/* Straight relaxed spine */}
                  <line x1="152" y1="80" x2="152" y2="164" />
                  {/* Upper arm & level forearm */}
                  <polyline points="152,98 168,136 250,136" stroke="#10B981" />
                  {/* Legs & grounded feet */}
                  <polyline points="152,164 212,164 218,224 234,224" />
                </g>
              )}

              {posture === 'slumped' && (
                <g stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="204" cy="74" r="16" fill="#2A2622" />
                  {/* Rounded slumped back */}
                  <path d="M 192 164 Q 178 122 200 90" />
                  {/* Cramped elbows behind torso */}
                  <polyline points="196,104 176,144 248,136" stroke="#EF4444" />
                  <polyline points="192,164 238,164 242,224 256,224" />
                </g>
              )}

              {posture === 'too-low' && (
                <g stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="152" cy="84" r="16" fill="#2A2622" />
                  <line x1="152" y1="100" x2="152" y2="182" />
                  {/* Forearm sloping sharply upward */}
                  <polyline points="152,118 168,160 250,136" stroke="#EF4444" />
                  <polyline points="152,182 212,182 218,224 234,224" />
                </g>
              )}
            </svg>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div
              className={cn(
                'flex items-start gap-3 rounded-lg border p-4',
                posture === 'correct'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300'
              )}
            >
              {posture === 'correct' ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-semibold">
                  {posture === 'correct'
                    ? 'Balanced & Tension-Free Alignment'
                    : posture === 'slumped'
                    ? 'Warning: Bench Too Close / Rounded Spine'
                    : 'Warning: Bench Too Low — Wrist Strain'}
                </p>
                <p className="mt-1 text-xs leading-relaxed">
                  {posture === 'correct'
                    ? 'Forearms stay horizontal, elbows hang slightly ahead of the torso, shoulders remain relaxed, and feet stay flat for stable balance.'
                    : posture === 'slumped'
                    ? 'Sitting too close forces elbows backward past your ribs and hunches the neck. Slide the bench back until your arms hang comfortably.'
                    : 'When wrists sit below the key surface, tendons strain to lift fingers onto keys. Raise the bench or add a firm cushion.'}
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><strong className="text-[var(--text-primary)]">Bench position:</strong> Sit on the front half so hips pivot freely.</li>
              <li><strong className="text-[var(--text-primary)]">Elbows & forearms:</strong> Level with the white keys, never drooping.</li>
              <li><strong className="text-[var(--text-primary)]">Feet:</strong> Flat on the floor (or footrest for children) to anchor body weight.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hand Position & Animated Finger Numbering */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Hand Shape & Interactive Finger Numbering (1–5)
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Click any finger number to hear its position note and inspect curved vs. flat technique.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1">
              <button
                type="button"
                onClick={() => setHand('left')}
                className={cn(
                  'rounded px-3 py-1 text-xs font-semibold cursor-pointer',
                  hand === 'left'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                )}
              >
                Left Hand
              </button>
              <button
                type="button"
                onClick={() => setHand('right')}
                className={cn(
                  'rounded px-3 py-1 text-xs font-semibold cursor-pointer',
                  hand === 'right'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
                )}
              >
                Right Hand
              </button>
            </div>
            <button
              type="button"
              onClick={animateFiveFingers}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-gold)] px-3.5 py-1.5 text-xs font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" />
              Animate 1–5
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Finger Selector Buttons */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-5 gap-2.5">
              {(hand === 'right' ? FINGERS : [...FINGERS].reverse()).map((f) => {
                const isSelected = activeFinger === f.num;
                const note = hand === 'right' ? f.rhNote : f.lhNote;
                return (
                  <button
                    key={f.num}
                    type="button"
                    onClick={() => handleFingerClick(f)}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-xl border py-4 px-2 transition-all cursor-pointer',
                      isSelected
                        ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] -translate-y-0.5'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]'
                    )}
                  >
                    <span className="font-mono-tabular text-xl font-bold text-[var(--accent-gold)]">
                      {f.num}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-[var(--text-primary)]">
                      {f.name}
                    </span>
                    <span className="mt-0.5 font-mono-tabular text-[11px] text-[var(--text-secondary)]">
                      {note}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Notice the symmetry: Thumb is always <strong className="text-[var(--text-primary)]">1</strong> and Pinky is always <strong className="text-[var(--text-primary)]">5</strong> on both hands.
            </p>
          </div>

          {/* Curved vs Flat Finger Arch Demo */}
          <div className="lg:col-span-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-[var(--text-primary)]">
                Finger Curve Check
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setHandShape('curved')}
                  className={cn(
                    'rounded px-2.5 py-1 text-xs font-medium cursor-pointer',
                    handShape === 'curved'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  )}
                >
                  Curved (Good)
                </button>
                <button
                  type="button"
                  onClick={() => setHandShape('flat')}
                  className={cn(
                    'rounded px-2.5 py-1 text-xs font-medium cursor-pointer',
                    handShape === 'flat'
                      ? 'bg-red-600 text-white'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  )}
                >
                  Flat (Avoid)
                </button>
              </div>
            </div>
            <svg viewBox="0 0 280 110" className="w-full h-auto" role="img" aria-label="Curved vs flat hand shape illustration">
              <rect x="16" y="84" width="248" height="16" rx="2" fill="#FAF7F2" stroke="#C8BEA9" />
              {handShape === 'curved' ? (
                <g stroke="#10B981" strokeWidth="5" fill="none" strokeLinecap="round">
                  <path d="M 35 66 Q 90 42 130 44 Q 175 46 190 83" />
                  <circle cx="190" cy="83" r="4" fill="#10B981" />
                </g>
              ) : (
                <g stroke="#EF4444" strokeWidth="5" fill="none" strokeLinecap="round">
                  <path d="M 35 76 L 130 74 L 196 82" />
                </g>
              )}
            </svg>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              {handShape === 'curved'
                ? 'Rounded knuckles form a supportive arch, letting fingertips strike cleanly with relaxed wrist freedom.'
                : 'Flat, collapsed joints force fingers to slap awkwardly and cause tension across the wrist.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
