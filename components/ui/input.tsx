import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-[var(--line)] bg-[var(--input-bg)] px-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:bg-[var(--input-focus)] focus:ring-3 focus:ring-[var(--accent-ring)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400/60 aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
