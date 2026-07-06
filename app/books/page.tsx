import { BookGrid, RouteHero } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function BooksPage() {
  return (
    <ReaderShell>
      <main className="page-flow">
        <RouteHero
          title="Sách mới lên kệ"
          description="Tổng hợp sách mới, sách nổi bật và các đầu sách đang được đọc nhiều trong tuần."
          action="Cập nhật mỗi ngày"
        />
        <BookGrid items={books.filter((book) => book.format !== "Truyện tranh")} />
      </main>
    </ReaderShell>
  );
}
