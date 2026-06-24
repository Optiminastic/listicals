import Link from "next/link";
import { CATEGORY_META, categorySlug } from "@/app/lib/lists";

// The top bar: primary nav on the left, centred wordmark, cart + subscribe on
// the right — mirroring the reference magazine layout.
export default function TopNav() {
  const nav = CATEGORY_META.slice(0, 4);

  return (
    <header className="relative flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
      {/* Left nav */}
      <nav className="flex items-center gap-2 text-ink-soft">
        {nav.map((c, i) => (
          <span key={c.name} className="flex items-center gap-2">
            <Link
              href={`/category/${categorySlug(c.name)}`}
              className="eyebrow whitespace-nowrap transition-colors hover:text-accent"
            >
              {c.name.split(" ")[0]}
            </Link>
            {i < nav.length - 1 && (
              <span className="text-line-strong/30" aria-hidden>
                /
              </span>
            )}
          </span>
        ))}
        <span className="hidden items-center gap-1 sm:flex" aria-hidden>
          <span className="text-line-strong/30">/</span>
          <span className="eyebrow text-ink-faint">All Lists ⌄</span>
        </span>
      </nav>

      {/* Centred wordmark */}
      <Link
        href="/"
        className="font-display absolute left-1/2 -translate-x-1/2 text-2xl font-bold italic tracking-tight text-accent"
      >
        Roundup
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <span aria-hidden className="text-ink-soft">
          ⌕
        </span>
        <span className="text-line-strong/30" aria-hidden>
          /
        </span>
        <Link
          href="/#subscribe"
          className="eyebrow font-semibold text-accent transition-colors hover:text-ink"
        >
          Subscribe
        </Link>
      </div>
    </header>
  );
}
