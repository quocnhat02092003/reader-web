"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Book } from "../_lib/library";
import { books } from "../_lib/library";

type CoverStyle = CSSProperties & {
  "--cover": string;
  "--panel": string;
};

const heroBooks = books.slice(0, 6);
const AUTO_PLAY_INTERVAL_MS = 4500;

function getCoverStyle(book: Book): CoverStyle {
  return {
    "--cover": book.color,
    "--panel": book.panel,
  };
}

function CoverImage({ book }: { book: Book }) {
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
        sizes="(max-width: 768px) 60vw, 260px"
        src={book.coverImage}
        unoptimized
      />
      <span aria-hidden="true" className="absolute inset-0 bg-[var(--cover-overlay)]" />
    </>
  );
}

function HoverCue({ label = "Chọn" }: { label?: string }) {
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

function HeroCover({
  active,
  book,
  index,
  onSelect,
}: {
  active: boolean;
  book: Book;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      aria-label={`Chọn ${book.title}`}
      aria-pressed={active}
      className={[
        "group/book relative flex shrink-0 flex-col justify-end overflow-hidden border border-[var(--line-strong)] border-l-[14px] border-l-[var(--cover)] bg-[var(--panel)] text-left text-white shadow-[0_18px_46px_rgb(0_0_0/0.22)] outline-none transition duration-300 focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)] hover:border-[var(--accent)] hover:shadow-[0_26px_70px_rgb(0_0_0/0.32)]",
        active
          ? "h-[340px] w-[236px] rounded-xl p-6 [transform:rotateY(-7deg)_translateY(-12px)]"
          : "h-[260px] w-[170px] rounded-xl p-4 opacity-80 hover:opacity-100",
        index % 2 === 0 ? "translate-y-2" : "-translate-y-3",
      ].join(" ")}
      style={getCoverStyle(book)}
      type="button"
      onClick={onSelect}
    >
      <CoverImage book={book} />
      <HoverCue label={active ? "Đang chọn" : "Chọn"} />
      <Badge className="absolute left-4 top-4 z-[1] rounded-[7px] px-2 py-1.5" variant="muted">
        {book.status}
      </Badge>
      <span className="relative z-[1] mb-2 block text-[13px] font-bold text-white/75">{book.format}</span>
      <strong className="relative z-[1] block text-[clamp(18px,2vw,24px)] font-extrabold leading-[1.05]">
        {book.title}
      </strong>
      <small className="relative z-[1] mt-2 text-[13px] text-white/75">{book.author}</small>
    </button>
  );
}

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeBook = heroBooks[activeIndex] ?? heroBooks[0];
  const visibleBooks = useMemo(
    () => heroBooks.map((book, index) => ({ book, index })),
    []
  );

  useEffect(() => {
    if (isPaused || heroBooks.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveIndex((current) => (current + 1) % heroBooks.length);
      }
    }, AUTO_PLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function move(step: number) {
    setActiveIndex((current) => (current + step + heroBooks.length) % heroBooks.length);
  }

  return (
    <section
      aria-label="Sách nổi bật"
      aria-roledescription="carousel"
      className={[
        "grid min-h-[560px] items-end gap-12 overflow-hidden rounded-2xl border bg-[var(--card-bg)] px-7 pb-[42px] pt-[58px]",
        "border-[var(--line)] 2xl:grid-cols-[minmax(0,680px)_minmax(520px,1fr)]",
        "max-2xl:grid-cols-1 max-md:min-h-0 max-md:gap-8 max-md:px-[18px] max-md:pb-7 max-md:pt-[34px]",
      ].join(" ")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative z-[1] max-w-[680px]">
        <p className="text-sm font-bold text-[var(--accent)]">{activeBook.status}</p>
        <h1 className="mt-[18px] max-w-[720px] text-[clamp(42px,6vw,82px)] font-black leading-[0.96] max-md:text-[clamp(38px,13vw,64px)]">
          {activeBook.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--accent)]">{activeBook.subtitle}</p>
        <div className="mt-[18px] flex flex-wrap gap-2">
          {[`Điểm ${activeBook.score}`, activeBook.year, activeBook.pages, activeBook.format].map((item) => (
            <Badge className="rounded-[7px] px-2.5 py-[7px] text-[13px] font-bold" key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
        <p className="mt-7 max-w-[760px] text-base leading-[1.75] text-[var(--text)]">
          {activeBook.description}
        </p>

        <div className="mt-[34px] flex flex-wrap gap-3">
          <Link
            className={cn(buttonVariants({ size: "lg" }), "h-[54px] rounded-xl px-6 font-black")}
            href={`/intro/${activeBook.slug}`}
          >
            Đọc giới thiệu
          </Link>
          <Button className="h-[54px] rounded-xl px-6 font-black" type="button" variant="secondary">
            Lưu vào kệ
          </Button>
          <Button className="h-[54px] rounded-xl px-6 font-black" type="button" variant="secondary">
            Chi tiết
          </Button>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <Button
            aria-label="Sách trước"
            className="size-10 rounded-full p-0"
            type="button"
            variant="outline"
            onClick={() => move(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            aria-label="Sách tiếp theo"
            className="size-10 rounded-full p-0"
            type="button"
            variant="outline"
            onClick={() => move(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
          <div className="ml-1 flex gap-2">
            {heroBooks.map((book, index) => (
              <button
                aria-label={`Đến slide ${index + 1}: ${book.title}`}
                className={[
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex ? "w-8 bg-[var(--accent)]" : "w-2.5 bg-[var(--chip-bg)]",
                ].join(" ")}
                key={book.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-[2] flex min-h-[410px] items-end justify-start overflow-x-auto pb-2 [perspective:900px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-end gap-[18px] transition-transform duration-300">
          {visibleBooks.map(({ book, index }) => (
            <HeroCover
              active={index === activeIndex}
              book={book}
              index={index}
              key={book.slug}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
