import { BookGrid, RouteHero, TopicGrid } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function GenresPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-[46px] px-6 pb-[72px] pt-[54px] max-md:gap-8 max-md:px-4 max-md:pb-14 max-md:pt-7">
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
