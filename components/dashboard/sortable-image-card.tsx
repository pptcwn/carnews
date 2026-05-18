'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  GripVertical,
  Star,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Database,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CarNewsImage } from '@/lib/types'

interface SortableImageCardProps {
  image: CarNewsImage
  onSetCover: () => void
  onDelete: () => void
  onCopyUrl: () => void
  isDragging?: boolean
}

export function SortableImageCard({
  image,
  onSetCover,
  onDelete,
  onCopyUrl,
  isDragging,
}: SortableImageCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = () => {
    onCopyUrl()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border bg-card transition-all',
        isDragging && 'rotate-2 scale-105 shadow-lg',
        image.is_cover && 'ring-2 ring-primary'
      )}
    >
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 z-10 flex cursor-grab items-center justify-center rounded bg-background/80 p-1 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 active:cursor-grabbing">
        <GripVertical className="size-4 text-muted-foreground" />
      </div>

      {/* Sort Order Badge */}
      <div className="absolute right-2 top-2 z-10">
        <Badge variant="secondary" className="text-xs">
          #{image.sort_order}
        </Badge>
      </div>

      {/* Image */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={image.image_url}
          alt={`Image ${image.sort_order}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 p-2">
        {image.is_cover && (
          <Badge className="gap-1 bg-primary text-xs">
            <Star className="size-3" />
            Cover
          </Badge>
        )}
        <Badge
          variant="outline"
          className={cn(
            'gap-1 text-xs',
            image.source_type === 'storage' ? 'border-success/50 text-success' : ''
          )}
        >
          {image.source_type === 'storage' ? (
            <>
              <Database className="size-3" />
              Storage
            </>
          ) : (
            <>
              <ExternalLink className="size-3" />
              External
            </>
          )}
        </Badge>
        {image.optimized && (
          <Badge variant="outline" className="gap-1 border-success/50 text-xs text-success">
            <Check className="size-3" />
            Optimized
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 rounded-none text-xs"
          onClick={onSetCover}
          disabled={image.is_cover}
        >
          <Star className={cn('mr-1 size-3', image.is_cover && 'fill-current')} />
          {image.is_cover ? 'Cover' : 'Set Cover'}
        </Button>
        <div className="w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 rounded-none text-xs"
          onClick={handleCopyUrl}
        >
          {copied ? (
            <>
              <Check className="mr-1 size-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-1 size-3" />
              Copy URL
            </>
          )}
        </Button>
        <div className="w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 rounded-none text-xs text-destructive hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="mr-1 size-3" />
          Delete
        </Button>
      </div>
    </div>
  )
}
