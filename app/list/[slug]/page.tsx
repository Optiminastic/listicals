import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import SiteFooter from "@/app/components/SiteFooter";
import EventRow from "@/app/components/EventRow";
import CoverTile from "@/app/components/CoverTile";
import {
  categoryIcon,
  categorySlug,
  formatDate,
  getAllLists,
  getAllSlugs,
  getListBySlug,
  listTags,
} from "@/app/lib/lists";

// Pre-render every list at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const list = getListBySlug(slug);
  if (!list) return { title: "Not found — Roundup" };
  return {
    title: `${list.title} — Roundup`,
    description: list.excerpt,
  };
}

export default async function ListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = getListBySlug(slug);

  if (!list) notFound();

  const tags = listTags(list);
  const related = getAllLists()
    .filter((l) => l.category === list.category && l.slug !== list.slug)
    .slice(0, 3);

  return (
    <>
      <TopNav />

      <main className="px-5 sm:px-8">
        <article className="mx-auto max-w-3xl pb-4 pt-10 sm:pt-14">
          <Link
            href="/#lists"
            className="eyebrow text-ink-faint transition-colors hover:text-accent"
          >
            ← All lists
          </Link>

          {/* Header */}
          <header className="mt-6 border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link
                href={`/category/${categorySlug(list.category)}`}
                className="eyebrow inline-flex items-center gap-1.5 font-semibold text-accent"
              >
                <span aria-hidden>{categoryIcon(list.category)}</span>
                {list.category}
              </Link>
              <span className="eyebrow text-ink-faint">
                {formatDate(list.date)} · {list.readingTime} min read
              </span>
            </div>

            <h1 className="headline mt-5 text-5xl font-bold uppercase text-ink sm:text-7xl">
              {list.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {list.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="eyebrow border border-line px-2.5 py-1 text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Cover */}
          <div className="mt-8 overflow-hidden">
            <CoverTile
              slug={list.slug}
              count={list.count}
              showRank={false}
              className="aspect-[16/7] w-full"
            />
          </div>

          {/* Intro */}
          <div className="mt-8 space-y-4">
            {list.intro.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-ink first-letter:font-display first-letter:mr-2 first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-accent"
                    : "text-lg leading-relaxed text-ink-soft"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* The ranked list */}
          <ol className="mt-10">
            {list.entries.map((entry, i) => (
              <li
                key={entry.name}
                className="flex gap-5 border-t border-line py-6"
              >
                <span
                  aria-hidden
                  className="font-display text-4xl font-bold leading-none text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                      {entry.name}
                    </h2>
                    {entry.tag && (
                      <span className="eyebrow border border-line px-2.5 py-1 text-ink-soft">
                        {entry.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {entry.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Closing */}
          {list.closing && (
            <div className="mt-8 border-l-2 border-accent bg-paper-raised px-5 py-4">
              <p className="font-display text-xl italic leading-relaxed text-ink">
                {list.closing}
              </p>
            </div>
          )}

          {/* Author */}
          <div className="mt-10 flex items-center gap-3 border-t border-line pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper">
              {list.author
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <div className="text-sm font-medium text-ink">{list.author}</div>
              <div className="eyebrow text-ink-faint">{list.authorRole}</div>
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto max-w-3xl pb-12">
            <div className="inline-block bg-line-strong px-4 py-2">
              <span className="eyebrow font-semibold text-paper">
                More in {list.category}
              </span>
            </div>
            <div className="mt-2">
              {related.map((l) => (
                <EventRow key={l.slug} list={l} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
