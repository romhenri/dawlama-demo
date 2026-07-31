import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { Avatar } from "./Avatar";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center gap-3 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <div className="ml-2 hidden flex-1 items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-1.5 text-sm text-[var(--text-faint)] sm:flex">
          <Icon name="search" size={15} />
          <span className="mono">Search sessions, stems, forks…</span>
          <span className="tag ml-auto">/</span>
        </div>

        <nav className="ml-auto flex items-center gap-1 text-sm text-[var(--text-dim)] sm:ml-0">
          <Link href="/" className="rounded-md px-3 py-1.5 hover:bg-[var(--panel)] hover:text-[var(--text)]">
            Explore
          </Link>
          <span className="rounded-md px-3 py-1.5 opacity-40">Studio</span>
          <span className="rounded-md px-3 py-1.5 opacity-40">Charts</span>
          <button className="ml-2 rounded-md border border-[var(--border-hi)] bg-[var(--panel-hi)] px-3 py-1.5 text-[var(--text)] hover:border-[var(--accent)]">
            + New session
          </button>
          <Link href="/u/kanpai" className="ml-1" aria-label="Your profile">
            <Avatar name="kanpai" size={32} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
