import { Fragment } from "react";
import { Icon } from "./Icon";

/** Deliberately tiny markdown renderer — just enough for the mock READMEs. */
function inline(text: string, keyBase: string) {
  // split on `code` and **bold**
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`")) {
      return (
        <code key={`${keyBase}-${i}`} className="mono rounded bg-[var(--bg-soft)] px-1.5 py-0.5 text-[0.85em] text-[var(--accent)]">
          {p.slice(1, -1)}
        </code>
      );
    }
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyBase}-${i}`} className="font-semibold text-[var(--text)]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyBase}-${i}`}>{p}</Fragment>;
  });
}

export function Readme({ source }: { source: string }) {
  const lines = source.split("\n");
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs text-[var(--text-dim)]">
        <Icon name="file" size={14} /> <span className="mono">README.md</span>
      </div>
      <div className="space-y-2.5 px-5 py-5 text-sm leading-relaxed text-[var(--text-dim)]">
        {lines.map((line, i) => {
          if (line.trim() === "") return <div key={i} className="h-1" />;
          if (line.startsWith("## "))
            return (
              <h3 key={i} className="pt-2 text-base font-semibold text-[var(--text)]">
                {inline(line.slice(3), `h3-${i}`)}
              </h3>
            );
          if (line.startsWith("# "))
            return (
              <h2 key={i} className="text-xl font-bold text-[var(--text)]">
                {inline(line.slice(2), `h2-${i}`)}
              </h2>
            );
          if (line.startsWith("> "))
            return (
              <blockquote key={i} className="border-l-2 border-[var(--accent)] pl-3 italic text-[var(--text-faint)]">
                {inline(line.slice(2), `bq-${i}`)}
              </blockquote>
            );
          const ol = line.match(/^(\d+)\.\s+(.*)$/);
          if (ol)
            return (
              <div key={i} className="flex gap-2">
                <span className="mono text-[var(--text-faint)]">{ol[1]}.</span>
                <span>{inline(ol[2], `ol-${i}`)}</span>
              </div>
            );
          return <p key={i}>{inline(line, `p-${i}`)}</p>;
        })}
      </div>
    </div>
  );
}
