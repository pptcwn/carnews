'use client'

import Image from 'next/image'
import { ExternalLink, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { CategoryBadge } from '@/components/dashboard/category-badge'
import type { CarNews } from '@/lib/types'

interface RawArticlePanelProps {
  article: CarNews
}

export function RawArticlePanel({ article }: RawArticlePanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Raw Article</h2>
        <Button variant="ghost" size="sm" asChild>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 size-3.5" />
            Original
          </a>
        </Button>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <ImageIcon className="size-12 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">{article.brand}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-sm text-muted-foreground">{article.model}</span>
        <span className="text-muted-foreground">•</span>
        <CategoryBadge category={article.category} />
        <span className="text-muted-foreground">•</span>
        <StatusBadge status={article.status} />
      </div>

      {/* Title */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm text-muted-foreground">หัวข้อ Raw</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="font-medium">{article.title}</p>
        </CardContent>
      </Card>

      {/* Detail */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm text-muted-foreground">เนื้อหา Raw</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {article.detail}
          </p>
        </CardContent>
      </Card>

      {/* Price & Source */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm text-muted-foreground">ราคา</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-medium">{article.price ? `฿${article.price}` : 'ไม่ระบุ'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm text-muted-foreground">แหล่งข่าว</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="font-medium">{article.source}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
