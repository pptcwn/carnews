'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  Wand2,
  ChevronLeft,
  ChevronRight,
  Edit,
  ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/dashboard/status-badge'
import type { SocialQueueItem, SocialContentStatus, SocialPlatform } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SocialQueueTableProps {
  items: SocialQueueItem[]
}

const platforms: SocialPlatform[] = ['facebook', 'instagram', 'tiktok', 'x', 'line']
const statuses: SocialContentStatus[] = ['not_generated', 'draft', 'published']

const platformLabels: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  x: 'X/Twitter',
  line: 'Line',
}

const statusConfig: Record<SocialContentStatus, { label: string; className: string }> = {
  not_generated: {
    label: '-',
    className: 'bg-muted text-muted-foreground',
  },
  draft: {
    label: 'Draft',
    className: 'bg-warning/20 text-warning-foreground',
  },
  published: {
    label: 'Published',
    className: 'bg-success/20 text-success',
  },
}

function PlatformBadge({ status }: { status: SocialContentStatus }) {
  const config = statusConfig[status]
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium min-w-16',
        config.className
      )}
    >
      {config.label}
    </span>
  )
}

function getPlatformCompletionCount(platforms: SocialQueueItem['platforms']): number {
  return Object.values(platforms).filter((status) => status === 'published').length
}

export function SocialQueueTable({ items }: SocialQueueTableProps) {
  const [search, setSearch] = useState('')
  const [platformFilter, setPlatformFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      search === '' ||
      item.article_title.toLowerCase().includes(search.toLowerCase()) ||
      item.article_brand.toLowerCase().includes(search.toLowerCase())

    const matchesPlatform =
      platformFilter === 'all' ||
      item.platforms[platformFilter as SocialPlatform] !== 'not_generated'

    const matchesStatus =
      statusFilter === 'all' ||
      Object.values(item.platforms).some((status) => status === statusFilter)

    return matchesSearch && matchesPlatform && matchesStatus
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleGenerateAll = (newsId: number) => {
    // TODO: POST /api/social/generate/[id] for all platforms
    console.log('Generate all social content for news:', newsId)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Social Content</h1>
          <p className="text-sm text-muted-foreground">
            สร้างและจัดการ caption/script สำหรับแต่ละ platform
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="ค้นหาบทความ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            value={platformFilter}
            onValueChange={(value) => {
              setPlatformFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุก Platform</SelectItem>
              {platforms.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platformLabels[platform]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกสถานะ</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusConfig[status].label === '-' ? 'Not Generated' : statusConfig[status].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden rounded-lg border border-border bg-card lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ภาพ</TableHead>
              <TableHead>บทความ</TableHead>
              <TableHead className="w-24">แบรนด์</TableHead>
              <TableHead className="w-20 text-center">สถานะ</TableHead>
              <TableHead className="w-20 text-center">FB</TableHead>
              <TableHead className="w-20 text-center">IG</TableHead>
              <TableHead className="w-20 text-center">TikTok</TableHead>
              <TableHead className="w-20 text-center">X</TableHead>
              <TableHead className="w-20 text-center">Line</TableHead>
              <TableHead className="w-28">อัปเดต</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Search className="size-8 opacity-50" />
                    <p>ไม่พบรายการที่ตรงกับเงื่อนไข</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                      {item.cover_image_url ? (
                        <Image
                          src={item.cover_image_url}
                          alt={item.article_title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <ImageIcon className="size-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-sm font-medium">{item.article_title}</p>
                  </TableCell>
                  <TableCell className="font-medium">{item.article_brand}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {getPlatformCompletionCount(item.platforms)}/5
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <PlatformBadge status={item.platforms.facebook} />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlatformBadge status={item.platforms.instagram} />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlatformBadge status={item.platforms.tiktok} />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlatformBadge status={item.platforms.x} />
                  </TableCell>
                  <TableCell className="text-center">
                    <PlatformBadge status={item.platforms.line} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(item.last_updated).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-8" asChild>
                        <Link href={`/dashboard/social/${item.news_id}`}>
                          <Edit className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => handleGenerateAll(item.news_id)}
                      >
                        <Wand2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 lg:hidden">
        {paginatedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card py-12 text-muted-foreground">
            <Search className="size-8 opacity-50" />
            <p>ไม่พบรายการที่ตรงกับเงื่อนไข</p>
          </div>
        ) : (
          paginatedItems.map((item) => (
            <SocialQueueMobileCard
              key={item.id}
              item={item}
              onGenerateAll={() => handleGenerateAll(item.news_id)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            แสดง {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredItems.length)} จาก{' '}
            {filteredItems.length} รายการ
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SocialQueueMobileCard({
  item,
  onGenerateAll,
}: {
  item: SocialQueueItem
  onGenerateAll: () => void
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex gap-3 p-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
          {item.cover_image_url ? (
            <Image
              src={item.cover_image_url}
              alt={item.article_title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <ImageIcon className="size-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="line-clamp-2 text-sm font-medium">{item.article_title}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{item.article_brand}</span>
            <StatusBadge status={item.rewrite_status} />
          </div>
        </div>
      </div>

      {/* Platform Statuses */}
      <div className="grid grid-cols-5 gap-1 border-t border-border px-4 py-2">
        {platforms.map((platform) => (
          <div key={platform} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground">
              {platform === 'x' ? 'X' : platform.slice(0, 2).toUpperCase()}
            </span>
            <PlatformBadge status={item.platforms[platform]} />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex border-t border-border">
        <Link
          href={`/dashboard/social/${item.news_id}`}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Edit className="size-3.5" />
          Edit
        </Link>
        <div className="w-px bg-border" />
        <button
          onClick={onGenerateAll}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Wand2 className="size-3.5" />
          Generate All
        </button>
      </div>
    </div>
  )
}
