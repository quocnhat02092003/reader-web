import { BookGrid, BookIntro } from "../../_components/book-ui";
import { ReaderShell } from "../../_components/reader-shell";
import { books, getBook } from "../../_lib/library";

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

  return (
    <ReaderShell>
      <main className="page-flow">
        <BookIntro book={book} />
        <section className="section-block">
          <div className="section-heading">
            <h2>Có thể bạn muốn đọc tiếp</h2>
          </div>
          <BookGrid items={books.filter((item) => item.slug !== book.slug).slice(0, 4)} />
        </section>
      </main>
    </ReaderShell>
  );
}
