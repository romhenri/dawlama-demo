import { notFound } from "next/navigation";
import Link from "next/link";
import { getRepo } from "../../data/mock";
import { RepoHeader } from "../../components/RepoHeader";
import { FileTree } from "../../components/FileTree";
import { Timeline } from "../../components/Timeline";
import { Readme } from "../../components/Readme";
import { CommitList } from "../../components/CommitList";

export default async function RepoPage({ params }: { params: Promise<{ repo: string }> }) {
  const { repo: slug } = await params;
  const repo = getRepo(slug);
  if (!repo) notFound();

  const headFile = repo.files.find((f) => f.kind === "daw")?.name ?? "master.daw";

  return (
    <div>
      <RepoHeader repo={repo} />

      {/* HERO: the repo + timeline combo */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* left rail: files (width toggled by the panel's own compact button) */}
        <FileTree files={repo.files} activeName={headFile} onNote={`HEAD · ${repo.commits[0].sha}`} />

        {/* right: timeline preview of the selected .daw + readme */}
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)]">
            <span className="mono text-[var(--accent)]">{headFile}</span>
            <span>· previewing HEAD arrangement</span>
            <Link
              href={`/r/${repo.slug}/commit/${repo.commits[0].sha}`}
              className="ml-auto rounded-md border border-[var(--border)] px-2 py-1 hover:border-[var(--accent)]"
            >
              view latest diff →
            </Link>
          </div>

          <Timeline
            tracks={repo.tracks}
            bpm={repo.bpm}
            musicalKey={repo.musicalKey}
            fileName={headFile}
          />

          <CommitList commits={repo.commits} repoSlug={repo.slug} limit={3} heading="Recent commits" />

          <Readme source={repo.readme} />
        </div>
      </div>
    </div>
  );
}
