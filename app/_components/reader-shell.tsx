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
    <div className="reader-app">
      <header className="site-header">
        <Link className="brand" href="/dashboard">
          <span className="brand-mark">K</span>
          <span>
            <strong>KệSách</strong>
            <small>Đọc hay mỗi ngày</small>
          </span>
        </Link>

        <form className="search-box" role="search">
          <input placeholder="Tìm kiếm sách, truyện, tác giả" type="search" />
        </form>

        <nav className="main-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const isActive =
              (item.href === "/dashboard" && pathname === "/") ||
              (item.href === "/introductions" && pathname.startsWith("/intro/")) ||
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link className={isActive ? "active" : undefined} href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="member-wrap">
          <button
            className="member-button"
            type="button"
            onClick={() => setIsMemberOpen((value) => !value)}
          >
            {isLoggedIn ? initials : "Thành viên"}
          </button>

          {isMemberOpen ? (
            <div className="member-panel">
              {isLoggedIn ? (
                <>
                  <div className="member-row">
                    <span className="member-avatar">{initials}</span>
                    <span>
                      <strong>{displayName}</strong>
                      <small>Đồng bộ thư viện cá nhân</small>
                    </span>
                  </div>
                  <div className="member-stats">
                    <span>
                      <strong>18</strong>
                      Đang theo dõi
                    </span>
                    <span>
                      <strong>42h</strong>
                      Đã đọc
                    </span>
                  </div>
                  <button className="ghost-button" type="button" onClick={() => setIsLoggedIn(false)}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <form className="login-form" onSubmit={handleLogin}>
                  <p>Đăng nhập để lưu tiến độ đọc.</p>
                  <input name="displayName" placeholder="Tên hiển thị" type="text" />
                  <input name="email" placeholder="Email" type="email" />
                  <button type="submit">Đăng nhập</button>
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
