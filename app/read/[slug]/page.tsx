import { ChevronLeft, ChevronRight, ListChecks, MessageCircle, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReaderShell } from "../../_components/reader-shell";
import { books, getBook, getBookChapters } from "../../_lib/library";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

function getReadingBlocks(title: string, chapterTitle: string) {
  return [
    `${chapterTitle} mở ra bằng một nhịp chậm, để người đọc có thời gian nhận ra điều đang thay đổi quanh ${title}.`,
    "Không gian được giữ gọn, tập trung vào hành động chính và những chi tiết nhỏ đủ để tạo cảm giác muốn đọc tiếp.",
    "Ở đoạn giữa, nhân vật phải chọn giữa giữ nguyên thói quen cũ hoặc bước vào một cánh cửa chưa từng được gọi tên.",
    "Phần cuối chương để lại một câu hỏi rõ ràng, đủ nhẹ để không làm đứt mạch nhưng đủ sắc để người đọc muốn chuyển sang chương kế tiếp.",
  ];
}

export default async function ReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ chapter?: string }>;
}) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const book = getBook(slug);
  const chapters = getBookChapters(book);
  const activeChapter =
    chapters.find((chapter) => chapter.id === query.chapter) ?? chapters[0];
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeChapter.id);
  const previousChapter = chapters[activeIndex - 1];
  const nextChapter = chapters[activeIndex + 1];
  const progress = Math.round(((activeIndex + 1) / chapters.length) * 100);

  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1720px] gap-6 px-6 pb-[72px] pt-8 max-md:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)] px-5 py-4">
          <div className="min-w-0">
            <Link className="text-sm font-extrabold text-[var(--accent)]" href={`/intro/${book.slug}`}>
              Quay lại giới thiệu
            </Link>
            <h1 className="mt-1 truncate text-2xl font-black">{book.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {previousChapter ? (
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
                href={`/read/${book.slug}?chapter=${previousChapter.id}`}
              >
                <ChevronLeft className="size-4" />
                Chương trước
              </Link>
            ) : null}
            {nextChapter ? (
              <Link
                className={cn(buttonVariants({ variant: "default" }), "h-10 rounded-full px-4")}
                href={`/read/${book.slug}?chapter=${nextChapter.id}`}
              >
                Chương sau
                <ChevronRight className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>

        <section className="grid grid-cols-[minmax(0,1fr)_360px] gap-6 max-xl:grid-cols-1">
          <article className="grid gap-5">
            <div className="overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)]">
              <div className="relative min-h-[320px] overflow-hidden border-b border-[var(--line)] max-md:min-h-[220px]">
                <Image
                  alt=""
                  aria-hidden="true"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1180px"
                  src={book.coverImage}
                  unoptimized
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[var(--cover-overlay)]" />
                <div className="absolute inset-x-0 bottom-0 p-[clamp(22px,4vw,46px)] text-white">
                  <Badge className="rounded-[7px] bg-black/35 text-white" variant="muted">
                    {activeChapter.label}
                  </Badge>
                  <h2 className="mt-4 max-w-[820px] text-[clamp(34px,5vw,68px)] font-black leading-none">
                    {activeChapter.title}
                  </h2>
                  <p className="mt-3 max-w-[720px] text-white/78">{activeChapter.summary}</p>
                </div>
              </div>

              <div className="mx-auto grid max-w-[860px] gap-6 px-6 py-10 max-md:px-4">
                {getReadingBlocks(book.title, activeChapter.title).map((block) => (
                  <p className="text-[19px] leading-[1.9] text-[var(--text)] max-md:text-[17px]" key={block}>
                    {block}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {previousChapter ? (
                <Link
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 transition hover:border-[var(--accent)]"
                  href={`/read/${book.slug}?chapter=${previousChapter.id}`}
                >
                  <span className="text-sm font-black text-[var(--text-muted)]">Trước đó</span>
                  <strong className="mt-1 block">{previousChapter.title}</strong>
                </Link>
              ) : (
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 text-[var(--text-muted)]">
                  Đây là chương đầu tiên.
                </div>
              )}
              {nextChapter ? (
                <Link
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 text-right transition hover:border-[var(--accent)] max-md:text-left"
                  href={`/read/${book.slug}?chapter=${nextChapter.id}`}
                >
                  <span className="text-sm font-black text-[var(--accent)]">Đọc tiếp</span>
                  <strong className="mt-1 block">{nextChapter.title}</strong>
                </Link>
              ) : (
                <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 text-right text-[var(--text-muted)] max-md:text-left">
                  Bạn đã đến chương cuối trong bản xem trước.
                </div>
              )}
            </div>
          </article>

          <aside className="grid h-fit gap-4 xl:sticky xl:top-[92px]">
            <Card className="rounded-[18px] bg-[var(--card-bg)]">
              <CardContent className="p-5">
                <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
                  <Settings2 className="size-4" />
                  Trình đọc
                </span>
                <div className="mt-4 grid gap-3">
                  <div>
                    <div className="flex items-center justify-between text-sm font-extrabold">
                      <span>Tiến độ</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--chip-bg)]">
                      <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <Button className="h-11 rounded-xl" type="button" variant="secondary">
                    Lưu vị trí đọc
                  </Button>
                  <Link
                    className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-xl")}
                    href={`/intro/${book.slug}#comments`}
                  >
                    <MessageCircle className="size-4" />
                    Bình luận
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[18px] bg-[var(--card-bg)]">
              <CardContent className="p-5">
                <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
                  <ListChecks className="size-4" />
                  Chương
                </span>
                <div className="mt-4 grid max-h-[520px] gap-2 overflow-y-auto pr-1">
                  {chapters.map((chapter) => (
                    <Link
                      className={[
                        "rounded-lg border px-3 py-3 text-sm transition hover:border-[var(--accent)] hover:bg-[var(--surface-soft)]",
                        chapter.id === activeChapter.id
                          ? "border-[var(--accent)] bg-[var(--surface-soft)]"
                          : "border-[var(--line)]",
                      ].join(" ")}
                      href={`/read/${book.slug}?chapter=${chapter.id}`}
                      key={chapter.id}
                    >
                      <strong className="block">{chapter.label}</strong>
                      <span className="mt-1 block text-[var(--text-muted)]">{chapter.title}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </main>
    </ReaderShell>
  );
}
