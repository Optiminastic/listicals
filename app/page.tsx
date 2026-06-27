import TopNav from "@/app/components/TopNav";
import EventRow from "@/app/components/EventRow";
import SubscribeNow from "@/app/components/SubscribeNow";
import SiteFooter from "@/app/components/SiteFooter";
import LatestFromBlog from "@/app/components/LatestFromBlog";
import { getAllLists } from "@/app/lib/lists";

export const revalidate = 300;

export default function Home() {
  const lists = getAllLists();

  return (
    <>
      <TopNav />

      <main>
        <LatestFromBlog />
        {/* Hero */}
        <section className="px-5 pb-8 pt-10 sm:px-8 sm:pt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="headline text-6xl font-bold uppercase text-ink sm:text-8xl">
              All Lists
            </h1>
            <p className="max-w-xs text-lg font-medium uppercase leading-tight tracking-tight text-ink sm:text-right sm:text-xl">
              The picks worth your time, ranked
            </p>
          </div>

          {/* Search (decorative) */}
          <form
            action="/#lists"
            className="mt-10 flex items-center gap-3 border-b border-line-strong pb-3"
          >
            <span aria-hidden className="text-xl text-ink">
              ⌕
            </span>
            <input
              type="search"
              placeholder="SEARCH FOR A LIST"
              aria-label="Search for a list"
              className="eyebrow w-full bg-transparent text-ink outline-none placeholder:text-ink-faint"
            />
          </form>
        </section>

        {/* All lists — flat, newest first */}
        <div id="lists" className="px-5 sm:px-8">
          {lists.map((list) => (
            <EventRow key={list.slug} list={list} />
          ))}
        </div>

        <div className="mt-10">
          <SubscribeNow />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
