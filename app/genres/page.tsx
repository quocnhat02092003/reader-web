import { BookGrid, RouteHero, TopicGrid } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function GenresPage() {
  return (
    <ReaderShell>
      <main className="page-flow">
        <RouteHero
          title="Khám phá theo thể loại"
          description="Đi từ chủ đề bạn đang quan tâm tới sách, truyện và bài giới thiệu phù hợp."
          action="Chọn chủ đề để lọc kệ đọc"
        />
        <TopicGrid />
        <BookGrid items={books.slice(0, 6)} />
      </main>
    </ReaderShell>
  );
}
