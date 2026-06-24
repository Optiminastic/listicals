import Link from "next/link";
import type { Listicle } from "@/app/lib/lists";
import { categoryIcon, dateBlock, listTags } from "@/app/lib/lists";
import CoverTile from "./CoverTile";

// One list rendered as a magazine "event" row: a date stamp, a thumbnail, the
// title + meta + description + tag pills, and an orange jump arrow.
export default function EventRow({ list }: { list: Listicle }) {
  const date = dateBlock(list.date);
  const tags = listTags(list);

  return (
    <Link
      href={`/list/${list.slug}`}
      className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-6 sm:grid-cols-[4.5rem_13rem_1fr_2rem] sm:gap-x-6 sm:py-7"
    >
      {/* Date block */}
      <div className="pt-1 text-center">
        <div className="eyebrow text-ink-faint">{date.weekday}</div>
        <div className="font-display text-3xl font-semibold leading-none text-ink sm:text-4xl">
          {date.day}
        </div>
        <div className="eyebrow mt-1 text-ink-faint">{date.month}</div>
      </div>

      {/* Thumbnail */}
      <div className="relative col-span-2 mt-3 sm:col-span-1 sm:mt-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <CoverTile
            slug={list.slug}
            count={list.count}
            showRank={false}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-sm ring-1 ring-line">
            ›
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-2 mt-4 sm:col-span-1 sm:mt-0">
        <h3 className="font-display text-2xl font-semibold uppercase leading-[0.95] tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
          {list.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-ink-soft">
          <span aria-hidden>{categoryIcon(list.category)}</span>
          <span className="text-sm">
            {list.category} · {list.count} picks
          </span>
        </div>

        <p className="clamp-2 mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
          {list.excerpt}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="eyebrow border border-line px-2.5 py-1 text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Jump arrow */}
      <div className="hidden items-start justify-end pt-1 sm:flex">
        <span
          aria-hidden
          className="text-2xl text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
