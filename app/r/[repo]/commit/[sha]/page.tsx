import Link from "next/link";
import { notFound } from "next/navigation";
import { getRepo } from "../../../../data/mock";
import { TrackLanes } from "../../../../components/TrackLanes";
import { Avatar } from "../../../../components/Avatar";
import { type MetaChange } from "../../../../data/mock";

function MetaRow({ m }: { m: MetaChange }) {
  const color =
    m.kind === "added" ? "var(--add)" : m.kind === "removed" ? "var(--del)" : "var(--accent)";
  const sign = m.kind === "added" ? "+" : m.kind === "removed" ? "−" : "~";
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2 text-sm last:border-b-0">
      <span className="mono w-4 shrink-0 text-center font-bold" style={{ color }}>
        {sign}
      </span>
      <span className="w-40 shrink-0 text-[var(--text-dim)]">{m.label}</span>
      {m.from && <span className="mono text-[var(--del)] line-through opacity-70">{m.from}</span>}
      {m.from && m.to && <span className="text-[var(--text-faint)]">→</span>}
      {m.to && <span className="mono" style={{ color }}>{m.to}</span>}
    </div>
  );
}

export default async function CommitPage({
  params,
}: {
  params: Promise<{ repo: string; sha: string }>;
}) {
  const { repo: slug, sha } = await params;
  const repo = getRepo(slug);
  if (!repo) notFound();
  const commit = repo.commits.find((c) => c.sha === sha);
  if (!commit) notFound();

  return (
    <div>
      {/* breadcrumb */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <Link href={`/u/${repo.owner}`} className="text-[var(--text-dim)] hover:text-[var(--accent)]">
          {repo.owner}
        </Link>
        <span className="text-[var(--text-faint)]">/</span>
        <Link href={`/r/${repo.slug}`} className="text-[var(--text-dim)] hover:text-[var(--accent)]">
          {repo.name}
        </Link>
        <span className="text-[var(--text-faint)]">/</span>
        <span className="mono text-[var(--text-dim)]">commit {commit.sha}</span>
      </div>

      {/* commit summary */}
      <div className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
        <div className="flex items-start gap-3">
          <Avatar name={commit.author} size={36} />
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-semibold text-[var(--text)]">{commit.message}</h1>
            <p className="text-xs text-[var(--text-faint)]">
              <span className="text-[var(--text-dim)]">{commit.author}</span> committed {commit.when} ·
              <span className="text-[var(--add)]"> +{commit.additions}</span>
              <span className="text-[var(--del)]"> −{commit.deletions}</span> regions
            </p>
          </div>
          <code className="mono shrink-0 rounded border border-[var(--border)] bg-[var(--bg-soft)] px-2 py-1 text-xs text-[var(--text-dim)]">
            {commit.sha}
          </code>
        </div>
      </div>

      {/* metadata diff */}
      <div className="mb-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
        <div className="border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs font-medium text-[var(--text-dim)]">
          Session metadata
        </div>
        {commit.meta.map((m, i) => (
          <MetaRow key={i} m={m} />
        ))}
      </div>

      {/* the track-lane visual diff */}
      <div className="mb-2 flex items-center gap-2 text-sm">
        <span className="font-medium text-[var(--text)]">Arrangement diff</span>
        <span className="tag">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--add)" }} /> added
        </span>
        <span className="tag">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--del)" }} /> removed
        </span>
        <span className="mono ml-auto text-xs text-[var(--text-faint)]">{repo.bpm} BPM · {repo.musicalKey}</span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs">
            <span className="mono font-medium text-[var(--del)]">− before</span>
            <span className="text-[var(--text-faint)]">
              {sha === repo.commits[repo.commits.length - 1].sha ? "(empty tree)" : "parent arrangement"}
            </span>
          </div>
          <TrackLanes tracks={commit.before} compact />
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs">
            <span className="mono font-medium text-[var(--add)]">+ after</span>
            <span className="text-[var(--text-faint)]">this commit</span>
          </div>
          <TrackLanes tracks={commit.after} compact />
        </div>
      </div>

      <div className="mt-6">
        <Link
          href={`/r/${repo.slug}`}
          className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-dim)] hover:border-[var(--accent)]"
        >
          ← back to {repo.name}
        </Link>
      </div>
    </div>
  );
}
