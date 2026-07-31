import Link from "next/link";
import { type Commit } from "../data/mock";
import { Icon } from "./Icon";
import { Avatar } from "./Avatar";

export function CommitList({
  commits,
  repoSlug,
  limit,
  heading = "Commits",
}: {
  commits: Commit[];
  repoSlug: string;
  limit?: number;
  heading?: string;
}) {
  const shown = limit ? commits.slice(0, limit) : commits;
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs text-[var(--text-dim)]">
        <Icon name="branch" size={13} /> <span className="font-medium text-[var(--text)]">{heading}</span>
        <span className="mono ml-auto">{commits.length} total</span>
      </div>
      <ul className="divide-y divide-[var(--border)]">
        {shown.map((c) => (
          <li key={c.sha}>
            <Link
              href={`/r/${repoSlug}/commit/${c.sha}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--panel-hi)]"
            >
              <Avatar name={c.author} size={28} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-[var(--text)]">{c.message}</div>
                <div className="text-xs text-[var(--text-faint)]">
                  <span className="text-[var(--text-dim)]">{c.author}</span> committed {c.when}
                </div>
              </div>
              <div className="hidden items-center gap-2 text-xs sm:flex">
                <span className="text-[var(--add)]">+{c.additions}</span>
                <span className="text-[var(--del)]">−{c.deletions}</span>
              </div>
              <code className="mono shrink-0 rounded border border-[var(--border)] bg-[var(--bg-soft)] px-2 py-0.5 text-xs text-[var(--text-dim)]">
                {c.sha}
              </code>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
