import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { cn } from '@/src/lib/utils';

const STAFF_NOTES = [
  { label: 'C4 (Middle C)', clef: 'Treble · Ledger Line', midi: 60, y: 122 },
  { label: 'D4', clef: 'Treble · Below Line 1', midi: 62, y: 112 },
  { label: 'E4', clef: 'Treble · Line 1', midi: 64, y: 102 },
  { label: 'F4', clef: 'Treble · Space 1', midi: 65, y: 92 },
  { label: 'G4', clef: 'Treble · Line 2 (G Line)', midi: 67, y: 82 },
  { label: 'A4', clef: 'Treble · Space 2', midi: 69, y: 72 },
  { label: 'B4', clef: 'Treble · Line 3', midi: 71, y: 62 },
  { label: 'C5', clef: 'Treble · Space 3', midi: 72, y: 52 },
];

const DURATIONS = [
  { id: 'whole', name: 'Whole Note', beats: 4, ratio: '100% of 4/4 bar', durationMs: 1400 },
  { id: 'half', name: 'Half Note', beats: 2, ratio: '2 beats in 4/4', durationMs: 750 },
  { id: 'quarter', name: 'Quarter Note', beats: 1, ratio: '1 beat in 4/4', durationMs: 400 },
  { id: 'eighth', name: 'Eighth Note', beats: 0.5, ratio: '1/2 beat in 4/4', durationMs: 220 },
  { id: 'sixteenth', name: 'Sixteenth Note', beats: 0.25, ratio: '1/4 beat in 4/4', durationMs: 120 },
];

export function NotationTheoryLab() {
  const [selectedNote, setSelectedNote] = useState(STAFF_NOTES[0]);
  const [activeDuration, setActiveDuration] = useState<string>('quarter');

  const playStaffNote = (item: (typeof STAFF_NOTES)[number]) => {
    setSelectedNote(item);
    pianoAudio.playQuickNote(item.midi, 550);
  };

  const playDurationDemo = (dur: (typeof DURATIONS)[number]) => {
    setActiveDuration(dur.id);
    const repeatCount = dur.id === 'whole' ? 1 : dur.id === 'half' ? 2 : dur.id === 'quarter' ? 4 : 4;
    const notes = Array(repeatCount).fill(60);
    pianoAudio.playSequence(notes, dur.durationMs);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Treble & Grand Staff Explorer */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Interactive Musical Staff (5 Lines & 4 Spaces)
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Click any note head on the Treble Staff to hear its pitch and read its staff location.
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono-tabular text-sm font-semibold text-[var(--accent-gold)]">
              {selectedNote.label}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{selectedNote.clef}</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-[var(--border-hairline)] bg-[#FAF7F2] p-4 text-[#181614]">
          <svg viewBox="0 0 640 165" className="w-full h-auto" role="img" aria-label="Interactive five-line treble staff">
            {/* Five staff lines */}
            {[42, 62, 82, 102, 122].map((y, idx) => {
              const isLedgerOnly = idx === 4; // y=122 is Middle C ledger zone below line 1 (102)
              if (isLedgerOnly) return null;
              return (
                <line key={y} x1="45" y1={y} x2="610" y2={y} stroke="#44403C" strokeWidth="1.5" />
              );
            })}
            {/* Bottom Line 1 (E4) */}
            <line x1="45" y1="102" x2="610" y2="102" stroke="#44403C" strokeWidth="1.5" />
            {/* Top Line 5 (F5) */}
            <line x1="45" y1="22" x2="610" y2="22" stroke="#44403C" strokeWidth="1.5" />

            {/* Clef Label */}
            <text x="64" y="88" fontSize="54" fontFamily="serif" fill="#181614">
              𝄞
            </text>

            {/* Clickable Notes */}
            {STAFF_NOTES.map((n, idx) => {
              const x = 155 + idx * 58;
              const isActive = selectedNote.midi === n.midi;
              return (
                <g
                  key={n.midi}
                  className="cursor-pointer"
                  onClick={() => playStaffNote(n)}
                >
                  {n.midi === 60 && (
                    <line x1={x - 16} y1={n.y} x2={x + 16} y2={n.y} stroke="#181614" strokeWidth="1.8" />
                  )}
                  <ellipse
                    cx={x}
                    cy={n.y}
                    rx="11"
                    ry="8"
                    transform={`rotate(-18 ${x} ${n.y})`}
                    fill={isActive ? '#A67B2E' : '#181614'}
                  />
                  <line x1={x + 10} y1={n.y} x2={x + 10} y2={n.y - 38} stroke={isActive ? '#A67B2E' : '#181614'} strokeWidth="2" />
                  <text
                    x={x}
                    y="150"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill={isActive ? '#A67B2E' : '#58524A'}
                  >
                    {n.label.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
          <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-3.5">
            <strong className="text-[var(--text-primary)]">Treble Clef Lines (bottom to top):</strong> E – G – B – D – F
            <span className="block mt-1">Spaces (bottom to top): F – A – C – E</span>
          </div>
          <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-3.5">
            <strong className="text-[var(--text-primary)]">Bass Clef Lines (bottom to top):</strong> G – B – D – F – A
            <span className="block mt-1">Spaces (bottom to top): A – C – E – G</span>
          </div>
        </div>
      </div>

      {/* Note Durations Interactive Cards */}
      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <div className="border-b border-[var(--border-hairline)] pb-4">
          <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Note Durations (Click to Hear Pulse)
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Each rhythmic value halves the previous duration in standard 4/4 time.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {DURATIONS.map((dur) => {
            const isSelected = activeDuration === dur.id;
            return (
              <button
                key={dur.id}
                type="button"
                onClick={() => playDurationDemo(dur)}
                className={cn(
                  'flex flex-col items-center rounded-xl border p-4 text-center transition-colors cursor-pointer',
                  isSelected
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)]'
                )}
              >
                <svg viewBox="0 0 60 64" className="h-14 w-14 text-[var(--text-primary)]">
                  {dur.id === 'whole' && (
                    <ellipse cx="30" cy="38" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="3" />
                  )}
                  {dur.id === 'half' && (
                    <>
                      <ellipse cx="24" cy="46" rx="10" ry="7" fill="none" stroke="currentColor" strokeWidth="2.8" transform="rotate(-18 24 46)" />
                      <line x1="33" y1="44" x2="33" y2="12" stroke="currentColor" strokeWidth="2.8" />
                    </>
                  )}
                  {dur.id === 'quarter' && (
                    <>
                      <ellipse cx="24" cy="46" rx="10" ry="7" fill="currentColor" transform="rotate(-18 24 46)" />
                      <line x1="33" y1="44" x2="33" y2="12" stroke="currentColor" strokeWidth="2.8" />
                    </>
                  )}
                  {dur.id === 'eighth' && (
                    <>
                      <ellipse cx="22" cy="46" rx="10" ry="7" fill="currentColor" transform="rotate(-18 22 46)" />
                      <line x1="31" y1="44" x2="31" y2="12" stroke="currentColor" strokeWidth="2.8" />
                      <path d="M 31 12 Q 46 20 42 32" fill="none" stroke="currentColor" strokeWidth="2.8" />
                    </>
                  )}
                  {dur.id === 'sixteenth' && (
                    <>
                      <ellipse cx="22" cy="46" rx="10" ry="7" fill="currentColor" transform="rotate(-18 22 46)" />
                      <line x1="31" y1="44" x2="31" y2="12" stroke="currentColor" strokeWidth="2.8" />
                      <path d="M 31 12 Q 46 18 42 28" fill="none" stroke="currentColor" strokeWidth="2.6" />
                      <path d="M 31 21 Q 46 27 42 37" fill="none" stroke="currentColor" strokeWidth="2.6" />
                    </>
                  )}
                </svg>
                <span className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{dur.name}</span>
                <span className="mt-0.5 font-mono-tabular text-xs font-semibold text-[var(--accent-gold)]">
                  {dur.beats} {dur.beats === 1 ? 'beat' : 'beats'}
                </span>
                <span className="mt-1 text-[11px] text-[var(--text-secondary)]">{dur.ratio}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-primary)]">
                  <Volume2 className="h-3 w-3 text-[var(--accent-gold)]" />
                  Hear
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
