"use client";

// ─────────────────────────────────────────────────────────────────────────
//  Local star system. Stars live in localStorage only — no account, no API.
//  Everything else in this demo is mocked, so a star is the one piece of
//  state that actually belongs to the person using it.
// ─────────────────────────────────────────────────────────────────────────

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const KEY = "dawlama:stars";

function readStore(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    // private mode, quota, or hand-edited garbage — start clean rather than crash
    return [];
  }
}

function writeStore(slugs: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* nothing to do — the UI keeps working, it just won't survive a reload */
  }
}

interface StarsValue {
  /** starred slugs, newest first */
  slugs: string[];
  /** false until localStorage has been read — render neutral until then */
  ready: boolean;
  isStarred: (slug: string) => boolean;
  toggle: (slug: string) => void;
  count: number;
}

const StarsContext = createContext<StarsValue | null>(null);

export function StarsProvider({ children }: { children: React.ReactNode }) {
  // starts empty on both server and first client render so hydration matches;
  // the real value arrives in the effect below
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(readStore());
    setReady(true);

    // keep other tabs of the demo in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSlugs(readStore());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev];
      writeStore(next);
      return next;
    });
  }, []);

  const value = useMemo<StarsValue>(() => {
    const set = new Set(slugs);
    return {
      slugs,
      ready,
      isStarred: (slug: string) => set.has(slug),
      toggle,
      count: slugs.length,
    };
  }, [slugs, ready, toggle]);

  return <StarsContext.Provider value={value}>{children}</StarsContext.Provider>;
}

export function useStars(): StarsValue {
  const ctx = useContext(StarsContext);
  if (!ctx) throw new Error("useStars must be used inside <StarsProvider>");
  return ctx;
}
