"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { navItems } from "../_lib/library";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "R"}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
}

export function ReaderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("An Reader");
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("displayName") ?? "").trim();
    setDisplayName(name || "Reader");
    setIsLoggedIn(true);
  }

  return (
    <div className="min-h-screen bg-[#151922] [background-image:repeating-radial-gradient(circle_at_0_0,rgb(255_255_255/0.035)_0_1px,transparent_1px_6px)]">
      <header className="sticky top-0 z-40 grid min-h-[74px] grid-cols-[auto_minmax(240px,370px)_minmax(0,1fr)_auto] items-center gap-7 border-b border-white/10 bg-[rgb(9_11_18/0.92)] px-6 py-3.5 backdrop-blur-2xl max-xl:grid-cols-[auto_minmax(220px,1fr)_auto] max-xl:gap-4 max-md:grid-cols-[1fr_auto] max-md:px-4">
        <Link className="inline-flex min-w-max items-center gap-2.5" href="/dashboard">
          <span className="grid size-[42px] place-items-center rounded-xl border-2 border-[#f4d675] font-black text-[#f4d675]">
            K
          </span>
          <span>
            <strong className="block text-[22px] font-black leading-none">KệSách</strong>
            <small className="mt-0.5 block text-xs text-[#a6adbd]">Đọc hay mỗi ngày</small>
          </span>
        </Link>

        <form className="h-11 max-md:col-span-full" role="search">
          <input
            className="h-full w-full rounded-lg border border-transparent bg-[#232631] px-[18px] text-white outline-none transition placeholder:text-[#c3c7d0] focus:border-[#f4d675]/60 focus:bg-[#282c39]"
            placeholder="Tìm kiếm sách, truyện, tác giả"
            type="search"
          />
        </form>

        <nav
          className="flex min-w-0 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] max-xl:order-4 max-xl:col-span-full [&::-webkit-scrollbar]:hidden"
          aria-label="Điều hướng chính"
        >
          {navItems.map((item) => {
            const isActive =
              (item.href === "/dashboard" && pathname === "/") ||
              (item.href === "/introductions" && pathname.startsWith("/intro/")) ||
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                className={[
                  "shrink-0 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#f5f7fb] transition hover:bg-white/10 hover:text-[#f4d675]",
                  isActive ? "bg-white/10 text-[#f4d675]" : "",
                ].join(" ")}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative">
          <button
            className="h-11 min-w-28 cursor-pointer rounded-full border-0 bg-[#f4f6fa] px-[18px] font-extrabold text-[#151922]"
            type="button"
            onClick={() => setIsMemberOpen((value) => !value)}
          >
            {isLoggedIn ? initials : "Thành viên"}
          </button>

          {isMemberOpen ? (
            <div className="absolute right-0 top-[calc(100%+12px)] w-[min(320px,calc(100vw-32px))] rounded-xl border border-white/10 bg-[#202432] p-4 shadow-[0_24px_80px_rgb(0_0_0/0.32)]">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="grid size-[42px] place-items-center rounded-lg bg-[#f4d675] font-black text-[#151922]">
                      {initials}
                    </span>
                    <span>
                      <strong className="block">{displayName}</strong>
                      <small className="block text-[13px] text-[#a6adbd]">
                        Đồng bộ thư viện cá nhân
                      </small>
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    {[
                      ["18", "Đang theo dõi"],
                      ["42h", "Đã đọc"],
                    ].map(([value, label]) => (
                      <span className="rounded-lg border border-white/10 p-3 text-[13px] text-[#a6adbd]" key={label}>
                        <strong className="block text-xl text-white">{value}</strong>
                        {label}
                      </span>
                    ))}
                  </div>
                  <button
                    className="mt-3.5 h-[42px] w-full cursor-pointer rounded-lg border-0 bg-white/10 font-extrabold text-white"
                    type="button"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <form className="grid gap-3" onSubmit={handleLogin}>
                  <p className="text-[13px] text-[#a6adbd]">Đăng nhập để lưu tiến độ đọc.</p>
                  <input
                    className="h-[42px] rounded-lg border border-white/10 bg-[#151922] px-3 text-white outline-none"
                    name="displayName"
                    placeholder="Tên hiển thị"
                    type="text"
                  />
                  <input
                    className="h-[42px] rounded-lg border border-white/10 bg-[#151922] px-3 text-white outline-none"
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                  <button className="h-[42px] cursor-pointer rounded-lg border-0 bg-[#f4d675] font-extrabold text-[#171717]" type="submit">
                    Đăng nhập
                  </button>
                </form>
              )}
            </div>
          ) : null}
        </div>
      </header>

      {children}
    </div>
  );
}
