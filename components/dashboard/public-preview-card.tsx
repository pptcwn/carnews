'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageIcon, Eye } from 'lucide-react'

interface PublicPreviewCardProps {
  title: string
  summary: string
  coverImageUrl: string | null
  brand: string
  category: string
  className?: string
}

export function PublicPreviewCard({
  title,
  summary,
  coverImageUrl,
  brand,
  category,
  className,
}: PublicPreviewCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="py-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Eye className="size-4" />
          Public Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          <div className="relative aspect-video bg-muted">
            {coverImageUrl ? (
              <Image src={coverImageUrl} alt={title} fill className="object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center">
                <ImageIcon className="size-12 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{brand}</span>
              <span>•</span>
              <span>{category}</span>
            </div>
            <h3 className="mt-1 line-clamp-2 font-semibold leading-tight">
              {title || 'Article Title...'}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {summary || 'Short summary...'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
