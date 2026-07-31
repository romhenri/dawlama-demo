// A GitHub-style contribution graph, reimagined as "sessions committed".
// Fully deterministic from a seed — no real data behind it.
const WEEKS = 27;
const DAYS = 7;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function intensity(seed: number) {
  const n = ((Math.sin(seed * 91.7) * 43758.5) % 1 + 1) % 1;
  // bias toward the low end so the graph breathes
  if (n < 0.45) return 0;
  if (n < 0.68) return 1;
  if (n < 0.85) return 2;
  if (n < 0.95) return 3;
  return 4;
}

const LEVEL_BG = [
  "color-mix(in srgb, var(--accent) 6%, var(--bg-soft))",
  "color-mix(in srgb, var(--accent) 28%, var(--bg-soft))",
  "color-mix(in srgb, var(--accent) 50%, var(--bg-soft))",
  "color-mix(in srgb, var(--accent) 72%, transparent)",
  "var(--accent)",
];

export function ReleaseHeatmap() {
  let total = 0;
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const lvl = intensity(w * 7 + d + 3);
      col.push(lvl);
      total += lvl;
    }
    grid.push(col);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs text-[var(--text-dim)]">
        <span className="font-medium text-[var(--text)]">{total} commits</span>
        <span>in the last 6 months</span>
        <span className="mono ml-auto text-[var(--text-faint)]">longest streak · 14 days</span>
      </div>

      <div className="overflow-x-auto px-4 py-4">
        <div className="inline-flex flex-col gap-1.5">
          {/* month labels */}
          <div className="flex gap-[3px] pl-0 text-[10px] text-[var(--text-faint)]">
            {grid.map((_, w) => (
              <div key={w} className="w-[13px] shrink-0 text-center">
                {w % 5 === 0 ? MONTHS[(1 + Math.floor(w / 4.4)) % 12] : ""}
              </div>
            ))}
          </div>
          {/* the grid: 7 rows (days) × WEEKS columns */}
          <div className="flex flex-col gap-[3px]">
            {Array.from({ length: DAYS }).map((_, d) => (
              <div key={d} className="flex gap-[3px]">
                {grid.map((col, w) => (
                  <span
                    key={w}
                    title={`${col[d] === 0 ? "No" : col[d]} commit${col[d] === 1 ? "" : "s"}`}
                    className="h-[13px] w-[13px] shrink-0 rounded-[3px]"
                    style={{ background: LEVEL_BG[col[d]] }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* legend */}
          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[var(--text-faint)]">
            <span>less</span>
            {LEVEL_BG.map((bg, i) => (
              <span key={i} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: bg }} />
            ))}
            <span>more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
