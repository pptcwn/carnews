'use client'

import { Mail } from "lucide-react"

export function NewsletterCTA() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary to-primary/70 p-8 md:p-10 text-primary-foreground">
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Mail className="h-3.5 w-3.5" /> Newsletter
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">
            รับข่าวรถยนต์ใหม่ส่งตรงทุกเช้า
          </h3>
          <p className="mt-2 max-w-xl text-sm md:text-base opacity-90">
            สมัครรับจดหมายข่าว CarNews Thailand ทุกวัน — สรุปข่าวรถใหม่ ราคาในไทย และรีวิวรุ่นเด่นในกล่องอีเมลคุณ
          </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:min-w-[360px]"
        >
          <input
            type="email"
            required
            placeholder="email@example.com"
            className="h-12 flex-1 rounded-lg border-0 bg-white/15 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/70 outline-none focus:bg-white/25"
          />
          <button
            type="submit"
            className="h-12 rounded-lg bg-background px-5 text-sm font-semibold text-foreground hover:bg-background/90 transition-colors"
          >
            สมัครรับข่าว
          </button>
        </form>
      </div>
    </section>
  )
}
