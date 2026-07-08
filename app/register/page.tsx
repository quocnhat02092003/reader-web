import { CheckCircle2, Mail, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ReaderShell } from "../_components/reader-shell";

const registerSteps = [
  "Tạo tài khoản đọc",
  "Chọn thể loại yêu thích",
  "Theo dõi sách và truyện mới",
];

export default function RegisterPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid min-h-[calc(100vh-74px)] w-full max-w-[1320px] grid-cols-[480px_minmax(0,1fr)] items-center gap-10 px-6 py-14 max-lg:grid-cols-1 max-md:px-4">
        <Card className="rounded-[18px] bg-[var(--card-bg)] shadow-[var(--shadow)]">
          <CardContent className="p-6">
            <Badge className="rounded-[7px] px-3 py-2" variant="outline">
              Tài khoản mới
            </Badge>
            <h1 className="mt-5 text-[clamp(34px,5vw,56px)] font-black leading-none">
              Đăng ký KệSách
            </h1>
            <p className="mt-3 leading-relaxed text-[var(--text-soft)]">
              UI đăng ký trước, chưa xử lý backend hay xác thực email.
            </p>

            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-extrabold">
                Tên hiển thị
                <span className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <Input className="h-12 pl-10" placeholder="An Reader" type="text" />
                </span>
              </label>
              <label className="grid gap-2 text-sm font-extrabold">
                Email
                <span className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <Input className="h-12 pl-10" placeholder="reader@kesach.vn" type="email" />
                </span>
              </label>
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <label className="grid gap-2 text-sm font-extrabold">
                  Mật khẩu
                  <Input className="h-12" placeholder="••••••••" type="password" />
                </label>
                <label className="grid gap-2 text-sm font-extrabold">
                  Nhập lại
                  <Input className="h-12" placeholder="••••••••" type="password" />
                </label>
              </div>
              <label className="flex items-start gap-2 text-sm leading-relaxed text-[var(--text-soft)]">
                <input className="mt-1 size-4 accent-[var(--accent)]" type="checkbox" />
                Tôi đồng ý nhận thông báo sách mới, chương mới và cập nhật từ KệSách.
              </label>
              <Button className="h-12 rounded-xl text-base" type="button">
                Tạo tài khoản
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
              Đã có tài khoản?{" "}
              <Link className="font-extrabold text-[var(--accent)]" href="/login">
                Đăng nhập
              </Link>
            </p>
          </CardContent>
        </Card>

        <section>
          <Badge className="rounded-[7px] px-3 py-2" variant="default">
            Trải nghiệm cá nhân hóa
          </Badge>
          <h2 className="mt-5 max-w-[720px] text-[clamp(44px,7vw,88px)] font-black leading-[0.94]">
            Một tài khoản cho toàn bộ kệ đọc
          </h2>
          <div className="mt-8 grid gap-3">
            {registerSteps.map((step, index) => (
              <div className="flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4" key={step}>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--accent)] font-black text-[var(--accent-contrast)]">
                  {index + 1}
                </span>
                <strong className="min-w-0 text-lg">{step}</strong>
                <CheckCircle2 className="ml-auto size-5 shrink-0 text-[var(--accent)]" />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--card-bg)] p-5">
            <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]">
              <ShieldCheck className="size-4" />
              Gợi ý phân quyền
            </span>
            <p className="mt-3 leading-relaxed text-[var(--text-soft)]">
              Sau này có thể tách role `reader`, `moderator`, `admin` để kiểm soát quyền đăng sách, duyệt bình luận và quản lý thể loại.
            </p>
          </div>
        </section>
      </main>
    </ReaderShell>
  );
}
