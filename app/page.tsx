import {
  CommunityDashboard,
  HeroDashboard,
  NewReleaseRail,
  ShelfPanel,
  StatsStrip,
  TopSeriesRail,
  TopicGrid,
} from "./_components/book-ui";
import { ReaderShell } from "./_components/reader-shell";

export default function Home() {
  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-[46px] px-6 pb-[72px] pt-[54px] max-md:gap-8 max-md:px-4 max-md:pb-14 max-md:pt-7">
        <HeroDashboard />
        <TopicGrid />
        <NewReleaseRail />
        <TopSeriesRail />
        <CommunityDashboard />
        <StatsStrip />
        <ShelfPanel />
      </main>
    </ReaderShell>
  );
}
