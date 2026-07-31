import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile, type ActivityItem } from "../../data/mock";
import { Avatar } from "../../components/Avatar";
import { Icon, type IconName } from "../../components/Icon";
import { TrackLanes } from "../../components/TrackLanes";
import { ReleaseHeatmap } from "../../components/ReleaseHeatmap";

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex-1">
      <div className="text-lg font-semibold text-[var(--text)]">{value.toLocaleString()}</div>
      <div className="text-xs text-[var(--text-faint)]">{label}</div>
    </div>
  );
}

const ACTIVITY_ICON: Record<ActivityItem["kind"], IconName> = {
  commit: "commit",
  release: "tag",
  fork: "fork",
  star: "star",
};

export default async function ProfilePage({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;
  const profile = getProfile(user);
  if (!profile) notFound();

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* ── left rail: the résumé header ─────────────────────────────── */}
      <aside className="w-full shrink-0 space-y-4 lg:w-[300px]">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start">
          <Avatar name={profile.name} size={96} />
          <div>
            <h1 className="text-xl font-bold text-[var(--text)]">{profile.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--accent)]">@{profile.handle}</span>
              {profile.pronouns && <span className="text-[var(--text-faint)]">· {profile.pronouns}</span>}
            </div>
            <p className="mt-1 text-sm text-[var(--text-dim)]">{profile.tagline}</p>
          </div>
        </div>

        {profile.available && (
          <div
            className="flex items-center gap-2 rounded-md border bg-[color-mix(in_srgb,var(--add)_12%,transparent)] px-3 py-1.5 text-xs text-[var(--add)]"
            style={{ borderColor: "color-mix(in srgb, var(--add) 40%, transparent)" }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--add)]" />
            Open to collabs
          </div>
        )}

        <div className="flex gap-2">
          <button className="flex-1 rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-[#160e2b] hover:brightness-110">
            Follow
          </button>
          <button className="rounded-md border border-[var(--border-hi)] bg-[var(--panel-hi)] px-3 py-1.5 text-sm hover:border-[var(--accent)]">
            Message
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[var(--text-dim)]">{profile.bio}</p>

        <div className="flex rounded-xl border border-[var(--border)] bg-[var(--panel)] px-4 py-3">
          <Metric value={profile.followers} label="followers" />
          <Metric value={profile.following} label="following" />
          <Metric value={profile.starsEarned} label="stars" />
        </div>

        <ul className="space-y-1.5 text-sm text-[var(--text-dim)]">
          <li className="flex items-center gap-2">
            <Icon name="location" size={15} className="text-[var(--text-faint)]" /> {profile.location}
          </li>
          <li className="flex items-center gap-2">
            <Icon name="link" size={15} className="text-[var(--text-faint)]" />
            <span className="text-[var(--accent)]">{profile.website}</span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="layers" size={15} className="text-[var(--text-faint)]" /> {profile.sessions} public sessions
          </li>
          <li className="flex items-center gap-2">
            <Icon name="calendar" size={15} className="text-[var(--text-faint)]" /> {profile.joined}
          </li>
        </ul>

        {/* skills = the "résumé" meat */}
        <div className="space-y-3 border-t border-[var(--border)] pt-4">
          <SkillBlock title="Genres">
            {profile.genres.map((g) => (
              <span key={g.label} className="tag" style={{ borderColor: g.color, color: g.color }}>
                {g.label}
              </span>
            ))}
          </SkillBlock>
          <SkillBlock title="DAWs">
            {profile.daws.map((d) => (
              <span key={d} className="tag">
                {d}
              </span>
            ))}
          </SkillBlock>
          <SkillBlock title="Gear & instruments">
            {profile.instruments.map((i) => (
              <span key={i} className="tag">
                {i}
              </span>
            ))}
          </SkillBlock>
        </div>
      </aside>

      {/* ── right column: the portfolio ──────────────────────────────── */}
      <div className="min-w-0 flex-1 space-y-6">
        {/* pinned */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Icon name="pin" size={15} className="text-[var(--text-dim)]" />
            <h2 className="font-semibold">Pinned sessions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.pinned.map((p) => {
              const card = (
                <div
                  className={`h-full rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 transition ${
                    p.live ? "hover:border-[var(--accent)] hover:bg-[var(--panel-hi)]" : "opacity-85"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="faders" size={15} className="text-[var(--accent)]" />
                    <span className="font-semibold text-[var(--accent)]">{p.name}</span>
                    {p.live && <span className="tag ml-auto">live demo</span>}
                  </div>
                  <p className="mt-2 min-h-[2.5rem] text-sm text-[var(--text-dim)]">{p.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-faint)]">
                    <span className="tag" style={{ borderColor: p.genreColor, color: p.genreColor }}>
                      {p.genre}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="star" size={13} /> {p.stars.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="fork" size={13} /> {p.forks}
                    </span>
                  </div>
                </div>
              );
              return p.live ? (
                <Link key={p.slug} href={`/r/${p.slug}`}>
                  {card}
                </Link>
              ) : (
                <div key={p.slug} title="Not wired up in this demo">
                  {card}
                </div>
              );
            })}
          </div>
        </section>

        {/* heatmap */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Icon name="commit" size={15} className="text-[var(--text-dim)]" />
            <h2 className="font-semibold">Commit activity</h2>
          </div>
          <ReleaseHeatmap />
        </section>

        {/* featured mini-timelines */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Icon name="waveform" size={15} className="text-[var(--text-dim)]" />
            <h2 className="font-semibold">Featured work</h2>
          </div>
          <div className="space-y-3">
            {profile.featured.map((f) => (
              <div key={f.title} className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
                <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[var(--panel-hi)] px-4 py-2 text-xs">
                  <span className="mono text-[var(--accent)]">{f.title}</span>
                  <span className="tag">{f.role}</span>
                  <span className="mono ml-auto text-[var(--text-faint)]">
                    {f.bpm} BPM · {f.musicalKey}
                  </span>
                </div>
                <TrackLanes tracks={f.tracks} compact />
              </div>
            ))}
          </div>
        </section>

        {/* activity feed */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Icon name="branch" size={15} className="text-[var(--text-dim)]" />
            <h2 className="font-semibold">Recent activity</h2>
          </div>
          <ol className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]">
            {profile.activity.map((a, i) => (
              <li
                key={i}
                className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 text-sm last:border-b-0"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--border-hi)] bg-[var(--bg-soft)] text-[var(--text-dim)]">
                  <Icon name={ACTIVITY_ICON[a.kind]} size={14} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[var(--text-dim)]">
                  {a.text} <span className="text-[var(--text-faint)]">· {a.repo}</span>
                </span>
                <span className="shrink-0 text-xs text-[var(--text-faint)]">{a.when}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function SkillBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[var(--text-faint)]">{title}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
