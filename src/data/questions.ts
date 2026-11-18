import { AssessmentQuestion } from '@/src/types/academy';

export const LEVEL_1_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'l1-1',
    level: 1,
    type: 'multiple-choice',
    topic: 'Piano History',
    prompt: 'Who invented the earliest hammer-action piano (pianoforte) around the year 1700?',
    options: [
      'Wolfgang Amadeus Mozart',
      'Bartolomeo Cristofori',
      'Frédéric Chopin',
      'Gottfried Silbermann',
    ],
    correctOptionIndex: 1,
    explanation:
      'Bartolomeo Cristofori created the gravicembalo col piano e forte in Florence around 1700 using an escapement hammer action.',
  },
  {
    id: 'l1-2',
    level: 1,
    type: 'multiple-choice',
    topic: 'Piano Components',
    prompt: 'Which wooden component amplifies the vibrations of the strings inside an acoustic piano?',
    options: ['The soundboard', 'The damper rail', 'The fallboard', 'The keyslip'],
    correctOptionIndex: 0,
    explanation:
      'The large spruce soundboard resonates with the vibrating strings to project rich acoustic volume.',
  },
  {
    id: 'l1-3',
    level: 1,
    type: 'multiple-choice',
    topic: 'Keyboard Structure',
    prompt: 'How many total keys, white keys, and black keys are on a standard full-size piano?',
    options: [
      '76 total (46 white, 30 black)',
      '88 total (52 white, 36 black)',
      '88 total (50 white, 38 black)',
      '92 total (54 white, 38 black)',
    ],
    correctOptionIndex: 1,
    explanation:
      'A standard full-size piano has 88 keys: 52 white natural keys and 36 raised black keys.',
  },
  {
    id: 'l1-4',
    level: 1,
    type: 'identify-key',
    topic: 'Middle C Landmark',
    prompt: 'Interactive Task: Locate and click Middle C (C4) on the piano keyboard below.',
    instructionHint: 'Find the group of two black keys near the center of the keyboard (labeled C4).',
    targetMidi: 60,
    allowAnyOctave: false,
    explanation:
      'Middle C (C4) sits immediately to the left of the central two-black-key cluster.',
  },
  {
    id: 'l1-5',
    level: 1,
    type: 'true-false',
    topic: 'White & Black Keys',
    prompt: 'True or False: The white key immediately to the left of every group of three black keys is always F.',
    options: ['True', 'False'],
    correctOptionIndex: 0,
    explanation:
      'True! Every 2-black-key group points to C on its left, and every 3-black-key group points to F on its left.',
  },
  {
    id: 'l1-6',
    level: 1,
    type: 'identify-key',
    topic: 'Musical Notes',
    prompt: 'Interactive Task: Click any G key on the piano keyboard below.',
    instructionHint: 'Step up one white key to the right from F (just after the first black key in a 3-black-key group).',
    targetMidi: 67,
    allowAnyOctave: true,
    explanation:
      'G sits inside the group of three black keys—directly between the first and second black keys.',
  },
  {
    id: 'l1-7',
    level: 1,
    type: 'multiple-choice',
    topic: 'Sitting Posture',
    prompt: 'When seated at the correct bench height, how should your forearms be positioned?',
    options: [
      'Sloped downward steeply toward your lap',
      'Roughly parallel to the floor and level with the white keys',
      'Pressed tightly against your sides',
      'Held high above shoulder height',
    ],
    correctOptionIndex: 1,
    explanation:
      'Level forearms align wrists and knuckles naturally with the key surface and prevent tension.',
  },
  {
    id: 'l1-8',
    level: 1,
    type: 'multiple-choice',
    topic: 'Finger Numbering',
    prompt: 'In standard piano finger numbering, which finger is always numbered "1" on both hands?',
    options: ['Index finger', 'Middle finger', 'Thumb', 'Little finger'],
    correctOptionIndex: 2,
    explanation:
      'Both right and left hands use mirror numbering starting with Thumb = 1 through Little finger = 5.',
  },
  {
    id: 'l1-9',
    level: 1,
    type: 'true-false',
    topic: 'Acoustic vs. Digital',
    prompt: 'True or False: Digital pianos generate sound through physical felt hammers striking steel strings.',
    options: ['True', 'False'],
    correctOptionIndex: 1,
    explanation:
      'False. Acoustic pianos strike steel strings with felt hammers; digital pianos use key sensors and electronic sound synthesis/sampling.',
  },
  {
    id: 'l1-10',
    level: 1,
    type: 'identify-key',
    topic: 'Musical Notes',
    prompt: 'Interactive Task: Locate and click any E key on the piano keyboard below.',
    instructionHint: 'E is the white key immediately to the right of any 2-black-key cluster.',
    targetMidi: 64,
    allowAnyOctave: true,
    explanation:
      'C–D–E surround the 2-black-key group, placing E right beside the second black key.',
  },
];

export const LEVEL_2_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'l2-1',
    level: 2,
    type: 'identify-key',
    topic: 'Sharps & Flats',
    prompt: 'Interactive Task: Play F#4 (F sharp in octave 4) on the keyboard.',
    instructionHint: 'Locate F4 (left of the central 3-black-key cluster) and move one half step to the right.',
    targetMidi: 66,
    allowAnyOctave: false,
    explanation:
      'F#4 is the leftmost black key in the octave-4 group of three black keys.',
  },
  {
    id: 'l2-2',
    level: 2,
    type: 'multiple-choice',
    topic: 'Enharmonic Equivalents',
    prompt: 'Which note name shares the exact same piano key as Bb (B flat)?',
    options: ['A# (A sharp)', 'C# (C sharp)', 'Ab (A flat)', 'B# (B sharp)'],
    correctOptionIndex: 0,
    explanation:
      'One half step above A is A#, which is the same black key one half step below B (Bb).',
  },
  {
    id: 'l2-3',
    level: 2,
    type: 'multiple-choice',
    topic: 'Intervals & Steps',
    prompt: 'Which pair of white keys forms a natural half step with no black key between them?',
    options: ['C to D', 'F to G', 'E to F', 'A to B'],
    correctOptionIndex: 2,
    explanation:
      'E–F and B–C are the two natural half-step pairs on the piano keyboard without an intervening black key.',
  },
  {
    id: 'l2-4',
    level: 2,
    type: 'identify-key',
    topic: 'Octaves',
    prompt: 'Interactive Task: Click C5 — the C exactly one octave above Middle C (C4).',
    instructionHint: 'Find C4, then move eight white keys to the right to the next 2-black-key cluster.',
    targetMidi: 72,
    allowAnyOctave: false,
    explanation:
      'C5 sits 12 half steps (one full octave) above Middle C (C4).',
  },
  {
    id: 'l2-5',
    level: 2,
    type: 'multiple-choice',
    topic: 'Musical Notation',
    prompt: 'Which clef is normally placed on the upper staff for right-hand melodies and curls around G4?',
    options: ['Bass Clef', 'Treble Clef', 'Alto Clef', 'Tenor Clef'],
    correctOptionIndex: 1,
    explanation:
      'The Treble (G) Clef spirals around the second line from the bottom (G4) on the upper staff.',
  },
  {
    id: 'l2-6',
    level: 2,
    type: 'multiple-choice',
    topic: 'Note Durations',
    prompt: 'In 4/4 time, how many beats does a Half Note receive?',
    options: ['1 beat', '2 beats', '3 beats', '4 beats'],
    correctOptionIndex: 1,
    explanation: 'A Half Note lasts half of a 4-beat measure—exactly 2 beats.',
  },
  {
    id: 'l2-7',
    level: 2,
    type: 'multiple-choice',
    topic: 'Major Scale Formula',
    prompt: 'Which Whole (W) and Half (H) step formula builds every Major scale?',
    options: [
      'W – H – W – W – H – W – W',
      'W – W – H – W – W – W – H',
      'H – W – W – H – W – W – W',
      'W – W – W – H – W – W – H',
    ],
    correctOptionIndex: 1,
    explanation:
      'Every Major scale follows Whole–Whole–Half–Whole–Whole–Whole–Half.',
  },
  {
    id: 'l2-8',
    level: 2,
    type: 'play-sequence',
    topic: 'Basic Chords',
    prompt: 'Practical Task: Play the three notes of the C Major triad in order (C4 → E4 → G4).',
    instructionHint: 'Click C4, then E4, then G4 on the keyboard below.',
    targetSequence: [60, 64, 67],
    explanation:
      'The C Major triad stacks Root C4, Major 3rd E4, and Perfect 5th G4.',
  },
  {
    id: 'l2-9',
    level: 2,
    type: 'play-sequence',
    topic: 'Minor Chords',
    prompt: 'Practical Task: Play the three notes of the A Minor triad in order (A3 → C4 → E4).',
    instructionHint: 'Start on A3 (just left of B3/C4), then press C4 and E4.',
    targetSequence: [57, 60, 64],
    explanation:
      'A Minor combines Root A, Minor 3rd C, and Perfect 5th E.',
  },
  {
    id: 'l2-10',
    level: 2,
    type: 'multiple-choice',
    topic: 'Time Signatures',
    prompt: 'Which time signature gives a classic three-beat waltz feel ("1–2–3, 1–2–3")?',
    options: ['4/4 time', '2/4 time', '3/4 time', '6/8 time'],
    correctOptionIndex: 2,
    explanation: '3/4 time places three quarter-note beats inside every measure.',
  },
];

export const LEVEL_3_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'l3-1',
    level: 3,
    type: 'identify-key',
    topic: 'Key Location Precision',
    prompt: 'Practical Task 1: Find and press Bb4 (A#4), the black key belonging to the F Major scale.',
    instructionHint: 'Locate B4 (to the right of the octave-4 3-black-key group) and step one half step left.',
    targetMidi: 70,
    allowAnyOctave: false,
    explanation:
      'Bb4 (enharmonic with A#4) is the rightmost black key in the octave-4 three-black-key cluster.',
  },
  {
    id: 'l3-2',
    level: 3,
    type: 'play-sequence',
    topic: 'C Major Scale Execution',
    prompt: 'Practical Task 2: Perform the complete ascending 1-octave C Major scale (C4 up to C5).',
    instructionHint: 'Play C4 → D4 → E4 → F4 → G4 → A4 → B4 → C5.',
    targetSequence: [60, 62, 64, 65, 67, 69, 71, 72],
    explanation:
      'The complete C Major scale spans all eight white keys from C4 to C5.',
  },
  {
    id: 'l3-3',
    level: 3,
    type: 'play-sequence',
    topic: 'G Major Chord',
    prompt: 'Practical Task 3: Play the G Major triad (G4 → B4 → D5).',
    instructionHint: 'Click G4, then B4, then D5.',
    targetSequence: [67, 71, 74],
    explanation:
      'The G Major triad combines Root G4, Major 3rd B4, and Perfect 5th D5.',
  },
  {
    id: 'l3-4',
    level: 3,
    type: 'play-sequence',
    topic: 'F Major Chord',
    prompt: 'Practical Task 4: Play the F Major triad (F4 → A4 → C5).',
    instructionHint: 'Click F4, then A4, then C5.',
    targetSequence: [65, 69, 72],
    explanation:
      'The F Major triad stacks F4, A4, and C5.',
  },
  {
    id: 'l3-5',
    level: 3,
    type: 'multiple-choice',
    topic: 'Rhythm & Meter Identification',
    prompt: 'A musical measure in 4/4 time already contains one Half Note and one Quarter Note. Which note completes the measure?',
    options: ['One Half Note', 'One Quarter Note', 'One Whole Note', 'One Sixteenth Note'],
    correctOptionIndex: 1,
    explanation:
      'Half note (2 beats) + Quarter note (1 beat) = 3 beats, leaving 1 beat (one Quarter Note) to complete 4/4.',
  },
  {
    id: 'l3-6',
    level: 3,
    type: 'play-sequence',
    topic: 'Melody Performance',
    prompt: 'Practical Task 5: Play the opening phrase of Beethoven’s "Ode to Joy" (E4 → E4 → F4 → G4 → G4 → F4 → E4 → D4 → C4).',
    instructionHint: 'Follow the contour carefully starting on E4.',
    targetSequence: [64, 64, 65, 67, 67, 65, 64, 62, 60],
    explanation:
      'Smoothly stepping through E–E–F–G–G–F–E–D–C completes Beethoven’s joyful opening motif.',
  },
  {
    id: 'l3-7',
    level: 3,
    type: 'play-sequence',
    topic: 'Two-Hand Coordination Pattern',
    prompt: 'Practical Task 6: Play this two-hand alternating cadence: Left-hand C3 → G3, followed by Right-hand C4 → E4 → G4.',
    instructionHint: 'Play bass C3 then G3, then step up into middle C4, E4, and G4.',
    targetSequence: [48, 55, 60, 64, 67],
    explanation:
      'Combining a left-hand open fifth (C3–G3) with a right-hand triad (C4–E4–G4) creates a full resonant piano cadence.',
  },
  {
    id: 'l3-8',
    level: 3,
    type: 'multiple-choice',
    topic: 'Comprehensive Musicianship',
    prompt: 'Which combination correctly prepares a pianist for expressive, tension-free performance?',
    options: [
      'Flat fingers, high shoulders, and playing as fast as possible without counting',
      'Level forearms, curved fingertips, steady tempo count-in, and relaxed wrists',
      'Sitting on the back edge of the bench with ankles crossed',
      'Pressing the sustain pedal continuously from the first note to the last',
    ],
    correctOptionIndex: 1,
    explanation:
      'Balanced posture, curved fingers, relaxed wrists, and steady rhythmic awareness support lifelong musical growth.',
  },
];
