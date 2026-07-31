// ─────────────────────────────────────────────────────────────────────────
//  dawlama mock data
//  Everything here is fake. No audio plays, no files exist, no git runs.
//  It exists purely to make the demo look alive.
// ─────────────────────────────────────────────────────────────────────────

export const BARS = 32; // width of every timeline grid

export type RegionKind = "kept" | "added" | "removed";

export interface Region {
  start: number; // bar index (0-based)
  length: number; // in bars
  kind?: RegionKind; // used by the diff view; defaults to "kept"
  gain?: number; // 0..1, drives the faux-waveform density
}

export interface Track {
  name: string;
  color: string; // neon accent
  muted?: boolean;
  regions: Region[];
}

export type FileKind = "daw" | "audio" | "midi" | "folder" | "doc";

export interface RepoFile {
  name: string;
  kind: FileKind;
  message: string;
  when: string;
  size?: string;
}

export interface MetaChange {
  label: string;
  from?: string;
  to?: string;
  kind: "changed" | "added" | "removed";
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  when: string;
  additions: number;
  deletions: number;
  meta: MetaChange[];
  before: Track[];
  after: Track[];
}

export interface Repo {
  slug: string;
  owner: string;
  name: string;
  description: string;
  genre: string;
  genreColor: string;
  bpm: number;
  musicalKey: string;
  stars: number;
  forks: number;
  contributors: string[]; // hex colours; rendered as user-glyph avatars
  updated: string;
  files: RepoFile[];
  tracks: Track[]; // the "HEAD" arrangement shown in the hero timeline
  readme: string;
  commits: Commit[];
}

// helper to keep the mock terse
const r = (start: number, length: number, gain = 0.7, kind: RegionKind = "kept"): Region => ({
  start,
  length,
  gain,
  kind,
});

// ── HEAD arrangement for lofi-beat ────────────────────────────────────────
const lofiTracks: Track[] = [
  {
    name: "Drums",
    color: "#f472b6",
    regions: [r(0, 4, 0.9), r(4, 4, 0.85), r(8, 8, 0.95), r(16, 8, 0.9), r(24, 6, 0.8)],
  },
  {
    name: "Bass",
    color: "#a78bfa",
    regions: [r(2, 6, 0.6), r(8, 8, 0.75), r(16, 12, 0.8)],
  },
  {
    name: "Rhodes",
    color: "#38bdf8",
    regions: [r(0, 8, 0.5), r(8, 8, 0.55), r(16, 8, 0.6), r(24, 8, 0.5)],
  },
  {
    name: "Pad",
    color: "#34d399",
    regions: [r(8, 16, 0.35), r(24, 8, 0.4)],
  },
  {
    name: "Vinyl FX",
    color: "#fbbf24",
    muted: false,
    regions: [r(0, 32, 0.25)],
  },
];

export const repos: Repo[] = [
  {
    slug: "lofi-beat",
    owner: "kanpai",
    name: "lofi-beat",
    description: "Rainy-day boom-bap loop. Fork it, remix it, break the 4-bar rule.",
    genre: "Lo-Fi Hip-Hop",
    genreColor: "#a78bfa",
    bpm: 82,
    musicalKey: "A min",
    stars: 1284,
    forks: 217,
    contributors: ["#a78bfa", "#f472b6", "#38bdf8", "#34d399"],
    updated: "2 hours ago",
    files: [
      { name: "assets", kind: "folder", message: "add extra vinyl crackle samples", when: "5 days ago" },
      { name: "stems", kind: "folder", message: "bounce stems @ 24bit", when: "3 days ago" },
      { name: "master.daw", kind: "daw", message: "extend synth pad, add vinyl FX bus", when: "2 hours ago", size: "8.4 MB" },
      { name: "idea-sketch.daw", kind: "daw", message: "rough humming melody at 3am", when: "6 days ago", size: "2.1 MB" },
      { name: "drum-bus.midi", kind: "midi", message: "swing quantize 58%", when: "2 days ago", size: "14 KB" },
      { name: "kick_vintage.wav", kind: "audio", message: "layered 909 + tape kick", when: "4 days ago", size: "512 KB" },
      { name: "README.md", kind: "doc", message: "document the chord progression", when: "1 day ago", size: "1.2 KB" },
    ],
    tracks: lofiTracks,
    readme: [
      "# lofi-beat",
      "",
      "A cozy 82 BPM loop in **A minor**. Built in dawlama, versioned like code.",
      "",
      "## Chord progression",
      "`Am9 → Dm7 → Fmaj7 → E7♭9`  — swung, quantize @ 58%.",
      "",
      "## How to contribute",
      "1. Fork the repo",
      "2. Open `master.daw` in your DAW of choice",
      "3. Commit stems, not full bounces — keep the diff readable",
      "",
      "> Nothing here actually plays. It's a demo. Vibe with your imagination.",
    ].join("\n"),
    commits: [
      {
        sha: "a1f9c02",
        message: "extend synth pad, add vinyl FX bus",
        author: "kanpai",
        when: "2 hours ago",
        additions: 3,
        deletions: 1,
        meta: [
          { label: "Vinyl FX bus", kind: "added", to: "-6 dB crackle" },
          { label: "Pad length", kind: "changed", from: "8 bars", to: "16 bars" },
          { label: "Master ceiling", kind: "changed", from: "-0.3 dB", to: "-1.0 dB" },
        ],
        before: [
          { name: "Drums", color: "#f472b6", regions: [r(0, 4, 0.9), r(4, 4, 0.85), r(8, 8, 0.95), r(16, 8, 0.9), r(24, 6, 0.8)] },
          { name: "Bass", color: "#a78bfa", regions: [r(2, 6, 0.6), r(8, 8, 0.75), r(16, 12, 0.8)] },
          { name: "Rhodes", color: "#38bdf8", regions: [r(0, 8, 0.5), r(8, 8, 0.55), r(16, 8, 0.6), r(24, 8, 0.5)] },
          { name: "Pad", color: "#34d399", regions: [r(8, 8, 0.35, "removed")] },
        ],
        after: [
          { name: "Drums", color: "#f472b6", regions: [r(0, 4, 0.9), r(4, 4, 0.85), r(8, 8, 0.95), r(16, 8, 0.9), r(24, 6, 0.8)] },
          { name: "Bass", color: "#a78bfa", regions: [r(2, 6, 0.6), r(8, 8, 0.75), r(16, 12, 0.8)] },
          { name: "Rhodes", color: "#38bdf8", regions: [r(0, 8, 0.5), r(8, 8, 0.55), r(16, 8, 0.6), r(24, 8, 0.5)] },
          { name: "Pad", color: "#34d399", regions: [r(8, 16, 0.35, "added"), r(24, 8, 0.4, "added")] },
          { name: "Vinyl FX", color: "#fbbf24", regions: [r(0, 32, 0.25, "added")] },
        ],
      },
      {
        sha: "7be3d41",
        message: "swing quantize drums to 58%, tighten bass",
        author: "fox",
        when: "2 days ago",
        additions: 2,
        deletions: 2,
        meta: [
          { label: "Drum swing", kind: "changed", from: "50%", to: "58%" },
          { label: "Bass region", kind: "changed", from: "16 bars", to: "12 bars" },
        ],
        before: [
          { name: "Drums", color: "#f472b6", regions: [r(0, 8, 0.9, "removed"), r(8, 8, 0.95), r(16, 16, 0.9)] },
          { name: "Bass", color: "#a78bfa", regions: [r(2, 6, 0.6), r(8, 16, 0.8, "removed")] },
        ],
        after: [
          { name: "Drums", color: "#f472b6", regions: [r(0, 4, 0.9, "added"), r(4, 4, 0.85, "added"), r(8, 8, 0.95), r(16, 16, 0.9)] },
          { name: "Bass", color: "#a78bfa", regions: [r(2, 6, 0.6), r(8, 8, 0.75, "added"), r(16, 12, 0.8, "added")] },
        ],
      },
      {
        sha: "3c0a8fe",
        message: "initial commit — humming melody + kick",
        author: "kanpai",
        when: "6 days ago",
        additions: 4,
        deletions: 0,
        meta: [
          { label: "Rhodes", kind: "added", to: "4 regions" },
          { label: "Kick (vintage)", kind: "added", to: "909 + tape" },
        ],
        before: [],
        after: [
          { name: "Rhodes", color: "#38bdf8", regions: [r(0, 8, 0.5, "added"), r(8, 8, 0.55, "added")] },
          { name: "Drums", color: "#f472b6", regions: [r(8, 8, 0.95, "added")] },
        ],
      },
    ],
  },
];

// A handful of extra repos so the explore page feels populated.
export const exploreRepos = [
  {
    slug: "lofi-beat",
    owner: "kanpai",
    name: "lofi-beat",
    description: "Rainy-day boom-bap loop. Fork it, remix it.",
    genre: "Lo-Fi Hip-Hop",
    genreColor: "#a78bfa",
    stars: 1284,
    forks: 217,
    updated: "2 hours ago",
    tracks: 5,
  },
  {
    slug: "acid-303",
    owner: "modular_moth",
    name: "acid-303",
    description: "Squelchy 303 acid line with resonance automation baked in.",
    genre: "Acid Techno",
    genreColor: "#f472b6",
    stars: 842,
    forks: 96,
    updated: "yesterday",
    tracks: 7,
  },
  {
    slug: "orchestral-wip",
    owner: "cello.wav",
    name: "orchestral-wip",
    description: "Film-score sketch. Strings section needs a second pass.",
    genre: "Cinematic",
    genreColor: "#38bdf8",
    stars: 431,
    forks: 44,
    updated: "3 days ago",
    tracks: 18,
  },
  {
    slug: "dnb-roller",
    owner: "amenbrother",
    name: "dnb-roller",
    description: "174 BPM roller. Chopped amen, sub that rattles teeth.",
    genre: "Drum & Bass",
    genreColor: "#34d399",
    stars: 2109,
    forks: 388,
    updated: "6 hours ago",
    tracks: 9,
  },
  {
    slug: "vapor-mall",
    owner: "a e s t h e t i c",
    name: "vapor-mall",
    description: "Slowed & reverbed mall muzak. Peak 1994 energy.",
    genre: "Vaporwave",
    genreColor: "#fbbf24",
    stars: 668,
    forks: 71,
    updated: "5 days ago",
    tracks: 6,
  },
  {
    slug: "granular-bed",
    owner: "ríos",
    name: "granular-bed",
    description: "Ambient granular texture generated from a single field recording.",
    genre: "Ambient",
    genreColor: "#c084fc",
    stars: 297,
    forks: 22,
    updated: "1 week ago",
    tracks: 4,
  },
];

export function getRepo(slug: string): Repo | undefined {
  return repos.find((repo) => repo.slug === slug);
}

// ─────────────────────────────────────────────────────────────────────────
//  Profiles — the "public music résumé"
// ─────────────────────────────────────────────────────────────────────────

export interface PinnedRepo {
  slug: string;
  owner: string;
  name: string;
  description: string;
  genre: string;
  genreColor: string;
  stars: number;
  forks: number;
  live?: boolean;
}

export interface FeaturedTrack {
  title: string;
  role: string; // "produced" · "mixed" · "collab"
  bpm: number;
  musicalKey: string;
  tracks: Track[]; // rendered as a mini timeline
}

export interface ActivityItem {
  kind: "commit" | "release" | "fork" | "star";
  text: string;
  repo: string;
  when: string;
}

export interface Skill {
  label: string;
  color: string;
}

export interface Profile {
  handle: string;
  name: string;
  pronouns?: string;
  tagline: string;
  bio: string;
  location: string;
  website: string;
  joined: string;
  available: boolean; // "open to collabs"
  followers: number;
  following: number;
  sessions: number;
  starsEarned: number;
  daws: string[];
  genres: Skill[];
  instruments: string[];
  pinned: PinnedRepo[];
  featured: FeaturedTrack[];
  activity: ActivityItem[];
}

const profiles: Profile[] = [
  {
    handle: "kanpai",
    name: "Kan Pai",
    pronouns: "they/them",
    tagline: "lo-fi producer · sampling everything that rains",
    bio: "Bedroom producer turning 3am voice-memos into version-controlled beats. I commit stems, not bounces. Big on swing, tape hiss, and Rhodes chords that don't resolve.",
    location: "Lisbon, PT",
    website: "kanpai.audio",
    joined: "Joined March 2023",
    available: true,
    followers: 4820,
    following: 187,
    sessions: 42,
    starsEarned: 6130,
    daws: ["Ableton Live", "Renoise", "Reaper"],
    genres: [
      { label: "Lo-Fi Hip-Hop", color: "#a78bfa" },
      { label: "Boom Bap", color: "#f472b6" },
      { label: "Ambient", color: "#c084fc" },
      { label: "Jazz-hop", color: "#38bdf8" },
    ],
    instruments: ["Rhodes", "SP-404", "Upright bass", "Field recorder", "MPC"],
    pinned: [
      {
        slug: "lofi-beat",
        owner: "kanpai",
        name: "lofi-beat",
        description: "Rainy-day boom-bap loop. Fork it, remix it, break the 4-bar rule.",
        genre: "Lo-Fi Hip-Hop",
        genreColor: "#a78bfa",
        stars: 1284,
        forks: 217,
        live: true,
      },
      {
        slug: "granular-bed",
        owner: "kanpai",
        name: "granular-bed",
        description: "Ambient granular texture from a single rainy field recording.",
        genre: "Ambient",
        genreColor: "#c084fc",
        stars: 297,
        forks: 22,
      },
      {
        slug: "tape-loops-vol2",
        owner: "kanpai",
        name: "tape-loops-vol2",
        description: "Eight degrading cassette loops. Wow & flutter included, on purpose.",
        genre: "Experimental",
        genreColor: "#fbbf24",
        stars: 512,
        forks: 63,
      },
      {
        slug: "rhodes-chords",
        owner: "kanpai",
        name: "rhodes-chords",
        description: "A MIDI pack of unresolved 9th chords. Sample-license friendly.",
        genre: "Sample Pack",
        genreColor: "#34d399",
        stars: 933,
        forks: 148,
      },
    ],
    featured: [
      {
        title: "master.daw — lofi-beat",
        role: "produced",
        bpm: 82,
        musicalKey: "A min",
        tracks: [
          { name: "Drums", color: "#f472b6", regions: [r(0, 4, 0.9), r(8, 8, 0.95), r(16, 8, 0.9), r(24, 6, 0.8)] },
          { name: "Bass", color: "#a78bfa", regions: [r(2, 6, 0.6), r(8, 8, 0.75), r(16, 12, 0.8)] },
          { name: "Rhodes", color: "#38bdf8", regions: [r(0, 8, 0.5), r(16, 8, 0.6), r(24, 8, 0.5)] },
        ],
      },
      {
        title: "bed-01.daw — granular-bed",
        role: "sound design",
        bpm: 60,
        musicalKey: "D dorian",
        tracks: [
          { name: "Grains", color: "#c084fc", regions: [r(0, 32, 0.4)] },
          { name: "Sub", color: "#a78bfa", regions: [r(4, 12, 0.5), r(20, 10, 0.5)] },
          { name: "Air", color: "#34d399", regions: [r(0, 16, 0.25), r(18, 14, 0.3)] },
        ],
      },
    ],
    activity: [
      { kind: "commit", text: "extend synth pad, add vinyl FX bus", repo: "lofi-beat", when: "2 hours ago" },
      { kind: "release", text: "tagged v1.3 “rainy-window”", repo: "lofi-beat", when: "yesterday" },
      { kind: "star", text: "starred amenbrother/dnb-roller", repo: "dnb-roller", when: "2 days ago" },
      { kind: "commit", text: "bounce 8 cassette loops @ 24bit", repo: "tape-loops-vol2", when: "3 days ago" },
      { kind: "fork", text: "forked cello.wav/orchestral-wip", repo: "orchestral-wip", when: "5 days ago" },
      { kind: "commit", text: "add 12 unresolved 9th voicings", repo: "rhodes-chords", when: "1 week ago" },
    ],
  },
];

export function getProfile(handle: string): Profile | undefined {
  return profiles.find((p) => p.handle.toLowerCase() === handle.toLowerCase());
}
