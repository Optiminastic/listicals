import Link from "next/link";

// Top bar: wordmark on the left, search + subscribe on the right.
export default function TopNav() {
  return (
    <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
      <Link
        href="/"
        className="font-display text-2xl font-bold italic tracking-tight text-accent"
      >
        Roundup
      </Link>

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
