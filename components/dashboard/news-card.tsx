import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { CategoryBadge } from '@/components/dashboard/category-badge'
import { Eye, Sparkles, ImageIcon, Calendar, ExternalLink } from 'lucide-react'
import type { CarNews } from '@/lib/types'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  news: CarNews
  className?: string
}

export function NewsCard({ news, className }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatPrice = (price: string | null) => {
    if (!price) return null
    const num = parseInt(price.replace(/,/g, ''))
    if (isNaN(num)) return price
    return new Intl.NumberFormat('th-TH').format(num) + ' บาท'
  }

  return (
    <Card className={cn('overflow-hidden flex flex-col', className)}>
      {/* Cover Image */}
      <div className="relative aspect-video bg-muted">
        {news.cover_image_url ? (
          <Image
            src={news.cover_image_url}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="size-12 text-muted-foreground/30" />
          </div>
        )}
        
        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
            {news.brand}
          </Badge>
          <CategoryBadge category={news.category} className="bg-background/80 backdrop-blur-sm" />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <StatusBadge status={news.status} />
        </div>
        
        {/* Image Count */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
            <ImageIcon className="size-3 mr-1" />
            {news.image_count}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{news.model}</p>
          <h3 className="font-medium text-sm leading-tight line-clamp-2">
            {news.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {news.detail}
          </p>
          
          {news.price && (
            <p className="text-sm font-semibold text-primary">
              {formatPrice(news.price)}
            </p>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            {formatDate(news.created_at)}
          </div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ExternalLink className="size-3" />
            {news.source}
          </a>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/articles/${news.id}/edit`}>
              <Eye className="size-3 mr-1" />
              ดูรายละเอียด
            </Link>
          </Button>
          <Button variant="default" size="sm" className="flex-1" asChild>
            <Link href={`/dashboard/articles/${news.id}/rewrite`}>
              <Sparkles className="size-3 mr-1" />
              Rewrite
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
