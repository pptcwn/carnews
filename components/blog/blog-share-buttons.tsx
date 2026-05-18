'use client'

import { useState } from "react"
import { Facebook, Twitter, MessageCircle, Link as LinkIcon, Check } from "lucide-react"

export function BlogShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* noop */
    }
  }

  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const btn =
    "inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">แชร์:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4 text-[#1877F2]" />
        <span className="hidden sm:inline">Facebook</span>
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on Line"
      >
        <MessageCircle className="h-4 w-4 text-[#06C755]" />
        <span className="hidden sm:inline">LINE</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Share on X"
      >
        <Twitter className="h-4 w-4" />
        <span className="hidden sm:inline">X</span>
      </a>
      <button onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? "คัดลอกแล้ว" : "คัดลอกลิงก์"}</span>
      </button>
    </div>
  )
}
