import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center rounded-md border px-2 py-1 text-xs font-extrabold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#f4d675] text-[#151922]",
        secondary: "border-transparent bg-white/10 text-[#d7dbe5]",
        outline: "border-white/20 bg-white/10 text-[#f7f8fb]",
        muted: "border-transparent bg-black/30 text-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }
