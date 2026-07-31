// Minimal inline SVG icon set (stroke = currentColor). Replaces all emoji.
export type IconName =
  | "star"
  | "fork"
  | "branch"
  | "gauge"
  | "note"
  | "layers"
  | "folder"
  | "faders"
  | "waveform"
  | "piano"
  | "file"
  | "play"
  | "pause"
  | "search"
  | "user"
  | "muted"
  | "collapse"
  | "expand"
  | "location"
  | "link"
  | "calendar"
  | "users"
  | "commit"
  | "tag"
  | "pin";

const FILLED: IconName[] = ["star", "play", "pause"];

function paths(name: IconName) {
  switch (name) {
    case "star":
      return <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18.1 6.1 21.3l1.2-6.6-4.8-4.6 6.6-.9z" />;
    case "fork":
      return (
        <>
          <circle cx="6" cy="6" r="2.6" />
          <circle cx="18" cy="6" r="2.6" />
          <circle cx="12" cy="18" r="2.6" />
          <path d="M6 8.6v1.4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8.6" />
          <path d="M12 12v3.4" />
        </>
      );
    case "branch":
      return (
        <>
          <line x1="6" y1="4" x2="6" y2="14" />
          <circle cx="6" cy="17.5" r="2.6" />
          <circle cx="18" cy="6.5" r="2.6" />
          <path d="M18 9.1A9 9 0 0 1 9 18" />
        </>
      );
    case "gauge":
      return (
        <>
          <path d="M12 13l3.5-3.5" />
          <path d="M3.5 18a9 9 0 1 1 17 0" />
        </>
      );
    case "note":
      return (
        <>
          <path d="M9 17V5l11-2v12" />
          <circle cx="6.5" cy="17.5" r="2.5" />
          <circle cx="17.5" cy="15.5" r="2.5" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="M12 3 3 7.5l9 4.5 9-4.5z" />
          <path d="m3 12 9 4.5L21 12" />
          <path d="m3 16.5 9 4.5 9-4.5" />
        </>
      );
    case "folder":
      return <path d="M3 6.5a2 2 0 0 1 2-2h3.4a2 2 0 0 1 1.6.8l1 1.3a2 2 0 0 0 1.6.8H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
    case "faders":
      return (
        <>
          <line x1="5" y1="21" x2="5" y2="14" />
          <line x1="5" y1="10" x2="5" y2="3" />
          <line x1="12" y1="21" x2="12" y2="13" />
          <line x1="12" y1="9" x2="12" y2="3" />
          <line x1="19" y1="21" x2="19" y2="16" />
          <line x1="19" y1="12" x2="19" y2="3" />
          <line x1="2.5" y1="12" x2="7.5" y2="12" />
          <line x1="9.5" y1="11" x2="14.5" y2="11" />
          <line x1="16.5" y1="14" x2="21.5" y2="14" />
        </>
      );
    case "waveform":
      return <path d="M2 12h2l2-6 3 15 3-19 3 15 2-5h3" />;
    case "piano":
      return (
        <>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <line x1="8" y1="6" x2="8" y2="18" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <line x1="16" y1="6" x2="16" y2="18" />
        </>
      );
    case "file":
      return (
        <>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="16.5" x2="13" y2="16.5" />
        </>
      );
    case "play":
      return <path d="M7 4.5v15l12-7.5z" />;
    case "pause":
      return (
        <>
          <rect x="6.5" y="4.5" width="3.5" height="15" rx="0.8" />
          <rect x="14" y="4.5" width="3.5" height="15" rx="0.8" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="20" y1="20" x2="15.2" y2="15.2" />
        </>
      );
    case "user":
      return (
        <>
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </>
      );
    case "muted":
      return (
        <>
          <path d="M4 9v6h3l5 4V5L7 9z" />
          <line x1="16" y1="9.5" x2="21" y2="14.5" />
          <line x1="21" y1="9.5" x2="16" y2="14.5" />
        </>
      );
    case "collapse":
      return (
        <>
          <path d="M13.5 6 8 12l5.5 6" />
          <line x1="18" y1="5" x2="18" y2="19" />
        </>
      );
    case "expand":
      return (
        <>
          <path d="M10.5 6l5.5 6-5.5 6" />
          <line x1="6" y1="5" x2="6" y2="19" />
        </>
      );
    case "location":
      return (
        <>
          <path d="M12 21c4-4.5 7-8 7-11a7 7 0 1 0-14 0c0 3 3 6.5 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
    case "link":
      return (
        <>
          <path d="M9.5 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1" />
          <path d="M14.5 10.5a3.5 3.5 0 0 0-5 0L7 13a3.5 3.5 0 0 0 5 5l1-1" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
          <line x1="8" y1="3" x2="8" y2="6.5" />
          <line x1="16" y1="3" x2="16" y2="6.5" />
        </>
      );
    case "users":
      return (
        <>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
          <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" />
          <path d="M17 14.6A5.5 5.5 0 0 1 20.5 20" />
        </>
      );
    case "commit":
      return (
        <>
          <circle cx="12" cy="12" r="3.2" />
          <line x1="3" y1="12" x2="8.8" y2="12" />
          <line x1="15.2" y1="12" x2="21" y2="12" />
        </>
      );
    case "tag":
      return (
        <>
          <path d="M3 12.5V5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.4.6l6 6a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0l-6-6A2 2 0 0 1 3 12.5z" />
          <circle cx="7.5" cy="7.5" r="1.3" />
        </>
      );
    case "pin":
      return (
        <>
          <path d="M9 3h6l-1 6 3 3-5 1v7l-1 1-1-1v-7l-5-1 3-3z" />
        </>
      );
  }
}

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const filled = FILLED.includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths(name)}
    </svg>
  );
}
