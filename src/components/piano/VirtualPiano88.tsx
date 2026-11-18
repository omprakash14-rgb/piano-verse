import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Disc3 } from 'lucide-react';
import {
  KEYBOARD_SHORTCUT_TO_OFFSET,
  PIANO_88_KEYS,
  getKeyByMidi,
} from '@/src/data/piano-notes';
import { pianoAudio } from '@/src/lib/audio/pianoAudio';
import { useAcademyStore } from '@/src/store/useAcademyStore';
import { PianoKeyData, PianoVoice } from '@/src/types/academy';
import { cn } from '@/src/lib/utils';

export interface VirtualPianoProps {
  /** 'full88' renders all 88 keys with scroll + jump buttons; 'focused' renders a slice around C3-C5 */
  variant?: 'full88' | 'focused';
  /** Optional custom MIDI range for focused view [minMidi, maxMidi] */
  midiRange?: [number, number];
  /** Notes softly highlighted (e.g. selected scale or chord notes) */
  highlightedMidi?: number[];
  /** Specific next target note(s) pulsing/bordered prominently for guided exercises */
  targetMidi?: number[];
  /** Notes marked as correctly matched */
  matchedMidi?: number[];
  /** Notes briefly marked incorrect */
  errorMidi?: number[];
  /** Callback fired whenever the user strikes a key */
  onNotePlay?: (key: PianoKeyData) => void;
  /** Callback fired whenever the user releases a key */
  onNoteRelease?: (key: PianoKeyData) => void;
  /** Hide top control toolbar for compact inline embeds */
  compactControls?: boolean;
  /** Enable computer keyboard shortcuts (disable if multiple pianos mounted simultaneously) */
  enableKeyboardInput?: boolean;
  /** Initial note label mode */
  defaultLabels?: 'all' | 'c-only' | 'none';
}

const WHITE_KEY_WIDTH_PX = 42;
const COMPACT_WHITE_KEY_WIDTH_PX = 38;

export function VirtualPiano88({
  variant = 'full88',
  midiRange = [48, 76], // C3 to E5 for focused embeds
  highlightedMidi = [],
  targetMidi = [],
  matchedMidi = [],
  errorMidi = [],
  onNotePlay,
  onNoteRelease,
  compactControls = false,
  enableKeyboardInput = true,
  defaultLabels = 'c-only',
}: VirtualPianoProps) {
  const registerNotePlayed = useAcademyStore((s) => s.registerNotePlayed);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const [labelMode, setLabelMode] = useState<'all' | 'c-only' | 'none'>(defaultLabels);
  const [keyboardBaseOctave, setKeyboardBaseOctave] = useState<number>(4); // C4 = MIDI 60
  const [voice, setVoice] = useState<PianoVoice>(pianoAudio.getVoice());
  const [sustain, setSustain] = useState<boolean>(pianoAudio.getSustain());
  const [muted, setMuted] = useState<boolean>(pianoAudio.isMuted());
  const [volume, setVolume] = useState<number>(pianoAudio.getVolume());
  const [audioReady, setAudioReady] = useState<boolean>(pianoAudio.isReady());
  const [lastPlayedKey, setLastPlayedKey] = useState<PianoKeyData | null>(null);

  const keysToRender = useMemo(() => {
    if (variant === 'full88') return PIANO_88_KEYS;
    return PIANO_88_KEYS.filter((k) => k.midi >= midiRange[0] && k.midi <= midiRange[1]);
  }, [variant, midiRange]);

  const whiteKeys = useMemo(() => keysToRender.filter((k) => !k.isBlack), [keysToRender]);
  const blackKeys = useMemo(() => keysToRender.filter((k) => k.isBlack), [keysToRender]);

  // Local white-key index lookup so focused subsets align accurately
  const whiteIndexMap = useMemo(() => {
    const map = new Map<number, number>();
    whiteKeys.forEach((wk, idx) => map.set(wk.midi, idx));
    return map;
  }, [whiteKeys]);

  const whiteWidth = variant === 'full88' ? WHITE_KEY_WIDTH_PX : COMPACT_WHITE_KEY_WIDTH_PX;
  const blackWidth = Math.round(whiteWidth * 0.62);
  const totalWidth = whiteKeys.length * whiteWidth;

  useEffect(() => {
    const unsub = pianoAudio.subscribe(() => {
      setVoice(pianoAudio.getVoice());
      setSustain(pianoAudio.getSustain());
      setMuted(pianoAudio.isMuted());
      setVolume(pianoAudio.getVolume());
      setAudioReady(pianoAudio.isReady());
    });
    return unsub;
  }, []);

  const scrollToMidi = useCallback(
    (targetMidiNote: number, behavior: ScrollBehavior = 'smooth') => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const key = getKeyByMidi(targetMidiNote);
      if (!key) return;
      const idx = whiteIndexMap.get(key.isBlack ? key.midi - 1 : key.midi) ?? key.whiteIndex;
      const targetCenter = idx * whiteWidth - container.clientWidth / 2 + whiteWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetCenter),
        behavior,
      });
    },
    [whiteIndexMap, whiteWidth]
  );

  // Center around Middle C (C4 = 60) on initial mount for 88-key view
  useEffect(() => {
    if (variant === 'full88') {
      const t = setTimeout(() => scrollToMidi(60, 'auto'), 60);
      return () => clearTimeout(t);
    }
  }, [variant, scrollToMidi]);

  const triggerPlay = useCallback(
    (key: PianoKeyData) => {
      pianoAudio.playNote(key.midi);
      setAudioReady(true);
      setLastPlayedKey(key);
      registerNotePlayed();
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.add(key.midi);
        return next;
      });
      onNotePlay?.(key);
    },
    [onNotePlay, registerNotePlayed]
  );

  const triggerRelease = useCallback(
    (key: PianoKeyData) => {
      pianoAudio.stopNote(key.midi);
      setActiveNotes((prev) => {
        if (!prev.has(key.midi)) return prev;
        const next = new Set(prev);
        next.delete(key.midi);
        return next;
      });
      onNoteRelease?.(key);
    },
    [onNoteRelease]
  );

  // Computer keyboard playback
  useEffect(() => {
    if (!enableKeyboardInput) return;

    const downKeys = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!e.repeat) pianoAudio.setSustain(true);
        return;
      }

      const lower = e.key.toLowerCase();
      if (lower === 'z' && !e.repeat) {
        setKeyboardBaseOctave((o) => Math.max(1, o - 1));
        return;
      }
      if (lower === 'x' && !e.repeat) {
        setKeyboardBaseOctave((o) => Math.min(6, o + 1));
        return;
      }

      const offset = KEYBOARD_SHORTCUT_TO_OFFSET[lower];
      if (offset === undefined || downKeys.has(lower)) return;
      downKeys.add(lower);

      const baseC = (keyboardBaseOctave + 1) * 12; // C4 = 60
      const midi = baseC + offset;
      const keyObj = getKeyByMidi(midi);
      if (keyObj) {
        triggerPlay(keyObj);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        pianoAudio.setSustain(false);
        return;
      }
      const lower = e.key.toLowerCase();
      if (!downKeys.has(lower)) return;
      downKeys.delete(lower);

      const offset = KEYBOARD_SHORTCUT_TO_OFFSET[lower];
      if (offset === undefined) return;
      const baseC = (keyboardBaseOctave + 1) * 12;
      const keyObj = getKeyByMidi(baseC + offset);
      if (keyObj) {
        triggerRelease(keyObj);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableKeyboardInput, keyboardBaseOctave, triggerPlay, triggerRelease]);

  // Reverse shortcut lookup for active keyboardBaseOctave
  const shortcutForMidi = useMemo(() => {
    const map = new Map<number, string>();
    const baseC = (keyboardBaseOctave + 1) * 12;
    Object.entries(KEYBOARD_SHORTCUT_TO_OFFSET).forEach(([char, offset]) => {
      map.set(baseC + offset, char.toUpperCase());
    });
    return map;
  }, [keyboardBaseOctave]);

  const highlightedSet = useMemo(() => new Set(highlightedMidi), [highlightedMidi]);
  const targetSet = useMemo(() => new Set(targetMidi), [targetMidi]);
  const matchedSet = useMemo(() => new Set(matchedMidi), [matchedMidi]);
  const errorSet = useMemo(() => new Set(errorMidi), [errorMidi]);

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
      {/* Studio Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {!audioReady ? (
            <button
              type="button"
              onClick={() => pianoAudio.ensureContext()}
              className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent-gold)] px-3 py-1.5 text-xs font-semibold text-[#12100E] hover:bg-[var(--accent-gold-hover)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Volume2 className="h-3.5 w-3.5" />
              Enable Audio
            </button>
          ) : (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              Audio Ready
            </span>
          )}

          {lastPlayedKey ? (
            <span className="font-mono-tabular text-xs text-[var(--text-secondary)] whitespace-nowrap">
              Note: <strong className="text-[var(--text-primary)]">{lastPlayedKey.note}</strong>
              {lastPlayedKey.enharmonic ? ` (${lastPlayedKey.enharmonic}${lastPlayedKey.octave})` : ''} · {lastPlayedKey.frequency} Hz
            </span>
          ) : (
            <span className="text-xs text-[var(--text-secondary)]">
              Click keys or press A–L on your keyboard
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {!compactControls && (
            <>
              {/* Voice selector */}
              <div className="flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-0.5">
                {(['grand', 'electric', 'harpsichord'] as PianoVoice[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => pianoAudio.setVoice(v)}
                    className={cn(
                      'rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap shrink-0',
                      voice === v
                        ? 'bg-[var(--accent-gold)] text-[#12100E]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    {v === 'grand' ? 'Grand' : v === 'electric' ? 'Electric' : 'Harpsichord'}
                  </button>
                ))}
              </div>

              {/* Sustain Pedal */}
              <button
                type="button"
                onClick={() => pianoAudio.setSustain(!sustain)}
                aria-pressed={sustain}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0',
                  sustain
                    ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                <Disc3 className="h-3.5 w-3.5" />
                Sustain {sustain ? 'On' : 'Off'}
              </button>
            </>
          )}

          {/* Labels toggle */}
          <select
            aria-label="Key label mode"
            value={labelMode}
            onChange={(e) => setLabelMode(e.target.value as 'all' | 'c-only' | 'none')}
            className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] cursor-pointer"
          >
            <option value="c-only">Labels: C Only</option>
            <option value="all">Labels: All Keys</option>
            <option value="none">Labels: Off</option>
          </select>

          {/* Computer keyboard octave */}
          {enableKeyboardInput && !compactControls && (
            <div className="flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2 py-1 text-xs">
              <span className="text-[var(--text-secondary)] whitespace-nowrap">PC Keys:</span>
              <button
                type="button"
                onClick={() => setKeyboardBaseOctave((o) => Math.max(1, o - 1))}
                aria-label="Shift keyboard octave down"
                className="p-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono-tabular font-semibold text-[var(--text-primary)] w-6 text-center">
                C{keyboardBaseOctave}
              </span>
              <button
                type="button"
                onClick={() => setKeyboardBaseOctave((o) => Math.min(6, o + 1))}
                aria-label="Shift keyboard octave up"
                className="p-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Volume & Mute */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => pianoAudio.setMuted(!muted)}
              aria-label={muted ? 'Unmute piano' : 'Mute piano'}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
            {!compactControls && (
              <input
                type="range"
                aria-label="Piano volume"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (muted && val > 0) pianoAudio.setMuted(false);
                  pianoAudio.setVolume(val);
                }}
                className="w-16 accent-[var(--accent-gold)] cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {/* Quick Octave Jump Bar for 88-Key Scrollable View */}
      {variant === 'full88' && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 text-xs">
          <span className="text-[var(--text-secondary)]">
            Full 88-Key Compass (A0–C8 · 52 White · 36 Black)
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[var(--text-secondary)] mr-1">Jump to:</span>
            {[
              { label: 'A0 Bass', midi: 21 },
              { label: 'C2 Low', midi: 36 },
              { label: 'C3', midi: 48 },
              { label: 'C4 Middle C', midi: 60 },
              { label: 'C5', midi: 72 },
              { label: 'C6 Treble', midi: 84 },
              { label: 'C8 High', midi: 108 },
            ].map((anchor) => (
              <button
                key={anchor.midi}
                type="button"
                onClick={() => scrollToMidi(anchor.midi)}
                className={cn(
                  'rounded px-2 py-1 font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0',
                  anchor.midi === 60
                    ? 'bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] font-semibold'
                    : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                {anchor.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keybed Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="piano-scroll relative w-full overflow-x-auto bg-[#0D0D0F] px-3 pt-2 pb-4 select-none touch-pan-x"
      >
        <div
          className="relative mx-auto"
          style={{
            width: `${totalWidth}px`,
            height: variant === 'full88' ? '208px' : '188px',
          }}
        >
          {/* Felt Red Keybed Strip */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-[#691717] to-[#3B0B0B] z-10 rounded-t-sm" />

          {/* White Keys */}
          <div className="relative flex h-full pt-1.5">
            {whiteKeys.map((key) => {
              const isPressed = activeNotes.has(key.midi);
              const isTarget = targetSet.has(key.midi);
              const isMatched = matchedSet.has(key.midi);
              const isHighlighted = highlightedSet.has(key.midi);
              const isError = errorSet.has(key.midi);
              const isMiddleC = key.midi === 60;
              const shortcut = enableKeyboardInput ? shortcutForMidi.get(key.midi) : undefined;

              const showNoteLabel =
                labelMode === 'all' || (labelMode === 'c-only' && key.pitchClass === 'C');

              return (
                <button
                  key={key.midi}
                  type="button"
                  data-midi={key.midi}
                  aria-label={`Piano key ${key.note}`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    triggerPlay(key);
                  }}
                  onPointerUp={() => triggerRelease(key)}
                  onPointerLeave={() => triggerRelease(key)}
                  onPointerCancel={() => triggerRelease(key)}
                  style={{ width: `${whiteWidth}px` }}
                  className={cn(
                    'relative h-full shrink-0 rounded-b-md border border-neutral-300 transition-transform duration-75 flex flex-col items-center justify-end pb-2.5 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] cursor-pointer',
                    isPressed
                      ? 'translate-y-[2px] bg-[#E8DFCE] shadow-inner'
                      : isError
                      ? 'bg-red-200 shadow-sm'
                      : isMatched
                      ? 'bg-emerald-200 shadow-sm'
                      : isTarget
                      ? 'bg-[#F5E0A3] ring-2 ring-inset ring-[#B8860B]'
                      : isHighlighted
                      ? 'bg-[#EFE6D2]'
                      : 'bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F0] to-[#EAE3D4] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.08)] hover:from-[#FFFFFF] hover:to-[#F3ECD8]'
                  )}
                >
                  {isMiddleC && (
                    <span className="mb-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" title="Middle C" />
                  )}
                  {shortcut && (
                    <span className="mb-1 rounded bg-black/10 px-1 font-mono-tabular text-[10px] font-semibold text-neutral-700">
                      {shortcut}
                    </span>
                  )}
                  {showNoteLabel && (
                    <span
                      className={cn(
                        'font-mono-tabular text-[11px] font-semibold leading-none',
                        isMiddleC ? 'text-[#8E6518]' : 'text-neutral-600'
                      )}
                    >
                      {key.note}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Black Keys Overlaid Accurately */}
          {blackKeys.map((key) => {
            // Find the white key immediately below (midi - 1) to anchor left position
            const leftWhiteIdx = whiteIndexMap.get(key.midi - 1);
            if (leftWhiteIdx === undefined) return null;

            const leftPx = (leftWhiteIdx + 1) * whiteWidth - blackWidth / 2;
            const isPressed = activeNotes.has(key.midi);
            const isTarget = targetSet.has(key.midi);
            const isMatched = matchedSet.has(key.midi);
            const isHighlighted = highlightedSet.has(key.midi);
            const isError = errorSet.has(key.midi);
            const shortcut = enableKeyboardInput ? shortcutForMidi.get(key.midi) : undefined;

            return (
              <button
                key={key.midi}
                type="button"
                data-midi={key.midi}
                aria-label={`Piano key ${key.note} / ${key.enharmonic}${key.octave}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  triggerPlay(key);
                }}
                onPointerUp={() => triggerRelease(key)}
                onPointerLeave={() => triggerRelease(key)}
                onPointerCancel={() => triggerRelease(key)}
                style={{
                  left: `${leftPx}px`,
                  width: `${blackWidth}px`,
                  height: variant === 'full88' ? '128px' : '116px',
                }}
                className={cn(
                  'absolute top-1.5 z-20 rounded-b-md border border-neutral-900 transition-transform duration-75 flex flex-col items-center justify-end pb-2 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] cursor-pointer',
                  isPressed
                    ? 'translate-y-[2px] bg-[#2D2A24] shadow-inner'
                    : isError
                    ? 'bg-red-700 text-white'
                    : isMatched
                    ? 'bg-emerald-700 text-white'
                    : isTarget
                    ? 'bg-[#B8860B] text-white ring-2 ring-[#FDE68A]'
                    : isHighlighted
                    ? 'bg-[#4E4229] text-[#FDE68A]'
                    : 'bg-gradient-to-b from-[#2A2A2E] via-[#17171A] to-[#0D0D0F] text-neutral-300 shadow-[0_4px_8px_rgba(0,0,0,0.55)] hover:from-[#34343A]'
                )}
              >
                {shortcut && (
                  <span className="mb-0.5 font-mono-tabular text-[9px] font-semibold opacity-80">
                    {shortcut}
                  </span>
                )}
                {labelMode === 'all' && (
                  <span className="font-mono-tabular text-[9px] font-medium leading-tight opacity-90">
                    {key.pitchClass}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
