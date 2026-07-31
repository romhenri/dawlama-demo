import Link from "next/link";
import { exploreRepos } from "./data/mock";
import { Icon } from "./components/Icon";

export default function ExplorePage() {
  return (
    <div>
      {/* hero */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--panel)] to-[var(--bg-soft)] px-6 py-10 sm:px-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          git, but for <span className="text-[var(--accent)]">music</span>.
        </h1>
        <p className="mt-3 max-w-xl text-[var(--text-dim)]">
          Version-control your <code className="mono text-[var(--accent-2)]">.daw</code> sessions. Branch a
          remix, diff an arrangement track-by-track, and merge stems without stepping on your collaborators.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/r/lofi-beat"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[#160e2b] hover:brightness-110"
          >
            Open a demo session →
          </Link>
          <span className="tag self-center">
            <Icon name="muted" size={12} /> demo · nothing here actually plays
          </span>
        </div>
      </section>

      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-lg font-semibold">Explore sessions</h2>
        <span className="mono text-xs text-[var(--text-faint)]">trending this week</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {exploreRepos.map((repo) => {
          const clickable = repo.slug === "lofi-beat";
          const Card = (
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
                <span className="inline-flex items-center gap-1">
                  <Icon name="star" size={13} /> {repo.stars.toLocaleString()}
                </span>
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
            <Link key={repo.slug} href={`/r/${repo.slug}`}>
              {Card}
            </Link>
          ) : (
            <div key={repo.slug} title="Not wired up in this demo">
              {Card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
