import { IntroductionList, RouteHero } from "../_components/book-ui";
import { ReaderShell } from "../_components/reader-shell";
import { books } from "../_lib/library";

export default function IntroductionsPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-[46px] px-6 pb-[72px] pt-[54px] max-md:gap-8 max-md:px-4 max-md:pb-14 max-md:pt-7">
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
