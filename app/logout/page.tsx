import { LogIn, LogOut, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReaderShell } from "../_components/reader-shell";

export default function LogoutPage() {
  return (
    <ReaderShell>
      <main className="mx-auto grid min-h-[calc(100vh-74px)] w-full max-w-[980px] place-items-center px-6 py-14 max-md:px-4">
        <Card className="w-full rounded-[18px] bg-[var(--card-bg)] shadow-[var(--shadow)]">
          <CardContent className="grid gap-6 p-[clamp(24px,5vw,54px)] text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)]">
              <LogOut className="size-7" />
            </span>
            <div>
              <Badge className="rounded-[7px] px-3 py-2" variant="outline">
                Phiên đăng nhập
              </Badge>
              <h1 className="mt-5 text-[clamp(38px,6vw,72px)] font-black leading-none">
                Bạn đã đăng xuất
              </h1>
              <p className="mx-auto mt-4 max-w-[620px] text-lg leading-relaxed text-[var(--text-soft)]">
                Đây là UI xác nhận đăng xuất. Khi nối backend, trang này sẽ clear session/token trước khi điều hướng.
              </p>
            </div>
            <div className="mx-auto grid w-full max-w-[520px] grid-cols-2 gap-3 max-md:grid-cols-1">
              <Link
                className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-xl")}
                href="/login"
              >
                <LogIn className="size-4" />
                Đăng nhập lại
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "h-12 rounded-xl")}
                href="/dashboard"
              >
                <RotateCcw className="size-4" />
                Về dashboard
              </Link>
            </div>
            <Button className="mx-auto h-10 rounded-full px-4" type="button" variant="outline">
              Xóa cache đọc trên thiết bị
            </Button>
          </CardContent>
        </Card>
      </main>
    </ReaderShell>
  );
}
