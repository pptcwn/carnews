'use client'

import { useState, useMemo } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { NewsCard } from '@/components/dashboard/news-card'
import { FilterBar } from '@/components/dashboard/filter-bar'
import { EmptyState } from '@/components/dashboard/empty-state'
import { mockCarNews } from '@/lib/mock-data'
import { Newspaper } from 'lucide-react'

// TODO: fetch car_news with filters from Supabase

export default function NewsFeedPage() {
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('all')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [source, setSource] = useState('all')

  const filteredNews = useMemo(() => {
    return mockCarNews.filter((news) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesSearch = 
          news.title.toLowerCase().includes(searchLower) ||
          news.detail.toLowerCase().includes(searchLower) ||
          news.brand.toLowerCase().includes(searchLower) ||
          news.model.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Brand filter
      if (brand !== 'all' && news.brand !== brand) return false

      // Category filter
      if (category !== 'all' && news.category !== category) return false

      // Status filter
      if (status !== 'all' && news.status !== status) return false

      // Source filter
      if (source !== 'all' && news.source !== source) return false

      return true
    })
  }, [search, brand, category, status, source])

  const clearFilters = () => {
    setSearch('')
    setBrand('all')
    setCategory('all')
    setStatus('all')
    setSource('all')
  }

  return (
    <>
      <DashboardHeader
        title="News Feed"
        subtitle="ข่าวรถยนต์ที่ถูกดึงมาจาก n8n workflow รอการตรวจสอบและ Rewrite"
      />
      
      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Filter Bar */}
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          brandValue={brand}
          onBrandChange={setBrand}
          categoryValue={category}
          onCategoryChange={setCategory}
          statusValue={status}
          onStatusChange={setStatus}
          sourceValue={source}
          onSourceChange={setSource}
          onClearFilters={clearFilters}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            พบ {filteredNews.length} รายการ
          </p>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="ไม่พบข่าว"
            description="ไม่พบข่าวที่ตรงกับเงื่อนไขการค้นหา ลองปรับตัวกรองใหม่"
            icon={<Newspaper className="size-8 text-muted-foreground" />}
          />
        )}
      </div>
    </>
  )
}
