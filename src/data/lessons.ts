import { ACADEMY_IMAGES } from '@/src/lib/utils';
import { LessonContent, PianistProfile, PianoTypeItem, TimelineEvent } from '@/src/types/academy';

export const HISTORY_TIMELINE: TimelineEvent[] = [
  {
    id: 'early-keyboards',
    period: 'c. 14th–15th Century',
    isApproximate: true,
    title: 'Early Stringed Keyboard Instruments',
    figureOrOrigin: 'European Monastic & Guild Workshops',
    background:
      'Before the piano existed, musicians paired keyboard levers with plucked or tangent-struck strings derived from the medieval monochord and psaltery.',
    innovations: [
      'Arranged pitches linearly from low (left) to high (right) under a single set of wooden levers.',
      'Established the visual layout of natural keys and raised chromatic keys.',
    ],
    whyItMattered:
      'Proved that a single performer could control harmony and melody simultaneously without needing an entire ensemble.',
    imageUrl: ACADEMY_IMAGES.harpsichord,
    imageAlt: 'Early wooden keyboard instrument in historical European gallery',
    demoVoice: 'harpsichord',
    demoMidiNotes: [60, 64, 67, 72],
  },
  {
    id: 'harpsichord',
    period: 'c. 1500–1750',
    isApproximate: true,
    title: 'The Harpsichord',
    figureOrOrigin: 'Italy, Flanders, France & Germany',
    background:
      'The dominant Baroque keyboard instrument heard in the works of J. S. Bach, Handel, and Domenico Scarlatti.',
    innovations: [
      'Plectra (traditionally bird quills) plucked each string rather than striking it.',
      'Double manuals (two keyboards) allowed abrupt shifts between bright and soft registrations.',
    ],
    whyItMattered:
      'Its crisp, articulate tone could not grow louder or softer with finger pressure alone, inspiring builders to seek expressive dynamic control.',
    imageUrl: ACADEMY_IMAGES.harpsichord,
    imageAlt: 'Seventeenth-century double-manual European harpsichord',
    demoVoice: 'harpsichord',
    demoMidiNotes: [62, 65, 69, 74],
  },
  {
    id: 'clavichord',
    period: 'c. 1400–1800',
    isApproximate: true,
    title: 'The Clavichord',
    figureOrOrigin: 'German & Northern European Chambers',
    background:
      'An intimate domestic keyboard instrument prized by C. P. E. Bach and keyboard students for quiet solo study.',
    innovations: [
      'A small brass blade (tangent) pressed upward against the string and stayed in contact while held.',
      'Allowed subtle pitch vibrato (Bebung) and delicate volume shaping through finger pressure.',
    ],
    whyItMattered:
      'Demonstrated direct expressive touch sensitivity, though its whisper-quiet volume was too soft for concert halls.',
    imageUrl: ACADEMY_IMAGES.fortepiano,
    imageAlt: 'Historical walnut chamber keyboard instrument in warm daylight',
    demoVoice: 'harpsichord',
    demoMidiNotes: [60, 62, 64, 67],
  },
  {
    id: 'cristofori',
    period: 'c. 1700',
    isApproximate: true,
    title: 'Bartolomeo Cristofori Invents the Piano',
    figureOrOrigin: 'Bartolomeo Cristofori · Florence, Italy',
    background:
      'Working as instrument curator for the Medici court in Florence, Cristofori solved the centuries-old trade-off between volume and touch expression.',
    innovations: [
      'Created an escapement hammer action: a felt-covered hammer struck the string and rebounded immediately so the string could ring freely.',
      'Named it gravicembalo col piano e forte — literally "harpsichord with soft and loud."',
    ],
    whyItMattered:
      'Established the defining principle of the modern piano: playing gently yields piano (soft) and playing firmly yields forte (loud).',
    imageUrl: ACADEMY_IMAGES.fortepiano,
    imageAlt: 'Early Italian fortepiano inspired by Bartolomeo Cristofori',
    demoVoice: 'grand',
    demoMidiNotes: [60, 64, 67, 72],
  },
  {
    id: 'eighteenth-century',
    period: '1750s–1790s',
    isApproximate: false,
    title: '18th-Century Evolution & Classical Fortepiano',
    figureOrOrigin: 'Gottfried Silbermann, Johann Andreas Stein & Broadwood',
    background:
      'German, Austrian, and English makers refined Cristofori’s escapement and expanded the compass from roughly 49 keys to 61 keys (five octaves).',
    innovations: [
      'Viennese light action favored agile Classical phrasing for Mozart and Haydn.',
      'English builders added foot pedals for sustain (damper lift) and deeper resonant tone.',
    ],
    whyItMattered:
      'Turned the piano into the centerpiece of Classical chamber music and solo sonatas.',
    imageUrl: ACADEMY_IMAGES.fortepiano,
    imageAlt: 'Classical era wooden fortepiano with brass sustain pedals',
    demoVoice: 'grand',
    demoMidiNotes: [60, 64, 67, 71, 72],
  },
  {
    id: 'romantic-era',
    period: '1820s–1880s',
    isApproximate: false,
    title: 'Romantic-Era Power & Concert Expansion',
    figureOrOrigin: 'Érard, Chickering & Steinway · Europe & America',
    background:
      'Industrial metallurgy and Romantic concert halls demanded greater volume, faster repetition, and wider pitch range.',
    innovations: [
      'Double-escapement action (Sébastien Érard, 1821) allowed rapid note repetition without releasing the key fully.',
      'Single-piece cast-iron frame supported over 18–20 tons of string tension.',
      'Overstringing (cross-stringing) placed bass strings diagonally over treble strings for richer resonance, reaching the modern 88-key standard.',
    ],
    whyItMattered:
      'Made possible the thunderous orchestral textures of Liszt, Chopin, and Brahms—and established the acoustic blueprint still built today.',
    imageUrl: ACADEMY_IMAGES.heroGrand,
    imageAlt: 'Concert grand piano with cast-iron harp and open lid in warm hall',
    demoVoice: 'grand',
    demoMidiNotes: [48, 55, 60, 64, 67, 72],
  },
  {
    id: 'modern-acoustic',
    period: '1900s–Present',
    isApproximate: false,
    title: 'Modern Concert Grand & Upright Pianos',
    figureOrOrigin: 'Global Acoustic Makers',
    background:
      'Refined spruce soundboards, precision-shaped wool felt hammers, and vertical upright frames brought acoustic pianos into both recital halls and family living rooms.',
    innovations: [
      'Standardized 88-key compass (A0 to C8) and three-pedal system (una corda, sostenuto, sustain).',
      'Compact vertical string frames made home upright pianos practical without sacrificing full keyboard range.',
    ],
    whyItMattered:
      'Created the universal acoustic benchmark against which every digital and stage instrument is still measured.',
    imageUrl: ACADEMY_IMAGES.upright,
    imageAlt: 'Polished walnut upright acoustic piano in sunlit conservatory room',
    demoVoice: 'grand',
    demoMidiNotes: [60, 65, 69, 72],
  },
  {
    id: 'digital-piano',
    period: '1980s–2000s',
    isApproximate: false,
    title: 'Digital Piano Development',
    figureOrOrigin: 'Tokyo, Hamamatsu & Silicon Audio Labs',
    background:
      'Digital sampling and velocity-sensitive graded hammer actions brought authentic piano feel to apartments, schools, and headphone practice.',
    innovations: [
      'Multi-velocity digital recordings of concert grands triggered by weighted mechanical hammers.',
      'MIDI connectivity, zero tuning maintenance, and silent headphone practice.',
    ],
    whyItMattered:
      'Removed cost, weight, and noise barriers so millions of beginners could learn at home.',
    imageUrl: ACADEMY_IMAGES.digitalStage,
    imageAlt: 'Modern weighted 88-key digital piano in studio lighting',
    demoVoice: 'electric',
    demoMidiNotes: [60, 64, 67, 71],
  },
  {
    id: 'modern-electronic',
    period: '2010s–Present',
    isApproximate: false,
    title: 'Modern Electronic Keyboards & Interactive Studios',
    figureOrOrigin: 'Contemporary Hybrid & Software Instruments',
    background:
      'Today’s instruments blend acoustic physical modeling, USB-MIDI integration, and interactive learning software.',
    innovations: [
      'Real-time Web Audio & physical modeling engines simulate string sympathetic resonance in a browser.',
      'Portable keyboards and guided visual apps help learners connect theory, ear training, and technique immediately.',
    ],
    whyItMattered:
      'Makes structured piano education accessible anywhere, on any screen or instrument.',
    imageUrl: ACADEMY_IMAGES.digitalStage,
    imageAlt: 'Contemporary electronic keyboard setup in modern studio',
    demoVoice: 'electric',
    demoMidiNotes: [64, 67, 71, 76],
  },
];

export const PIANO_TYPES: PianoTypeItem[] = [
  {
    id: 'grand',
    name: 'Concert Grand Piano',
    keyCount: '88 Keys',
    mechanism: 'Horizontal acoustic hammers & gravity return',
    footprint: '7 to 9 feet deep',
    idealFor: 'Concert halls, conservatories, and recording studios',
    features: [
      'Longest bass strings produce unmatched warmth and overtone depth',
      'Gravity-assisted double-escapement action gives fastest repetition',
      'Full 3-pedal acoustic resonance with liftable lid projection',
    ],
    description:
      'The flagship acoustic instrument. Strings stretch horizontally away from the keyboard, allowing massive soundboard projection and delicate tonal control.',
    imageUrl: ACADEMY_IMAGES.heroGrand,
    imageAlt: 'Concert grand piano on stage',
  },
  {
    id: 'baby-grand',
    name: 'Baby Grand Piano',
    keyCount: '88 Keys',
    mechanism: 'Horizontal acoustic hammer action',
    footprint: '4 ft 11 in to 5 ft 8 in deep',
    idealFor: 'Home parlors, teaching studios, and intimate recitals',
    features: [
      'Shares the grand piano’s horizontal key response in a shorter cabinet',
      'Balanced acoustic projection suited to medium-sized rooms',
      'Classic winged silhouette with full 88-key range',
    ],
    description:
      'Designed to bring horizontal grand-piano mechanics and touch responsiveness into domestic living spaces and private teaching studios.',
    imageUrl: ACADEMY_IMAGES.fortepiano,
    imageAlt: 'Compact horizontal grand piano in warm room',
  },
  {
    id: 'upright',
    name: 'Upright (Vertical) Piano',
    keyCount: '88 Keys',
    mechanism: 'Vertical acoustic hammers with spring-assisted return',
    footprint: 'Approx. 5 ft wide × 2 ft deep',
    idealFor: 'Apartments, practice rooms, and family homes',
    features: [
      'Strings run vertically to save floor space against a wall',
      'Authentic acoustic strings, wooden soundboard, and pedals',
      'Practice felt mute rail on many studio models',
    ],
    description:
      'A true acoustic hammer-and-string piano arranged vertically. It delivers genuine mechanical touch and resonance in a compact footprint.',
    imageUrl: ACADEMY_IMAGES.upright,
    imageAlt: 'Walnut upright piano with bench',
  },
  {
    id: 'digital',
    name: 'Console Digital Piano',
    keyCount: '88 Weighted Keys',
    mechanism: 'Graded hammer sensors + digital sound engine',
    footprint: 'Approx. 54 in wide × 16 in deep',
    idealFor: 'Beginners, apartments, and late-night headphone practice',
    features: [
      'Never goes out of tune and requires no seasonal climate humidity care',
      'Headphone output and adjustable volume for quiet study',
      'Weighted keys replicate heavier bass and lighter treble resistance',
    ],
    description:
      'Uses weighted mechanical keys paired with optical sensors and studio-recorded grand piano samples to mimic acoustic touch without maintenance.',
    imageUrl: ACADEMY_IMAGES.digitalStage,
    imageAlt: 'Console digital piano in modern acoustic room',
  },
  {
    id: 'stage',
    name: 'Stage Piano',
    keyCount: '73 or 88 Weighted Keys',
    mechanism: 'Portable weighted action + studio line outputs',
    footprint: 'Slim slab chassis (11–20 kg)',
    idealFor: 'Live performers, touring bands, and studio producers',
    features: [
      'Built without heavy wooden furniture cabinets or internal speakers',
      'Instant switching between concert grand, Rhodes electric, and organ voices',
      'Professional balanced audio outputs and MIDI controller routing',
    ],
    description:
      'Engineered for portability and stage durability while preserving authentic weighted key feel and expressive pedal dynamics.',
    imageUrl: ACADEMY_IMAGES.digitalStage,
    imageAlt: 'Matte black stage piano on stand',
  },
  {
    id: 'portable-keyboard',
    name: 'Portable Electronic Keyboard',
    keyCount: '61 or 76 Unweighted / Semi-weighted Keys',
    mechanism: 'Spring-action synth keys + onboard speakers',
    footprint: 'Lightweight tabletop (4–7 kg)',
    idealFor: 'Young beginners, travel, and introductory melody exploration',
    features: [
      'Lighter spring-action keys require minimal finger strength',
      'Built-in metronome, accompaniment rhythms, and hundreds of instrument sounds',
      'Most affordable and battery-portable entry point',
    ],
    description:
      'An approachable starter keyboard for learning note names, scales, and chords before transitioning to a full 88-key weighted piano.',
    imageUrl: ACADEMY_IMAGES.digitalStage,
    imageAlt: 'Portable electronic keyboard',
  },
];

export const FAMOUS_PIANISTS: PianistProfile[] = [
  {
    id: 'mozart',
    name: 'Wolfgang Amadeus Mozart',
    era: 'Classical Era',
    lifespan: '1756–1791',
    signatureContribution:
      'Elevated the fortepiano into a leading solo concerto and sonata instrument.',
    biography:
      'Mozart composed 27 piano concertos and 18 solo sonatas, showcasing crystalline melody, singing legato lines, and dramatic interplay between soloist and orchestra.',
    listeningTip: 'Listen for singing clarity in the right hand balanced by crisp left-hand Alberti bass patterns.',
    sampleNotes: [60, 64, 67, 64, 60, 64, 67, 64],
  },
  {
    id: 'beethoven',
    name: 'Ludwig van Beethoven',
    era: 'Classical to Romantic Bridge',
    lifespan: '1770–1827',
    signatureContribution:
      'Pushed piano construction to its physical limits with orchestral power and emotional depth.',
    biography:
      'Across 32 piano sonatas—including the "Moonlight" and "Pathétique"—Beethoven constantly demanded wider ranges, heavier strings, and richer sustain pedals from piano builders.',
    listeningTip: 'Notice stark contrasts between whispered pianissimo chords and sudden dramatic fortissimo accents.',
    sampleNotes: [64, 64, 65, 67, 67, 65, 64, 62, 60],
  },
  {
    id: 'chopin',
    name: 'Frédéric Chopin',
    era: 'Romantic Era',
    lifespan: '1810–1849',
    signatureContribution:
      'Known as the "Poet of the Piano" for writing almost exclusively for solo piano.',
    biography:
      'Chopin revolutionized hand ergonomics, teaching pianists to match fingerings to the natural anatomy of the human hand across nocturnes, preludes, waltzes, and études.',
    listeningTip: 'Hear how the sustain pedal weaves shimmering harmonic clouds beneath expressive rubato melodies.',
    sampleNotes: [60, 67, 72, 71, 69, 67, 64],
  },
  {
    id: 'liszt',
    name: 'Franz Liszt',
    era: 'Romantic Era',
    lifespan: '1811–1886',
    signatureContribution:
      'Invented the modern solo piano recital and expanded virtuoso keyboard technique.',
    biography:
      'Liszt was the first pianist to turn the grand piano sideways so audiences could watch his hands, performing entire solo programs from memory and arranging full symphonies for ten fingers.',
    listeningTip: 'Notice sweeping arpeggios that span the full 88-key width from thunderous bass to bell-like treble.',
    sampleNotes: [48, 55, 60, 64, 67, 72, 76, 79],
  },
  {
    id: 'debussy',
    name: 'Claude Debussy',
    era: 'Impressionist Era',
    lifespan: '1862–1918',
    signatureContribution:
      'Treated the piano as an instrument of color, atmosphere, and shimmering resonance.',
    biography:
      'In works like "Clair de Lune" and his Preludes, Debussy encouraged pianists to strike keys gently so hammers seemed to have no percussive edge at all.',
    listeningTip: 'Listen for pentatonic scales and open fifths floating gently in long pedal washes.',
    sampleNotes: [61, 65, 68, 70, 68, 65],
  },
  {
    id: 'argerich',
    name: 'Martha Argerich',
    era: 'Modern Concert Virtuoso',
    lifespan: 'b. 1941',
    signatureContribution:
      'Celebrated worldwide for volcanic rhythmic drive, chamber collaboration, and effortless control.',
    biography:
      'Born in Buenos Aires, Argerich won the International Chopin Piano Competition in 1965 and became one of the most influential living interpreters of Romantic and 20th-century repertoire.',
    listeningTip: 'Pay attention to razor-sharp rhythmic precision paired with spontaneous musical dialogue.',
    sampleNotes: [60, 62, 64, 65, 67, 69, 71, 72],
  },
  {
    id: 'lang-lang',
    name: 'Lang Lang',
    era: 'Contemporary Concert Pianist & Educator',
    lifespan: 'b. 1982',
    signatureContribution:
      'Inspired millions of young beginners globally through charismatic recitals and music foundations.',
    biography:
      'Performing at major international ceremonies and concert halls worldwide, Lang Lang champions early music education and accessible beginner repertoire.',
    listeningTip: 'Notice theatrical phrasing and how clear wrist motion shapes expressive musical arcs.',
    sampleNotes: [60, 64, 67, 72, 67, 64, 60],
  },
];

export const MODULE_LESSONS: LessonContent[] = [
  // MODULE 1 — INTRODUCTION TO PIANO
  {
    id: '1.1',
    moduleId: 'intro',
    numberLabel: 'Lesson 1.1',
    title: 'What is a Piano?',
    subtitle: 'Understand the instrument from the inside out—no musical background required.',
    durationMinutes: 6,
    xpReward: 40,
    objectives: [
      'Define what a piano is and why its name means "soft-loud".',
      'Identify the core internal parts: keys, hammers, strings, dampers, and soundboard.',
      'Explain the primary difference between an acoustic piano and a digital piano.',
    ],
    sections: [
      {
        heading: 'A Percussion and String Instrument Combined',
        body: [
          'The word "piano" is short for the Italian pianoforte, meaning "soft-loud." Unlike earlier keyboard instruments that played at one fixed volume, a piano responds directly to how gently or firmly you press each key.',
          'Even though it sits in the keyboard family, an acoustic piano is actually both a stringed instrument and a percussion instrument: pressing a key launches a felt-covered hammer that strikes taut steel strings.',
        ],
        keyTakeaway: 'Press gently for a whisper (piano); press firmly with arm weight for power (forte).',
      },
      {
        heading: 'Core Parts Inside Every Acoustic Piano',
        body: [
          'Keys act as balanced wooden levers. When your finger pushes the front down, the hidden back end lifts an intricate mechanical assembly called the action.',
          'Hammers covered in tightly compressed wool felt fly upward to strike one, two, or three tuned steel strings, then drop away instantly so the strings can vibrate freely.',
          'Dampers rest softly on the strings when keys are untouched. Lifting your finger drops the damper back onto the string to silence the note—unless you hold the right sustain pedal.',
          'The Soundboard—usually seasoned Sitka spruce—sits beneath or behind the strings and amplifies their faint vibrations into a rich, room-filling acoustic tone.',
        ],
      },
      {
        heading: 'Acoustic vs. Digital Pianos',
        body: [
          'An acoustic piano creates sound purely through physical wood, felt, steel, and air vibration. It requires periodic tuning because humidity and temperature shift string tension.',
          'A digital piano uses weighted keys connected to electronic sensors. When you press a key, a microprocessor calculates your speed and triggers studio recordings (or physical models) of a real grand piano through speakers or headphones.',
        ],
      },
    ],
    terminology: [
      { term: 'Pianoforte', definition: 'Original Italian name meaning "soft and loud."' },
      { term: 'Action', definition: 'The mechanical lever-and-hammer assembly connecting keys to strings.' },
      { term: 'Soundboard', definition: 'Large wooden resonator board that amplifies string vibrations.' },
      { term: 'Damper', definition: 'Felt pad that stops string vibration when a key is released.' },
    ],
    summary:
      'A piano translates finger speed into expressive volume by launching felt hammers against steel strings amplified by a wooden soundboard—or by modeling that physics digitally.',
    knowledgeCheck: [
      {
        id: '1.1-q1',
        prompt: 'What does the Italian word "pianoforte" literally translate to?',
        options: ['Wood and steel', 'Soft and loud', 'Fast and slow', 'Black and white'],
        correctIndex: 1,
        explanation: 'Piano means soft and forte means loud—celebrating dynamic touch sensitivity.',
      },
      {
        id: '1.1-q2',
        prompt: 'Which component amplifies the faint vibration of an acoustic piano’s strings?',
        options: ['The damper felt', 'The wooden soundboard', 'The tuning pins', 'The music desk'],
        correctIndex: 1,
        explanation: 'Strings alone sound thin; the large spruce soundboard radiates their resonance into the room.',
      },
    ],
  },
  {
    id: '1.2',
    moduleId: 'intro',
    numberLabel: 'Lesson 1.2',
    title: 'History of the Piano',
    subtitle: 'Trace three centuries from Baroque harpsichords to modern concert grands and digital studios.',
    durationMinutes: 8,
    xpReward: 45,
    objectives: [
      'Contrast how harpsichords, clavichords, and pianos produce sound.',
      'Recognize Bartolomeo Cristofori’s invention around 1700.',
      'Understand how 19th-century cast-iron frames shaped the modern 88-key piano.',
    ],
    sections: [
      {
        heading: 'From Plucked Quills to Felt Hammers',
        body: [
          'For two centuries before the piano, the harpsichord ruled European music. Its crisp voice came from plectra plucking strings, which meant pressing a key hard or softly produced nearly identical loudness.',
          'Around the year 1700 in Florence, Bartolomeo Cristofori invented an escapement hammer mechanism that struck the string and rebounded—giving birth to the first true piano.',
        ],
      },
      {
        heading: 'Use the Interactive Timeline Below',
        body: [
          'Explore all nine historical eras in chronological order, compare archival imagery, and click "Hear Era Voice" to hear how harpsichords differ from grand and electric pianos.',
        ],
      },
    ],
    terminology: [
      { term: 'Harpsichord', definition: 'Baroque keyboard whose strings are plucked rather than struck.' },
      { term: 'Clavichord', definition: 'Intimate historical keyboard using brass tangents for delicate dynamics.' },
      { term: 'Escapement', definition: 'Mechanism letting a hammer bounce clear of the string even while the key remains held.' },
    ],
    summary:
      'Starting with Cristofori’s ~1700 escapement action and expanding through 19th-century cast-iron engineering, the piano evolved into today’s 88-key acoustic and digital instrument.',
    knowledgeCheck: [
      {
        id: '1.2-q1',
        prompt: 'Who is credited with inventing the piano around the year 1700 in Florence?',
        options: ['Ludwig van Beethoven', 'Bartolomeo Cristofori', 'Sébastien Érard', 'J. S. Bach'],
        correctIndex: 1,
        explanation: 'Bartolomeo Cristofori built the gravicembalo col piano e forte in Florence around 1700.',
      },
      {
        id: '1.2-q2',
        prompt: 'How did the Baroque harpsichord generate sound?',
        options: [
          'Felt hammers struck strings',
          'Quill plectra plucked strings',
          'Air pipes vibrated reeds',
          'Electronic oscillators',
        ],
        correctIndex: 1,
        explanation: 'Harpsichord jacks used plectra (quills) to pluck strings, creating bright uniform dynamics.',
      },
    ],
  },
  {
    id: '1.3',
    moduleId: 'intro',
    numberLabel: 'Lesson 1.3',
    title: 'Types of Piano',
    subtitle: 'Compare concert grands, baby grands, uprights, digital consoles, stage pianos, and portable keyboards.',
    durationMinutes: 6,
    xpReward: 40,
    objectives: [
      'Distinguish horizontal grand pianos from vertical upright pianos.',
      'Understand when weighted digital, stage, or portable keyboards fit best.',
    ],
    sections: [
      {
        heading: 'Matching the Instrument to Your Space and Goals',
        body: [
          'Every piano family shares the exact same musical layout of notes, meaning skills you learn on a compact keyboard transfer directly to a 9-foot concert grand.',
          'The key differences lie in string orientation (horizontal vs. vertical), key weighting, portability, and acoustic vs. electronic sound generation.',
        ],
      },
    ],
    terminology: [
      { term: 'Weighted Keys', definition: 'Digital key mechanisms engineered to feel heavier in the bass and lighter in the treble.' },
      { term: 'Upright Piano', definition: 'Acoustic piano with vertically aligned strings for smaller floor spaces.' },
    ],
    summary:
      'Acoustic grands and uprights offer physical resonance, while digital, stage, and portable keyboards offer silent headphone practice, zero tuning, and easy transport.',
    knowledgeCheck: [
      {
        id: '1.3-q1',
        prompt: 'Which acoustic piano saves floor space by orienting its strings vertically?',
        options: ['Concert Grand', 'Baby Grand', 'Upright Piano', 'Harpsichord'],
        correctIndex: 2,
        explanation: 'Upright pianos stand strings vertically against a wall, keeping the depth compact.',
      },
    ],
  },
  {
    id: '1.4',
    moduleId: 'intro',
    numberLabel: 'Lesson 1.4',
    title: 'Famous Pianists & Composers',
    subtitle: 'Meet seven iconic artists who shaped how the piano sounds and how we play it.',
    durationMinutes: 7,
    xpReward: 40,
    objectives: [
      'Recognize landmark contributions from Mozart, Beethoven, Chopin, Liszt, and Debussy.',
      'Discover modern concert artistry through Martha Argerich and Lang Lang.',
    ],
    sections: [
      {
        heading: 'Three Centuries of Pioneers',
        body: [
          'The piano did not evolve in isolation—composers challenged instrument makers to add keys and power, while virtuoso performers revealed colors no one knew wood and wire could produce.',
          'Explore each pianist card below and click "Play Motif" to hear a brief musical signature inspired by their era.',
        ],
      },
    ],
    terminology: [
      { term: 'Recital', definition: 'Solo concert format popularized in the 19th century by Franz Liszt.' },
      { term: 'Rubato', definition: 'Expressive, subtle stretching and relaxing of musical tempo.' },
    ],
    summary:
      'From Mozart’s Classical clarity and Chopin’s poetic touch to Argerich and Lang Lang on today’s global stage, each generation expanded what ten fingers can express.',
    knowledgeCheck: [
      {
        id: '1.4-q1',
        prompt: 'Which Romantic composer was known as the "Poet of the Piano" and wrote almost exclusively for solo piano?',
        options: ['Frédéric Chopin', 'Claude Debussy', 'Wolfgang Amadeus Mozart', 'Franz Liszt'],
        correctIndex: 0,
        explanation: 'Frédéric Chopin devoted nearly his entire compositional output to solo piano works.',
      },
    ],
  },
  {
    id: '1.5',
    moduleId: 'intro',
    numberLabel: 'Lesson 1.5',
    title: 'How a Piano Produces Sound',
    subtitle: 'Watch and test the six-step chain from finger press to soundboard resonance.',
    durationMinutes: 7,
    xpReward: 50,
    objectives: [
      'Trace all 6 steps of acoustic piano sound production.',
      'Compare acoustic hammer mechanics with electronic digital sound synthesis.',
    ],
    sections: [
      {
        heading: 'The Six-Step Acoustic Chain',
        body: [
          'When you click any key in the interactive diagram below, watch how mechanical energy travels instantaneously through the piano action: key depression → whippen/jack activation → hammer strike → string vibration → soundboard amplification → acoustic waves reaching your ear.',
          'Toggle to Digital Mode in the experiment to see how electronic keyboards bypass hammers and strings altogether, reading key velocity via dual sensors to synthesize audio.',
        ],
      },
    ],
    terminology: [
      { term: 'Velocity', definition: 'The speed at which a piano key travels downward, determining loudness and brightness.' },
      { term: 'Overtones', definition: 'Higher harmonic frequencies vibrating alongside the fundamental pitch.' },
    ],
    summary:
      'Acoustic pianos convert kinetic finger speed into vibrating strings amplified by spruce wood, whereas digital pianos translate key speed into electronic audio signals.',
    knowledgeCheck: [
      {
        id: '1.5-q1',
        prompt: 'What happens immediately after an acoustic hammer strikes the piano string?',
        options: [
          'It stays pressed against the string',
          'It rebounds away so the string can vibrate freely',
          'The soundboard stops moving',
          'The damper locks onto the hammer',
        ],
        correctIndex: 1,
        explanation: 'The escapement lets the hammer rebound immediately; holding it against the string would choke the sound.',
      },
    ],
  },

  // MODULE 2 — UNDERSTAND THE PIANO KEYBOARD
  {
    id: '2.1',
    moduleId: 'keyboard',
    numberLabel: 'Lesson 2.1',
    title: 'Piano Keyboard Structure',
    subtitle: 'Decode the 88 keys: 52 white keys, 36 black keys, and the secret 2-and-3 visual landmark.',
    durationMinutes: 6,
    xpReward: 40,
    objectives: [
      'Recall the exact key count of a standard piano: 88 total (52 white, 36 black).',
      'Spot the repeating alternating groups of 2 black keys and 3 black keys.',
    ],
    sections: [
      {
        heading: 'Why 88 Keys Aren’t Confusing Once You See the Pattern',
        body: [
          'At first glance, 88 keys look intimidating. Yet instead of 88 unrelated keys, a piano simply repeats one compact 12-key pattern over seven times!',
          'Look closely at the black keys on the interactive keyboard below: they are always arranged in alternating groups of TWO black keys and THREE black keys. That asymmetry is your compass—without it, every white key would look identical.',
        ],
        keyTakeaway: '52 white keys + 36 black keys = 88 standard keys, spanning from low A0 on the left to bright C8 on the right.',
      },
    ],
    terminology: [
      { term: 'Compass', definition: 'The total pitch range from lowest key (A0) to highest key (C8).' },
      { term: '2 & 3 Black-Key Pattern', definition: 'The repeating cluster pattern used to locate every note by sight or feel.' },
    ],
    summary:
      'Every full-size piano holds 52 white keys and 36 black keys organized by repeating clusters of 2 and 3 black keys.',
    knowledgeCheck: [
      {
        id: '2.1-q1',
        prompt: 'How many white and black keys make up a standard 88-key piano?',
        options: ['48 white and 40 black', '52 white and 36 black', '50 white and 38 black', '56 white and 32 black'],
        correctIndex: 1,
        explanation: 'A standard 88-key keyboard contains 52 white natural keys and 36 raised black keys.',
      },
    ],
  },
  {
    id: '2.2',
    moduleId: 'keyboard',
    numberLabel: 'Lesson 2.2',
    title: 'Musical Notes (A–G) & Middle C',
    subtitle: 'Learn the seven-letter musical alphabet and anchor your hands at Middle C.',
    durationMinutes: 7,
    xpReward: 45,
    objectives: [
      'Recite the musical alphabet A, B, C, D, E, F, G and how it cycles endlessly.',
      'Locate every C on the keyboard immediately to the left of each 2-black-key group.',
      'Identify Middle C (C4) near the center of the keyboard.',
    ],
    sections: [
      {
        heading: 'Only Seven Letters to Remember',
        body: [
          'Music uses just the first seven letters of the alphabet: A, B, C, D, E, F, G. After G, the pattern wraps straight back to A at a higher pitch.',
          'To find C anywhere on the piano, locate any group of TWO black keys and step down to the white key immediately to its left. That key is always C!',
          'To find F, locate any group of THREE black keys and step to the white key immediately to its left.',
        ],
        keyTakeaway: 'Left of 2 black keys = C. Left of 3 black keys = F. Middle C (C4) sits right near the piano’s center.',
      },
    ],
    terminology: [
      { term: 'Middle C (C4)', definition: 'The central C note serving as the primary reference anchor for beginner hand placement.' },
      { term: 'Natural Note', definition: 'One of the seven lettered white keys (A–G) with no sharp or flat.' },
    ],
    summary:
      'Using the 2-black-key group to spot C and the 3-black-key group to spot F lets you name every white key on any piano in seconds.',
    knowledgeCheck: [
      {
        id: '2.2-q1',
        prompt: 'Which white key sits immediately to the left of every group of two black keys?',
        options: ['A', 'C', 'F', 'G'],
        correctIndex: 1,
        explanation: 'C always sits immediately to the left of a two-black-key cluster.',
      },
    ],
  },
  {
    id: '2.3',
    moduleId: 'keyboard',
    numberLabel: 'Lesson 2.3',
    title: 'Sharps, Flats & Intervals',
    subtitle: 'Understand #, b, enharmonic equivalents, half steps, and whole steps.',
    durationMinutes: 7,
    xpReward: 45,
    objectives: [
      'Explain how a sharp (#) raises a note by one half-step and a flat (b) lowers it.',
      'Recognize enharmonic equivalents like C# and Db.',
      'Hear and see the difference between a half step and a whole step.',
    ],
    sections: [
      {
        heading: 'Half Steps and Whole Steps',
        body: [
          'A half step (semitone) is the smallest distance between any two adjacent keys on the piano—including white-to-black (like C to C#) AND white-to-white where no black key sits between them (E to F, and B to C).',
          'A whole step equals two half steps (for example, C up to D skips over C#).',
        ],
      },
      {
        heading: 'Sharps (#), Flats (b), and Enharmonic Twins',
        body: [
          'Raising a note one half step to the right makes it sharp (#). Lowering a note one half step to the left makes it flat (b).',
          'Because the black key between C and D is one half step above C AND one half step below D, it wears two names: C# (C sharp) and Db (D flat). Notes sharing the same physical key with two names are called enharmonic equivalents.',
        ],
      },
    ],
    terminology: [
      { term: 'Sharp (#)', definition: 'Raises a pitch by one half step (toward the right).' },
      { term: 'Flat (b)', definition: 'Lowers a pitch by one half step (toward the left).' },
      { term: 'Enharmonic Equivalent', definition: 'Two note spellings that sound the same pitch on the same key (e.g., F# = Gb).' },
    ],
    summary:
      'Half steps move to the very next key (white or black), whole steps span two half steps, and every black key has both a sharp name and an enharmonic flat name.',
    knowledgeCheck: [
      {
        id: '2.3-q1',
        prompt: 'Which note is the enharmonic equivalent of C# (C sharp)?',
        options: ['B flat (Bb)', 'D flat (Db)', 'E flat (Eb)', 'C flat (Cb)'],
        correctIndex: 1,
        explanation: 'The black key above C is also one half-step below D, making C# and Db enharmonic equivalents.',
      },
    ],
  },
  {
    id: '2.4',
    moduleId: 'keyboard',
    numberLabel: 'Lesson 2.4',
    title: 'Octaves & Pitch Register',
    subtitle: 'Hear why C2, C4, and C6 share the same musical letter at higher and lower pitches.',
    durationMinutes: 6,
    xpReward: 40,
    objectives: [
      'Define an octave as the 8-letter span (12 half steps) from one note to its next namesake.',
      'Compare low bass, warm middle, and sparkling treble registers by ear.',
    ],
    sections: [
      {
        heading: 'Doubling Frequency Across Octaves',
        body: [
          'Play C4 (Middle C) and then C5 eight white keys higher. Even though C5 sounds brighter and higher, they blend smoothly because C5 vibrates at exactly twice the frequency of C4 (523.25 Hz vs. 261.63 Hz).',
          'Each octave cycle is numbered from 0 at the bottom of the piano up to 8 at the top C8.',
        ],
      },
    ],
    terminology: [
      { term: 'Octave', definition: 'Interval of 12 half steps (8 white letter names) where the pitch frequency doubles.' },
      { term: 'Register', definition: 'The general pitch height of keys—bass (left), middle, or treble (right).' },
    ],
    summary:
      'An octave spans from one note name to the next occurrence of the same letter, doubling frequency and blending harmoniously across bass, middle, and treble registers.',
    knowledgeCheck: [
      {
        id: '2.4-q1',
        prompt: 'How many half steps separate two notes one octave apart (for example, C4 to C5)?',
        options: ['7 half steps', '8 half steps', '12 half steps', '10 half steps'],
        correctIndex: 2,
        explanation: 'Counting every white and black key from C4 to C5 spans 12 half steps (8 white letter steps).',
      },
    ],
  },

  // MODULE 3 — SITTING POSTURE AND PLAYING TECHNIQUES
  {
    id: '3.1',
    moduleId: 'posture',
    numberLabel: 'Lesson 3.1',
    title: 'Correct Sitting Position',
    subtitle: 'Set your bench height, distance, posture, and foot balance like a conservatory pianist.',
    durationMinutes: 6,
    xpReward: 40,
    objectives: [
      'Adjust bench distance and height so forearms stay level with the keys.',
      'Maintain a tall, relaxed spine with grounded feet.',
    ],
    sections: [
      {
        heading: 'Seven Checkpoints Before Playing a Single Note',
        body: [
          'Sit on the front half of the bench—never leaning back—so your torso can lean freely toward high treble or low bass keys.',
          'Set bench height so your forearms remain roughly parallel to the floor when your hands rest on the keys. Keep shoulders dropped away from your ears, elbows slightly forward of your ribcage, and feet flat on the floor (or on a footrest for younger players).',
        ],
      },
    ],
    terminology: [
      { term: 'Bench Distance', definition: 'Far enough back that elbows swing freely past your torso, close enough that arms aren’t strained forward.' },
      { term: 'Forearm Alignment', definition: 'Elbows and wrists resting level with the top surface of the white keys.' },
    ],
    summary:
      'Balanced sitting posture prevents fatigue and lets gravity flow effortlessly from your shoulders into your fingertips.',
    knowledgeCheck: [
      {
        id: '3.1-q1',
        prompt: 'How should your forearms be aligned relative to the keyboard when seated properly?',
        options: [
          'Sloped sharply upward toward the ceiling',
          'Roughly parallel to the floor, level with the keys',
          'Resting heavily on the wooden keyslip',
          'Tucked tightly behind your hips',
        ],
        correctIndex: 1,
        explanation: 'Level forearms prevent wrist strain and give your fingers balanced downward weight.',
      },
    ],
  },
  {
    id: '3.2',
    moduleId: 'posture',
    numberLabel: 'Lesson 3.2',
    title: 'Natural Hand Position',
    subtitle: 'Shape curved fingers and supple wrists without collapsing joints or locking tension.',
    durationMinutes: 6,
    xpReward: 40,
    objectives: [
      'Form the natural "soft ball" curve in your hands and fingertips.',
      'Avoid flat collapsed knuckles and stiff, raised wrists.',
    ],
    sections: [
      {
        heading: 'The Effortless Arch',
        body: [
          'Drop both arms loosely at your sides and notice the gentle natural curve of your fingers. Place that exact relaxed shape onto the keys—as if gently cradling a small tangerine beneath your palm.',
          'Fingers 2, 3, 4, and 5 contact the keys on their cushioned tips just in front of the fingernail, while the thumb plays naturally on its outer side edge. Keep wrists level and springy so tension never locks.',
        ],
      },
    ],
    terminology: [
      { term: 'Bridge / Arch', definition: 'The supportive rounded knuckle line of the hand that prevents flat collapsed fingers.' },
      { term: 'Wrist Suppleness', definition: 'Gentle buoyancy in the wrist that absorbs key impact and connects phrases smoothly.' },
    ],
    summary:
      'Curved fingertips, side-edge thumbs, and level buoyant wrists allow accurate finger control with zero tension.',
    knowledgeCheck: [
      {
        id: '3.2-q1',
        prompt: 'Which part of the thumb normally touches the piano key?',
        options: [
          'The flat base knuckle',
          'The outer side edge near the tip',
          'Straight vertically on the fingernail',
          'It hovers above the keys without playing',
        ],
        correctIndex: 1,
        explanation: 'Because the thumb is shorter and angled differently, it plays comfortably on its outer side edge.',
      },
    ],
  },
  {
    id: '3.3',
    moduleId: 'posture',
    numberLabel: 'Lesson 3.3',
    title: 'Standard Finger Numbering',
    subtitle: 'Master the universal 1–5 finger system shared across every piano score.',
    durationMinutes: 5,
    xpReward: 40,
    objectives: [
      'Memorize fingers 1 (Thumb) through 5 (Little Finger) for both hands.',
      'Read finger numbers above sheet music notes immediately.',
    ],
    sections: [
      {
        heading: 'Thumbs Are Always 1',
        body: [
          'Piano sheet music places small numbers (1–5) above or below notes to suggest comfortable hand positions. Both hands use the exact same mirror system: Thumb = 1, Index = 2, Middle = 3, Ring = 4, Little finger = 5.',
          'Practice tapping fingers 1 through 5 in our interactive hand diagram below while watching the matching keys light up.',
        ],
      },
    ],
    terminology: [
      { term: 'Fingering', definition: 'The numbered assignment (1–5) telling you which finger plays each note smoothly.' },
    ],
    summary:
      'In both right and left hands, 1 is always your thumb and 5 is always your pinky—making every five-finger pattern easy to follow.',
    knowledgeCheck: [
      {
        id: '3.3-q1',
        prompt: 'In standard piano finger numbering, what number is your ring finger on either hand?',
        options: ['2', '3', '4', '5'],
        correctIndex: 2,
        explanation: 'Thumb = 1, Index = 2, Middle = 3, Ring = 4, Pinky = 5.',
      },
    ],
  },
  {
    id: '3.4',
    moduleId: 'posture',
    numberLabel: 'Lesson 3.4',
    title: 'Basic Playing Techniques',
    subtitle: 'Develop finger independence, clean single-note release, and smooth legato connections.',
    durationMinutes: 7,
    xpReward: 45,
    objectives: [
      'Play individual notes cleanly without neighboring fingers pressing down accidentally.',
      'Connect notes smoothly (legato) vs. crisply (staccato) with relaxed wrists.',
    ],
    sections: [
      {
        heading: 'Finger Independence & Smooth Transitions',
        body: [
          'Beginners often press a key while neighboring fingers tense up or lift stiffly into the air. Keep resting fingers lightly touching the surface of their keys while one finger moves from the main knuckle.',
          'To play legato (smoothly connected), release the first key at the exact instant the next key lands—like transferring your weight smoothly from one foot to the other while walking.',
        ],
      },
    ],
    terminology: [
      { term: 'Legato', definition: 'Smooth, connected playing with no silent gap between consecutive notes.' },
      { term: 'Staccato', definition: 'Crisp, detached articulation where notes are released quickly.' },
    ],
    summary:
      'Independent knuckle motion, relaxed non-playing fingers, and weight-transfer legato form the foundation of expressive technique.',
    knowledgeCheck: [
      {
        id: '3.4-q1',
        prompt: 'What does playing "legato" mean?',
        options: [
          'Playing as loudly as possible',
          'Connecting notes smoothly without gaps',
          'Detaching every note crisply',
          'Playing only with the left hand',
        ],
        correctIndex: 1,
        explanation: 'Legato means smooth and connected—transferring weight seamlessly from finger to finger.',
      },
    ],
  },

  // MODULE 4 — MUSIC THEORY FUNDAMENTALS
  {
    id: '4.1',
    moduleId: 'theory',
    numberLabel: 'Lesson 4.1',
    title: 'Musical Notation & The Grand Staff',
    subtitle: 'Read the five-line staff, Treble Clef, Bass Clef, and note positions.',
    durationMinutes: 8,
    xpReward: 45,
    objectives: [
      'Count the 5 lines and 4 spaces of the musical staff from bottom to top.',
      'Distinguish the Treble Clef (usually right hand) and Bass Clef (usually left hand).',
    ],
    sections: [
      {
        heading: 'Five Lines, Four Spaces',
        body: [
          'Music is written on a staff made of five horizontal lines and four spaces in between. Higher positions on the staff mean higher pitches to the right on the piano.',
          'Piano music joins two staves together into a Grand Staff: the top staff uses the Treble Clef (G Clef) for higher notes, and the bottom staff uses the Bass Clef (F Clef) for lower bass notes. Middle C sits gracefully on a tiny ledger line directly between them.',
        ],
      },
    ],
    terminology: [
      { term: 'Staff', definition: 'A set of 5 horizontal lines and 4 spaces on which notes are written.' },
      { term: 'Treble Clef', definition: 'Upper clef curling around the G4 line, typically played by the right hand.' },
      { term: 'Bass Clef', definition: 'Lower clef with two dots around the F3 line, typically played by the left hand.' },
    ],
    summary:
      'The Grand Staff maps pitch height visually: Treble Clef lines/spaces guide higher melodies while Bass Clef guides lower harmonies, meeting at Middle C.',
    knowledgeCheck: [
      {
        id: '4.1-q1',
        prompt: 'How many lines and spaces make up a single standard musical staff?',
        options: ['4 lines and 3 spaces', '5 lines and 4 spaces', '6 lines and 5 spaces', '5 lines and 5 spaces'],
        correctIndex: 1,
        explanation: 'Every standard musical staff consists of 5 horizontal lines and 4 spaces between them.',
      },
    ],
  },
  {
    id: '4.2',
    moduleId: 'theory',
    numberLabel: 'Lesson 4.2',
    title: 'Note Durations & Rhythm Values',
    subtitle: 'Compare whole, half, quarter, eighth, and sixteenth notes visually and by ear.',
    durationMinutes: 7,
    xpReward: 45,
    objectives: [
      'Recognize note heads, stems, and flags for whole through sixteenth notes.',
      'Count exact beat durations in 4/4 time.',
    ],
    sections: [
      {
        heading: 'Dividing Musical Time in Halves',
        body: [
          'Note shapes tell you how long to hold a key. In common 4/4 time, a Whole Note fills all 4 beats; a Half Note lasts 2 beats; a Quarter Note lasts 1 beat; an Eighth Note lasts 1/2 beat; and a Sixteenth Note lasts 1/4 beat.',
          'Click any duration card in the interactive notation lab below to hear its exact pulse against a steady beat.',
        ],
      },
    ],
    terminology: [
      { term: 'Whole Note', definition: 'Hollow oval notehead lasting 4 beats in 4/4 time.' },
      { term: 'Quarter Note', definition: 'Filled notehead with stem lasting 1 beat in 4/4 time.' },
      { term: 'Eighth Note', definition: 'Filled notehead with stem and single flag/beam lasting 1/2 beat.' },
    ],
    summary:
      'Each rhythmic subdivision cuts the previous duration cleanly in half: Whole (4) → Half (2) → Quarter (1) → Eighth (1/2) → Sixteenth (1/4).',
    knowledgeCheck: [
      {
        id: '4.2-q1',
        prompt: 'In 4/4 time, how many quarter notes equal the length of one whole note?',
        options: ['2 quarter notes', '3 quarter notes', '4 quarter notes', '8 quarter notes'],
        correctIndex: 2,
        explanation: 'A whole note spans 4 beats, which equals four 1-beat quarter notes.',
      },
    ],
  },
  {
    id: '4.3',
    moduleId: 'theory',
    numberLabel: 'Lesson 4.3',
    title: 'Rhythm, Tempo & Time Signatures',
    subtitle: 'Master BPM, 4/4 vs. 3/4 meter, and practice steady timing with the live metronome.',
    durationMinutes: 7,
    xpReward: 50,
    objectives: [
      'Explain BPM (Beats Per Minute) and tempo consistency.',
      'Contrast 4/4 march/pop feel with 3/4 waltz meter.',
      'Use the interactive metronome to keep steady pulse.',
    ],
    sections: [
      {
        heading: 'Pulse, Speed, and Grouping',
        body: [
          'Tempo measures speed in BPM (Beats Per Minute): 60 BPM clicks once every second, while 120 BPM clicks twice per second.',
          'Time signatures sit at the beginning of a piece. The top number tells you how many beats fit inside each measure: 4/4 counts "1–2–3–4", while 3/4 counts a swaying waltz "1–2–3".',
        ],
      },
    ],
    terminology: [
      { term: 'BPM', definition: 'Beats Per Minute — exact numeric measurement of musical tempo.' },
      { term: '4/4 Time', definition: 'Common time with 4 quarter-note beats per measure.' },
      { term: '3/4 Time', definition: 'Triple waltz meter with 3 quarter-note beats per measure.' },
    ],
    summary:
      'Steady rhythm comes from locking your fingers onto an internal pulse—using a metronome at slow BPM builds rock-solid timing.',
    knowledgeCheck: [
      {
        id: '4.3-q1',
        prompt: 'What does the top number "3" in a 3/4 time signature tell you?',
        options: [
          'Play with 3 fingers only',
          'There are 3 beats in every measure',
          'Play at 30 BPM',
          'Hold every note for 3 seconds',
        ],
        correctIndex: 1,
        explanation: 'The top number of a time signature specifies how many beats appear per measure.',
      },
    ],
  },
  {
    id: '4.4',
    moduleId: 'theory',
    numberLabel: 'Lesson 4.4',
    title: 'Major & Minor Scales',
    subtitle: 'Build C Major, G Major, F Major, and A Natural Minor using step patterns.',
    durationMinutes: 8,
    xpReward: 50,
    objectives: [
      'Apply the Major scale formula: Whole–Whole–Half–Whole–Whole–Whole–Half.',
      'Play and compare C Major, G Major, F Major, and A Minor on the interactive scale keyboard.',
    ],
    sections: [
      {
        heading: 'The Secret Formula Behind Every Major Scale',
        body: [
          'Any Major scale—no matter what note it starts on—follows one unchanging pattern of Whole (W) and Half (H) steps: W – W – H – W – W – W – H.',
          'Starting on C gives C–D–E–F–G–A–B–C using all white keys. Starting on G requires F# so the seventh step stays a half step below G; starting on F requires Bb.',
          'Natural Minor scales shift that step spacing to W – H – W – W – H – W – W, giving A Minor a gentle, introspective sound.',
        ],
      },
    ],
    terminology: [
      { term: 'Major Scale Formula', definition: 'W – W – H – W – W – W – H step sequence.' },
      { term: 'Key Signature', definition: 'Sharps or flats grouped at the start of a staff (e.g., 1 sharp for G Major).' },
    ],
    summary:
      'Every Major scale shares the same W–W–H–W–W–W–H blueprint, while Minor scales adjust the 3rd, 6th, and 7th steps for a warmer, darker color.',
    knowledgeCheck: [
      {
        id: '4.4-q1',
        prompt: 'Which black key is needed to build the G Major scale correctly?',
        options: ['C#', 'F#', 'Bb', 'Eb'],
        correctIndex: 1,
        explanation: 'G Major uses F# (F sharp) as its seventh note so there is a half step between F# and G.',
      },
    ],
  },
  {
    id: '4.5',
    moduleId: 'theory',
    numberLabel: 'Lesson 4.5',
    title: 'Chords & Basic Triads',
    subtitle: 'Combine three notes to play C Major, F Major, G Major, and A Minor harmonies.',
    durationMinutes: 8,
    xpReward: 50,
    objectives: [
      'Build a three-note triad using Root, 3rd, and 5th.',
      'Hear and distinguish bright Major triads from expressive Minor triads.',
    ],
    sections: [
      {
        heading: 'How Three Notes Create Rich Harmony',
        body: [
          'A chord occurs whenever multiple notes sound together. The most essential piano chord is a triad—three notes stacked by skipping every other white key: Root + 3rd + 5th.',
          'In a Major triad (like C–E–G), the bottom interval is a Major 3rd (4 half steps). Lowering that middle note by just ONE half step turns C Major into C Minor (3 half steps), transforming bright sunshine into contemplative shade.',
          'Click any chord in the Chord Explorer below to hear all three notes ring together and inspect its shape on the keyboard.',
        ],
      },
    ],
    terminology: [
      { term: 'Triad', definition: 'A three-note chord built from a Root, Third, and Fifth.' },
      { term: 'Major vs. Minor 3rd', definition: '4 half steps creates a bright Major triad; 3 half steps creates a Minor triad.' },
    ],
    summary:
      'C Major (C–E–G), F Major (F–A–C), G Major (G–B–D), and A Minor (A–C–E) form the harmonic backbone of thousands of songs.',
    knowledgeCheck: [
      {
        id: '4.5-q1',
        prompt: 'Which three notes form the C Major triad?',
        options: ['C – D – E', 'C – E – G', 'C – F – A', 'C – Eb – G'],
        correctIndex: 1,
        explanation: 'Stacking every other white key from C gives Root C, Major 3rd E, and Perfect 5th G.',
      },
    ],
  },
];
