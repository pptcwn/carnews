'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Save,
  ImageIcon,
  Facebook,
  Instagram,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TagInput } from '@/components/dashboard/tag-input'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { CategoryBadge } from '@/components/dashboard/category-badge'
import { toast } from 'sonner'
import type { CarNews, SocialContent, SocialPlatform, SocialContentStatus } from '@/lib/types'

interface SocialContentEditorProps {
  article: CarNews
  socialContents: SocialContent[]
}

type PlatformContent = {
  caption: string
  script?: string
  hashtags: string[]
  status: SocialContentStatus
}

const defaultContent: PlatformContent = {
  caption: '',
  script: '',
  hashtags: [],
  status: 'not_generated',
}

const platformConfig: Record<SocialPlatform, { label: string; icon: React.ElementType; hasScript: boolean }> = {
  facebook: { label: 'Facebook', icon: Facebook, hasScript: false },
  instagram: { label: 'Instagram', icon: Instagram, hasScript: false },
  tiktok: { label: 'TikTok', icon: MessageCircle, hasScript: true },
  x: { label: 'X/Twitter', icon: MessageCircle, hasScript: false },
  line: { label: 'Line', icon: MessageCircle, hasScript: false },
}

export function SocialContentEditor({ article, socialContents }: SocialContentEditorProps) {
  const [activeTab, setActiveTab] = useState<SocialPlatform>('facebook')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Initialize content state from existing data
  const [contents, setContents] = useState<Record<SocialPlatform, PlatformContent>>(() => {
    const initial: Record<SocialPlatform, PlatformContent> = {
      facebook: { ...defaultContent },
      instagram: { ...defaultContent },
      tiktok: { ...defaultContent },
      x: { ...defaultContent },
      line: { ...defaultContent },
    }

    socialContents.forEach((content) => {
      initial[content.platform] = {
        caption: content.caption,
        script: content.script || '',
        hashtags: content.hashtags,
        status: content.status,
      }
    })

    return initial
  })

  const handleGenerate = async (platform: SocialPlatform) => {
    // TODO: POST /api/social/generate/[id]?platform=...
    // TODO: Rate limit AI generation with Upstash Redis
    setIsGenerating(true)
    const toastId = toast.loading(`AI กำลังสร้าง ${platformConfig[platform].label} content...`)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock generated content
    const mockCaptions: Record<SocialPlatform, string> = {
      facebook: `${article.brand} ${article.model} มาแล้ว!\n\n${article.title}\n\nราคา: ${article.price ? `฿${article.price}` : 'ติดต่อสอบถาม'}\n\nใครสนใจรถรุ่นนี้บ้าง? คอมเมนต์บอกกันเลย!`,
      instagram: `${article.brand} ${article.model}\n\n${article.detail.slice(0, 150)}...\n\nราคาเริ่มต้น: ${article.price ? `฿${article.price}` : 'ติดต่อสอบถาม'}\n\nDouble tap if you love this car!`,
      tiktok: `${article.brand} ${article.model} รุ่นใหม่มาแรง!`,
      x: `${article.brand} ${article.model} มาแล้ว! ${article.title.slice(0, 100)}... ราคา ${article.price ? `฿${article.price}` : 'TBA'}`,
      line: `[ข่าวใหม่] ${article.brand} ${article.model}\n\n${article.title}\n\nราคา: ${article.price ? `฿${article.price}` : 'ติดต่อสอบถาม'}\n\nอ่านต่อได้ที่ carnews.co.th`,
    }

    const mockScripts: Record<SocialPlatform, string> = {
      facebook: '',
      instagram: '',
      tiktok: `Hook 3 วิ: ${article.brand} ${article.model} ราคาเริ่มต้นแค่ ${article.price ? `${article.price} บาท` : 'ไม่แพงอย่างที่คิด'}!\n\nเนื้อหา 45 วิ: ${article.detail.slice(0, 200)}\n\nCTA 5 วิ: กดติดตามเพื่อไม่พลาดข่าวรถใหม่!`,
      x: '',
      line: '',
    }

    setContents((prev) => ({
      ...prev,
      [platform]: {
        caption: mockCaptions[platform],
        script: mockScripts[platform],
        hashtags: [article.brand, article.model, article.category, 'รถยนต์', 'CarNewsThailand'],
        status: 'draft',
      },
    }))

    setIsGenerating(false)
    toast.success(`Generate ${platformConfig[platform].label} สำเร็จ`, { id: toastId, description: 'เนื้อหาพร้อมแล้ว' })
  }

  const handleSave = async (platform: SocialPlatform) => {
    // TODO: upsert car_news_social_contents onConflict news_id,platform
    setIsSaving(true)
    const toastId = toast.loading('กำลังบันทึก...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success(`บันทึก ${platformConfig[platform].label} แล้ว`, { id: toastId })
  }

  const handleChange = (platform: SocialPlatform, field: keyof PlatformContent, value: string | string[] | SocialContentStatus) => {
    setContents((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }))
  }

  const currentContent = contents[activeTab]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/social">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">Social Editor</h1>
            <p className="text-sm text-muted-foreground">
              สร้าง Social Content สำหรับ #{article.id}
            </p>
          </div>
        </div>
      </div>

      {/* Article Summary Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
              {article.cover_image_url ? (
                <Image
                  src={article.cover_image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <ImageIcon className="size-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="line-clamp-2 font-medium">{article.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">{article.brand}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{article.model}</span>
                <span className="text-muted-foreground">•</span>
                <CategoryBadge category={article.category} />
                <StatusBadge status={article.status} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SocialPlatform)}>
        <TabsList className="w-full overflow-x-auto justify-start">
          {(Object.keys(platformConfig) as SocialPlatform[]).map((platform) => {
            const config = platformConfig[platform]
            const status = contents[platform].status
            return (
              <TabsTrigger
                key={platform}
                value={platform}
                className="gap-2 whitespace-nowrap"
              >
                <config.icon className="size-4" />
                {config.label}
                {status !== 'not_generated' && (
                  <Badge
                    variant={status === 'published' ? 'default' : 'secondary'}
                    className="ml-1 text-[10px] px-1.5"
                  >
                    {status === 'published' ? 'P' : 'D'}
                  </Badge>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>

        {(Object.keys(platformConfig) as SocialPlatform[]).map((platform) => (
          <TabsContent key={platform} value={platform} className="mt-4 space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Editor */}
              <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleGenerate(platform)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 size-4 animate-spin" />
                        Generating...
                      </>
                    ) : currentContent.caption ? (
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
                    onClick={() => handleSave(platform)}
                    disabled={isSaving || !currentContent.caption}
                  >
                    <Save className="mr-2 size-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div>

                {/* Caption */}
                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Textarea
                    value={contents[platform].caption}
                    onChange={(e) => handleChange(platform, 'caption', e.target.value)}
                    placeholder={`เขียน caption สำหรับ ${platformConfig[platform].label}...`}
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    {contents[platform].caption.length} characters
                  </p>
                </div>

                {/* Script (TikTok only) */}
                {platformConfig[platform].hasScript && (
                  <div className="space-y-2">
                    <Label>Script (Hook / Content / CTA)</Label>
                    <Textarea
                      value={contents[platform].script || ''}
                      onChange={(e) => handleChange(platform, 'script', e.target.value)}
                      placeholder="Hook 3 วิ: ...\nเนื้อหา 45 วิ: ...\nCTA 5 วิ: ..."
                      rows={8}
                    />
                    <p className="text-xs text-muted-foreground">
                      รูปแบบ: Hook 3 วิ / เนื้อหา 45 วิ / CTA 5 วิ
                    </p>
                  </div>
                )}

                {/* X/Twitter Thread Preview */}
                {platform === 'x' && contents[platform].caption && (
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Thread Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      {splitIntoTweets(contents[platform].caption).map((tweet, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-border bg-muted/50 p-3"
                        >
                          <p className="text-xs text-muted-foreground mb-1">
                            Tweet {index + 1}
                          </p>
                          <p className="text-sm">{tweet}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {tweet.length}/280
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Hashtags */}
                <div className="space-y-2">
                  <Label>Hashtags</Label>
                  <TagInput
                    tags={contents[platform].hashtags}
                    onChange={(tags) => handleChange(platform, 'hashtags', tags)}
                    placeholder="เพิ่ม hashtag..."
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={contents[platform].status}
                    onValueChange={(v) => handleChange(platform, 'status', v as SocialContentStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not_generated">Not Generated</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <SocialPreviewCard
                  platform={platform}
                  content={contents[platform]}
                  coverImageUrl={article.cover_image_url}
                  brand={article.brand}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Mobile Save Bar */}
      <div className="fixed inset-x-0 bottom-0 flex gap-2 border-t border-border bg-background p-4 lg:hidden">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => handleGenerate(activeTab)}
          disabled={isGenerating}
        >
          <Sparkles className="mr-2 size-4" />
          Generate
        </Button>
        <Button
          className="flex-1"
          onClick={() => handleSave(activeTab)}
          disabled={isSaving || !currentContent.caption}
        >
          <Save className="mr-2 size-4" />
          Save
        </Button>
      </div>
    </div>
  )
}

function splitIntoTweets(text: string): string[] {
  const maxLength = 280
  const words = text.split(' ')
  const tweets: string[] = []
  let currentTweet = ''

  for (const word of words) {
    if ((currentTweet + ' ' + word).trim().length <= maxLength) {
      currentTweet = (currentTweet + ' ' + word).trim()
    } else {
      if (currentTweet) tweets.push(currentTweet)
      currentTweet = word
    }
  }
  if (currentTweet) tweets.push(currentTweet)

  return tweets.slice(0, 5) // Max 5 tweets in thread
}

function SocialPreviewCard({
  platform,
  content,
  coverImageUrl,
  brand,
}: {
  platform: SocialPlatform
  content: PlatformContent
  coverImageUrl: string | null
  brand: string
}) {
  const PlatformIcon = platformConfig[platform].icon

  if (!content.caption) {
    return (
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">{platformConfig[platform].label} Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <PlatformIcon className="size-12 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            Generate content to see preview
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">{platformConfig[platform].label} Preview</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="size-8 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">CarNews Thailand</p>
              <p className="text-xs text-muted-foreground">@carnewsth</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            {platform !== 'x' && coverImageUrl && (
              <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={coverImageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="whitespace-pre-wrap text-sm">{content.caption}</p>
            {content.hashtags.length > 0 && (
              <p className="mt-2 text-sm text-primary">
                {content.hashtags.map((tag) => `#${tag}`).join(' ')}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-border p-3 text-xs text-muted-foreground">
            <span>Like</span>
            <span>Comment</span>
            <span>Share</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
