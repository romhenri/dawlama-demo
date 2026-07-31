import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[50vh] place-items-center text-center">
      <div>
        <div className="mono text-6xl text-[var(--accent)]">404</div>
        <p className="mt-3 text-[var(--text-dim)]">That session got detuned into the void.</p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-md border border-[var(--border-hi)] px-4 py-2 text-sm hover:border-[var(--accent)]"
        >
          ← back to explore
        </Link>
      </div>
    </div>
  );
}
