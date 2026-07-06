import { IntroductionList, RouteHero } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function IntroductionsPage() {
  return (
    <ReaderShell>
      <main className="page-flow">
        <RouteHero
          title="Giới thiệu sách"
          description="Các bài tóm tắt nhanh, cảm nhận và lý do nên đọc trước khi thêm sách vào kệ."
          action="Đọc trước khi quyết định"
        />
        <IntroductionList items={books} />
      </main>
    </ReaderShell>
  );
}
