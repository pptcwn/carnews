// CarNews Thailand - Mock Data
import type {
  CarNews,
  CarNewsRewrite,
  CarNewsImage,
  SocialContent,
  NewsSource,
  Brand,
  CarModel,
  WorkflowLog,
  ScrapeRun,
  BrandStat,
  CategoryStat,
  ErrorTrend,
  KpiData,
  SocialQueueItem,
  SocialPlatform,
} from './types'

export const mockCarNews: CarNews[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry 2026',
    category: 'Sedan',
    title: 'Toyota Camry 2026 เปิดตัวใหม่ หรูหราขึ้น เครื่องยนต์ไฮบริดประหยัดกว่าเดิม',
    detail: 'โตโยต้าเปิดตัว Camry รุ่นใหม่ล่าสุด มาพร้อมดีไซน์หรูหราทันสมัย เครื่องยนต์ไฮบริดประหยัดน้ำมันมากขึ้น 20% พร้อมเทคโนโลยีความปลอดภัย Toyota Safety Sense 3.0',
    price: '1,699,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/toyota-camry-2026',
    cover_image_url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    created_at: '2026-05-19T08:30:00Z',
    status: 'raw',
    image_count: 12,
  },
  {
    id: 2,
    brand: 'BYD',
    model: 'Seal U',
    category: 'EV',
    title: 'BYD Seal U เปิดราคาเริ่มต้น 1.19 ล้าน SUV ไฟฟ้าวิ่งได้ไกล 500 กม.',
    detail: 'BYD Seal U รถ SUV ไฟฟ้า 100% เปิดราคาแล้วในไทย เริ่มต้นที่ 1,190,000 บาท วิ่งได้ไกลถึง 500 กม./ชาร์จ พร้อมชาร์จเร็ว 30 นาทีได้ 80%',
    price: '1,190,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/byd-seal-u-thailand',
    cover_image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    created_at: '2026-05-19T07:15:00Z',
    status: 'rewritten',
    image_count: 8,
  },
  {
    id: 3,
    brand: 'Honda',
    model: 'Civic Type R',
    category: 'Coupe',
    title: 'Honda Civic Type R FL5 รุ่นใหม่ แรงขึ้น 330 แรงม้า ลุยตลาดไทย',
    detail: 'ฮอนด้าเปิดตัว Civic Type R เจนใหม่ FL5 กำลัง 330 แรงม้า เกียร์ธรรมดา 6 สปีด ระบบกันสะเทือนปรับปรุงใหม่ พร้อมโหมดขับขี่ 5 โหมด',
    price: '3,990,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/honda-civic-type-r-fl5',
    cover_image_url: 'https://images.unsplash.com/photo-1679239880143-2b8d3f5f7c75?w=800',
    created_at: '2026-05-18T16:45:00Z',
    status: 'review',
    image_count: 15,
  },
  {
    id: 4,
    brand: 'Mazda',
    model: 'CX-5 2026',
    category: 'SUV',
    title: 'Mazda CX-5 2026 Facelift หน้าตาใหม่ เพิ่มออปชั่น ราคาเดิม',
    detail: 'Mazda CX-5 ปรับโฉมใหม่ปี 2026 หน้าตาสดใหม่ เพิ่มออปชั่นอุปกรณ์มาตรฐาน ราคาเท่าเดิม เริ่มต้น 1.32 ล้านบาท',
    price: '1,320,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/mazda-cx5-2026-facelift',
    cover_image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    created_at: '2026-05-18T14:20:00Z',
    status: 'published',
    image_count: 10,
  },
  {
    id: 5,
    brand: 'Mitsubishi',
    model: 'Outlander PHEV',
    category: 'SUV',
    title: 'Mitsubishi Outlander PHEV 2026 SUV ปลั๊กอินไฮบริด วิ่งไฟฟ้าได้ 87 กม.',
    detail: 'มิตซูบิชิเปิดตัว Outlander PHEV ใหม่ ปลั๊กอินไฮบริดวิ่งไฟฟ้าล้วนได้ 87 กม. ระบบขับเคลื่อน 4 ล้อ S-AWC พร้อมเทคโนโลยีช่วยขับขี่ครบครัน',
    price: '1,859,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/mitsubishi-outlander-phev-2026',
    cover_image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800',
    created_at: '2026-05-18T11:00:00Z',
    status: 'raw',
    image_count: 9,
  },
  {
    id: 6,
    brand: 'BMW',
    model: 'iX3',
    category: 'EV',
    title: 'BMW iX3 Facelift 2026 รถไฟฟ้าหรู วิ่งไกล 460 กม. ชาร์จเร็ว 150kW',
    detail: 'BMW เปิดตัว iX3 ปรับโฉม ดีไซน์ใหม่ทั้งคัน วิ่งได้ไกลขึ้น 460 กม. รองรับการชาร์จเร็ว 150kW ภายใน 30 นาทีได้ 80%',
    price: '3,299,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/bmw-ix3-facelift-2026',
    cover_image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    created_at: '2026-05-17T15:30:00Z',
    status: 'published',
    image_count: 14,
  },
  {
    id: 7,
    brand: 'Porsche',
    model: 'Taycan 2026',
    category: 'Hypercar',
    title: 'Porsche Taycan 2026 รุ่นใหม่ แบตใหญ่ขึ้น วิ่งไกล 590 กม.',
    detail: 'ปอร์เช่เปิดตัว Taycan ปรับปรุงใหม่ แบตเตอรี่ความจุมากขึ้น วิ่งได้ไกลถึง 590 กม. ชาร์จเร็วขึ้น พร้อมระบบขับขี่อัตโนมัติระดับ 2+',
    price: '7,990,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/porsche-taycan-2026',
    cover_image_url: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800',
    created_at: '2026-05-17T09:45:00Z',
    status: 'rewritten',
    image_count: 18,
  },
  {
    id: 8,
    brand: 'Mercedes-Benz',
    model: 'GLC EV',
    category: 'EV',
    title: 'Mercedes-Benz GLC EV เปิดตัวครั้งแรก SUV ไฟฟ้าหรู วิ่งไกล 500 กม.',
    detail: 'เมอร์เซเดส-เบนซ์เปิดตัว GLC เวอร์ชันไฟฟ้าล้วน ดีไซน์หรูหรา ภายในกว้างขวาง วิ่งได้ไกล 500 กม./ชาร์จ พร้อมเทคโนโลยี MBUX ล่าสุด',
    price: '4,590,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/mercedes-benz-glc-ev',
    cover_image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    created_at: '2026-05-16T13:00:00Z',
    status: 'raw',
    image_count: 11,
  },
  {
    id: 9,
    brand: 'Toyota',
    model: 'Hilux Revo 2026',
    category: 'Pickup',
    title: 'Toyota Hilux Revo 2026 ใหม่ เครื่องดีเซล 204 แรงม้า ประหยัดขึ้น',
    detail: 'โตโยต้าอัปเดท Hilux Revo ใหม่ เครื่องยนต์ดีเซล 2.8 ลิตร กำลัง 204 แรงม้า แรงบิด 500 นิวตัน-เมตร ประหยัดน้ำมันมากขึ้น 15%',
    price: '989,000',
    source: 'Headlightmag',
    url: 'https://www.headlightmag.com/toyota-hilux-revo-2026',
    cover_image_url: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800',
    created_at: '2026-05-16T10:30:00Z',
    status: 'review',
    image_count: 7,
  },
]

export const mockWorkflowLogs: WorkflowLog[] = [
  {
    id: 1,
    workflow_name: 'n8n_carnews',
    node_name: 'firecrawl ดึงหน้ารวมข่าว',
    article_url: null,
    status: 'success',
    message: 'ดึงหน้ารวมข่าวสำเร็จ พบ 25 รายการ',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:00:05Z',
  },
  {
    id: 2,
    workflow_name: 'n8n_carnews',
    node_name: 'แยก URL บทความ',
    article_url: null,
    status: 'success',
    message: 'แยก URL สำเร็จ 5 รายการ',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:00:10Z',
  },
  {
    id: 3,
    workflow_name: 'n8n_carnews',
    node_name: 'firecrawl ดึงเนื้อหาบทความ',
    article_url: 'https://www.headlightmag.com/toyota-camry-2026',
    status: 'success',
    message: 'ดึงเนื้อหา Toyota Camry 2026 สำเร็จ',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:00:25Z',
  },
  {
    id: 4,
    workflow_name: 'n8n_carnews',
    node_name: 'RPC upsert_brand_model',
    article_url: 'https://www.headlightmag.com/toyota-camry-2026',
    status: 'success',
    message: 'upsert brand: Toyota, model: Camry สำเร็จ',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:00:30Z',
  },
  {
    id: 5,
    workflow_name: 'n8n_carnews',
    node_name: 'Supabase บันทึก car_news',
    article_url: 'https://www.headlightmag.com/toyota-camry-2026',
    status: 'success',
    message: 'บันทึกข่าว Toyota Camry 2026 สำเร็จ id: 1',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:00:35Z',
  },
  {
    id: 6,
    workflow_name: 'n8n_carnews',
    node_name: 'firecrawl ดึงเนื้อหาบทความ',
    article_url: 'https://www.headlightmag.com/byd-seal-u-thailand',
    status: 'success',
    message: 'ดึงเนื้อหา BYD Seal U สำเร็จ',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:00:50Z',
  },
  {
    id: 7,
    workflow_name: 'n8n_carnews',
    node_name: 'Supabase บันทึก car_news',
    article_url: 'https://www.headlightmag.com/honda-civic-type-r-fl5',
    status: 'duplicate',
    message: 'ข่าวซ้ำ: Honda Civic Type R มีอยู่แล้ว',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:01:15Z',
  },
  {
    id: 8,
    workflow_name: 'n8n_carnews',
    node_name: 'firecrawl ดึงเนื้อหาบทความ',
    article_url: 'https://www.headlightmag.com/error-page',
    status: 'error',
    message: 'Firecrawl timeout: ไม่สามารถเข้าถึงหน้าเว็บได้',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:01:30Z',
  },
  {
    id: 9,
    workflow_name: 'n8n_carnews',
    node_name: 'Telegram แจ้งข่าวใหม่',
    article_url: null,
    status: 'success',
    message: 'ส่ง Telegram สำเร็จ 3 ข่าวใหม่',
    execution_id: 'exec_abc123',
    run_id: 'run_001',
    created_at: '2026-05-19T07:02:00Z',
  },
  {
    id: 10,
    workflow_name: 'n8n_carnews',
    node_name: 'RPC upsert_brand_model',
    article_url: 'https://www.headlightmag.com/mazda-cx5-2026-facelift',
    status: 'warning',
    message: 'Category ไม่ตรงกับที่มีอยู่ ใช้ค่าเดิม: SUV',
    execution_id: 'exec_def456',
    run_id: 'run_002',
    created_at: '2026-05-18T07:00:45Z',
  },
]

export const mockScrapeRuns: ScrapeRun[] = [
  {
    id: 'run_001',
    source_name: 'Headlightmag',
    status: 'completed',
    requested_limit: 5,
    found_count: 5,
    inserted_count: 3,
    duplicate_count: 1,
    error_count: 1,
    started_at: '2026-05-19T07:00:00Z',
    finished_at: '2026-05-19T07:02:30Z',
  },
  {
    id: 'run_002',
    source_name: 'Headlightmag',
    status: 'completed',
    requested_limit: 3,
    found_count: 3,
    inserted_count: 2,
    duplicate_count: 1,
    error_count: 0,
    started_at: '2026-05-18T07:00:00Z',
    finished_at: '2026-05-18T07:01:45Z',
  },
  {
    id: 'run_003',
    source_name: 'Headlightmag',
    status: 'failed',
    requested_limit: 5,
    found_count: 0,
    inserted_count: 0,
    duplicate_count: 0,
    error_count: 1,
    started_at: '2026-05-17T07:00:00Z',
    finished_at: '2026-05-17T07:00:15Z',
  },
]

export const mockBrandStats: BrandStat[] = [
  { brand: 'Toyota', count: 45 },
  { brand: 'Honda', count: 38 },
  { brand: 'BYD', count: 32 },
  { brand: 'Mercedes-Benz', count: 28 },
  { brand: 'BMW', count: 25 },
  { brand: 'Mazda', count: 22 },
  { brand: 'Mitsubishi', count: 18 },
  { brand: 'Porsche', count: 12 },
]

export const mockCategoryStats: CategoryStat[] = [
  { category: 'EV', count: 85 },
  { category: 'SUV', count: 72 },
  { category: 'Sedan', count: 45 },
  { category: 'Pickup', count: 38 },
  { category: 'Coupe', count: 15 },
  { category: 'Hypercar', count: 8 },
]

export const mockErrorTrend: ErrorTrend[] = [
  { date: '14 พ.ค.', errors: 2 },
  { date: '15 พ.ค.', errors: 0 },
  { date: '16 พ.ค.', errors: 1 },
  { date: '17 พ.ค.', errors: 3 },
  { date: '18 พ.ค.', errors: 0 },
  { date: '19 พ.ค.', errors: 1 },
]

export const mockKpiData: KpiData = {
  totalNews: 263,
  pendingRewrite: 42,
  published: 187,
  errorsToday: 1,
  pendingImages: 28,
  totalNewsChange: 12.5,
  pendingRewriteChange: -8.3,
  publishedChange: 15.2,
  errorsTodayChange: -66.7,
  pendingImagesChange: 5.1,
}

export const mockRewrites: CarNewsRewrite[] = [
  {
    id: 1,
    news_id: 2,
    ai_title: 'BYD Seal U รถ SUV ไฟฟ้าราคาคุ้มค่า เริ่มต้น 1.19 ล้านบาท วิ่งได้ไกล 500 กม.',
    ai_detail: '<p>BYD Seal U รถ SUV ไฟฟ้า 100% ที่มาพร้อมราคาสุดคุ้มค่า เริ่มต้นเพียง 1,190,000 บาท</p><p>จุดเด่นของรุ่นนี้คือระยะทางวิ่งที่ยาวไกลถึง 500 กิโลเมตรต่อการชาร์จหนึ่งครั้ง และยังรองรับการชาร์จเร็วภายใน 30 นาทีได้ถึง 80%</p>',
    short_summary: 'SUV ไฟฟ้าจาก BYD ราคาเริ่มต้น 1.19 ล้าน วิ่งไกล 500 กม. ชาร์จเร็ว 30 นาที',
    seo_title: 'BYD Seal U 2026 ราคาและสเปค | SUV ไฟฟ้าวิ่งไกล 500 กม. | CarNews Thailand',
    seo_description: 'BYD Seal U รถ SUV ไฟฟ้า 100% เปิดราคา 1.19 ล้านบาท วิ่งได้ไกล 500 กม./ชาร์จ ชาร์จเร็ว 30 นาที 80% พร้อมส่งมอบแล้ววันนี้',
    slug: 'byd-seal-u-2026-price-spec-thailand',
    tags: ['BYD', 'Seal U', 'EV', 'SUV ไฟฟ้า', 'รถยนต์ไฟฟ้า'],
    viral_score: 85,
    seo_score: 92,
    tiktok_score: 78,
    rewrite_status: 'published',
    created_at: '2026-05-19T08:00:00Z',
    updated_at: '2026-05-19T10:30:00Z',
  },
  {
    id: 2,
    news_id: 7,
    ai_title: 'Porsche Taycan 2026 อัปเกรดใหม่ แบตใหญ่ขึ้น วิ่งไกล 590 กม.',
    ai_detail: '<p>Porsche Taycan รุ่นปรับปรุงใหม่ปี 2026 มาพร้อมแบตเตอรี่ความจุใหญ่ขึ้น</p><p>วิ่งได้ไกลถึง 590 กิโลเมตร พร้อมระบบชาร์จเร็วที่ดีขึ้น และเทคโนโลยีขับขี่อัตโนมัติระดับ 2+</p>',
    short_summary: 'Porsche Taycan 2026 แบตใหญ่ขึ้น วิ่งไกล 590 กม. ชาร์จเร็วขึ้น',
    seo_title: 'Porsche Taycan 2026 ใหม่ | แบตใหญ่ขึ้น วิ่งไกล 590 กม. | CarNews Thailand',
    seo_description: 'Porsche Taycan 2026 ปรับปรุงใหม่ แบตเตอรี่ความจุมากขึ้น วิ่งได้ไกล 590 กม. ชาร์จเร็วขึ้น พร้อมระบบขับขี่อัตโนมัติ',
    slug: 'porsche-taycan-2026-new-battery',
    tags: ['Porsche', 'Taycan', 'EV', 'Hypercar', 'รถสปอร์ตไฟฟ้า'],
    viral_score: 72,
    seo_score: 88,
    tiktok_score: 65,
    rewrite_status: 'draft',
    created_at: '2026-05-17T11:00:00Z',
    updated_at: '2026-05-17T11:00:00Z',
  },
]

export const mockImages: CarNewsImage[] = [
  {
    id: 1,
    news_id: 1,
    image_url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
    source_type: 'external',
    is_cover: true,
    optimized: true,
    sort_order: 1,
    created_at: '2026-05-19T08:30:00Z',
  },
  {
    id: 2,
    news_id: 1,
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    source_type: 'external',
    is_cover: false,
    optimized: false,
    sort_order: 2,
    created_at: '2026-05-19T08:30:00Z',
  },
  {
    id: 3,
    news_id: 1,
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    source_type: 'storage',
    is_cover: false,
    optimized: true,
    sort_order: 3,
    created_at: '2026-05-19T08:30:00Z',
  },
  {
    id: 4,
    news_id: 2,
    image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    source_type: 'external',
    is_cover: true,
    optimized: true,
    sort_order: 1,
    created_at: '2026-05-19T07:15:00Z',
  },
  {
    id: 5,
    news_id: 2,
    image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    source_type: 'storage',
    is_cover: false,
    optimized: true,
    sort_order: 2,
    created_at: '2026-05-19T07:15:00Z',
  },
]

export const mockSocialContents: SocialContent[] = [
  {
    id: 1,
    news_id: 2,
    platform: 'facebook',
    caption: 'BYD Seal U มาแล้ว! SUV ไฟฟ้าราคาเริ่มต้น 1.19 ล้านบาท วิ่งได้ไกล 500 กม. ใครสนใจรถไฟฟ้ายกมือ!',
    hashtags: ['BYD', 'SealU', 'รถไฟฟ้า', 'EV', 'CarNewsThailand'],
    status: 'published',
    created_at: '2026-05-19T09:00:00Z',
    updated_at: '2026-05-19T09:30:00Z',
  },
  {
    id: 2,
    news_id: 2,
    platform: 'instagram',
    caption: 'BYD Seal U - SUV ไฟฟ้าที่ทุกคนรอคอย\n\nราคาเริ่มต้น: 1,190,000 บาท\nระยะทาง: 500 กม./ชาร์จ\nชาร์จเร็ว: 30 นาที = 80%\n\nพร้อมส่งมอบแล้ววันนี้!',
    hashtags: ['BYD', 'SealU', 'EV', 'SUV', 'รถไฟฟ้า', 'CarNews'],
    status: 'published',
    created_at: '2026-05-19T09:15:00Z',
    updated_at: '2026-05-19T09:30:00Z',
  },
  {
    id: 3,
    news_id: 2,
    platform: 'tiktok',
    caption: 'BYD Seal U ราคาโดนใจมาก!',
    script: 'Hook 3 วิ: BYD Seal U ราคาเริ่มต้นแค่ 1.19 ล้าน!\nเนื้อหา 45 วิ: รถ SUV ไฟฟ้า 100% วิ่งได้ไกล 500 กม. ชาร์จเร็ว 30 นาทีได้ 80% ภายในหรูหรา ขับสบาย\nCTA 5 วิ: กดติดตามเพื่อไม่พลาดข่าวรถใหม่!',
    hashtags: ['BYD', 'SealU', 'รถไฟฟ้า', 'EV', 'รีวิวรถ'],
    status: 'draft',
    created_at: '2026-05-19T09:30:00Z',
    updated_at: '2026-05-19T09:30:00Z',
  },
  {
    id: 4,
    news_id: 4,
    platform: 'facebook',
    caption: 'Mazda CX-5 2026 Facelift มาแล้ว! หน้าตาใหม่ เพิ่มออปชั่น แต่ราคาเดิม เริ่มต้น 1.32 ล้านบาท',
    hashtags: ['Mazda', 'CX5', 'SUV', 'CarNewsThailand'],
    status: 'published',
    created_at: '2026-05-18T15:00:00Z',
    updated_at: '2026-05-18T15:30:00Z',
  },
]

export const mockNewsSources: NewsSource[] = [
  {
    id: 1,
    name: 'Headlightmag',
    url: 'https://www.headlightmag.com',
    active: true,
    scrape_format: 'headlightmag_v2',
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Drive.in.th',
    url: 'https://www.drive.in.th',
    active: true,
    scrape_format: 'drive_v1',
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 3,
    name: 'Motor Expo',
    url: 'https://www.motorexpo.co.th',
    active: false,
    scrape_format: 'motorexpo_v1',
    created_at: '2026-02-01T00:00:00Z',
  },
  {
    id: 4,
    name: 'AutoSpinn',
    url: 'https://www.autospinn.com',
    active: true,
    scrape_format: 'autospinn_v1',
    created_at: '2026-03-01T00:00:00Z',
  },
]

export const mockBrands: Brand[] = [
  { id: 1, name: 'Toyota', name_th: 'โตโยต้า', news_count: 45, created_at: '2026-01-01T00:00:00Z' },
  { id: 2, name: 'BYD', name_th: 'บีวายดี', news_count: 32, created_at: '2026-01-01T00:00:00Z' },
  { id: 3, name: 'Honda', name_th: 'ฮอนด้า', news_count: 38, created_at: '2026-01-01T00:00:00Z' },
  { id: 4, name: 'Mazda', name_th: 'มาสด้า', news_count: 22, created_at: '2026-01-01T00:00:00Z' },
  { id: 5, name: 'BMW', name_th: 'บีเอ็มดับเบิลยู', news_count: 25, created_at: '2026-01-01T00:00:00Z' },
  { id: 6, name: 'Mercedes-Benz', name_th: 'เมอร์เซเดส-เบนซ์', news_count: 28, created_at: '2026-01-01T00:00:00Z' },
  { id: 7, name: 'Porsche', name_th: 'ปอร์เช่', news_count: 12, created_at: '2026-01-01T00:00:00Z' },
  { id: 8, name: 'Mitsubishi', name_th: 'มิตซูบิชิ', news_count: 18, created_at: '2026-01-01T00:00:00Z' },
]

export const mockModels: CarModel[] = [
  { id: 1, brand_id: 1, name: 'Camry', category: 'Sedan', news_count: 12, created_at: '2026-01-01T00:00:00Z' },
  { id: 2, brand_id: 1, name: 'Hilux Revo', category: 'Pickup', news_count: 18, created_at: '2026-01-01T00:00:00Z' },
  { id: 3, brand_id: 1, name: 'Fortuner', category: 'SUV', news_count: 15, created_at: '2026-01-01T00:00:00Z' },
  { id: 4, brand_id: 2, name: 'Seal U', category: 'EV', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 5, brand_id: 2, name: 'Atto 3', category: 'EV', news_count: 12, created_at: '2026-01-01T00:00:00Z' },
  { id: 6, brand_id: 2, name: 'Dolphin', category: 'EV', news_count: 12, created_at: '2026-01-01T00:00:00Z' },
  { id: 7, brand_id: 3, name: 'Civic', category: 'Sedan', news_count: 15, created_at: '2026-01-01T00:00:00Z' },
  { id: 8, brand_id: 3, name: 'Civic Type R', category: 'Coupe', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 9, brand_id: 3, name: 'CR-V', category: 'SUV', news_count: 15, created_at: '2026-01-01T00:00:00Z' },
  { id: 10, brand_id: 4, name: 'CX-5', category: 'SUV', news_count: 10, created_at: '2026-01-01T00:00:00Z' },
  { id: 11, brand_id: 4, name: 'CX-30', category: 'SUV', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 12, brand_id: 4, name: 'Mazda3', category: 'Sedan', news_count: 4, created_at: '2026-01-01T00:00:00Z' },
  { id: 13, brand_id: 5, name: 'iX3', category: 'EV', news_count: 10, created_at: '2026-01-01T00:00:00Z' },
  { id: 14, brand_id: 5, name: 'X3', category: 'SUV', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 15, brand_id: 5, name: '3 Series', category: 'Sedan', news_count: 7, created_at: '2026-01-01T00:00:00Z' },
  { id: 16, brand_id: 6, name: 'GLC', category: 'SUV', news_count: 12, created_at: '2026-01-01T00:00:00Z' },
  { id: 17, brand_id: 6, name: 'GLC EV', category: 'EV', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 18, brand_id: 6, name: 'C-Class', category: 'Sedan', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 19, brand_id: 7, name: 'Taycan', category: 'Hypercar', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
  { id: 20, brand_id: 7, name: 'Cayenne', category: 'SUV', news_count: 4, created_at: '2026-01-01T00:00:00Z' },
  { id: 21, brand_id: 8, name: 'Outlander PHEV', category: 'SUV', news_count: 10, created_at: '2026-01-01T00:00:00Z' },
  { id: 22, brand_id: 8, name: 'Triton', category: 'Pickup', news_count: 8, created_at: '2026-01-01T00:00:00Z' },
]

export const mockSocialQueue: SocialQueueItem[] = [
  {
    id: 1,
    news_id: 2,
    article_title: 'BYD Seal U เปิดราคาเริ่มต้น 1.19 ล้าน SUV ไฟฟ้าวิ่งได้ไกล 500 กม.',
    article_brand: 'BYD',
    article_model: 'Seal U',
    cover_image_url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    rewrite_status: 'published',
    platforms: {
      facebook: 'published',
      instagram: 'published',
      tiktok: 'draft',
      x: 'not_generated',
      line: 'not_generated',
    },
    last_updated: '2026-05-19T09:30:00Z',
  },
  {
    id: 2,
    news_id: 4,
    article_title: 'Mazda CX-5 2026 Facelift หน้าตาใหม่ เพิ่มออปชั่น ราคาเดิม',
    article_brand: 'Mazda',
    article_model: 'CX-5 2026',
    cover_image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    rewrite_status: 'published',
    platforms: {
      facebook: 'published',
      instagram: 'not_generated',
      tiktok: 'not_generated',
      x: 'not_generated',
      line: 'not_generated',
    },
    last_updated: '2026-05-18T15:30:00Z',
  },
  {
    id: 3,
    news_id: 6,
    article_title: 'BMW iX3 Facelift 2026 รถไฟฟ้าหรู วิ่งไกล 460 กม. ชาร์จเร็ว 150kW',
    article_brand: 'BMW',
    article_model: 'iX3',
    cover_image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    rewrite_status: 'published',
    platforms: {
      facebook: 'not_generated',
      instagram: 'not_generated',
      tiktok: 'not_generated',
      x: 'not_generated',
      line: 'not_generated',
    },
    last_updated: '2026-05-17T15:30:00Z',
  },
  {
    id: 4,
    news_id: 7,
    article_title: 'Porsche Taycan 2026 รุ่นใหม่ แบตใหญ่ขึ้น วิ่งไกล 590 กม.',
    article_brand: 'Porsche',
    article_model: 'Taycan 2026',
    cover_image_url: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=800',
    rewrite_status: 'draft',
    platforms: {
      facebook: 'not_generated',
      instagram: 'not_generated',
      tiktok: 'not_generated',
      x: 'not_generated',
      line: 'not_generated',
    },
    last_updated: '2026-05-17T09:45:00Z',
  },
]

// Helper functions
export function getArticleById(id: number): CarNews | undefined {
  return mockCarNews.find((article) => article.id === id)
}

export function getArticles(): CarNews[] {
  return mockCarNews
}

export function getRewriteByNewsId(newsId: number): CarNewsRewrite | undefined {
  return mockRewrites.find((rewrite) => rewrite.news_id === newsId)
}

export function getImagesByNewsId(newsId: number): CarNewsImage[] {
  return mockImages.filter((image) => image.news_id === newsId)
}

export function getSocialByNewsId(newsId: number): SocialContent[] {
  return mockSocialContents.filter((content) => content.news_id === newsId)
}

export function getSocialContentByPlatform(newsId: number, platform: SocialPlatform): SocialContent | undefined {
  return mockSocialContents.find((content) => content.news_id === newsId && content.platform === platform)
}

export function getNewsSources(): NewsSource[] {
  return mockNewsSources
}

export function getBrands(): Brand[] {
  return mockBrands
}

export function getBrandById(id: number): Brand | undefined {
  return mockBrands.find((brand) => brand.id === id)
}

export function getModelsByBrandId(brandId: number): CarModel[] {
  return mockModels.filter((model) => model.brand_id === brandId)
}

export function getScrapeRuns(): ScrapeRun[] {
  return mockScrapeRuns
}

export function getSocialQueue(): SocialQueueItem[] {
  return mockSocialQueue
}

export function getSocialQueueItemByNewsId(newsId: number): SocialQueueItem | undefined {
  return mockSocialQueue.find((item) => item.news_id === newsId)
}
