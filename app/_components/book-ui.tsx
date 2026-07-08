import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HeroCarousel } from "./hero-carousel";
import type { Book, Shelf, Topic } from "../_lib/library";
import {
  books,
  communityHighlights,
  favoriteTitles,
  hotGenres,
  liveComments,
  newReleaseBooks,
  popularTitles,
  shelves,
  stats,
  topics,
  topSeriesBooks,
} from "../_lib/library";

type CoverStyle = CSSProperties & {
  "--cover": string;
  "--panel": string;
  "--topic"?: string;
  "--genre"?: string;
};

const line = "border-[var(--line)]";
const muted = "text-[var(--text-muted)]";
const gold = "text-[var(--accent)]";
const h2Class = "text-[clamp(28px,3vw,38px)] font-black";
const sectionBlock = "grid gap-6";
const railScroll =
  "grid grid-flow-col overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const fallbackCoverDecor =
  "before:absolute before:inset-x-[18px] before:top-[18px] before:h-[44%] before:rounded-[10px] before:border before:border-[var(--line)] before:bg-[var(--cover)] before:opacity-90 before:content-['']";
const fallbackPosterDecor =
  "before:absolute before:inset-x-3.5 before:top-3.5 before:bottom-[38%] before:rounded-[10px] before:bg-[var(--cover)] before:opacity-90 before:content-['']";

function getCoverStyle(book: Book): CoverStyle {
  return {
    "--cover": book.color,
    "--panel": book.panel,
  };
}

function CoverArtwork({ book }: { book: Book }) {
  if (!book.coverImage) {
    return null;
  }

  return (
    <>
      <Image
        alt=""
        aria-hidden="true"
        className="object-cover"
        fill
        loading="lazy"
        sizes="(max-width: 768px) 70vw, 260px"
        src={book.coverImage}
        unoptimized
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--cover-overlay)]"
      />
    </>
  );
}

function HoverCue({ label = "Xem chi tiết" }: { label?: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 transition duration-200 [box-shadow:inset_0_0_0_2px_var(--accent)] group-hover/book:opacity-100 group-focus-visible/book:opacity-100"
      />
      <span className="pointer-events-none absolute right-3 top-3 z-[3] translate-y-1 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-black text-[var(--accent-contrast)] opacity-0 shadow-[0_10px_30px_rgb(0_0_0/0.22)] transition duration-200 group-hover/book:translate-y-0 group-hover/book:opacity-100 group-focus-visible/book:translate-y-0 group-focus-visible/book:opacity-100">
        {label}
      </span>
    </>
  );
}

function coverBase(book: Book, compact = false) {
  return [
    "group/book relative flex flex-col justify-end overflow-hidden border border-[var(--line-strong)] border-l-[16px] border-l-[var(--cover)] bg-[var(--panel)] text-white shadow-[0_24px_54px_rgb(0_0_0/0.26)] outline-none transition focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)] hover:border-[var(--accent)] hover:shadow-[0_28px_70px_rgb(0_0_0/0.32)] hover:[transform:translateY(-8px)_rotateY(-4deg)]",
    book.coverImage ? "" : fallbackCoverDecor,
    compact
      ? "min-h-[218px] w-[145px] rounded-xl border-l-[10px] p-[15px]"
      : "min-h-[310px] w-[210px] rounded-xl p-[22px] [transform:rotateY(-8deg)]",
  ].join(" ");
}

export function BookCover({
  book,
  compact = false,
}: {
  book: Book;
  compact?: boolean;
}) {
  return (
    <Link
      className={coverBase(book, compact)}
      href={`/intro/${book.slug}`}
      style={getCoverStyle(book)}
    >
      <CoverArtwork book={book} />
      <HoverCue />
      <Badge
        className="absolute left-3.5 top-3.5 z-[1] rounded-[7px] px-2 py-1.5"
        variant="muted"
      >
        {book.status}
      </Badge>
      <span className="relative z-[1] mb-2.5 mt-2 block text-[13px] font-bold text-white/75">
        {book.format}
      </span>
      <strong className="relative z-[1] block text-xl font-extrabold leading-[1.05]">
        {book.title}
      </strong>
      <small className="relative z-[1] mt-2 text-[13px] text-white/75">
        {book.author}
      </small>
    </Link>
  );
}

export function BookTile({
  book,
  featured = false,
}: {
  book: Book;
  featured?: boolean;
}) {
  return (
    <article className="min-w-0">
      <TileCover book={book} featured={featured} />
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[book.score, book.year, book.progress].map((item) => (
          <Badge className="font-bold" key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
      <h3 className="mt-2.5 text-base font-bold leading-tight">{book.title}</h3>
      <p className={`mt-1 text-sm ${muted}`}>{book.subtitle}</p>
    </article>
  );
}

function TileCover({
  book,
  featured = false,
}: {
  book: Book;
  featured?: boolean;
}) {
  return (
    <Link
      className={[
        "group/book relative flex w-full flex-col justify-end overflow-hidden rounded-xl border border-[var(--line-strong)] border-l-[10px] border-l-[var(--cover)] bg-[var(--panel)] text-white outline-none transition focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)] hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_20px_56px_rgb(0_0_0/0.28)]",
        featured ? "min-h-[270px] p-[18px]" : "min-h-[210px] p-[15px]",
        book.coverImage ? "" : fallbackCoverDecor,
      ].join(" ")}
      href={`/intro/${book.slug}`}
      style={getCoverStyle(book)}
    >
      <CoverArtwork book={book} />
      <HoverCue />
      <Badge
        className="absolute left-3.5 top-3.5 z-[1] rounded-[7px] px-2 py-1.5"
        variant="muted"
      >
        {book.status}
      </Badge>
      <span className="relative z-[1] mb-2.5 mt-2 block text-[13px] font-bold text-white/75">
        {book.format}
      </span>
      <strong className="relative z-[1] block text-xl font-extrabold leading-[1.05]">
        {book.title}
      </strong>
      <small className="relative z-[1] mt-2 text-[13px] text-white/75">
        {book.author}
      </small>
    </Link>
  );
}

export function HeroDashboard() {
  return <HeroCarousel />;
}

export function TopicGrid({ items = topics }: { items?: Topic[] }) {
  return (
    <section className={sectionBlock}>
      <div>
        <h2 className={h2Class}>Bạn đang quan tâm gì?</h2>
      </div>
      <div className="grid grid-cols-6 gap-4 overflow-x-auto pb-0.5 max-xl:grid-cols-3 max-md:grid-cols-1">
        {items.map((topic) => (
          <Link
            className="group/book relative flex min-h-[148px] flex-col justify-end overflow-hidden rounded-[18px] bg-[var(--topic)] p-[22px] text-white shadow-[inset_-20px_-24px_0_rgb(0_0_0/0.07)] outline-none transition focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)] hover:-translate-y-1 hover:shadow-[0_18px_48px_rgb(0_0_0/0.24)]"
            href="/genres"
            key={topic.title}
            style={{ "--topic": topic.color } as CoverStyle}
          >
            <HoverCue label="Xem chủ đề" />
            <strong className="relative z-[1] text-[22px] font-black leading-[1.18]">
              {topic.title}
            </strong>
            <span className="relative z-[1] mt-3 text-sm font-extrabold">{topic.caption}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <section className="grid grid-cols-4 gap-4 max-md:grid-cols-1">
      {stats.map((item) => (
        <Card
          className="rounded-[14px] bg-[var(--surface-soft)]"
          key={item.label}
        >
          <CardContent className="p-[22px]">
            <strong className="block text-3xl font-black leading-none">
              {item.value}
            </strong>
            <span className={`mt-2 block ${muted}`}>{item.label}</span>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function CompactCover({
  book,
  inline = false,
}: {
  book: Book;
  inline?: boolean;
}) {
  return (
    <Link
      className={[
        "flex flex-col justify-end overflow-hidden border border-[var(--line-strong)] border-l-[5px] border-l-[var(--cover)] bg-[var(--panel)] p-1.5 text-white",
        inline
          ? "relative h-[42px] w-[30px] rounded-[5px] border-l-[3px] p-1 [&_span]:hidden [&_strong]:hidden"
          : "absolute right-[18px] top-[18px] h-[76px] w-[54px] rounded-[7px]",
      ].join(" ")}
      href={`/intro/${book.slug}`}
      style={getCoverStyle(book)}
    >
      <CoverArtwork book={book} />
      <span className="relative z-[1] text-[9px] font-extrabold text-white/70">
        {book.format}
      </span>
      <strong className="relative z-[1] mt-1 line-clamp-2 text-[10px] font-extrabold leading-[1.05]">
        {book.title}
      </strong>
    </Link>
  );
}

export function CommunityDashboard() {
  return (
    <section
      className={`scroll-mt-[100px] overflow-hidden rounded-[18px] border bg-[var(--card-bg)] ${line}`}
    >
      <div className="grid gap-[22px] px-8 pb-8 pt-7 max-md:px-3.5 max-md:pb-[22px] max-md:pt-5">
        <div className="flex items-center justify-between gap-[18px] max-md:items-start max-md:flex-col">
          <h2 className="text-lg font-black">Top bình luận</h2>
          <div className="flex gap-2">
            {["Trước", "Sau"].map((label) => (
              <Button
                className="h-9 rounded-full px-3.5 text-[13px]"
                key={label}
                type="button"
                variant="outline"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={`${railScroll} grid-cols-none grid-rows-none auto-cols-[minmax(280px,1fr)] gap-4 max-md:auto-cols-[minmax(280px,86vw)]`}
        >
          {communityHighlights.map((item, index) => (
            <Card
              className="relative min-h-[210px] overflow-hidden rounded-xl bg-[var(--card-strong)] p-5"
              key={`${item.reader}-${item.book.slug}`}
            >
              <div
                className="absolute inset-0 scale-[1.08] bg-[var(--panel)] opacity-50 blur-[10px]"
                style={getCoverStyle(item.book)}
              />
              <div className="relative z-[1] flex items-center gap-3 pr-[74px]">
                <span className="grid size-12 place-items-center rounded-full border-2 border-[var(--line-strong)] bg-[var(--accent)] font-black text-[var(--accent-contrast)]">
                  {item.reader.slice(0, 1)}
                </span>
                <div>
                  <strong className="block">{item.reader}</strong>
                  <small className={`mt-0.5 block text-xs ${gold}`}>
                    {item.badge}
                  </small>
                </div>
              </div>
              <p className="relative z-[1] mt-10 text-sm leading-relaxed text-[var(--text-soft)]">
                {item.comment}
              </p>
              <div className="relative z-[1] mt-[22px] flex gap-3.5 text-xs font-extrabold text-[var(--text-muted)]">
                <span>Thích {128 - index * 13}</span>
                <span>Phản hồi {index + 2}</span>
              </div>
              <CompactCover book={item.book} />
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1.05fr_1.05fr_0.8fr_1.65fr] border-t border-[var(--line)] max-xl:grid-cols-2 max-md:grid-cols-1">
        <RankingColumn
          href="/books"
          items={popularTitles}
          title="Sôi nổi nhất"
        />
        <RankingColumn
          href="/introductions"
          items={favoriteTitles}
          title="Yêu thích nhất"
        />
        <section
          className={`min-h-[290px] border-r border-[var(--line)] px-8 py-7 max-xl:border-b max-xl:border-r-0 max-md:min-h-0 max-md:px-[18px] max-md:py-[22px]`}
        >
          <h3 className="text-lg font-black">Thể loại hot</h3>
          <ol className="mt-6 grid gap-3.5">
            {hotGenres.map((genre, index) => (
              <li
                className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3"
                key={genre.label}
              >
                <span className="font-black text-[var(--rank-muted)]">
                  {index + 1}
                </span>
                <Link
                  className="w-fit rounded-full bg-[var(--genre)] px-3.5 py-2 text-[13px] font-extrabold text-white"
                  href="/genres"
                  style={{ "--genre": genre.color } as CoverStyle}
                >
                  {genre.label}
                </Link>
              </li>
            ))}
          </ol>
          <Link
            className="mt-[22px] inline-flex text-[13px] font-extrabold text-[var(--text-muted)]"
            href="/genres"
          >
            Xem thêm
          </Link>
        </section>
        <section className="min-h-[290px] px-8 py-7 max-md:min-h-0 max-md:px-[18px] max-md:py-[22px]">
          <h3 className="text-lg font-black">Bình luận mới</h3>
          <div className="mt-5 grid gap-2">
            {liveComments.map((item) => (
              <Card
                className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[10px] border-transparent bg-[var(--surface-soft)] p-3"
                key={`${item.reader}-${item.book.slug}`}
              >
                <span className="grid size-[38px] place-items-center rounded-full bg-[var(--accent)] text-[13px] font-black text-[var(--accent-contrast)]">
                  {item.reader.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <strong className="block text-[13px]">{item.reader}</strong>
                  <p className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[var(--text-soft)]">
                    {item.text}
                  </p>
                  <Link
                    className={`mt-1 inline-flex text-xs font-extrabold ${gold}`}
                    href={`/intro/${item.book.slug}`}
                  >
                    {item.book.title}
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function RankingColumn({
  href,
  items,
  title,
}: {
  href: string;
  items: Book[];
  title: string;
}) {
  return (
    <section className="min-h-[290px] border-r border-[var(--line)] px-8 py-7 max-xl:border-b max-md:min-h-0 max-md:border-r-0 max-md:px-[18px] max-md:py-[22px]">
      <h3 className="text-lg font-black">{title}</h3>
      <ol className="mt-6 grid gap-3.5">
        {items.map((book, index) => (
          <li
            className="grid min-w-0 grid-cols-[34px_30px_minmax(0,1fr)] items-center gap-3"
            key={book.slug}
          >
            <span className="font-black text-[var(--rank-muted)]">
              {index + 1}
            </span>
            <CompactCover book={book} inline />
            <Link
              className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-extrabold"
              href={`/intro/${book.slug}`}
            >
              {book.title}
            </Link>
          </li>
        ))}
      </ol>
      <Link
        className="mt-[22px] inline-flex text-[13px] font-extrabold text-[var(--text-muted)]"
        href={href}
      >
        Xem thêm
      </Link>
    </section>
  );
}

function PosterItem({ book }: { book: Book }) {
  return (
    <article>
      <Link
        className={[
          "group/book relative flex min-h-[326px] flex-col justify-end overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)] p-[18px] text-white outline-none transition focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)] hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_22px_62px_rgb(0_0_0/0.30)] max-md:min-h-[270px]",
          book.coverImage ? "" : fallbackPosterDecor,
        ].join(" ")}
        href={`/intro/${book.slug}`}
        style={getCoverStyle(book)}
      >
        <CoverArtwork book={book} />
        <HoverCue label="Đọc ngay" />
        <Badge
          className="relative z-[1] rounded-md bg-white/15 px-2 py-1.5 text-xs font-black text-white"
          variant="outline"
        >
          {book.progress}
        </Badge>
        <strong className="relative z-[1] mt-3 text-[22px] font-black leading-[1.08]">
          {book.title}
        </strong>
        <small className="relative z-[1] mt-2 text-white/70">
          {book.author}
        </small>
      </Link>
      <h3 className="mt-3.5 overflow-hidden text-ellipsis whitespace-nowrap text-center text-[15px] font-bold">
        {book.title}
      </h3>
      <p
        className={`mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm ${muted}`}
      >
        {book.subtitle}
      </p>
    </article>
  );
}

export function NewReleaseRail() {
  return (
    <section className="grid scroll-mt-[100px] gap-6">
      <div className="flex items-center justify-between gap-[18px] max-md:items-start max-md:flex-col">
        <h2 className={h2Class}>Sách điện tử mới cập nhật</h2>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-9 rounded-full px-3.5 text-[13px]",
          )}
          href="/books"
        >
          Xem toàn bộ
        </Link>
      </div>
      <div
        className={`${railScroll} auto-cols-[minmax(190px,220px)] gap-[18px] max-xl:auto-cols-[190px] max-md:auto-cols-[minmax(160px,56vw)]`}
      >
        {newReleaseBooks.map((book) => (
          <PosterItem book={book} key={book.slug} />
        ))}
      </div>
    </section>
  );
}

export function TopSeriesRail() {
  return (
    <section className="grid scroll-mt-[100px] gap-6">
      <div>
        <h2 className={h2Class}>Top 10 truyện bộ hôm nay</h2>
      </div>
      <div
        className={`${railScroll} auto-cols-[minmax(300px,1fr)] items-start gap-5 max-xl:auto-cols-[minmax(260px,34vw)] max-md:auto-cols-[minmax(250px,82vw)]`}
      >
        {topSeriesBooks.map((book, index) => (
          <article key={book.slug}>
            <Link
              className={[
                "group/book relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-2xl border border-transparent bg-[var(--panel)] p-5 text-white rotate-[-2.5deg] outline-none transition focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)] hover:border-[var(--accent)] hover:shadow-[0_26px_70px_rgb(0_0_0/0.32)] max-xl:min-h-[360px] max-md:min-h-[340px]",
                book.coverImage ? "" : fallbackPosterDecor,
                index % 2 === 1 ? "rotate-[2deg]" : "",
              ].join(" ")}
              href={`/intro/${book.slug}`}
              style={getCoverStyle(book)}
            >
              <CoverArtwork book={book} />
              <HoverCue label="Xem top" />
              <Badge
                className="relative z-[1] rounded-md bg-white/15 px-2 py-1.5 text-xs font-black text-white"
                variant="outline"
              >
                {book.progress}
              </Badge>
              <strong className="relative z-[1] mt-3 text-[30px] font-black leading-none">
                {book.title}
              </strong>
            </Link>
            <div className="mt-[18px] grid grid-cols-[58px_minmax(0,1fr)] items-start gap-3.5 max-md:grid-cols-[46px_minmax(0,1fr)]">
              <span className="text-[58px] font-black italic leading-[0.9] text-[var(--accent)] max-md:text-[46px]">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-bold">{book.title}</h3>
                <p className={`mt-1.5 ${muted}`}>{book.subtitle}</p>
                <small className={`mt-1.5 block ${muted}`}>
                  {book.format} • {book.progress} • {book.year}
                </small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ShelfPanel({ items = shelves }: { items?: Shelf[] }) {
  return (
    <section className="grid gap-9 rounded-[18px] bg-[var(--surface-muted)] p-8 max-md:p-[18px]">
      {items.map((shelf) => (
        <div
          className="grid grid-cols-[200px_minmax(0,1fr)] items-start gap-7 max-md:grid-cols-1"
          key={shelf.title}
        >
          <div>
            <h2 className="text-[28px] font-bold leading-[1.15]">
              {shelf.title}
            </h2>
            <p className={`mt-2.5 leading-normal ${muted}`}>{shelf.caption}</p>
            <Link
              className={`mt-[18px] inline-flex font-extrabold ${gold}`}
              href={shelf.href}
            >
              Xem toàn bộ
            </Link>
          </div>
          <div className="grid grid-cols-6 gap-[18px] max-2xl:grid-cols-5 max-xl:grid-cols-3 max-md:grid-cols-1">
            {shelf.books.map((book) => (
              <BookTile book={book} featured key={book.slug} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function RouteHero({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <section
      className={`rounded-[18px] border bg-[var(--surface-soft)] p-[clamp(28px,5vw,64px)] ${line}`}
    >
      <p className={`text-sm font-bold ${gold}`}>KệSách route</p>
      <h1 className="mt-[18px] max-w-[720px] text-[clamp(42px,6vw,82px)] font-black leading-[0.96] max-md:text-[clamp(38px,13vw,64px)]">
        {title}
      </h1>
      <p className="mt-5 max-w-[760px] text-lg leading-relaxed text-[var(--text-soft)]">
        {description}
      </p>
      {action ? (
        <Badge
          className="mt-[22px] rounded-lg px-3.5 py-2.5 font-black"
          variant="default"
        >
          {action}
        </Badge>
      ) : null}
    </section>
  );
}

export function BookGrid({ items = books }: { items?: Book[] }) {
  return (
    <section className="grid grid-cols-4 gap-[18px] max-xl:grid-cols-3 max-md:grid-cols-1">
      {items.map((book) => (
        <BookTile book={book} key={book.slug} />
      ))}
    </section>
  );
}

export function IntroductionList({ items = books }: { items?: Book[] }) {
  return (
    <section className="grid gap-4">
      {items.map((book) => (
        <article
          className={`grid grid-cols-[150px_minmax(0,1fr)] items-center gap-6 rounded-2xl border bg-[var(--surface-soft)] p-[18px] max-md:grid-cols-1 ${line}`}
          key={book.slug}
        >
          <BookCover book={book} compact />
          <div>
            <p className={`font-extrabold ${gold}`}>{book.format}</p>
            <h2 className="mt-2 text-[28px] font-bold">{book.title}</h2>
            <span className={`mt-1 block ${muted}`}>{book.subtitle}</span>
            <p className="mt-3.5 max-w-[780px] leading-relaxed text-[var(--text-soft)]">
              {book.description}
            </p>
            <Link
              className={`mt-[18px] inline-flex font-extrabold ${gold}`}
              href={`/intro/${book.slug}`}
            >
              Đọc bài giới thiệu
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}

export function BookIntro({ book }: { book: Book }) {
  return (
    <article
      className={`grid grid-cols-[minmax(0,1fr)_260px] items-end gap-[52px] rounded-[18px] border bg-[var(--surface-soft)] p-[clamp(28px,5vw,64px)] max-md:grid-cols-1 ${line}`}
    >
      <div>
        <p className={`text-sm font-bold ${gold}`}>{book.status}</p>
        <h1 className="mt-[18px] max-w-[720px] text-[clamp(42px,6vw,82px)] font-black leading-[0.96] max-md:text-[clamp(38px,13vw,64px)]">
          {book.title}
        </h1>
        <p className={`mt-3 text-lg ${gold}`}>{book.subtitle}</p>
        <div className="mt-[18px] flex flex-wrap gap-2">
          {[`Điểm ${book.score}`, book.year, book.pages, book.format].map(
            (item) => (
              <Badge
                className="rounded-[7px] px-2.5 py-[7px] text-[13px] font-bold"
                key={item}
                variant="outline"
              >
                {item}
              </Badge>
            ),
          )}
        </div>
        <p className="mt-7 max-w-[760px] text-base leading-[1.75] text-[var(--text)]">
          {book.description}
        </p>
        <div className="mt-[18px] flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <Badge
              className="rounded-[7px] px-2.5 py-[7px] text-[13px] font-bold"
              key={tag}
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-[52px] rounded-xl px-5 text-base",
            )}
            href={`/read/${book.slug}`}
          >
            Bắt đầu đọc
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "h-[52px] rounded-xl px-5 text-base",
            )}
            href="#chapters"
          >
            Danh sách chương
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-[52px] rounded-xl px-5 text-base",
            )}
            href="#comments"
          >
            Bình luận
          </Link>
        </div>
      </div>
      <BookCover book={book} />
    </article>
  );
}
