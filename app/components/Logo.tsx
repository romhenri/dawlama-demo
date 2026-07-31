export function Logo({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#12121a" stroke="#34344d" />
        {/* little equalizer bars = the "octocat" of dawlama */}
        <rect x="8" y="14" width="3" height="8" rx="1.5" fill="#f472b6" />
        <rect x="13" y="9" width="3" height="14" rx="1.5" fill="#a78bfa" />
        <rect x="18" y="11" width="3" height="11" rx="1.5" fill="#38bdf8" />
        <rect x="23" y="16" width="3" height="6" rx="1.5" fill="#34d399" />
      </svg>
      <span className="text-[var(--text)]">
        daw<span className="text-[var(--accent)]">lama</span>
      </span>
    </span>
  );
}
