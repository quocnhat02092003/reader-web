import Link from "next/link";
import type { CSSProperties } from "react";
import type { Book, Shelf, Topic } from "../_lib/library";
import { books, featuredBook, shelves, stats, topics } from "../_lib/library";

type CoverStyle = CSSProperties & {
  "--cover": string;
  "--panel": string;
};

function getCoverStyle(book: Book): CoverStyle {
  return {
    "--cover": book.color,
    "--panel": book.panel,
  };
}

export function BookCover({ book, compact = false }: { book: Book; compact?: boolean }) {
  return (
    <Link
      className={compact ? "book-card compact" : "book-card"}
      href={`/intro/${book.slug}`}
      style={getCoverStyle(book)}
    >
      <span className="book-status">{book.status}</span>
      <span className="book-format">{book.format}</span>
      <strong>{book.title}</strong>
      <small>{book.author}</small>
    </Link>
  );
}

export function BookTile({ book }: { book: Book }) {
  return (
    <article className="book-tile">
      <BookCover book={book} compact />
      <div>
        <div className="book-meta-row">
          <span>{book.score}</span>
          <span>{book.year}</span>
          <span>{book.progress}</span>
        </div>
        <h3>{book.title}</h3>
        <p>{book.subtitle}</p>
      </div>
    </article>
  );
}

export function HeroDashboard() {
  return (
    <section className="hero-dashboard">
      <div className="hero-copy">
        <p className="eyebrow">{featuredBook.status}</p>
        <h1>{featuredBook.title}</h1>
        <p className="subtitle">{featuredBook.subtitle}</p>
        <div className="chip-row">
          <span>Điểm {featuredBook.score}</span>
          <span>{featuredBook.year}</span>
          <span>{featuredBook.pages}</span>
          <span>{featuredBook.format}</span>
        </div>
        <p className="hero-description">{featuredBook.description}</p>
        <div className="hero-actions">
          <Link className="read-button" href={`/intro/${featuredBook.slug}`}>
            Đọc giới thiệu
          </Link>
          <button className="soft-button" type="button">
            Lưu vào kệ
          </button>
          <button className="soft-button" type="button">
            Chi tiết
          </button>
        </div>
      </div>

      <div className="hero-books" aria-label="Sách nổi bật">
        {books.slice(0, 5).map((book, index) => (
          <BookCover book={book} compact={index !== 0} key={book.slug} />
        ))}
      </div>
    </section>
  );
}

export function TopicGrid({ items = topics }: { items?: Topic[] }) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <h2>Bạn đang quan tâm gì?</h2>
      </div>
      <div className="topic-grid">
        {items.map((topic) => (
          <Link
            className="topic-card"
            href="/genres"
            key={topic.title}
            style={{ "--topic": topic.color } as CSSProperties}
          >
            <strong>{topic.title}</strong>
            <span>{topic.caption}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ShelfPanel({ items = shelves }: { items?: Shelf[] }) {
  return (
    <section className="shelf-panel">
      {items.map((shelf) => (
        <div className="shelf-row" key={shelf.title}>
          <div className="shelf-title">
            <h2>{shelf.title}</h2>
            <p>{shelf.caption}</p>
            <Link href={shelf.href}>Xem toàn bộ</Link>
          </div>
          <div className="shelf-books">
            {shelf.books.map((book) => (
              <BookTile book={book} key={book.slug} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function StatsStrip() {
  return (
    <section className="stats-strip">
      {stats.map((item) => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
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
    <section className="route-hero">
      <p className="eyebrow">KệSách route</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {action ? <span>{action}</span> : null}
    </section>
  );
}

export function BookGrid({ items = books }: { items?: Book[] }) {
  return (
    <section className="book-grid">
      {items.map((book) => (
        <BookTile book={book} key={book.slug} />
      ))}
    </section>
  );
}

export function IntroductionList({ items = books }: { items?: Book[] }) {
  return (
    <section className="intro-list">
      {items.map((book) => (
        <article className="intro-card" key={book.slug}>
          <BookCover book={book} compact />
          <div>
            <p>{book.format}</p>
            <h2>{book.title}</h2>
            <span>{book.subtitle}</span>
            <p>{book.description}</p>
            <Link href={`/intro/${book.slug}`}>Đọc bài giới thiệu</Link>
          </div>
        </article>
      ))}
    </section>
  );
}

export function BookIntro({ book }: { book: Book }) {
  return (
    <article className="intro-detail">
      <div className="intro-detail-copy">
        <p className="eyebrow">{book.status}</p>
        <h1>{book.title}</h1>
        <p className="subtitle">{book.subtitle}</p>
        <div className="chip-row">
          <span>Điểm {book.score}</span>
          <span>{book.year}</span>
          <span>{book.pages}</span>
          <span>{book.format}</span>
        </div>
        <p>{book.description}</p>
        <div className="tag-row">
          {book.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <BookCover book={book} />
    </article>
  );
}
