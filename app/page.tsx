import { HeroDashboard, ShelfPanel, StatsStrip, TopicGrid } from "./_components/book-ui";
import { ReaderShell } from "./_components/reader-shell";

export default function Home() {
  return (
    <ReaderShell>
      <main className="page-flow">
        <HeroDashboard />
        <TopicGrid />
        <StatsStrip />
        <ShelfPanel />
      </main>
    </ReaderShell>
  );
}
