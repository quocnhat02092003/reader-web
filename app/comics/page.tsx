import { BookGrid, RouteHero } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function ComicsPage() {
  return (
    <ReaderShell>
      <main className="page-flow">
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
