"use client";

import {
  Bell,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  ListChecks,
  MessageCircle,
  Play,
  Send,
  Star,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Book, BookChapter, BookComment } from "../_lib/library";

type CoverStyle = CSSProperties & {
  "--cover": string;
  "--panel": string;
};

type CommentSort = "newest" | "popular";

function getCoverStyle(book: Book): CoverStyle {
  return {
    "--cover": book.color,
    "--panel": book.panel,
  };
}

function getInitial(name: string) {
  return name.trim().slice(0, 1).toUpperCase() || "B";
}

function MiniCover({ book }: { book: Book }) {
  return (
    <div
      className="relative min-h-[260px] overflow-hidden rounded-xl border border-[var(--line-strong)] border-l-[12px] border-l-[var(--cover)] bg-[var(--panel)] text-white shadow-[0_24px_60px_rgb(0_0_0/0.28)]"
      style={getCoverStyle(book)}
    >
      <Image
        alt=""
        aria-hidden="true"
        className="object-cover"
        fill
        loading="lazy"
        sizes="260px"
        src={book.coverImage}
        unoptimized
      />
      <span aria-hidden="true" className="absolute inset-0 bg-[var(--cover-overlay)]" />
      <div className="absolute inset-x-4 bottom-4">
        <Badge className="rounded-[7px]" variant="muted">
          {book.status}
        </Badge>
        <strong className="mt-3 block text-2xl font-black leading-none">{book.title}</strong>
        <span className="mt-2 block text-sm text-white/75">{book.author}</span>
      </div>
    </div>
  );
}

function ChapterRow({
  book,
  chapter,
  isPrimary = false,
}: {
  book: Book;
  chapter: BookChapter;
  isPrimary?: boolean;
}) {
  return (
    <Link
      className={[
        "group/chapter grid gap-3 rounded-xl border p-4 outline-none transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--surface-soft)] hover:shadow-[0_18px_50px_rgb(0_0_0/0.18)] focus-visible:ring-3 focus-visible:ring-[var(--accent-ring)]",
        isPrimary
          ? "border-[var(--accent)] bg-[var(--surface-soft)]"
          : "border-[var(--line)] bg-[var(--card-bg)]",
      ].join(" ")}
      href={`/read/${book.slug}?chapter=${chapter.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span>
          <span className="flex items-center gap-2 text-sm font-black text-[var(--accent)]">
            {chapter.label}
            {chapter.isNew ? <Badge variant="default">Mới</Badge> : null}
            {chapter.isLocked ? <Badge variant="outline">Member</Badge> : null}
          </span>
          <strong className="mt-1.5 block text-lg leading-tight">{chapter.title}</strong>
        </span>
        <ChevronRight className="mt-1 size-4 shrink-0 text-[var(--text-muted)] transition group-hover/chapter:translate-x-1 group-hover/chapter:text-[var(--accent)]" />
      </div>
      <p className="text-sm leading-relaxed text-[var(--text-soft)]">{chapter.summary}</p>
      <div className="flex flex-wrap gap-2 text-xs font-extrabold text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" />
          {chapter.readTime}
        </span>
        <span>{chapter.updatedAt}</span>
        <span>{chapter.progress}</span>
      </div>
    </Link>
  );
}

export function BookDetailExperience({
  book,
  chapters,
  initialComments,
}: {
  book: Book;
  chapters: BookChapter[];
  initialComments: BookComment[];
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [fontSize, setFontSize] = useState(17);
  const [sortMode, setSortMode] = useState<CommentSort>("newest");
  const [displayName, setDisplayName] = useState("Bạn đọc");
  const [commentDraft, setCommentDraft] = useState("");
  const [comments, setComments] = useState<BookComment[]>(initialComments);
  const firstChapter = chapters[0];
  const latestChapter =
    [...chapters].reverse().find((chapter) => !chapter.isLocked) ?? firstChapter;
  const primaryActionLabel = book.format === "Truyện tranh" ? "Bắt đầu xem truyện" : "Bắt đầu đọc";
  const completion = Math.min(72, Math.max(28, Number.parseFloat(book.score) * 7.5));
  const sortedComments = useMemo(() => {
    return [...comments].sort((left, right) => {
      if (sortMode === "popular") {
        return right.likes - left.likes;
      }

      return comments.indexOf(left) - comments.indexOf(right);
    });
  }, [comments, sortMode]);

  function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = commentDraft.trim();
    const reader = displayName.trim() || "Bạn đọc";

    if (!text) {
      return;
    }

    setComments((currentComments) => [
      {
        id: `${book.slug}-local-${Date.now()}`,
        reader,
        badge: "Vừa bình luận",
        postedAt: "Vừa xong",
        text,
        likes: 0,
        replies: 0,
      },
      ...currentComments,
    ]);
    setCommentDraft("");
    setSortMode("newest");
  }

  function likeComment(id: string) {
    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  }

  return (
    <div className="grid gap-10">
      <section
        className="grid scroll-mt-[100px] grid-cols-[minmax(0,1fr)_360px] gap-6 rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow)] max-xl:grid-cols-1 max-md:p-4"
        id="start-reading"
      >
        <div className="grid content-between gap-8">
          <div>
            <Badge className="rounded-[7px] px-3 py-1.5" variant="outline">
              Sẵn sàng đọc
            </Badge>
            <h2 className="mt-4 text-[clamp(30px,4vw,54px)] font-black leading-[0.98]">
              Bắt đầu với {book.title}
            </h2>
            <p className="mt-4 max-w-[760px] text-base leading-[1.75] text-[var(--text-soft)]">
              Chọn đọc từ đầu, nhảy đến chương mới nhất hoặc lưu truyện vào kệ để tiếp tục sau.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
            <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-[54px] rounded-xl px-5 text-base"
              )}
              href={`/read/${book.slug}?chapter=${firstChapter.id}`}
            >
              <Play className="size-4" />
              {primaryActionLabel}
            </Link>
            <Link
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-[54px] rounded-xl px-5 text-base"
              )}
              href={`/read/${book.slug}?chapter=${latestChapter.id}`}
            >
              <BookOpen className="size-4" />
              Đọc mới nhất
            </Link>
            <Button
              className="h-[54px] rounded-xl px-5 text-base"
              type="button"
              variant={isSaved ? "default" : "secondary"}
              onClick={() => setIsSaved((value) => !value)}
            >
              {isSaved ? <CheckCircle2 className="size-4" /> : <Bookmark className="size-4" />}
              {isSaved ? "Đã lưu" : "Lưu vào kệ"}
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
            {[
              ["Chương", String(chapters.length)],
              ["Tiến độ đọc", `${Math.round(completion)}%`],
              ["Cập nhật", latestChapter.updatedAt],
              ["Thể loại", book.tags[0] ?? book.format],
            ].map(([label, value]) => (
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4" key={label}>
                <span className="text-xs font-extrabold text-[var(--text-muted)]">{label}</span>
                <strong className="mt-1 block text-xl">{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <MiniCover book={book} />
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
            <div className="flex items-center justify-between gap-4">
              <span>
                <strong className="block">Tiến độ đọc thử</strong>
                <small className="mt-1 block text-[var(--text-muted)]">Tự lưu trong phiên đọc</small>
              </span>
              <Eye className="size-5 text-[var(--accent)]" />
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--chip-bg)]">
              <span
                className="block h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_360px] gap-6 max-xl:grid-cols-1">
        <div className="grid gap-5" id="chapters">
          <div className="flex items-end justify-between gap-4 max-md:flex-col max-md:items-start">
            <span>
              <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
                <ListChecks className="size-4" />
                Danh sách chương
              </span>
              <h2 className="mt-2 text-[clamp(28px,3vw,38px)] font-black">Chọn điểm bắt đầu</h2>
            </span>
            <Badge className="rounded-[7px] px-3 py-2" variant="outline">
              {chapters.filter((chapter) => !chapter.isLocked).length} chương mở
            </Badge>
          </div>

          <div className="grid gap-3">
            {chapters.map((chapter, index) => (
              <ChapterRow
                book={book}
                chapter={chapter}
                isPrimary={index === 0}
                key={chapter.id}
              />
            ))}
          </div>
        </div>

        <aside className="grid h-fit gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)] p-5 max-xl:grid-cols-2 max-md:grid-cols-1">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
              <Star className="size-4" />
              Tiện ích đọc
            </span>
            <h3 className="mt-2 text-2xl font-black">Theo dõi truyện</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
              Các trạng thái này là UI local để mô phỏng trải nghiệm thành viên.
            </p>
          </div>

          <div className="grid gap-3">
            <Button
              className="h-12 justify-start rounded-xl px-4"
              type="button"
              variant={isFollowing ? "default" : "secondary"}
              onClick={() => setIsFollowing((value) => !value)}
            >
              <Bell className="size-4" />
              {isFollowing ? "Đang nhận chương mới" : "Nhận chương mới"}
            </Button>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold">Cỡ chữ đọc thử</span>
                <span className="text-sm font-black text-[var(--accent)]">{fontSize}px</span>
              </div>
              <input
                aria-label="Cỡ chữ đọc thử"
                className="mt-4 w-full accent-[var(--accent)]"
                max={22}
                min={15}
                type="range"
                value={fontSize}
                onChange={(event) => setFontSize(Number(event.target.value))}
              />
              <p className="mt-3 leading-relaxed text-[var(--text-soft)]" style={{ fontSize }}>
                Một đoạn xem trước để kiểm tra cảm giác đọc trước khi vào trình đọc.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section
        className="grid scroll-mt-[100px] grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] gap-6 max-xl:grid-cols-1"
        id="comments"
      >
        <form
          className="grid h-fit gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)] p-5"
          onSubmit={handleCommentSubmit}
        >
          <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
            <MessageCircle className="size-4" />
            Bình luận
          </span>
          <h2 className="text-[clamp(28px,3vw,38px)] font-black">Chia sẻ cảm nhận</h2>
          <Input
            className="h-12"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <Textarea
            placeholder="Viết cảm nhận, hỏi về chương mới hoặc gợi ý người khác có nên đọc không..."
            value={commentDraft}
            onChange={(event) => setCommentDraft(event.target.value)}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-[var(--text-muted)]">
              Bình luận hiển thị ngay trong phiên hiện tại.
            </span>
            <Button className="h-11 rounded-xl px-5" disabled={!commentDraft.trim()} type="submit">
              <Send className="size-4" />
              Gửi bình luận
            </Button>
          </div>
        </form>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
            <div>
              <h2 className="text-[clamp(28px,3vw,38px)] font-black">Cộng đồng đọc</h2>
              <p className="mt-2 text-[var(--text-soft)]">{comments.length} bình luận về tác phẩm này</p>
            </div>
            <div className="flex gap-2">
              {[
                ["newest", "Mới nhất"],
                ["popular", "Hữu ích"],
              ].map(([value, label]) => (
                <Button
                  aria-pressed={sortMode === value}
                  className="h-10 rounded-full px-4"
                  key={value}
                  type="button"
                  variant={sortMode === value ? "default" : "outline"}
                  onClick={() => setSortMode(value as CommentSort)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {sortedComments.map((comment) => (
              <Card className="rounded-xl bg-[var(--card-bg)]" key={comment.id}>
                <CardContent className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 p-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-[var(--accent)] font-black text-[var(--accent-contrast)]">
                    {getInitial(comment.reader)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong>{comment.reader}</strong>
                      <Badge variant="secondary">{comment.badge}</Badge>
                      <span className="text-xs font-bold text-[var(--text-muted)]">{comment.postedAt}</span>
                    </div>
                    <p className="mt-2 leading-relaxed text-[var(--text-soft)]">{comment.text}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        className="h-9 rounded-full px-3"
                        type="button"
                        variant="ghost"
                        onClick={() => likeComment(comment.id)}
                      >
                        <ThumbsUp className="size-4" />
                        {comment.likes}
                      </Button>
                      <Button className="h-9 rounded-full px-3" type="button" variant="ghost">
                        Trả lời {comment.replies ? comment.replies : ""}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
