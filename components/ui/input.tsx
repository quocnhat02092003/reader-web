import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-white/10 bg-[#151922] px-3 text-sm text-white outline-none transition placeholder:text-[#9ca3b2] focus:border-[#f4d675]/60 focus:ring-3 focus:ring-[#f4d675]/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400/60 aria-invalid:ring-red-400/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
