import Link from "next/link";
import { exploreRepos } from "./data/mock";
import { Icon } from "./components/Icon";
import { RepoCard } from "./components/RepoCard";

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
        {exploreRepos.map((repo) => (
          <RepoCard key={repo.slug} repo={repo} />
        ))}
      </div>
    </div>
  );
}
