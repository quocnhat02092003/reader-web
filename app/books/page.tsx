import { BookGrid, RouteHero } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function BooksPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-[46px] px-6 pb-[72px] pt-[54px] max-md:gap-8 max-md:px-4 max-md:pb-14 max-md:pt-7">
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
