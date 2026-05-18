// TODO: Convert this preview to Astro app later
import type { ReactNode } from "react"
import { BlogNavbar } from "@/components/blog/blog-navbar"
import { BlogFooter } from "@/components/blog/blog-footer"

export default function BlogPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <BlogNavbar />
      <div className="flex-1">{children}</div>
      <BlogFooter />
    </div>
  )
}
