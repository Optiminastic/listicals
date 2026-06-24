import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import SiteFooter from "@/app/components/SiteFooter";
import EventRow from "@/app/components/EventRow";
import {
  CATEGORY_META,
  categoryFromSlug,
  categorySlug,
  getListsByCategory,
} from "@/app/lib/lists";

// Pre-render a page for every category.
export function generateStaticParams() {
  return CATEGORY_META.map((c) => ({ category: categorySlug(c.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolved = categoryFromSlug(category);
  if (!resolved) return { title: "Not found — Roundup" };
  return {
    title: `${resolved} lists — Roundup`,
    description: `Curated, ranked ${resolved} listicles on Roundup.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolved = categoryFromSlug(category);

  if (!resolved) notFound();

  const lists = getListsByCategory(resolved);
  const meta = CATEGORY_META.find((c) => c.name === resolved);

  return (
    <>
      <TopNav />

      <main className="px-5 sm:px-8">
        {/* Hero */}
        <section className="pb-6 pt-10 sm:pt-14">
          <Link
            href="/#lists"
            className="eyebrow text-ink-faint transition-colors hover:text-accent"
          >
            ← All lists
          </Link>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="headline text-6xl font-bold uppercase text-ink sm:text-8xl">
              {resolved}
            </h1>
            <p className="max-w-xs text-lg font-medium uppercase leading-tight tracking-tight text-ink sm:text-right">
              {meta?.blurb} · {lists.length}{" "}
              {lists.length === 1 ? "list" : "lists"}
            </p>
          </div>
        </section>

        {/* Category switcher */}
        <div className="flex flex-wrap gap-2 border-b border-line pb-6">
          {CATEGORY_META.map((c) => {
            const isActive = c.name === resolved;
            return (
              <Link
                key={c.name}
                href={`/category/${categorySlug(c.name)}`}
                className={`eyebrow inline-flex items-center gap-1.5 border px-3 py-1.5 transition-colors ${
                  isActive
                    ? "border-line-strong bg-line-strong text-paper"
                    : "border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                <span aria-hidden>{c.icon}</span>
                {c.name}
              </Link>
            );
          })}
        </div>

        {/* List rows */}
        <section className="pb-12">
          {lists.length > 0 ? (
            lists.map((list) => <EventRow key={list.slug} list={list} />)
          ) : (
            <p className="py-12 text-center text-ink-faint">
              No lists in this category yet — check back soon.
            </p>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
