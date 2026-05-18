'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, Search } from 'lucide-react'

interface SEOPreviewCardProps {
  title: string
  slug: string
  description: string
  className?: string
}

export function SEOPreviewCard({ title, slug, description, className }: SEOPreviewCardProps) {
  const displayUrl = slug ? `carnews.co.th › ${slug}` : 'carnews.co.th › ...'

  return (
    <Card className={cn(className)}>
      <CardHeader className="py-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Search className="size-4" />
          Google Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Globe className="size-3" />
            {displayUrl}
          </div>
          <h3 className="mt-1 line-clamp-2 text-lg font-medium text-primary hover:underline">
            {title || 'SEO Title...'}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {description || 'SEO Description...'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
