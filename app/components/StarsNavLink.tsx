"use client";

import Link from "next/link";
import { Icon } from "./Icon";
import { useStars } from "../lib/stars";

export function StarsNavLink() {
  const { count, ready } = useStars();

  return (
    <Link
      href="/stars"
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-[var(--panel)] hover:text-[var(--text)]"
    >
      <Icon name="star" size={14} className={count > 0 ? "text-[var(--star)]" : ""} />
      Stars
      {ready && count > 0 && (
        <span className="mono rounded-full bg-[var(--panel-hi)] px-1.5 text-xs text-[var(--text-dim)]">
          {count}
        </span>
      )}
    </Link>
  );
}
