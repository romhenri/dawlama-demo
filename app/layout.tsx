import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "./components/TopNav";
import { Icon } from "./components/Icon";
import { StarsProvider } from "./lib/stars";

export const metadata: Metadata = {
  title: "dawlama · git for music",
  description: "Version-control your .daw sessions. A fully-mocked demo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StarsProvider>
          <TopNav />
          <main className="mx-auto max-w-[1180px] px-4 pb-24 pt-6">{children}</main>
          <footer className="flex items-center justify-center gap-2 border-t border-[var(--border)] py-8 text-center text-xs text-[var(--text-faint)]">
            <Icon name="faders" size={13} />
            <span>
              dawlama — a demo. Nothing plays, nothing saves, no <span className="mono">.daw</span> files were harmed.
            </span>
          </footer>
        </StarsProvider>
      </body>
    </html>
  );
}
