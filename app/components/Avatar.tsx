import { Icon } from "./Icon";

const PALETTE = ["#a78bfa", "#f472b6", "#38bdf8", "#34d399", "#fbbf24", "#c084fc", "#fb7185"];

function hashColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

/**
 * Replaces the old emoji avatars. If `name` is given it shows a monogram,
 * otherwise a generic user glyph. Colour is derived deterministically.
 */
export function Avatar({ name, size = 28, color }: { name?: string; size?: number; color?: string }) {
  const c = color ?? hashColor(name ?? "anon");
  const initial = name?.trim().charAt(0).toUpperCase();
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        color: c,
        borderColor: `color-mix(in srgb, ${c} 55%, transparent)`,
        background: `color-mix(in srgb, ${c} 16%, var(--bg-soft))`,
      }}
    >
      {initial ?? <Icon name="user" size={size * 0.55} />}
    </span>
  );
}
