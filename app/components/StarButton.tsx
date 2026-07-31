"use client";

import { useStars } from "../lib/stars";
import { Icon } from "./Icon";

export function StarButton({
  slug,
  baseStars,
  variant = "full",
}: {
  slug: string;
  /** the mock star count this repo ships with; your star adds one on top */
  baseStars: number;
  variant?: "full" | "compact";
}) {
  const { isStarred, toggle, ready } = useStars();
  const starred = ready && isStarred(slug);
  const total = baseStars + (starred ? 1 : 0);

  // cards render this inside a <Link>; keep the click from navigating
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  };

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={starred}
        aria-label={starred ? `Unstar ${slug}` : `Star ${slug}`}
        title={starred ? "Starred — click to remove" : "Star this session"}
        className={`inline-flex items-center gap-1 rounded px-1 py-0.5 transition hover:text-[var(--star)] ${
          starred ? "text-[var(--star)]" : ""
        }`}
      >
        <Icon name="star" size={13} className={starred ? "" : "opacity-70"} />
        {total.toLocaleString("en-US")}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={starred}
      className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition ${
        starred
          ? "border-[var(--star)] bg-[color-mix(in_srgb,var(--star)_14%,transparent)]"
          : "border-[var(--border)] bg-[var(--panel)] hover:border-[var(--border-hi)]"
      }`}
    >
      <Icon
        name="star"
        size={15}
        className={starred ? "text-[var(--star)]" : "text-[var(--text-dim)]"}
      />
      <span className="font-medium text-[var(--text)]">{total.toLocaleString("en-US")}</span>
      <span className="text-[var(--text-faint)]">{starred ? "starred" : "stars"}</span>
    </button>
  );
}
