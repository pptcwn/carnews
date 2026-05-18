// CarNews Thailand — Blog Mock Data (Round 3A)
// TODO: Query Supabase car_news_rewrites where rewrite_status = published
// TODO: Join car_news for brand/model/category/cover_image_url
// TODO: Redirect draft/review articles to 404

export type RewriteStatus = "draft" | "review" | "published"

export interface MockArticle {
  news_id: string
  brand: string
  model: string
  category: "EV" | "SUV" | "Sedan" | "Pickup" | "Hypercar" | "Coupe"
  ai_title: string
  ai_detail: string
  short_summary: string
  seo_title: string
  seo_description: string
  slug: string
  tags: string[]
  rewrite_status: RewriteStatus
  cover_image_url: string
  published_date: string
  source: string
  original_url: string
  gallery_images: string[]
}

const img = (seed: string, w = 1600, h = 900) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

const COVERS = {
  camry: "1542362567-b07e54358753",
  byd: "1606664515524-ed2f786a0bd6",
  civic: "1503376780353-7e6692767b70",
  cx5: "1494976388531-d1058494cdd8",
  ix3: "1555215695-3004980ad54e",
  taycan: "1617531653332-bd46c24f2068",
  glc: "1617814076367-b759c7d7e738",
  outlander: "1552519507-da3b142c6e3d",
  extra1: "1583121274602-3e2820c69888",
  extra2: "1492144534655-ae79c964c9d7",
}

export const MOCK_ARTICLES: MockArticle[] = [
  {
    news_id: "n001",
    brand: "Toyota",
    model: "Camry",
    category: "Sedan",
    ai_title: "Toyota Camry 2026 เปิดตัวใหม่ ดีไซน์หรูขึ้น พร้อมขุมพลังไฮบริดประหยัดน้ำมัน",
    ai_detail: "",
    short_summary:
      "โตโยต้าเปิดตัว Camry เจเนอเรชันใหม่ปี 2026 พร้อมดีไซน์ภายนอกที่ดูพรีเมียมขึ้น เครื่องยนต์ไฮบริดรุ่นใหม่ และเทคโนโลยีความปลอดภัย Toyota Safety Sense 3.0 ครบทุกรุ่นย่อย",
    seo_title: "Toyota Camry 2026 เปิดตัวอย่างเป็นทางการ สเปคใหม่ ราคา และวันวางจำหน่าย",
    seo_description:
      "รวมข้อมูล Toyota Camry 2026 ใหม่ล่าสุด ดีไซน์ สเปคเครื่องยนต์ไฮบริด ออปชั่น และราคาคาดการณ์ในประเทศไทย พร้อมเปรียบเทียบกับรุ่นเดิม",
    slug: "toyota-camry-2026-launch",
    tags: ["Toyota", "Camry", "Sedan", "Hybrid", "เปิดตัวใหม่"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.camry),
    published_date: "2026-05-17T09:30:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/toyota-camry-2026",
    gallery_images: [img(COVERS.camry, 1200, 800), img(COVERS.extra1, 1200, 800), img(COVERS.extra2, 1200, 800)],
  },
  {
    news_id: "n002",
    brand: "BYD",
    model: "Seal U",
    category: "EV",
    ai_title: "BYD Seal U ราคาคาดการณ์ในไทย เริ่มต้นไม่ถึงล้าน ท้าชน Tesla Model Y",
    ai_detail: "",
    short_summary:
      "BYD Seal U รถ SUV ไฟฟ้าขนาดกลาง เตรียมเปิดตัวในไทยครึ่งปีหลัง 2026 พร้อมแบตเตอรี่ Blade Battery ระยะวิ่งสูงสุด 500 กม. ราคาคาดการณ์เริ่มต้นไม่ถึง 1 ล้านบาท",
    seo_title: "BYD Seal U ราคาในไทย สเปค แบตเตอรี่ และระยะวิ่ง รถ EV รุ่นใหม่จาก BYD",
    seo_description:
      "อัปเดต BYD Seal U รถ SUV ไฟฟ้ารุ่นใหม่ ราคาคาดการณ์ในไทย สเปคแบตเตอรี่ Blade ระยะวิ่ง และวันเปิดตัว",
    slug: "byd-seal-u-thailand-price",
    tags: ["BYD", "Seal U", "EV", "SUV", "รถไฟฟ้า"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.byd),
    published_date: "2026-05-16T14:15:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/byd-seal-u",
    gallery_images: [img(COVERS.byd, 1200, 800), img(COVERS.extra1, 1200, 800)],
  },
  {
    news_id: "n003",
    brand: "Honda",
    model: "Civic Type R",
    category: "Coupe",
    ai_title: "Honda Civic Type R รุ่นพิเศษ ฉลองครบรอบ ผลิตจำนวนจำกัด พร้อมชุดแต่งจากโรงงาน",
    ai_detail: "",
    short_summary:
      "ฮอนด้าเปิดตัว Civic Type R รุ่นพิเศษฉลองครบรอบ 30 ปี ผลิตเพียง 300 คันทั่วโลก พร้อมชุดแต่ง Mugen และสีพิเศษ Championship White",
    seo_title: "Honda Civic Type R รุ่นพิเศษ 30th Anniversary สเปค ราคา และโควต้าไทย",
    seo_description:
      "Honda Civic Type R 30th Anniversary Edition รถสปอร์ตขับสนุก ผลิตจำกัด 300 คัน ราคาและโควต้าจัดสรรในไทย",
    slug: "honda-civic-type-r-special",
    tags: ["Honda", "Civic", "Type R", "Limited Edition"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.civic),
    published_date: "2026-05-15T11:00:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/civic-type-r-30",
    gallery_images: [img(COVERS.civic, 1200, 800), img(COVERS.extra2, 1200, 800)],
  },
  {
    news_id: "n004",
    brand: "Mazda",
    model: "CX-5",
    category: "SUV",
    ai_title: "Mazda CX-5 ใหม่ ปรับโฉมครั้งใหญ่ ดีไซน์ Kodo เจเนอเรชันที่ 3",
    ai_detail: "",
    short_summary:
      "มาสด้าเผยโฉม CX-5 รุ่นใหม่ทั้งคัน พร้อมดีไซน์ Kodo Gen 3 ภายในหรูขึ้น ระบบ Mazda Connect ใหม่ และเครื่องยนต์ e-Skyactiv G ไฮบริด",
    seo_title: "Mazda CX-5 ใหม่ 2026 ดีไซน์ใหม่ สเปค ราคา และวันเปิดตัวในไทย",
    seo_description:
      "All-new Mazda CX-5 2026 ปรับโฉมใหม่ทั้งคัน รวมสเปค ออปชั่น ราคา และวันเปิดตัวในประเทศไทย",
    slug: "mazda-cx-5-new",
    tags: ["Mazda", "CX-5", "SUV", "Kodo Design"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.cx5),
    published_date: "2026-05-14T16:45:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/mazda-cx5",
    gallery_images: [img(COVERS.cx5, 1200, 800)],
  },
  {
    news_id: "n005",
    brand: "BMW",
    model: "iX3",
    category: "EV",
    ai_title: "BMW iX3 เจเนอเรชันใหม่ บนแพลตฟอร์ม Neue Klasse ระยะวิ่งทะลุ 700 กม.",
    ai_detail: "",
    short_summary:
      "BMW เปิดตัว iX3 รุ่นใหม่บนแพลตฟอร์ม Neue Klasse แบตเตอรี่รุ่นใหม่ ระยะวิ่งสูงสุด 700 กม. ชาร์จเร็วจาก 10–80% ภายใน 20 นาที",
    seo_title: "BMW iX3 Neue Klasse สเปค ระยะวิ่ง และราคาคาดการณ์ในไทย",
    seo_description:
      "BMW iX3 รุ่นใหม่บนแพลตฟอร์ม Neue Klasse รวมสเปคแบตเตอรี่ ระยะวิ่ง การชาร์จ และราคาคาดการณ์",
    slug: "bmw-ix3-next-gen",
    tags: ["BMW", "iX3", "EV", "Neue Klasse"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.ix3),
    published_date: "2026-05-13T10:20:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/bmw-ix3",
    gallery_images: [img(COVERS.ix3, 1200, 800), img(COVERS.extra1, 1200, 800)],
  },
  {
    news_id: "n006",
    brand: "Porsche",
    model: "Taycan",
    category: "Hypercar",
    ai_title: "Porsche Taycan อัปเดตสเปคปี 2026 แรงขึ้น ชาร์จไวขึ้น ระยะวิ่งไกลขึ้น",
    ai_detail: "",
    short_summary:
      "ปอร์เช่ปรับสเปค Taycan รุ่นปี 2026 มอเตอร์ใหม่ให้กำลังสูงสุด 938 แรงม้า รองรับการชาร์จ 320 kW และระยะวิ่งเพิ่มขึ้น 35%",
    seo_title: "Porsche Taycan 2026 สเปคใหม่ กำลังสูงสุด การชาร์จ และระยะวิ่ง",
    seo_description:
      "Porsche Taycan ปี 2026 อัปเดตสเปคใหม่ทั้งกำลังเครื่อง ระยะวิ่ง และระบบชาร์จ พร้อมราคาประเทศไทย",
    slug: "porsche-taycan-2026-update",
    tags: ["Porsche", "Taycan", "EV", "Performance"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.taycan),
    published_date: "2026-05-12T08:00:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/taycan-2026",
    gallery_images: [img(COVERS.taycan, 1200, 800)],
  },
  {
    news_id: "n007",
    brand: "Mercedes-Benz",
    model: "GLC EV",
    category: "EV",
    ai_title: "Mercedes-Benz GLC EV เปิดตัว SUV ไฟฟ้าระดับพรีเมียม ระยะวิ่งกว่า 700 กม.",
    ai_detail: "",
    short_summary:
      "เมอร์เซเดส-เบนซ์ เปิดตัว GLC EV รถ SUV ไฟฟ้ารุ่นใหม่ บนแพลตฟอร์ม MB.EA พร้อมระบบ MBUX Hyperscreen และระยะวิ่งสูงสุด 713 กม.",
    seo_title: "Mercedes-Benz GLC EV สเปค ระยะวิ่ง และราคาคาดการณ์ในไทย",
    seo_description:
      "Mercedes-Benz GLC EV รถ SUV ไฟฟ้าใหม่ ระบบ MBUX Hyperscreen ระยะวิ่ง 713 กม. และราคาคาดการณ์",
    slug: "mercedes-glc-ev",
    tags: ["Mercedes-Benz", "GLC", "EV", "Luxury"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.glc),
    published_date: "2026-05-11T13:30:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/glc-ev",
    gallery_images: [img(COVERS.glc, 1200, 800), img(COVERS.extra2, 1200, 800)],
  },
  {
    news_id: "n008",
    brand: "Mitsubishi",
    model: "Outlander PHEV",
    category: "SUV",
    ai_title: "Mitsubishi Outlander PHEV ใหม่ ระบบขับเคลื่อน 4WD พร้อมโหมด EV 87 กม.",
    ai_detail: "",
    short_summary:
      "มิตซูบิชิเปิดตัว Outlander PHEV รุ่นใหม่ พร้อมระบบขับเคลื่อน Super All-Wheel Control โหมดไฟฟ้าล้วน 87 กม. และที่นั่ง 7 ที่นั่ง",
    seo_title: "Mitsubishi Outlander PHEV ใหม่ สเปค ระยะวิ่ง EV และราคาในไทย",
    seo_description:
      "Mitsubishi Outlander PHEV รุ่นใหม่ ระบบ S-AWC โหมด EV 87 กม. ที่นั่ง 7 ที่นั่ง พร้อมราคาในไทย",
    slug: "mitsubishi-outlander-phev",
    tags: ["Mitsubishi", "Outlander", "PHEV", "SUV"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.outlander),
    published_date: "2026-05-10T15:00:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/outlander-phev",
    gallery_images: [img(COVERS.outlander, 1200, 800)],
  },
  {
    news_id: "n009",
    brand: "Toyota",
    model: "Hilux Revo",
    category: "Pickup",
    ai_title: "Toyota Hilux Revo 2026 ปรับโฉมไมเนอร์เชนจ์ เพิ่มรุ่น GR Sport III",
    ai_detail: "",
    short_summary:
      "Toyota Hilux Revo ปรับโฉมใหม่ พร้อมรุ่น GR Sport III ที่มาพร้อมช่วงล่างจูนพิเศษ ล้อแม็กใหม่ และเครื่องยนต์ 2.8 ดีเซลปรับจูนใหม่",
    seo_title: "Toyota Hilux Revo 2026 GR Sport III สเปค ราคา และวันเปิดตัวในไทย",
    seo_description: "Toyota Hilux Revo ไมเนอร์เชนจ์ 2026 พร้อม GR Sport III รวมสเปค ราคา และวันเปิดตัวในไทย",
    slug: "toyota-hilux-revo-2026",
    tags: ["Toyota", "Hilux", "Pickup", "GR Sport"],
    rewrite_status: "published",
    cover_image_url: img(COVERS.extra1),
    published_date: "2026-05-09T10:00:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/hilux-revo-2026",
    gallery_images: [img(COVERS.extra1, 1200, 800)],
  },
  // Draft article — must NOT appear on public pages
  {
    news_id: "n010",
    brand: "Tesla",
    model: "Model 3 Highland",
    category: "Sedan",
    ai_title: "[DRAFT] Tesla Model 3 Highland อัปเดตใหม่ — รอตรวจสอบ",
    ai_detail: "",
    short_summary: "ข่าวอยู่ระหว่างการตรวจสอบโดยทีมบรรณาธิการ",
    seo_title: "Draft article",
    seo_description: "Draft",
    slug: "tesla-model-3-highland-draft",
    tags: ["Tesla"],
    rewrite_status: "draft",
    cover_image_url: img(COVERS.extra2),
    published_date: "2026-05-18T09:00:00+07:00",
    source: "headlightmag.com",
    original_url: "https://headlightmag.com/draft",
    gallery_images: [],
  },
]

// Only published articles are shown on public pages
export const PUBLISHED_ARTICLES = MOCK_ARTICLES.filter((a) => a.rewrite_status === "published")

export const BRANDS = ["Toyota", "BYD", "Honda", "Mazda", "BMW", "Mercedes-Benz", "Porsche", "Mitsubishi"]
export const CATEGORIES = ["EV", "SUV", "Sedan", "Pickup", "Hypercar", "Coupe"] as const

// Build long-form article body from short summary (mock rich content)
export function buildArticleBody(a: MockArticle): string {
  return [
    `<p>${a.short_summary}</p>`,
    `<h2>รายละเอียดที่น่าสนใจ</h2>`,
    `<p>${a.brand} ${a.model} ในเจเนอเรชันใหม่นี้ได้รับการพัฒนาขึ้นเพื่อตอบโจทย์ผู้ใช้งานชาวไทยที่ต้องการรถยนต์ที่มีสมรรถนะดี ประหยัดพลังงาน และมาพร้อมเทคโนโลยีความปลอดภัยครบครัน</p>`,
    `<h2>สิ่งที่เปลี่ยนแปลง</h2>`,
    `<ul><li>ดีไซน์ภายนอกใหม่ทั้งคัน ดูพรีเมียมและทันสมัยมากขึ้น</li><li>ภายในห้องโดยสารปรับปรุงวัสดุและงานประกอบ</li><li>ระบบความปลอดภัยอัจฉริยะรุ่นล่าสุด</li><li>ขุมพลังประหยัดเชื้อเพลิงและเป็นมิตรกับสิ่งแวดล้อม</li></ul>`,
    `<blockquote>"นี่คือก้าวสำคัญของ ${a.brand} ในตลาดประเทศไทย ที่จะช่วยขยายฐานลูกค้ากลุ่มใหม่" — ผู้บริหาร ${a.brand} ประเทศไทย</blockquote>`,
    `<h2>สรุป</h2>`,
    `<p>${a.brand} ${a.model} รุ่นใหม่ถือเป็นการอัปเกรดครั้งใหญ่ที่น่าจับตามอง ทั้งในแง่ของดีไซน์ เทคโนโลยี และสมรรถนะ คาดว่าจะเข้ามาเขย่าตลาดในกลุ่ม ${a.category} ของไทยอย่างมีนัยสำคัญ</p>`,
  ].join("\n")
}

export function findArticleBySlug(slug: string): MockArticle | undefined {
  return MOCK_ARTICLES.find((a) => a.slug === slug)
}

export function articlesByBrand(brand: string): MockArticle[] {
  return PUBLISHED_ARTICLES.filter((a) => a.brand.toLowerCase() === brand.toLowerCase())
}

export function articlesByCategory(cat: string): MockArticle[] {
  return PUBLISHED_ARTICLES.filter((a) => a.category.toLowerCase() === cat.toLowerCase())
}

export function formatThaiDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })
}
