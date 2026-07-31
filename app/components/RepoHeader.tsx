import Link from "next/link";
import { type Repo } from "../data/mock";
import { Icon, type IconName } from "./Icon";
import { Avatar } from "./Avatar";
import { StarButton } from "./StarButton";

function Stat({ icon, value, label }: { icon: IconName; value: string | number; label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-sm hover:border-[var(--border-hi)]">
      <Icon name={icon} size={15} className="text-[var(--text-dim)]" />
      <span className="font-medium text-[var(--text)]">{value}</span>
      <span className="text-[var(--text-faint)]">{label}</span>
    </button>
  );
}

export function RepoHeader({ repo }: { repo: Repo }) {
  return (
    <div className="mb-5">
      <div className="mb-1 flex flex-wrap items-center gap-2 text-lg">
        <Link href={`/u/${repo.owner}`} className="text-[var(--text-dim)] hover:text-[var(--accent)]">
          {repo.owner}
        </Link>
        <span className="text-[var(--text-faint)]">/</span>
        <span className="font-semibold text-[var(--text)]">{repo.name}</span>
        <span className="tag" style={{ borderColor: repo.genreColor, color: repo.genreColor }}>
          {repo.genre}
        </span>
        <span className="tag">public</span>
      </div>

      <p className="mb-3 max-w-2xl text-sm text-[var(--text-dim)]">{repo.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <StarButton slug={repo.slug} baseStars={repo.stars} />
        <Stat icon="fork" value={repo.forks} label="forks" />
        <Stat icon="gauge" value={repo.bpm} label="BPM" />
        <Stat icon="note" value={repo.musicalKey} label="key" />
        <div className="ml-auto flex items-center gap-2">
          <div className="flex -space-x-2">
            {repo.contributors.map((c, i) => (
              <Avatar key={i} color={c} size={28} />
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-md border border-[var(--border-hi)] bg-[var(--panel-hi)] px-3 py-1.5 text-sm hover:border-[var(--accent)]">
            <Icon name="fork" size={15} /> Fork
          </button>
        </div>
      </div>
    </div>
  );
}
