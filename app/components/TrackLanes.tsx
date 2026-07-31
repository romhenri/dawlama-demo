import { BARS, type Track, type RegionKind } from "../data/mock";
import { Icon } from "./Icon";

function kindStyle(kind: RegionKind | undefined, baseColor: string) {
  if (kind === "added") {
    return {
      background: "var(--add-bg)",
      borderColor: "var(--add)",
      boxShadow: "inset 0 0 0 1px var(--add)",
    } as const;
  }
  if (kind === "removed") {
    return {
      background: "var(--del-bg)",
      borderColor: "var(--del)",
      boxShadow: "inset 0 0 0 1px var(--del)",
      opacity: 0.85,
    } as const;
  }
  return {
    background: `color-mix(in srgb, ${baseColor} 26%, transparent)`,
    borderColor: `color-mix(in srgb, ${baseColor} 60%, transparent)`,
  } as const;
}

/**
 * The faux waveform: a row of vertical ticks whose heights come from a cheap
 * deterministic hash so every region looks different but stays stable across
 * renders. No audio is analysed — it's pure decoration.
 */
function Waveform({ seed, gain, color }: { seed: number; gain: number; color: string }) {
  const ticks = 26;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center gap-[2px] overflow-hidden px-1.5">
      {Array.from({ length: ticks }).map((_, i) => {
        const h = ((Math.sin(seed * 12.9898 + i * 4.1414) * 43758.5453) % 1 + 1) % 1;
        const height = 18 + h * 62 * gain;
        return (
          <span
            key={i}
            className="w-[2px] shrink-0 rounded-full"
            style={{ height: `${height}%`, background: color, opacity: 0.55 }}
          />
        );
      })}
    </div>
  );
}

export function TrackLanes({
  tracks,
  compact = false,
  dimEmpty = false,
  onDelete,
  onMove,
}: {
  tracks: Track[];
  compact?: boolean;
  dimEmpty?: boolean;
  /** When provided, each lane gets delete/move controls. Omit for read-only views. */
  onDelete?: (index: number) => void;
  onMove?: (index: number, dir: -1 | 1) => void;
}) {
  const rowH = compact ? "h-10" : "h-14";
  const editable = Boolean(onDelete || onMove);
  return (
    <div className="select-none">
      {tracks.length === 0 && (
        <div className="grid h-24 place-items-center text-sm text-[var(--text-faint)]">
          — empty arrangement —
        </div>
      )}
      {tracks.map((track, ti) => (
        <div
          key={track.name}
          className="group/lane flex items-stretch border-b border-[var(--border)] last:border-b-0"
        >
          {/* label column */}
          <div className="relative flex w-28 shrink-0 items-center gap-2 border-r border-[var(--border)] bg-[var(--bg-soft)] px-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: track.color }} />
            <span className="truncate text-xs font-medium text-[var(--text-dim)]">{track.name}</span>

            {editable && (
              <div className="absolute right-1 flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--panel-hi)] p-0.5 opacity-0 shadow transition group-hover/lane:opacity-100 focus-within:opacity-100">
                <button
                  type="button"
                  onClick={() => onMove?.(ti, -1)}
                  disabled={ti === 0}
                  aria-label={`Move ${track.name} up`}
                  title="Move up"
                  className="grid h-5 w-5 place-items-center rounded text-[var(--text-dim)] hover:bg-[var(--panel)] hover:text-[var(--text)] disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Icon name="up" size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onMove?.(ti, 1)}
                  disabled={ti === tracks.length - 1}
                  aria-label={`Move ${track.name} down`}
                  title="Move down"
                  className="grid h-5 w-5 place-items-center rounded text-[var(--text-dim)] hover:bg-[var(--panel)] hover:text-[var(--text)] disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Icon name="down" size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(ti)}
                  aria-label={`Delete ${track.name}`}
                  title="Delete track"
                  className="grid h-5 w-5 place-items-center rounded text-[var(--text-dim)] hover:bg-[var(--panel)] hover:text-[var(--del)]"
                >
                  <Icon name="trash" size={13} />
                </button>
              </div>
            )}
          </div>

          {/* lane */}
          <div className={`relative flex-1 ${rowH}`} style={{ background: dimEmpty ? "transparent" : undefined }}>
            {/* bar grid */}
            <div className="pointer-events-none absolute inset-0 flex">
              {Array.from({ length: BARS }).map((_, b) => (
                <div
                  key={b}
                  className="h-full flex-1"
                  style={{ borderRight: `1px solid ${b % 4 === 3 ? "var(--grid-strong)" : "var(--grid)"}` }}
                />
              ))}
            </div>

            {/* regions */}
            {track.regions.map((reg, ri) => {
              const style = kindStyle(reg.kind, track.color);
              return (
                <div
                  key={ri}
                  className="region absolute top-1 bottom-1 overflow-hidden rounded-[5px] border"
                  style={{
                    left: `${(reg.start / BARS) * 100}%`,
                    width: `${(reg.length / BARS) * 100}%`,
                    ...style,
                  }}
                  title={`${track.name} · bars ${reg.start + 1}–${reg.start + reg.length}${
                    reg.kind && reg.kind !== "kept" ? ` · ${reg.kind}` : ""
                  }`}
                >
                  <Waveform seed={reg.start + ti * 7 + ri * 3 + 1} gain={reg.gain ?? 0.7} color={track.color} />
                  {reg.kind === "added" && (
                    <span className="absolute right-1 top-0.5 text-[9px] font-bold text-[var(--add)]">+</span>
                  )}
                  {reg.kind === "removed" && (
                    <span className="absolute right-1 top-0.5 text-[9px] font-bold text-[var(--del)]">−</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
