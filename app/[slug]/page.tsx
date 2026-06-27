import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import SiteFooter from "@/app/components/SiteFooter";
import CoverTile from "@/app/components/CoverTile";
import {
  getAllSlugs,
  getListBySlug,
  formatDate as formatListDate,
} from "@/app/lib/lists";
import {
  getPosts,
  getPostBySlug,
  formatDate as formatDbDate,
} from "@/app/lib/blog-db";

export const revalidate = 300;

export async function generateStaticParams() {
  const listSlugs = getAllSlugs().map((slug) => ({ slug }));
  const dbSlugs = (await getPosts()).map((p) => ({ slug: p.slug }));
  return [...listSlugs, ...dbSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const list = getListBySlug(slug);
  if (list) return { title: `${list.title} — Roundup`, description: list.excerpt };
  const post = await getPostBySlug(slug);
  if (post) return { title: post.title, description: post.description };
  return { title: "Not found" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = getListBySlug(slug);

  // Locally-authored ranked list → render the full long-form listicle.
  if (list) {
    return (
      <>
        <TopNav />
        <main className="flex-1">
          <article className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
            <Link href="/" className="eyebrow text-ink-soft transition-colors hover:text-ink">
              ← All lists
            </Link>

            <header className="mt-6 border-b border-line pb-8">
              <time className="eyebrow text-ink-faint">{formatListDate(list.date)}</time>
              <h1 className="headline mt-4 text-5xl font-bold uppercase text-ink sm:text-6xl">
                {list.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{list.excerpt}</p>
              <p className="eyebrow mt-5 text-ink-faint">
                {list.author} · {list.authorRole} · {list.count} picks · {list.readingTime} min read
              </p>
            </header>

            <div className="mt-8 overflow-hidden border border-line">
              <CoverTile slug={list.slug} count={list.count} showRank={false} className="aspect-[16/7] w-full" />
            </div>

            {/* Intro */}
            <div className="mt-8 space-y-4">
              {list.intro.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ranked entries */}
            <ol className="mt-10 space-y-6">
              {list.entries.map((entry, i) => (
                <li key={entry.name} className="flex gap-5 border-t border-line pt-6">
                  <span className="font-display text-4xl font-bold leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                        {entry.name}
                      </h2>
                      {entry.tag ? (
                        <span className="eyebrow border border-line px-2.5 py-1 text-ink-soft">
                          {entry.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-lg leading-relaxed text-ink-soft">{entry.blurb}</p>
                  </div>
                </li>
              ))}
            </ol>

            {list.closing ? (
              <p className="mt-10 border-t border-line pt-8 text-lg leading-relaxed text-ink">
                {list.closing}
              </p>
            ) : null}
          </article>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Otherwise fall back to a published Signalor post (DB), if one matches.
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <TopNav />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
          <Link href="/" className="eyebrow text-ink-soft transition-colors hover:text-ink">
            ← Home
          </Link>
          <header className="mt-6 border-b border-line pb-8">
            <time className="eyebrow text-ink-faint">{formatDbDate(post.published_at)}</time>
            <h1 className="headline mt-4 text-5xl font-bold uppercase text-ink sm:text-6xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.description}</p>
            ) : null}
          </header>
          {post.image_url ? (
            <div className="mt-8 overflow-hidden border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image_url} alt={post.title} className="w-full object-cover" />
            </div>
          ) : null}
          <div
            className="mt-8 [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:text-ink-soft [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
