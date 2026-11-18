export type ThemeMode = 'dark' | 'light';

export type PianoVoice = 'grand' | 'electric' | 'harpsichord';

export type VirtualPianoMode =
  | 'free'
  | 'guided-notes'
  | 'scale-practice'
  | 'chord-practice'
  | 'melody-practice';

export interface PianoKeyData {
  midi: number;
  note: string; // e.g. "C4", "F#3"
  pitchClass: string; // e.g. "C", "F#"
  enharmonic?: string; // e.g. "Gb"
  octave: number;
  isBlack: boolean;
  frequency: number;
  whiteIndex: number; // 0..51 for white keys, or nearest left white key index for black keys
  keyboardShortcut?: string;
}

export interface ScaleDefinition {
  id: string;
  name: string;
  root: string;
  formula: string;
  intervals: number[]; // semitones from root
  notes: string[]; // pitch classes
  midiSample: number[]; // 1-octave sample starting around C4/G3/F3
  fingeringsRH: string[];
  description: string;
}

export interface ChordDefinition {
  id: string;
  name: string;
  quality: 'Major' | 'Minor';
  root: string;
  notes: string[]; // pitch classes
  midiNotes: number[]; // playable voicing in middle register
  formula: string;
  mood: string;
}

export interface MelodyNoteStep {
  midi: number;
  note: string;
  beats: number;
  lyricOrLabel?: string;
  finger?: number;
}

export interface MelodyDefinition {
  id: string;
  title: string;
  composer: string;
  difficulty: 'Absolute Beginner' | 'Beginner' | 'Early Intermediate';
  bpm: number;
  timeSignature: '4/4' | '3/4';
  description: string;
  steps: MelodyNoteStep[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  id: string; // e.g. "1.1"
  moduleId: 'intro' | 'keyboard' | 'posture' | 'theory';
  numberLabel: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  objectives: string[];
  sections: {
    heading: string;
    body: string[];
    keyTakeaway?: string;
  }[];
  terminology: { term: string; definition: string }[];
  summary: string;
  knowledgeCheck: QuizQuestion[];
}

export interface TimelineEvent {
  id: string;
  period: string;
  isApproximate: boolean;
  title: string;
  figureOrOrigin: string;
  background: string;
  innovations: string[];
  whyItMattered: string;
  imageUrl?: string;
  imageAlt: string;
  demoVoice: PianoVoice;
  demoMidiNotes: number[];
}

export interface PianoTypeItem {
  id: string;
  name: string;
  keyCount: string;
  mechanism: string;
  footprint: string;
  idealFor: string;
  features: string[];
  description: string;
  imageUrl?: string;
  imageAlt: string;
}

export interface PianistProfile {
  id: string;
  name: string;
  era: string;
  lifespan: string;
  signatureContribution: string;
  biography: string;
  listeningTip: string;
  sampleNotes: number[];
}

export interface TutorialChapter {
  id: string; // "ch-1".."ch-6"
  chapterNumber: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  teacherPersona: string;
  objectives: string[];
  teacherExplanation: string[];
  visualDemoLabel: string;
  visualDemoNotes: number[];
  interactiveExercise: {
    title: string;
    instruction: string;
    targetNotes: number[]; // ordered MIDI notes to press
    mode: 'sequence' | 'chord' | 'single';
  };
  guidedPractice: {
    title: string;
    steps: string[];
    melodyId?: string;
  };
  independentPractice: {
    title: string;
    prompt: string;
    checklist: string[];
  };
  summary: string;
  knowledgeCheck: QuizQuestion[];
}

export type AssessmentQuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'identify-key'
  | 'play-sequence';

export interface AssessmentQuestion {
  id: string;
  level: 1 | 2 | 3;
  type: AssessmentQuestionType;
  topic: string;
  prompt: string;
  instructionHint?: string;
  options?: string[];
  correctOptionIndex?: number;
  targetMidi?: number; // for identify-key (accepts pitch class or exact MIDI depending on allowAnyOctave)
  allowAnyOctave?: boolean;
  targetSequence?: number[]; // for play-sequence (e.g. C major scale or triad)
  requireSimultaneous?: boolean; // true for chord tasks
  explanation: string;
}

export interface AssessmentAttempt {
  id: string;
  level: 1 | 2 | 3;
  scorePercent: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  timestamp: string;
  results: {
    questionId: string;
    correct: boolean;
    userAnswerLabel: string;
    correctAnswerLabel: string;
  }[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  criteria: string;
  xpBonus: number;
}
