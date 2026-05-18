'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Save, X, ImageIcon, Calendar, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { CategoryBadge } from '@/components/dashboard/category-badge'
import type { CarNews, Category } from '@/lib/types'

interface ArticleEditFormProps {
  article: CarNews
  onSave?: (data: Partial<CarNews>) => void
  onCancel?: () => void
}

const brands = ['Toyota', 'BYD', 'Honda', 'Mazda', 'BMW', 'Mercedes-Benz', 'Porsche', 'Mitsubishi']
const categories: Category[] = ['EV', 'SUV', 'Sedan', 'Pickup', 'Hypercar', 'Coupe']

export function ArticleEditForm({ article, onSave, onCancel }: ArticleEditFormProps) {
  const [formData, setFormData] = useState({
    brand: article.brand,
    model: article.model,
    category: article.category,
    title: article.title,
    detail: article.detail,
    price: article.price || '',
    source: article.source,
    url: article.url,
    published_date: article.published_date || '',
    cover_image_url: article.cover_image_url || '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    // TODO: PATCH /api/articles/[id]
    // TODO: validate with zod
    // TODO: refresh Supabase data after save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave?.(formData)
    setIsSaving(false)
    toast.success('บันทึกสำเร็จ', { description: `Article #${article.id} อัปเดตแล้ว` })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/articles">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">Edit Article #{article.id}</h1>
            <p className="text-sm text-muted-foreground">แก้ไขข้อมูลบทความ Raw</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={onCancel} asChild>
            <Link href="/dashboard/articles">
              <X className="mr-2 size-4" />
              Cancel
            </Link>
          </Button>
          <Button type="submit" disabled={isSaving}>
            <Save className="mr-2 size-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ข้อมูลพื้นฐาน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="brand">แบรนด์</Label>
                  <Select value={formData.brand} onValueChange={(v) => handleChange('brand', v)}>
                    <SelectTrigger id="brand">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">รุ่น</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleChange('model', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => handleChange('category', v)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">หัวข้อ</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="detail">รายละเอียด</Label>
                <Textarea
                  id="detail"
                  value={formData.detail}
                  onChange={(e) => handleChange('detail', e.target.value)}
                  rows={8}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">ราคา (บาท)</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="1,000,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="published_date">วันที่เผยแพร่</Label>
                  <Input
                    id="published_date"
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => handleChange('published_date', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Source Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">แหล่งที่มา</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source">แหล่งข่าว</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => handleChange('source', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL ต้นฉบับ</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleChange('url', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="icon" asChild>
                    <a href={formData.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_image_url">URL ภาพปก</Label>
                <Input
                  id="cover_image_url"
                  type="url"
                  value={formData.cover_image_url}
                  onChange={(e) => handleChange('cover_image_url', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Cover Image Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ภาพปก</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                {formData.cover_image_url ? (
                  <Image
                    src={formData.cover_image_url}
                    alt={formData.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <ImageIcon className="size-12 text-muted-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scrape Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ข้อมูล Scrape</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">สถานะ</span>
                <StatusBadge status={article.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">หมวดหมู่</span>
                <CategoryBadge category={article.category} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">จำนวนภาพ</span>
                <span className="inline-flex items-center gap-1 text-sm">
                  <ImageIcon className="size-3.5" />
                  {article.image_count}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">สร้างเมื่อ</span>
                <span className="inline-flex items-center gap-1 text-sm">
                  <Calendar className="size-3.5" />
                  {new Date(article.created_at).toLocaleDateString('th-TH')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">เวลา</span>
                <span className="inline-flex items-center gap-1 text-sm">
                  <Clock className="size-3.5" />
                  {new Date(article.created_at).toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/articles/${article.id}/rewrite`}>
                  AI Rewrite
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/articles/${article.id}/images`}>
                  Manage Images
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/social/${article.id}`}>
                  Social Content
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Save Button */}
      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background p-4 sm:hidden">
        <Button type="submit" className="w-full" disabled={isSaving}>
          <Save className="mr-2 size-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
