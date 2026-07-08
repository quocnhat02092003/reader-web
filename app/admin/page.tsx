import {
  BarChart3,
  BookMarked,
  CheckCircle2,
  Filter,
  Layers3,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ReaderShell } from "../_components/reader-shell";
import { books, topics } from "../_lib/library";

const adminStats = [
  { label: "Tổng đầu sách", value: books.length.toString(), icon: BookMarked },
  { label: "Thể loại đang mở", value: topics.length.toString(), icon: Layers3 },
  { label: "Bình luận chờ duyệt", value: "18", icon: MessageSquareText },
  { label: "Tỷ lệ hoàn tất metadata", value: "92%", icon: BarChart3 },
];

const bookTypes = [
  {
    name: "Sách",
    count: books.filter((book) => book.format === "Sách").length,
    status: "Đang hiển thị",
    rule: "ISBN, tác giả, số trang",
  },
  {
    name: "Truyện tranh",
    count: books.filter((book) => book.format === "Truyện tranh").length,
    status: "Đang hiển thị",
    rule: "Tập, chương, nhóm dịch",
  },
  {
    name: "Light novel",
    count: books.filter((book) => book.format === "Light novel").length,
    status: "Cần bổ sung",
    rule: "Chương, minh họa, độ tuổi",
  },
  {
    name: "Tản văn",
    count: books.filter((book) => book.format === "Tản văn").length,
    status: "Đang hiển thị",
    rule: "Chủ đề, độ dài, tuyển tập",
  },
];

export default function AdminPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid w-full max-w-[1900px] gap-8 px-6 pb-[72px] pt-8 max-md:px-4">
        <section className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)] p-[clamp(22px,4vw,44px)] shadow-[var(--shadow)] max-lg:grid-cols-1">
          <div>
            <Badge className="rounded-[7px] px-3 py-2" variant="default">
              Admin UI
            </Badge>
            <h1 className="mt-5 max-w-[880px] text-[clamp(42px,6vw,82px)] font-black leading-[0.94]">
              Quản lý sách và phân loại nội dung
            </h1>
            <p className="mt-5 max-w-[720px] text-lg leading-relaxed text-[var(--text-soft)]">
              Giao diện quản trị mẫu để quản lý loại sách, metadata, trạng thái xuất bản và kiểm duyệt nội dung.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="h-12 rounded-xl px-5" type="button">
              <Plus className="size-4" />
              Thêm sách
            </Button>
            <Button className="h-12 rounded-xl px-5" type="button" variant="secondary">
              <Upload className="size-4" />
              Import
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
          {adminStats.map((item) => {
            const Icon = item.icon;

            return (
              <Card className="rounded-[16px] bg-[var(--card-bg)]" key={item.label}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-[var(--surface-soft)] text-[var(--accent)]">
                      <Icon className="size-5" />
                    </span>
                    <Badge variant="outline">Live</Badge>
                  </div>
                  <strong className="mt-5 block text-3xl font-black">{item.value}</strong>
                  <span className="mt-1 block text-sm text-[var(--text-muted)]">{item.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] gap-6 max-2xl:grid-cols-1">
          <Card className="rounded-[18px] bg-[var(--card-bg)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
                    <Layers3 className="size-4" />
                    Loại sách
                  </span>
                  <h2 className="mt-2 text-3xl font-black">Quản lý phân loại</h2>
                </div>
                <Button className="h-10 rounded-full px-4" type="button" variant="outline">
                  Cấu hình field
                </Button>
              </div>

              <div className="mt-5 grid gap-3">
                {bookTypes.map((type) => (
                  <div
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4 transition hover:border-[var(--accent)] max-md:grid-cols-1"
                    key={type.name}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-lg">{type.name}</strong>
                        <Badge variant={type.status === "Cần bổ sung" ? "outline" : "secondary"}>
                          {type.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                        Bộ field bắt buộc: {type.rule}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl border border-[var(--line)] bg-[var(--card-bg)] px-4 py-3 text-center">
                        <strong className="block text-2xl">{type.count}</strong>
                        <small className="text-[var(--text-muted)]">đầu sách</small>
                      </span>
                      <Button className="size-10 rounded-full p-0" type="button" variant="ghost">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] bg-[var(--card-bg)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
                    <Shield className="size-4" />
                    Kiểm soát nội dung
                  </span>
                  <h2 className="mt-2 text-3xl font-black">Hàng chờ quản trị</h2>
                </div>
                <Button className="h-10 rounded-full px-4" type="button" variant="secondary">
                  Duyệt hàng loạt
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 max-md:grid-cols-1">
                {[
                  ["6", "Sách cần kiểm metadata"],
                  ["18", "Bình luận cần duyệt"],
                  ["3", "Ảnh bìa lỗi"],
                ].map(([value, label]) => (
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4" key={label}>
                    <strong className="block text-3xl font-black">{value}</strong>
                    <span className="mt-1 block text-sm text-[var(--text-muted)]">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3">
                {topics.slice(0, 4).map((topic) => (
                  <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-3" key={topic.title}>
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: topic.color }}
                    />
                    <strong className="min-w-0 flex-1">{topic.title}</strong>
                    <Badge variant="outline">{topic.caption}</Badge>
                    <CheckCircle2 className="size-4 text-[var(--accent)]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 rounded-[18px] border border-[var(--line)] bg-[var(--card-bg)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
                <BookMarked className="size-4" />
                Thư viện sách
              </span>
              <h2 className="mt-2 text-3xl font-black">Danh sách đang quản lý</h2>
            </div>
            <div className="flex min-w-[min(520px,100%)] gap-2 max-md:w-full">
              <span className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <Input className="h-11 pl-10" placeholder="Tìm theo tên sách, tác giả, slug..." type="search" />
              </span>
              <Button className="h-11 rounded-xl px-4" type="button" variant="outline">
                <Filter className="size-4" />
                Lọc
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-left">
              <thead className="text-xs uppercase text-[var(--text-muted)]">
                <tr>
                  <th className="px-3 py-2">Sách</th>
                  <th className="px-3 py-2">Loại</th>
                  <th className="px-3 py-2">Trạng thái</th>
                  <th className="px-3 py-2">Năm</th>
                  <th className="px-3 py-2">Điểm</th>
                  <th className="px-3 py-2 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr className="rounded-xl bg-[var(--surface-soft)]" key={book.slug}>
                    <td className="rounded-l-xl px-3 py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md border border-[var(--line)] bg-[var(--panel)]">
                          <Image
                            alt=""
                            aria-hidden="true"
                            className="object-cover"
                            fill
                            loading="lazy"
                            sizes="44px"
                            src={book.coverImage}
                            unoptimized
                          />
                        </span>
                        <span className="min-w-0">
                          <strong className="block truncate">{book.title}</strong>
                          <small className="mt-1 block text-[var(--text-muted)]">{book.author}</small>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant="secondary">{book.format}</Badge>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant="outline">{book.status}</Badge>
                    </td>
                    <td className="px-3 py-3 font-bold">{book.year}</td>
                    <td className="px-3 py-3 font-bold text-[var(--accent)]">{book.score}</td>
                    <td className="rounded-r-xl px-3 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <Button className="h-9 rounded-full px-3" type="button" variant="outline">
                          Sửa
                        </Button>
                        <Button className="size-9 rounded-full p-0" type="button" variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </ReaderShell>
  );
}
