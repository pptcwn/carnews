'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MoreHorizontal,
  Pencil,
  Sparkles,
  ImageIcon,
  Share2,
  Eye,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { CategoryBadge } from '@/components/dashboard/category-badge'
import { toast } from 'sonner'
import type { CarNews, NewsStatus, Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ArticlesDataTableProps {
  articles: CarNews[]
  onEdit?: (id: number) => void
  onRewrite?: (id: number) => void
  onImages?: (id: number) => void
  onSocial?: (id: number) => void
  onPreview?: (id: number) => void
}

const brands = ['Toyota', 'BYD', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Porsche', 'Mitsubishi']
const categories: Category[] = ['EV', 'SUV', 'Sedan', 'Pickup', 'Hypercar', 'Coupe']
const statuses: NewsStatus[] = ['raw', 'rewritten', 'review', 'published']
const sources = ['Headlightmag', 'Drive.in.th', 'Motor Expo', 'AutoSpinn']

export function ArticlesDataTable({
  articles,
  onEdit,
  onRewrite,
  onImages,
  onSocial,
  onPreview,
}: ArticlesDataTableProps) {
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      search === '' ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.brand.toLowerCase().includes(search.toLowerCase()) ||
      article.model.toLowerCase().includes(search.toLowerCase())
    const matchesBrand = brandFilter === 'all' || article.brand === brandFilter
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter
    const matchesSource = sourceFilter === 'all' || article.source === sourceFilter
    return matchesSearch && matchesBrand && matchesCategory && matchesStatus && matchesSource
  })

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleExportCSV = () => {
    const toastId = toast.loading('กำลังสร้าง CSV...')
    const headers = ['ID', 'หัวข้อ', 'แบรนด์', 'รุ่น', 'หมวดหมู่', 'สถานะ', 'แหล่งข่าว']
    const rows = filteredArticles.map((a) => [
      a.id, `"${a.title.replace(/"/g, '""')}"`, a.brand, a.model, a.category, a.status, a.source
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `articles-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success(`Export สำเร็จ`, { id: toastId, description: `ดาวน์โหลด ${filteredArticles.length} รายการแล้ว` })
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="text-sm text-muted-foreground">
            จัดการข่าวที่ถูกดึงเข้าระบบ และสถานะการ Rewrite / Publish
          </p>
        </div>
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="mr-2 size-4" />
          Export CSV
        </Button>
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Select
            value={brandFilter}
            onValueChange={(value) => {
              setBrandFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="แบรนด์" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกแบรนด์</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="หมวดหมู่" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
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
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sourceFilter}
            onValueChange={(value) => {
              setSourceFilter(value)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="แหล่งข่าว" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกแหล่งข่าว</SelectItem>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden rounded-lg border border-border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-20">ภาพ</TableHead>
              <TableHead>หัวข้อ</TableHead>
              <TableHead className="w-24">แบรนด์</TableHead>
              <TableHead className="w-28">รุ่น</TableHead>
              <TableHead className="w-20">หมวดหมู่</TableHead>
              <TableHead className="w-28">แหล่งข่าว</TableHead>
              <TableHead className="w-24">สถานะ</TableHead>
              <TableHead className="w-16 text-center">ภาพ</TableHead>
              <TableHead className="w-28">สร้างเมื่อ</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Search className="size-8 opacity-50" />
                    <p>ไม่พบบทความที่ตรงกับเงื่อนไข</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    #{article.id}
                  </TableCell>
                  <TableCell>
                    <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                      {article.cover_image_url ? (
                        <Image
                          src={article.cover_image_url}
                          alt={article.title}
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
                    <p className="line-clamp-2 text-sm font-medium">{article.title}</p>
                  </TableCell>
                  <TableCell className="font-medium">{article.brand}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{article.model}</TableCell>
                  <TableCell>
                    <CategoryBadge category={article.category} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{article.source}</TableCell>
                  <TableCell>
                    <StatusBadge status={article.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <ImageIcon className="size-3" />
                      {article.image_count}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString('th-TH', {
                      day: 'numeric',
                      month: 'short',
                      year: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/articles/${article.id}/edit`}>
                            <Pencil className="mr-2 size-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/articles/${article.id}/rewrite`}>
                            <Sparkles className="mr-2 size-4" />
                            Rewrite
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/articles/${article.id}/images`}>
                            <ImageIcon className="mr-2 size-4" />
                            Images
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/social/${article.id}`}>
                            <Share2 className="mr-2 size-4" />
                            Social
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPreview?.(article.id)}>
                          <Eye className="mr-2 size-4" />
                          Preview
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {paginatedArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card py-12 text-muted-foreground">
            <Search className="size-8 opacity-50" />
            <p>ไม่พบบทความที่ตรงกับเงื่อนไข</p>
          </div>
        ) : (
          paginatedArticles.map((article) => (
            <ArticleMobileCard key={article.id} article={article} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            แสดง {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredArticles.length)} จาก{' '}
            {filteredArticles.length} รายการ
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

function ArticleMobileCard({ article }: { article: CarNews }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex gap-3 p-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
          {article.cover_image_url ? (
            <Image src={article.cover_image_url} alt={article.title} fill className="object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <ImageIcon className="size-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="line-clamp-2 text-sm font-medium">{article.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">{article.brand}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <CategoryBadge category={article.category} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={article.status} />
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <ImageIcon className="size-3" />
              {article.image_count}
            </span>
          </div>
        </div>
      </div>
      <div className="flex border-t border-border">
        <Link
          href={`/dashboard/articles/${article.id}/edit`}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Pencil className="size-3.5" />
          Edit
        </Link>
        <div className="w-px bg-border" />
        <Link
          href={`/dashboard/articles/${article.id}/rewrite`}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Sparkles className="size-3.5" />
          Rewrite
        </Link>
        <div className="w-px bg-border" />
        <Link
          href={`/dashboard/articles/${article.id}/images`}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ImageIcon className="size-3.5" />
          Images
        </Link>
        <div className="w-px bg-border" />
        <Link
          href={`/dashboard/social/${article.id}`}
          className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Share2 className="size-3.5" />
          Social
        </Link>
      </div>
    </div>
  )
}
