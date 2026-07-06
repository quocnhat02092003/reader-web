"use client";

import type { CSSProperties, FormEvent } from "react";
import { useMemo, useState } from "react";

type Book = {
  title: string;
  creator: string;
  kind: string;
  minutes: string;
  progress: number;
  accent: string;
  spine: string;
};

type BookStyle = CSSProperties & {
  "--book-cover": string;
  "--book-spine": string;
};

const spotlightBooks: Book[] = [
  {
    title: "Mùa Sao Rơi",
    creator: "Lam Chi",
    kind: "Light novel",
    minutes: "18 phút",
    progress: 68,
    accent: "#7d8f78",
    spine: "#596955",
  },
  {
    title: "Thành Phố Mực",
    creator: "Minh An",
    kind: "Truyện tranh",
    minutes: "9 phút",
    progress: 42,
    accent: "#8b725e",
    spine: "#634f41",
  },
  {
    title: "Ghi Chú Sau 0h",
    creator: "Kai Tran",
    kind: "Bài viết",
    minutes: "6 phút",
    progress: 86,
    accent: "#64748b",
    spine: "#475569",
  },
];

const librarySections = [
  { label: "Sách", total: "12.4K", active: true },
  { label: "Truyện tranh", total: "8.8K", active: false },
  { label: "Light novel", total: "4.1K", active: false },
  { label: "Audio", total: "2.6K", active: false },
  { label: "Bài viết", total: "15K", active: false },
];

const readingQueue: Book[] = [
  {
    title: "Dưới Tán Đèn Đêm",
    creator: "Nhi Pham",
    kind: "Sách",
    minutes: "Chương 12",
    progress: 74,
    accent: "#9a7b65",
    spine: "#765b48",
  },
  {
    title: "Orbit Cafe",
    creator: "Haru Studio",
    kind: "Truyện tranh",
    minutes: "Tập 31",
    progress: 51,
    accent: "#6e8194",
    spine: "#506273",
  },
  {
    title: "Một Ngày Rảnh",
    creator: "Tue Lam",
    kind: "Tản văn",
    minutes: "Trang 96",
    progress: 33,
    accent: "#8a8d70",
    spine: "#676a53",
  },
];

const trendTags = ["Cozy mystery", "Đời thường", "Tâm lý", "Hành trình", "Manga mới"];

function getBookStyle(book: Book): BookStyle {
  return {
    "--book-cover": book.accent,
    "--book-spine": book.spine,
  };
}

function AuthPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("An Nguyen");

  const initials = useMemo(() => {
    const parts = displayName.trim().split(/\s+/).filter(Boolean);
    return (parts.at(0)?.[0] ?? "R") + (parts.at(-1)?.[0] ?? "");
  }, [displayName]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("displayName") ?? "").trim();
    setDisplayName(name || "Reader");
    setIsLoggedIn(true);
  }

  if (isLoggedIn) {
    return (
      <aside className="auth-panel">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-sm border border-zinc-300 bg-zinc-900 text-sm font-semibold text-white">
            {initials.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-950">{displayName}</p>
            <p className="text-xs text-zinc-500">Đồng bộ 3 thiết bị</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-sm border border-zinc-200 bg-white p-3">
            <p className="text-lg font-semibold text-zinc-950">18</p>
            <p className="text-xs text-zinc-500">đang theo dõi</p>
          </div>
          <div className="rounded-sm border border-zinc-200 bg-white p-3">
            <p className="text-lg font-semibold text-zinc-950">42h</p>
            <p className="text-xs text-zinc-500">đã đọc</p>
          </div>
        </div>

        <button
          className="mt-5 h-10 w-full rounded-sm border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 transition hover:border-zinc-950"
          type="button"
          onClick={() => setIsLoggedIn(false)}
        >
          Đăng xuất
        </button>
      </aside>
    );
  }

  return (
    <aside className="auth-panel">
      <div className="mb-5">
        <p className="text-sm font-semibold text-zinc-950">Đăng nhập để đọc tiếp</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Lưu tiến độ, thư viện riêng và gợi ý cá nhân.
        </p>
      </div>

      <form className="grid gap-3" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-xs font-medium text-zinc-600">
          Tên hiển thị
          <input
            className="h-10 rounded-sm border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
            name="displayName"
            placeholder="An Nguyen"
            type="text"
          />
        </label>

        <label className="grid gap-1 text-xs font-medium text-zinc-600">
          Email
          <input
            className="h-10 rounded-sm border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950"
            name="email"
            placeholder="reader@mail.com"
            type="email"
          />
        </label>

        <button
          className="mt-1 h-10 rounded-sm bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800"
          type="submit"
        >
          Đăng nhập
        </button>
      </form>
    </aside>
  );
}

function BookModel({ book, index }: { book: Book; index: number }) {
  return (
    <article className="book-3d" style={getBookStyle(book)}>
      <div className="book-pages" />
      <div className="book-spine" />
      <div className="book-cover">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {book.kind}
        </span>
        <h3 className="mt-auto text-balance text-lg font-semibold leading-5 text-white">
          {book.title}
        </h3>
        <p className="text-xs text-white/75">{book.creator}</p>
      </div>
      <span className="book-rank">{String(index + 1).padStart(2, "0")}</span>
    </article>
  );
}

function ProgressCard({ book }: { book: Book }) {
  return (
    <article className="rounded-sm border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="mini-book" style={getBookStyle(book)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                {book.kind}
              </p>
              <h3 className="mt-1 truncate text-base font-semibold text-zinc-950">
                {book.title}
              </h3>
            </div>
            <span className="shrink-0 text-xs text-zinc-500">{book.minutes}</span>
          </div>

          <p className="mt-1 text-sm text-zinc-500">{book.creator}</p>

          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs text-zinc-500">
              <span>Tiến độ</span>
              <span>{book.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-sm bg-zinc-100">
              <div
                className="h-full rounded-sm bg-zinc-900"
                style={{ width: `${book.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f3ee] text-zinc-950">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-[#f6f3ee]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 lg:px-8">
          <a className="text-xl font-bold tracking-tight" href="#">
            KệĐọc
          </a>

          <nav className="hidden items-center gap-1 text-sm text-zinc-600 md:flex">
            {librarySections.slice(0, 4).map((section) => (
              <a
                className="rounded-sm px-3 py-2 transition hover:bg-white hover:text-zinc-950"
                href="#library"
                key={section.label}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden h-10 w-full max-w-sm items-center border border-zinc-300 bg-white px-3 sm:flex">
            <span className="mr-2 text-sm text-zinc-400">⌕</span>
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
              placeholder="Tìm sách, truyện, tác giả..."
              type="search"
            />
          </div>

          <a
            className="hidden h-10 items-center rounded-sm border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950 md:flex"
            href="#auth"
          >
            Tài khoản
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <section className="hero-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)] lg:items-center">
            <div>
              <p className="w-fit rounded-sm border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Reader dashboard
              </p>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Đọc sách, xem truyện và gom mọi thứ bạn muốn theo dõi.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                Giao diện đầu tiên tập trung vào khám phá nhanh, đọc tiếp và quản lý tài
                khoản. Màu trung tính, nhịp layout rõ, không hiệu ứng nặng.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {librarySections.map((section) => (
                  <button
                    className={`rounded-sm border px-3 py-2 text-sm transition ${
                      section.active
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950"
                    }`}
                    key={section.label}
                    type="button"
                  >
                    {section.label}
                    <span className="ml-2 text-xs opacity-70">{section.total}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="perspective-scene">
              <div className="book-stage">
                <div className="flex items-end justify-center gap-5">
                  {spotlightBooks.map((book, index) => (
                    <BookModel book={book} index={index} key={book.title} />
                  ))}
                </div>
                <div className="shelf-line" />
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6" id="auth">
          <AuthPanel />

          <aside className="rounded-sm border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-950">Xu hướng tuần này</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trendTags.map((tag) => (
                <a
                  className="rounded-sm border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950"
                  href="#library"
                  key={tag}
                >
                  {tag}
                </a>
              ))}
            </div>
          </aside>
        </div>

        <section className="grid gap-6 lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div id="library">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-zinc-500">Đọc tiếp</p>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                  Thư viện gần đây
                </h2>
              </div>
              <button
                className="h-10 rounded-sm border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950"
                type="button"
              >
                Xem tất cả
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {readingQueue.map((book) => (
                <ProgressCard book={book} key={book.title} />
              ))}
            </div>
          </div>

          <aside className="rounded-sm border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-950">Bộ sưu tập</p>
              <span className="text-xs text-zinc-500">24 mục</span>
            </div>

            <div className="mt-5 grid gap-3">
              {["Đọc trước khi ngủ", "Truyện tranh ngắn", "Nghiên cứu nhẹ"].map(
                (collection, index) => (
                  <button
                    className="flex items-center justify-between rounded-sm border border-zinc-200 bg-[#faf8f3] p-3 text-left text-sm transition hover:border-zinc-950"
                    key={collection}
                    type="button"
                  >
                    <span className="font-medium text-zinc-800">{collection}</span>
                    <span className="text-xs text-zinc-500">{8 + index * 3}</span>
                  </button>
                ),
              )}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
