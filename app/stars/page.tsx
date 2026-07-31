"use client";

import Link from "next/link";
import { exploreRepos } from "../data/mock";
import { RepoCard } from "../components/RepoCard";
import { Icon } from "../components/Icon";
import { useStars } from "../lib/stars";

export default function StarsPage() {
  const { slugs, ready, count } = useStars();

  // keep the user's own ordering (most recently starred first)
  const starred = slugs
    .map((slug) => exploreRepos.find((r) => r.slug === slug))
    .filter((r): r is (typeof exploreRepos)[number] => Boolean(r));

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center gap-2 text-lg">
        <Icon name="star" size={18} className="text-[var(--star)]" />
        <h1 className="font-semibold text-[var(--text)]">Starred sessions</h1>
        {ready && <span className="tag">{count}</span>}
      </div>
      <p className="mb-5 max-w-2xl text-sm text-[var(--text-dim)]">
        Stars are stored locally in this browser — no account, nothing leaves your machine. Clear your
        site data and they&apos;re gone.
      </p>

      {!ready ? (
        // avoids a flash of "no stars" before localStorage is read
        <div className="h-32 rounded-xl border border-[var(--border)] bg-[var(--panel)] opacity-40" />
      ) : starred.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border-hi)] bg-[var(--panel)] px-6 py-12 text-center">
          <p className="text-sm text-[var(--text-dim)]">Nothing starred yet.</p>
          <p className="mt-1 text-xs text-[var(--text-faint)]">
            Hit the <Icon name="star" size={12} className="inline align-[-1px]" /> on any session to keep
            it here.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-dim)] hover:border-[var(--accent)]"
          >
            Explore sessions →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {starred.map((repo) => (
            <RepoCard key={repo.slug} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
