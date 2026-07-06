import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("rounded-xl border border-[var(--line)] bg-[var(--card-bg)] text-[var(--text)]", className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("grid gap-1.5 p-6", className)} {...props} />
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-6", className)} {...props} />
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardContent, CardFooter, CardHeader }
