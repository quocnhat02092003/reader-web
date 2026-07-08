import { BookDetailExperience } from "../../_components/book-detail-experience";
import { BookGrid, BookIntro } from "../../_components/book-ui";
import { ReaderShell } from "../../_components/reader-shell";
import { books, getBook, getBookChapters, getBookComments } from "../../_lib/library";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function IntroDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  const chapters = getBookChapters(book);
  const comments = getBookComments(book);

  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-[46px] px-6 pb-[72px] pt-[54px] max-md:gap-8 max-md:px-4 max-md:pb-14 max-md:pt-7">
        <BookIntro book={book} />
        <BookDetailExperience book={book} chapters={chapters} initialComments={comments} />
        <section className="grid gap-6">
          <div>
            <h2 className="text-[clamp(28px,3vw,38px)] font-black">Có thể bạn muốn đọc tiếp</h2>
          </div>
          <BookGrid items={books.filter((item) => item.slug !== book.slug).slice(0, 4)} />
        </section>
      </main>
    </ReaderShell>
  );
}
