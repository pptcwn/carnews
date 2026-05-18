// CarNews Thailand - Type Definitions

export type NewsStatus = 'raw' | 'rewritten' | 'review' | 'published'
export type LogStatus = 'success' | 'error' | 'warning' | 'duplicate'
export type ScrapeStatus = 'running' | 'completed' | 'failed'
export type Category = 'EV' | 'SUV' | 'Sedan' | 'Pickup' | 'Hypercar' | 'Coupe'
export type RewriteStatus = 'draft' | 'review' | 'published'
export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'x' | 'line'
export type SocialContentStatus = 'not_generated' | 'draft' | 'published'
export type ImageSourceType = 'external' | 'storage'

export interface CarNews {
  id: number
  brand: string
  model: string
  category: Category
  title: string
  detail: string
  price: string | null
  source: string
  url: string
  cover_image_url: string | null
  created_at: string
  status: NewsStatus
  image_count: number
  published_date?: string
}

export interface CarNewsRewrite {
  id: number
  news_id: number
  ai_title: string
  ai_detail: string
  short_summary: string
  seo_title: string
  seo_description: string
  slug: string
  tags: string[]
  viral_score: number
  seo_score: number
  tiktok_score: number
  rewrite_status: RewriteStatus
  created_at: string
  updated_at: string
}

export interface CarNewsImage {
  id: number
  news_id: number
  image_url: string
  source_type: ImageSourceType
  is_cover: boolean
  optimized: boolean
  sort_order: number
  created_at: string
}

export interface SocialContent {
  id: number
  news_id: number
  platform: SocialPlatform
  caption: string
  script?: string
  hashtags: string[]
  status: SocialContentStatus
  created_at: string
  updated_at: string
}

export interface NewsSource {
  id: number
  name: string
  url: string
  active: boolean
  scrape_format: string
  created_at: string
}

export interface Brand {
  id: number
  name: string
  name_th?: string
  logo_url?: string
  news_count: number
  created_at: string
}

export interface CarModel {
  id: number
  brand_id: number
  name: string
  category: Category
  news_count: number
  created_at: string
}

export interface WorkflowLog {
  id: number
  workflow_name: string
  node_name: string
  article_url: string | null
  status: LogStatus
  message: string
  execution_id: string
  run_id: string | null
  created_at: string
}

export interface ScrapeRun {
  id: string
  source_name: string
  status: ScrapeStatus
  requested_limit: number
  found_count: number
  inserted_count: number
  duplicate_count: number
  error_count: number
  started_at: string
  finished_at: string | null
}

export interface BrandStat {
  brand: string
  count: number
}

export interface CategoryStat {
  category: Category
  count: number
}

export interface ErrorTrend {
  date: string
  errors: number
}

export interface KpiData {
  totalNews: number
  pendingRewrite: number
  published: number
  errorsToday: number
  pendingImages: number
  totalNewsChange: number
  pendingRewriteChange: number
  publishedChange: number
  errorsTodayChange: number
  pendingImagesChange: number
}

export interface SocialQueueItem {
  id: number
  news_id: number
  article_title: string
  article_brand: string
  article_model: string
  cover_image_url: string | null
  rewrite_status: RewriteStatus
  platforms: {
    facebook: SocialContentStatus
    instagram: SocialContentStatus
    tiktok: SocialContentStatus
    x: SocialContentStatus
    line: SocialContentStatus
  }
  last_updated: string
}
