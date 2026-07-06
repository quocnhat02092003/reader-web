import { BookGrid, RouteHero } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function ComicsPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-[46px] px-6 pb-[72px] pt-[54px] max-md:gap-8 max-md:px-4 max-md:pb-14 max-md:pt-7">
        <RouteHero
          title="Truyện tranh đang đọc"
          description="Không gian riêng cho manga, webtoon và truyện tranh Việt có tiến độ cập nhật rõ ràng."
          action="Theo dõi tập mới"
        />
        <BookGrid items={books.filter((book) => book.format === "Truyện tranh")} />
      </main>
    </ReaderShell>
  );
}
