import { useState } from 'react';
import { Volume2, Cpu, Hammer } from 'lucide-react';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { cn } from '@/src/lib/utils';

const ACOUSTIC_STEPS = [
  {
    step: 1,
    title: 'Key Depresses',
    detail: 'Your fingertip pushes the front of the wooden key lever downward, lifting its rear balance arm.',
  },
  {
    step: 2,
    title: 'Action Activates',
    detail: 'The whippen and jack pivot upward in milliseconds, accelerating the hammer shank toward the string.',
  },
  {
    step: 3,
    title: 'Hammer Strikes String',
    detail: 'The compressed wool-felt hammer strikes the taut steel string and rebounds instantly via escapement.',
  },
  {
    step: 4,
    title: 'String Vibrates',
    detail: 'The struck string oscillates at a precise pitch frequency (for Middle C4, 261.63 times per second).',
  },
  {
    step: 5,
    title: 'Soundboard Amplifies',
    detail: 'Vibrations travel through the wooden bridge into the large spruce soundboard, radiating rich acoustic tone.',
  },
  {
    step: 6,
    title: 'Sound Reaches Listener',
    detail: 'Acoustic pressure waves fill the room until you release the key and the felt damper silences the string.',
  },
];

const DIGITAL_STEPS = [
  {
    step: 1,
    title: 'Weighted Key Depresses',
    detail: 'The weighted key moves downward past dual or triple optical/rubber sensors beneath the keybed.',
  },
  {
    step: 2,
    title: 'Velocity Measured',
    detail: 'Sensors time the exact millisecond gap between top and bottom contact to calculate key speed (velocity).',
  },
  {
    step: 3,
    title: 'DSP Sound Lookup',
    detail: 'A digital audio processor selects or physically models the matching concert grand tone and harmonic decay.',
  },
  {
    step: 4,
    title: 'Stereo Output',
    detail: 'Audio is amplified cleanly through built-in speakers or sent silently to headphones—no physical strings needed.',
  },
];

const EXPERIMENT_KEYS = [
  { midi: 48, label: 'C3 (Low Bass)', freq: '130.81 Hz', stringDesc: 'Long, thick copper-wound steel string' },
  { midi: 60, label: 'C4 (Middle C)', freq: '261.63 Hz', stringDesc: 'Triple-strung medium steel strings' },
  { midi: 72, label: 'C5 (Treble)', freq: '523.25 Hz', stringDesc: 'Short, tight high-tension treble strings' },
];

export function SoundActionDiagram() {
  const [mode, setMode] = useState<'acoustic' | 'digital'>('acoustic');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedKey, setSelectedKey] = useState(EXPERIMENT_KEYS[1]);
  const [softTouch, setSoftTouch] = useState(false);

  const steps = mode === 'acoustic' ? ACOUSTIC_STEPS : DIGITAL_STEPS;

  const triggerExperiment = (keyItem = selectedKey, isSoft = softTouch) => {
    setSelectedKey(keyItem);
    setSoftTouch(isSoft);
    pianoAudio.playQuickNote(
      keyItem.midi,
      780,
      mode === 'acoustic' ? 'grand' : 'electric'
    );

    setIsAnimating(true);
    setActiveStep(1);
    const total = steps.length;
    for (let i = 2; i <= total; i++) {
      setTimeout(() => {
        setActiveStep(i);
        if (i === total) {
          setTimeout(() => setIsAnimating(false), 650);
        }
      }, (i - 1) * 320);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
        <div>
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Interactive Sound Production Diagram
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Strike a key below to watch the complete chain from finger press to audible pitch.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1">
          <button
            type="button"
            onClick={() => {
              setMode('acoustic');
              setActiveStep(1);
            }}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
              mode === 'acoustic'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            <Hammer className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
            Acoustic Hammer & String
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('digital');
              setActiveStep(1);
            }}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
              mode === 'digital'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            <Cpu className="h-3.5 w-3.5 text-[var(--accent-gold)]" />
            Digital Sensor Engine
          </button>
        </div>
      </div>

      {/* Cutaway Interactive SVG Visualization */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 rounded-xl border border-[var(--border-hairline)] bg-[#131210] p-4 text-[#F4F0E8]">
          <svg
            viewBox="0 0 600 270"
            className="w-full h-auto"
            role="img"
            aria-label="Interactive piano action mechanism cutaway"
          >
            {/* Soundboard / Chassis Backdrop */}
            <rect x="16" y="18" width="568" height="234" rx="8" fill="#1C1A17" stroke="#36322B" />

            {mode === 'acoustic' ? (
              <>
                {/* Spruce Soundboard */}
                <rect
                  x="330"
                  y="32"
                  width="235"
                  height="64"
                  rx="4"
                  fill={activeStep >= 5 ? '#6B4D1E' : '#3C2F1C'}
                  stroke="#A67B2E"
                  strokeWidth={activeStep >= 5 ? 2 : 1}
                />
                <text x="447" y="55" textAnchor="middle" fill="#F4F0E8" fontSize="11" fontWeight="600">
                  Spruce Soundboard
                </text>
                <text x="447" y="72" textAnchor="middle" fill="#D4AF37" fontSize="10">
                  {activeStep >= 5 ? 'Resonating & Amplifying' : 'Amplifies string vibration'}
                </text>

                {/* Steel String */}
                <line
                  x1="230"
                  y1={activeStep === 4 ? '114' : '116'}
                  x2="555"
                  y2={activeStep === 4 ? '118' : '116'}
                  stroke={activeStep >= 4 ? '#FDE68A' : '#A8A298'}
                  strokeWidth={activeStep >= 4 ? '3' : '2'}
                />
                <text x="447" y="108" textAnchor="middle" fill="#A8A298" fontSize="10">
                  Tuned Steel String ({selectedKey.freq})
                </text>

                {/* Felt Damper */}
                <g transform={`translate(0, ${activeStep >= 1 && activeStep <= 5 ? -14 : 0})`}>
                  <rect x="405" y="118" width="32" height="12" rx="2" fill="#8B2635" />
                  <text x="421" y="144" textAnchor="middle" fill="#A8A298" fontSize="9">
                    Damper
                  </text>
                </g>

                {/* Hammer + Shank */}
                <g
                  transform={
                    activeStep === 3
                      ? 'rotate(-24 275 182)'
                      : activeStep >= 2
                      ? 'rotate(-14 275 182)'
                      : 'rotate(0 275 182)'
                  }
                >
                  <line x1="275" y1="182" x2="322" y2="132" stroke="#D6C7B2" strokeWidth="4" />
                  <ellipse cx="326" cy="126" rx="13" ry="9" fill="#FAF7F2" stroke="#D4AF37" strokeWidth="1.5" />
                  <text x="275" y="150" fill="#D4AF37" fontSize="10">
                    Hammer
                  </text>
                </g>

                {/* Action Whippen / Jack */}
                <g transform={`translate(0, ${activeStep >= 2 ? -10 : 0})`}>
                  <rect x="235" y="176" width="54" height="16" rx="3" fill="#4A3F32" stroke="#8C734B" />
                  <text x="262" y="187" textAnchor="middle" fill="#F4F0E8" fontSize="9">
                    Action
                  </text>
                </g>

                {/* Sound Waves to Ear */}
                {activeStep >= 5 && (
                  <g stroke="#D4AF37" fill="none" strokeWidth="2" opacity="0.9">
                    <path d="M 525 140 Q 542 155 525 170" />
                    <path d="M 538 132 Q 560 155 538 178" />
                    <path d="M 552 124 Q 578 155 552 186" />
                  </g>
                )}
              </>
            ) : (
              <>
                {/* Digital Sensor & DSP Diagram */}
                <rect x="245" y="146" width="84" height="32" rx="4" fill="#27272F" stroke={activeStep >= 2 ? '#D4AF37' : '#52525B'} />
                <text x="287" y="166" textAnchor="middle" fill="#F4F0E8" fontSize="10" fontWeight="600">
                  Optical Sensors
                </text>

                <line x1="329" y1="162" x2="375" y2="162" stroke={activeStep >= 3 ? '#D4AF37' : '#52525B'} strokeWidth="2" />

                <rect x="375" y="128" width="110" height="68" rx="6" fill="#202028" stroke={activeStep >= 3 ? '#D4AF37' : '#52525B'} strokeWidth="1.5" />
                <text x="430" y="156" textAnchor="middle" fill="#F4F0E8" fontSize="11" fontWeight="600">
                  DSP Audio Engine
                </text>
                <text x="430" y="175" textAnchor="middle" fill="#D4AF37" fontSize="10">
                  {activeStep >= 3 ? `${selectedKey.freq} Synthesized` : 'Reads key velocity'}
                </text>

                <line x1="485" y1="162" x2="520" y2="162" stroke={activeStep >= 4 ? '#10B981' : '#52525B'} strokeWidth="2" />
                <circle cx="540" cy="162" r="22" fill="#1E2923" stroke={activeStep >= 4 ? '#10B981' : '#52525B'} strokeWidth="2" />
                <text x="540" y="166" textAnchor="middle" fill="#F4F0E8" fontSize="10">
                  Speaker
                </text>
              </>
            )}

            {/* Piano Key Lever (Common to both modes) */}
            <g transform={activeStep >= 1 && isAnimating ? 'rotate(2.2 180 212)' : 'rotate(0 180 212)'}>
              <rect x="42" y="198" width="215" height="22" rx="3" fill="#FAF7F2" stroke="#C8BEA9" />
              <circle cx="180" cy="209" r="4" fill="#A67B2E" />
              <text x="108" y="213" textAnchor="middle" fill="#181614" fontSize="10" fontWeight="600">
                Piano Key ({selectedKey.label})
              </text>
            </g>
            <text x="180" y="238" textAnchor="middle" fill="#A8A298" fontSize="10">
              Balance Pivot Point
            </text>
          </svg>

          {/* Interactive Experiment Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
            <div className="flex flex-wrap gap-2">
              {EXPERIMENT_KEYS.map((item) => (
                <button
                  key={item.midi}
                  type="button"
                  onClick={() => triggerExperiment(item, softTouch)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer',
                    selectedKey.midi === item.midi
                      ? 'bg-[#D4AF37] text-[#12100E]'
                      : 'bg-white/10 text-[#F4F0E8] hover:bg-white/20'
                  )}
                >
                  Strike {item.label}
                </button>
              ))}
            </div>
            <span className="font-mono-tabular text-[11px] text-[#D4AF37]">
              {selectedKey.stringDesc}
            </span>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="lg:col-span-5 space-y-2.5">
          {steps.map((s) => {
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                className={cn(
                  'w-full text-left rounded-lg border p-3.5 transition-colors cursor-pointer',
                  isActive
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {s.step}. {s.title}
                  </span>
                  {isActive && (
                    <span className="text-[11px] font-semibold text-[var(--accent-gold)]">
                      Active Stage
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {s.detail}
                </p>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => triggerExperiment(selectedKey, softTouch)}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-gold)] px-4 py-2.5 text-sm font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors cursor-pointer"
          >
            <Volume2 className="h-4 w-4" />
            Demonstrate Full {mode === 'acoustic' ? 'Acoustic' : 'Digital'} Action
          </button>
        </div>
      </div>
    </div>
  );
}
