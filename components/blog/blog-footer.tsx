import Link from "next/link"
import { Facebook, Twitter, Youtube, Rss, Mail } from "lucide-react"

export function BlogFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-sm">
              CN
            </span>
            <span className="text-lg">
              CarNews <span className="text-primary">Thailand</span>
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            แหล่งรวมข่าวรถยนต์ที่ครบที่สุดในประเทศไทย อัปเดตทุกวัน เปรียบเทียบสเปค ราคา และวันเปิดตัวในไทย
          </p>
          <div className="mt-4 flex items-center gap-2">
            <SocialBtn label="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialBtn>
            <SocialBtn label="X / Twitter">
              <Twitter className="h-4 w-4" />
            </SocialBtn>
            <SocialBtn label="YouTube">
              <Youtube className="h-4 w-4" />
            </SocialBtn>
            <SocialBtn label="RSS">
              <Rss className="h-4 w-4" />
            </SocialBtn>
            <SocialBtn label="Email">
              <Mail className="h-4 w-4" />
            </SocialBtn>
          </div>
        </div>

        <FooterCol title="เนื้อหา">
          <Link href="/blog-preview" className="hover:text-primary">หน้าแรก</Link>
          <Link href="/blog-preview/category/EV" className="hover:text-primary">รถ EV</Link>
          <Link href="/blog-preview/category/SUV" className="hover:text-primary">รถ SUV</Link>
          <Link href="/blog-preview/category/Pickup" className="hover:text-primary">รถกระบะ</Link>
        </FooterCol>

        <FooterCol title="เกี่ยวกับ">
          <a href="#" className="hover:text-primary">เกี่ยวกับเรา</a>
          <a href="#" className="hover:text-primary">ติดต่อกองบรรณาธิการ</a>
          <a href="#" className="hover:text-primary">RSS Feed</a>
          <a href="#" className="hover:text-primary">นโยบายความเป็นส่วนตัว</a>
        </FooterCol>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} CarNews Thailand. All rights reserved.</p>
          <p>Powered by automated editorial workflow · Mock prototype</p>
        </div>
      </div>
    </footer>
  )
}

function SocialBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
    >
      {children}
    </button>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}
