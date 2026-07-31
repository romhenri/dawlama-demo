import Link from "next/link";
import { type ExploreRepo } from "../data/mock";
import { Icon } from "./Icon";
import { StarButton } from "./StarButton";

/** only this one has a real repo page behind it in the demo */
const isLive = (slug: string) => slug === "lofi-beat";

export function RepoCard({ repo }: { repo: ExploreRepo }) {
  const clickable = isLive(repo.slug);

  const card = (
    <div
      className={`h-full rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 transition ${
        clickable ? "hover:border-[var(--accent)] hover:bg-[var(--panel-hi)]" : "opacity-80"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--text-dim)]">{repo.owner} /</span>
        <span className="font-semibold text-[var(--accent)]">{repo.name}</span>
        {clickable && <span className="tag ml-auto">live demo</span>}
      </div>
      <p className="mt-2 min-h-[2.5rem] text-sm text-[var(--text-dim)]">{repo.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-faint)]">
        <span className="tag" style={{ borderColor: repo.genreColor, color: repo.genreColor }}>
          {repo.genre}
        </span>
        <StarButton slug={repo.slug} baseStars={repo.stars} variant="compact" />
        <span className="inline-flex items-center gap-1">
          <Icon name="fork" size={13} /> {repo.forks}
        </span>
        <span className="inline-flex items-center gap-1">
          <Icon name="layers" size={13} /> {repo.tracks} tracks
        </span>
        <span className="ml-auto">updated {repo.updated}</span>
      </div>
    </div>
  );

  return clickable ? (
    <Link href={`/r/${repo.slug}`}>{card}</Link>
  ) : (
    <div title="Not wired up in this demo">{card}</div>
  );
}
