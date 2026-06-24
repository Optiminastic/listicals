import CoverTile from "./CoverTile";

// Big "SUBSCRIBE NOW" band with an email capture and an accent image block,
// matching the reference design's pre-footer call to action.
export default function SubscribeNow() {
  return (
    <section
      id="subscribe"
      className="grid grid-cols-1 items-center gap-8 border-t border-line px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:py-20"
    >
      <div>
        <h2 className="headline text-5xl font-bold uppercase text-ink sm:text-7xl">
          Subscribe
          <br />
          Now
        </h2>
        <form
          className="mt-10 flex max-w-md items-center border-b border-line-strong"
          action="#subscribe"
        >
          <input
            type="email"
            required
            placeholder="E-MAIL ADDRESS"
            aria-label="Email address"
            className="eyebrow h-11 w-full bg-transparent text-ink outline-none placeholder:text-ink-faint"
          />
          <button
            type="submit"
            className="eyebrow h-9 shrink-0 bg-accent px-5 font-semibold text-white transition-colors hover:bg-ink"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Accent image block (generative, on-brand orange) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
        <CoverTile slug="subscribe-now-block" count={10} showRank={false} className="h-full w-full" />
      </div>
    </section>
  );
}
