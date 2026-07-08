import { BookOpen, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ReaderShell } from "../_components/reader-shell";

const loginBenefits = [
  "Đồng bộ tiến độ đọc",
  "Lưu kệ sách cá nhân",
  "Nhận thông báo chương mới",
];

export default function LoginPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid min-h-[calc(100vh-74px)] w-full max-w-[1320px] grid-cols-[minmax(0,1fr)_460px] items-center gap-10 px-6 py-14 max-lg:grid-cols-1 max-md:px-4">
        <section className="max-w-[720px]">
          <Badge className="rounded-[7px] px-3 py-2" variant="outline">
            Thành viên KệSách
          </Badge>
          <h1 className="mt-5 text-[clamp(46px,7vw,92px)] font-black leading-[0.94]">
            Đăng nhập để đọc liền mạch hơn
          </h1>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-[var(--text-soft)]">
            UI đăng nhập mẫu cho thư viện đọc sách, sẵn sàng nối authentication và phân quyền ở bước sau.
          </p>
          <div className="mt-8 grid max-w-[760px] grid-cols-3 gap-3 max-md:grid-cols-1">
            {loginBenefits.map((benefit) => (
              <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-soft)] p-4" key={benefit}>
                <ShieldCheck className="size-5 text-[var(--accent)]" />
                <strong className="mt-3 block leading-tight">{benefit}</strong>
              </div>
            ))}
          </div>
        </section>

        <Card className="rounded-[18px] bg-[var(--card-bg)] shadow-[var(--shadow)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)]">
                <BookOpen className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl font-black">Đăng nhập</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Tiếp tục đọc từ nơi bạn dừng lại.</p>
              </div>
            </div>

            <form className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-extrabold">
                Email
                <span className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <Input className="h-12 pl-10" placeholder="reader@kesach.vn" type="email" />
                </span>
              </label>
              <label className="grid gap-2 text-sm font-extrabold">
                Mật khẩu
                <span className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <Input className="h-12 pl-10" placeholder="••••••••" type="password" />
                </span>
              </label>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-[var(--text-soft)]">
                  <input className="size-4 accent-[var(--accent)]" type="checkbox" />
                  Ghi nhớ đăng nhập
                </label>
                <Link className="font-extrabold text-[var(--accent)]" href="/login">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button className="h-12 rounded-xl text-base" type="button">
                Đăng nhập
              </Button>
            </form>

            <div className="mt-5 grid gap-3">
              <Button className="h-12 rounded-xl" type="button" variant="outline">
                Tiếp tục với Google
              </Button>
              <p className="text-center text-sm text-[var(--text-muted)]">
                Chưa có tài khoản?{" "}
                <Link className="font-extrabold text-[var(--accent)]" href="/register">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </ReaderShell>
  );
}
