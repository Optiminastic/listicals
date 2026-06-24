import TopNav from "@/app/components/TopNav";
import EventRow from "@/app/components/EventRow";
import SubscribeNow from "@/app/components/SubscribeNow";
import SiteFooter from "@/app/components/SiteFooter";
import { getGroupedLists } from "@/app/lib/lists";

export default function Home() {
  const groups = getGroupedLists();

  return (
    <>
      <TopNav />

      <main>
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

        {/* Grouped sections */}
        <div id="lists" className="px-5 sm:px-8">
          {groups.map((group) => (
            <section key={group.category.name} className="pt-8">
              {/* Black pill label */}
              <div className="inline-block bg-line-strong px-4 py-2">
                <span className="eyebrow font-semibold text-paper">
                  {group.category.name}
                </span>
              </div>

              <div className="mt-2">
                {group.lists.map((list) => (
                  <EventRow key={list.slug} list={list} />
                ))}
              </div>
            </section>
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
