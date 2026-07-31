"use client";

import { useState } from "react";
import { type RepoFile } from "../data/mock";
import { Icon, type IconName } from "./Icon";

// approximate rendered height of one row (py-2 + 20px line) — used to size the filler below
const ROW_H = 37;

const ICONS: Record<RepoFile["kind"], { name: IconName; color: string }> = {
  folder: { name: "folder", color: "var(--accent-2)" },
  daw: { name: "faders", color: "var(--accent)" },
  audio: { name: "waveform", color: "#38bdf8" },
  midi: { name: "piano", color: "#34d399" },
  doc: { name: "file", color: "var(--text-dim)" },
};

export function FileTree({
  files,
  activeName,
  onNote,
}: {
  files: RepoFile[];
  activeName?: string;
  onNote?: string;
}) {
  const [compact, setCompact] = useState(false);

  return (
    <div
      className={`shrink-0 space-y-4 transition-[width] duration-200 lg:w-[var(--rail)] ${
        compact ? "[--rail:300px]" : "[--rail:600px]"
      }`}
    >
      {/* caption row — mirrors the timeline caption on the right so both align */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-faint)]">
        <span className="mono text-[var(--accent-2)]">files</span>
        {!compact && <span>· source tree at HEAD</span>}
        <button
          type="button"
          onClick={() => setCompact((c) => !c)}
          aria-pressed={compact}
          className="ml-auto flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-1 hover:border-[var(--accent)]"
        >
          <Icon name={compact ? "expand" : "collapse"} size={12} />
          {compact ? "expand" : "compact"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-3 py-2 text-xs text-[var(--text-dim)]">
          <span className="tag">
            <Icon name="branch" size={12} /> main
          </span>
          <span className="mono">{files.length} items</span>
          {onNote && !compact && <span className="ml-auto text-[var(--text-faint)]">{onNote}</span>}
        </div>
        <ul className="divide-y divide-[var(--border)] text-sm">
          {files.map((f) => {
            const active = f.name === activeName;
            return (
              <li
                key={f.name}
                className={`flex items-center gap-3 px-3 py-2 hover:bg-[var(--panel-hi)] ${
                  active ? "bg-[var(--panel-hi)]" : ""
                }`}
              >
                <span className="grid w-5 place-items-center" style={{ color: ICONS[f.kind].color }}>
                  <Icon name={ICONS[f.kind].name} size={16} />
                </span>
                <span
                  className={`mono truncate ${
                    f.kind === "daw" ? "text-[var(--accent)]" : "text-[var(--text)]"
                  } ${active ? "font-semibold" : ""}`}
                >
                  {f.name}
                </span>
                {!compact && (
                  <span className="ml-2 hidden truncate text-[var(--text-faint)] sm:inline">
                    {f.message}
                  </span>
                )}
                {f.size ? (
                  <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-[var(--text-faint)]">
                    {f.size}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/* empty room below the list so the panel stands ~2x taller than its rows */}
        <div aria-hidden style={{ height: files.length * ROW_H }} />
      </div>
    </div>
  );
}
