'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Save,
  Send,
  Rocket,
  AlertTriangle,
} from 'lucide-react'
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { RawArticlePanel } from '@/components/dashboard/raw-article-panel'
import { RichTextEditorMock } from '@/components/dashboard/rich-text-editor-mock'
import { TagInput } from '@/components/dashboard/tag-input'
import { ScoreCard } from '@/components/dashboard/score-badges'
import { SEOPreviewCard } from '@/components/dashboard/seo-preview-card'
import { PublicPreviewCard } from '@/components/dashboard/public-preview-card'
import { toast } from 'sonner'
import type { CarNews, CarNewsRewrite, RewriteStatus } from '@/lib/types'

interface RewriteEditorProps {
  article: CarNews
  existingRewrite?: CarNewsRewrite | null
}

const initialRewrite: Omit<CarNewsRewrite, 'id' | 'news_id' | 'created_at' | 'updated_at'> = {
  ai_title: '',
  ai_detail: '',
  short_summary: '',
  seo_title: '',
  seo_description: '',
  slug: '',
  tags: [],
  viral_score: 0,
  seo_score: 0,
  tiktok_score: 0,
  rewrite_status: 'draft',
}

export function RewriteEditor({ article, existingRewrite }: RewriteEditorProps) {
  const [formData, setFormData] = useState(
    existingRewrite
      ? {
          ai_title: existingRewrite.ai_title,
          ai_detail: existingRewrite.ai_detail,
          short_summary: existingRewrite.short_summary,
          seo_title: existingRewrite.seo_title,
          seo_description: existingRewrite.seo_description,
          slug: existingRewrite.slug,
          tags: existingRewrite.tags,
          viral_score: existingRewrite.viral_score,
          seo_score: existingRewrite.seo_score,
          tiktok_score: existingRewrite.tiktok_score,
          rewrite_status: existingRewrite.rewrite_status,
        }
      : initialRewrite
  )

  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    // TODO: POST /api/rewrite/generate/[id]
    setIsGenerating(true)
    const toastId = toast.loading('AI กำลัง Generate...')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Mock generated data
    setFormData({
      ai_title: `${article.brand} ${article.model}: ${article.title.split(' ').slice(0, 5).join(' ')}`,
      ai_detail: `<p>${article.detail}</p><p>รายละเอียดเพิ่มเติมที่ถูก AI เขียนใหม่...</p>`,
      short_summary: article.detail.slice(0, 100) + '...',
      seo_title: `${article.brand} ${article.model} ${new Date().getFullYear()} | CarNews Thailand`,
      seo_description: article.detail.slice(0, 150) + '...',
      slug: article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 50),
      tags: [article.brand, article.model, article.category, 'รถยนต์', 'ข่าวรถ'],
      viral_score: Math.floor(Math.random() * 30) + 70,
      seo_score: Math.floor(Math.random() * 25) + 75,
      tiktok_score: Math.floor(Math.random() * 35) + 65,
      rewrite_status: 'draft',
    })
    setIsGenerating(false)
    toast.success('Generate สำเร็จ', { id: toastId, description: 'AI เขียนเนื้อหาใหม่แล้ว' })
  }

  const handleSave = async (status: RewriteStatus = formData.rewrite_status) => {
    // TODO: upsert car_news_rewrites onConflict news_id
    // TODO: ensure unique slug before saving
    setIsSaving(true)
    const toastId = toast.loading('กำลังบันทึก...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setFormData((prev) => ({ ...prev, rewrite_status: status }))
    setIsSaving(false)
    if (status === 'published') {
      toast.success('Publish สำเร็จ!', { id: toastId, description: 'บทความถูก Publish แล้ว' })
    } else if (status === 'review') {
      toast.success('ส่ง Review แล้ว', { id: toastId, description: 'บทความอยู่ในคิว Review' })
    } else {
      toast.success('บันทึก Draft แล้ว', { id: toastId })
    }
  }

  const handlePublish = async () => {
    // TODO: trigger GitHub repository_dispatch when status becomes published
    await handleSave('published')
  }

  const canPublish =
    formData.slug &&
    formData.seo_title &&
    formData.seo_description &&
    article.cover_image_url

  const publishWarnings = []
  if (!formData.slug) publishWarnings.push('ยังไม่มี Slug')
  if (!formData.seo_title) publishWarnings.push('ยังไม่มี SEO Title')
  if (!formData.seo_description) publishWarnings.push('ยังไม่มี SEO Description')
  if (!article.cover_image_url) publishWarnings.push('ยังไม่มีภาพปก')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/articles">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">AI Rewrite #{article.id}</h1>
            <p className="text-sm text-muted-foreground">สร้างเนื้อหา AI สำหรับเผยแพร่</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 size-4 animate-spin" />
                Generating...
              </>
            ) : existingRewrite ? (
              <>
                <RefreshCw className="mr-2 size-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="mr-2 size-4" />
                Generate
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={isSaving}
          >
            <Save className="mr-2 size-4" />
            Save Draft
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave('review')}
            disabled={isSaving}
          >
            <Send className="mr-2 size-4" />
            Send to Review
          </Button>
          <Button onClick={handlePublish} disabled={isSaving || !canPublish}>
            <Rocket className="mr-2 size-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Publish Warnings */}
      {publishWarnings.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>ยังไม่สามารถ Publish ได้</AlertTitle>
          <AlertDescription>
            กรุณาเพิ่มข้อมูลที่จำเป็น: {publishWarnings.join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content - Split Layout */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Left Panel - Raw Article */}
        <div className="rounded-lg border border-border bg-card p-4">
          <RawArticlePanel article={article} />
        </div>

        {/* Right Panel - Rewrite Editor */}
        <div className="space-y-4">
          {/* AI Title */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">AI Title</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Input
                value={formData.ai_title}
                onChange={(e) => handleChange('ai_title', e.target.value)}
                placeholder="หัวข้อที่ AI สร้าง..."
              />
            </CardContent>
          </Card>

          {/* AI Detail */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">AI Detail (Rich Text)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <RichTextEditorMock
                value={formData.ai_detail}
                onChange={(value) => handleChange('ai_detail', value)}
                placeholder="เนื้อหาที่ AI สร้าง..."
              />
            </CardContent>
          </Card>

          {/* Short Summary */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Short Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Textarea
                value={formData.short_summary}
                onChange={(e) => handleChange('short_summary', e.target.value)}
                placeholder="สรุปสั้นๆ..."
                rows={3}
              />
            </CardContent>
          </Card>

          {/* SEO Fields */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">SEO Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={formData.seo_title}
                  onChange={(e) => handleChange('seo_title', e.target.value)}
                  placeholder="SEO Title..."
                />
                <p className="text-xs text-muted-foreground">
                  {formData.seo_title.length}/60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  value={formData.seo_description}
                  onChange={(e) => handleChange('seo_description', e.target.value)}
                  placeholder="SEO Description..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.seo_description.length}/160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">carnews.co.th/</span>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    placeholder="article-slug"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <TagInput
                tags={formData.tags}
                onChange={(tags) => handleChange('tags', tags)}
                placeholder="เพิ่ม tag แล้วกด Enter..."
              />
            </CardContent>
          </Card>

          {/* Scores */}
          <div className="grid gap-4 sm:grid-cols-3">
            <ScoreCard label="Viral Score" score={formData.viral_score} />
            <ScoreCard label="SEO Score" score={formData.seo_score} />
            <ScoreCard label="TikTok Score" score={formData.tiktok_score} />
          </div>

          {/* Status */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Rewrite Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Select
                value={formData.rewrite_status}
                onValueChange={(v) => handleChange('rewrite_status', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Previews */}
          <SEOPreviewCard
            title={formData.seo_title}
            slug={formData.slug}
            description={formData.seo_description}
          />

          <PublicPreviewCard
            title={formData.ai_title}
            summary={formData.short_summary}
            coverImageUrl={article.cover_image_url}
            brand={article.brand}
            category={article.category}
          />
        </div>
      </div>

      {/* Mobile Save Bar */}
      <div className="fixed inset-x-0 bottom-0 flex gap-2 border-t border-border bg-background p-4 xl:hidden">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => handleSave('draft')}
          disabled={isSaving}
        >
          <Save className="mr-2 size-4" />
          Save
        </Button>
        <Button
          className="flex-1"
          onClick={handlePublish}
          disabled={isSaving || !canPublish}
        >
          <Rocket className="mr-2 size-4" />
          Publish
        </Button>
      </div>
    </div>
  )
}
