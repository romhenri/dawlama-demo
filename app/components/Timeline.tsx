"use client";

import { useState } from "react";
import { BARS, type Track } from "../data/mock";
import { TrackLanes } from "./TrackLanes";
import { Icon } from "./Icon";

export function Timeline({
  tracks,
  bpm,
  musicalKey,
  fileName,
}: {
  tracks: Track[];
  bpm: number;
  musicalKey: string;
  fileName: string;
}) {
  const [playing, setPlaying] = useState(false);

  // 32 bars of 4 beats at `bpm` → loop duration in seconds (purely cosmetic)
  const loopDur = (BARS * 4 * 60) / bpm;

  return (
    <section className="glow overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      {/* transport bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2.5">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-hi)] bg-[var(--bg-soft)] text-[var(--accent)] hover:border-[var(--accent)]"
          aria-label={playing ? "Pause" : "Play"}
        >
          <Icon name={playing ? "pause" : "play"} size={15} />
        </button>
        <div className="mono text-sm text-[var(--text)]">{fileName}</div>
        <span className="tag">{bpm} BPM</span>
        <span className="tag">{musicalKey}</span>
        <span className="tag">4/4</span>

        <div className="ml-auto flex items-center gap-3 text-xs text-[var(--text-faint)]">
          <span className={`mono ${playing ? "text-[var(--accent)]" : ""}`}>
            {playing ? "● playing" : "○ stopped"}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="mono hidden sm:inline">{tracks.length} tracks</span>
        </div>
      </div>

      {/* bar ruler */}
      <div className="flex border-b border-[var(--border)] bg-[var(--bg-soft)] text-[10px] text-[var(--text-faint)]">
        <div className="w-28 shrink-0 border-r border-[var(--border)] px-3 py-1 mono">bars</div>
        <div className="flex flex-1">
          {Array.from({ length: BARS / 4 }).map((_, i) => (
            <div
              key={i}
              className="mono flex-1 border-r border-[var(--grid-strong)] px-1 py-1 last:border-r-0"
            >
              {i * 4 + 1}
            </div>
          ))}
        </div>
      </div>

      {/* lanes + sweeping playhead */}
      <div className="relative">
        <TrackLanes tracks={tracks} />
        {/* playhead lives only over the lane area (offset by the 7rem label col) */}
        <div className="pointer-events-none absolute inset-y-0 left-28 right-0">
          <div
            className={`playhead absolute top-0 bottom-0 w-px bg-[var(--accent)] ${playing ? "" : "paused"}`}
            style={{ ["--loop-dur" as string]: `${loopDur}s`, boxShadow: "0 0 10px 1px var(--accent)" }}
          >
            <span className="absolute -left-1 -top-0 h-2 w-2 rounded-full bg-[var(--accent)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
