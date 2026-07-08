"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { navItems } from "../_lib/library";

type ThemeName = "dark" | "light";
type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

const themeStyles: Record<ThemeName, ThemeStyle> = {
  dark: {
    "--page-bg": "#151922",
    "--page-pattern":
      "repeating-radial-gradient(circle at 0 0, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 6px)",
    "--header-bg": "rgb(9 11 18 / 0.92)",
    "--surface": "#202432",
    "--surface-soft": "rgb(255 255 255 / 0.05)",
    "--surface-muted": "#232735",
    "--card-bg": "rgb(255 255 255 / 0.035)",
    "--card-strong": "#171a23",
    "--input-bg": "#232631",
    "--input-focus": "#282c39",
    "--text": "#f6f7fb",
    "--text-strong": "#ffffff",
    "--text-muted": "#a6adbd",
    "--text-soft": "#c4c9d4",
    "--line": "rgb(255 255 255 / 0.10)",
    "--line-strong": "rgb(255 255 255 / 0.20)",
    "--accent": "#f4d675",
    "--accent-contrast": "#151922",
    "--accent-ring": "rgb(244 214 117 / 0.22)",
    "--chip-bg": "rgb(255 255 255 / 0.10)",
    "--chip-text": "#d7dbe5",
    "--member-bg": "#f4f6fa",
    "--member-text": "#151922",
    "--cover-overlay": "rgb(0 0 0 / 0.45)",
    "--shadow": "0 24px 80px rgb(0 0 0 / 0.32)",
    "--rank-muted": "rgb(255 255 255 / 0.30)",
  },
  light: {
    "--page-bg": "#f4f2ed",
    "--page-pattern":
      "repeating-radial-gradient(circle at 0 0, rgb(21 25 34 / 0.055) 0 1px, transparent 1px 6px)",
    "--header-bg": "rgb(255 255 255 / 0.88)",
    "--surface": "#ffffff",
    "--surface-soft": "rgb(21 25 34 / 0.045)",
    "--surface-muted": "#ebe8df",
    "--card-bg": "rgb(255 255 255 / 0.78)",
    "--card-strong": "#ffffff",
    "--input-bg": "#ffffff",
    "--input-focus": "#fffaf0",
    "--text": "#151922",
    "--text-strong": "#0f1218",
    "--text-muted": "#626b7a",
    "--text-soft": "#4b5565",
    "--line": "rgb(21 25 34 / 0.12)",
    "--line-strong": "rgb(21 25 34 / 0.20)",
    "--accent": "#9a6b16",
    "--accent-contrast": "#ffffff",
    "--accent-ring": "rgb(154 107 22 / 0.18)",
    "--chip-bg": "rgb(21 25 34 / 0.08)",
    "--chip-text": "#293140",
    "--member-bg": "#151922",
    "--member-text": "#f8fafc",
    "--cover-overlay": "rgb(0 0 0 / 0.34)",
    "--shadow": "0 24px 72px rgb(29 35 48 / 0.14)",
    "--rank-muted": "rgb(21 25 34 / 0.32)",
  },
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "R"}${parts.at(-1)?.[0] ?? ""}`.toUpperCase();
}

export function ReaderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("An Reader");
  const [theme, setTheme] = useState<ThemeName>("dark");
  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const isDark = theme === "dark";

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const storedTheme = window.localStorage.getItem("reader-theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
        return;
      }

      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
      }
    });
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem("reader-theme", nextTheme);
      return nextTheme;
    });
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("displayName") ?? "").trim();
    setDisplayName(name || "Reader");
    setIsLoggedIn(true);
  }

  return (
    <div
      className={[
        "min-h-screen bg-[var(--page-bg)] text-[var(--text)] [background-image:var(--page-pattern)] transition-colors duration-300",
        isDark ? "dark" : "",
      ].join(" ")}
      data-theme={theme}
      style={themeStyles[theme]}
    >
      <header className="sticky top-0 z-40 grid min-h-[74px] grid-cols-[auto_minmax(240px,370px)_minmax(0,1fr)_auto] items-center gap-7 border-b border-[var(--line)] bg-[var(--header-bg)] px-6 py-3.5 text-[var(--text)] backdrop-blur-2xl max-xl:grid-cols-[auto_minmax(220px,1fr)_auto] max-xl:gap-4 max-md:grid-cols-[1fr_auto] max-md:px-4">
        <Link className="inline-flex min-w-max items-center gap-2.5" href="/dashboard">
          <span className="grid size-[42px] place-items-center rounded-xl border-2 border-[var(--accent)] font-black text-[var(--accent)]">
            K
          </span>
          <span>
            <strong className="block text-[22px] font-black leading-none">KệSách</strong>
            <small className="mt-0.5 block text-xs text-[var(--text-muted)]">Đọc hay mỗi ngày</small>
          </span>
        </Link>

        <form className="h-11 max-md:col-span-full" role="search">
          <Input
            className="h-full w-full rounded-lg border-transparent bg-[var(--input-bg)] px-[18px]"
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
              (item.href === "/introductions" && pathname.startsWith("/read/")) ||
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                className={[
                  "shrink-0 rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--chip-bg)] hover:text-[var(--accent)]",
                  isActive ? "bg-[var(--chip-bg)] text-[var(--accent)]" : "",
                ].join(" ")}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative flex items-center gap-2">
          <Button
            aria-label={isDark ? "Chuyển sang light mode" : "Chuyển sang dark mode"}
            className="size-11 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] p-0 text-[var(--text)] hover:bg-[var(--chip-bg)]"
            type="button"
            variant="ghost"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Button
            className="h-11 min-w-28 cursor-pointer rounded-full border-0 bg-[var(--member-bg)] px-[18px] font-extrabold text-[var(--member-text)] hover:brightness-105"
            type="button"
            onClick={() => setIsMemberOpen((value) => !value)}
          >
            {isLoggedIn ? initials : "Thành viên"}
          </Button>

          {isMemberOpen ? (
            <Card className="absolute right-0 top-[calc(100%+12px)] w-[min(320px,calc(100vw-32px))] bg-[var(--surface)] shadow-[var(--shadow)]">
              <CardContent className="p-4">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="grid size-[42px] place-items-center rounded-lg bg-[var(--accent)] font-black text-[var(--accent-contrast)]">
                        {initials}
                      </span>
                      <span>
                        <strong className="block">{displayName}</strong>
                        <small className="block text-[13px] text-[var(--text-muted)]">
                          Đồng bộ thư viện cá nhân
                        </small>
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      {[
                        ["18", "Đang theo dõi"],
                        ["42h", "Đã đọc"],
                      ].map(([value, label]) => (
                        <span className="rounded-lg border border-[var(--line)] p-3 text-[13px] text-[var(--text-muted)]" key={label}>
                          <strong className="block text-xl text-[var(--text-strong)]">{value}</strong>
                          {label}
                        </span>
                      ))}
                    </div>
                    <Button
                      className="mt-3.5 h-[42px] w-full cursor-pointer rounded-lg border-0 bg-[var(--chip-bg)] font-extrabold text-[var(--text)] hover:brightness-105"
                      type="button"
                      variant="secondary"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Đăng xuất
                    </Button>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Link
                        className="inline-flex h-[38px] items-center justify-center rounded-lg bg-[var(--chip-bg)] text-sm font-extrabold text-[var(--text)] transition hover:text-[var(--accent)]"
                        href="/admin"
                      >
                        Admin
                      </Link>
                      <Link
                        className="inline-flex h-[38px] items-center justify-center rounded-lg bg-[var(--chip-bg)] text-sm font-extrabold text-[var(--text)] transition hover:text-[var(--accent)]"
                        href="/logout"
                      >
                        Logout
                      </Link>
                    </div>
                  </>
                ) : (
                  <form className="grid gap-3" onSubmit={handleLogin}>
                    <p className="text-[13px] text-[var(--text-muted)]">Đăng nhập để lưu tiến độ đọc.</p>
                    <Input
                      className="h-[42px]"
                      name="displayName"
                      placeholder="Tên hiển thị"
                      type="text"
                    />
                    <Input
                      className="h-[42px]"
                      name="email"
                      placeholder="Email"
                      type="email"
                    />
                    <Button className="h-[42px] cursor-pointer rounded-lg" type="submit">
                      Đăng nhập
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        className="inline-flex h-[38px] items-center justify-center rounded-lg bg-[var(--chip-bg)] text-sm font-extrabold text-[var(--text)] transition hover:text-[var(--accent)]"
                        href="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="inline-flex h-[38px] items-center justify-center rounded-lg bg-[var(--chip-bg)] text-sm font-extrabold text-[var(--text)] transition hover:text-[var(--accent)]"
                        href="/register"
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </header>

      {children}
    </div>
  );
}
