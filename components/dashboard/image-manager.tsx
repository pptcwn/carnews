'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Upload,
  Wand2,
  ImageIcon,
  Database,
  ExternalLink,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SortableImageCard } from '@/components/dashboard/sortable-image-card'
import { OptimizeImagesProgress } from '@/components/dashboard/optimize-images-progress'
import { toast } from 'sonner'
import type { CarNews, CarNewsImage } from '@/lib/types'

interface ImageManagerProps {
  article: CarNews
  images: CarNewsImage[]
}

export function ImageManager({ article, images: initialImages }: ImageManagerProps) {
  const [images, setImages] = useState(initialImages)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<CarNewsImage | null>(null)
  const [optimizeDialogOpen, setOptimizeDialogOpen] = useState(false)

  const handleSetCover = (imageId: number) => {
    // TODO: PATCH /api/images/set-cover
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        is_cover: img.id === imageId,
      }))
    )
    toast.success('ตั้งภาพปกแล้ว')
  }

  const handleDelete = (image: CarNewsImage) => {
    setImageToDelete(image)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // TODO: DELETE /api/images/[id]
    if (imageToDelete) {
      setImages((prev) => prev.filter((img) => img.id !== imageToDelete.id))
      toast.success('ลบรูปภาพแล้ว')
    }
    setDeleteDialogOpen(false)
    setImageToDelete(null)
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('คัดลอก URL แล้ว')
  }

  const handleReorder = (fromIndex: number, toIndex: number) => {
    // TODO: PATCH /api/images/reorder
    const newImages = [...images]
    const [removed] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, removed)
    // Update sort_order
    const reordered = newImages.map((img, idx) => ({ ...img, sort_order: idx + 1 }))
    setImages(reordered)
  }

  const coverImage = images.find((img) => img.is_cover)
  const optimizedCount = images.filter((img) => img.optimized).length
  const externalCount = images.filter((img) => img.source_type === 'external').length
  const storageCount = images.filter((img) => img.source_type === 'storage').length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/articles/${article.id}/edit`}>
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold">Image Manager</h1>
            <p className="text-sm text-muted-foreground">
              จัดการรูปภาพสำหรับ #{article.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setOptimizeDialogOpen(true)}
            disabled={images.length === 0}
          >
            <Wand2 className="mr-2 size-4" />
            Optimize All
          </Button>
          <Button onClick={() => toast.info('ฟีเจอร์ Upload ยังไม่เชื่อมต่อ Backend', { description: 'ผู้พัฒนาจะเพิ่ม Supabase Storage ในขั้นต่อไป' })}>
            <Upload className="mr-2 size-4" />
            Upload Image
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content - Image Grid */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Images ({images.length})</h2>
              <p className="text-sm text-muted-foreground">
                ลากเพื่อเรียงลำดับภาพ
              </p>
            </div>

            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12 text-center">
                <ImageIcon className="size-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold">No Images</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  ยังไม่มีรูปภาพสำหรับบทความนี้
                </p>
                <Button className="mt-4">
                  <Upload className="mr-2 size-4" />
                  Upload First Image
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {images.map((image, index) => (
                  <SortableImageCard
                    key={image.id}
                    image={image}
                    onSetCover={() => handleSetCover(image.id)}
                    onDelete={() => handleDelete(image)}
                    onCopyUrl={() => handleCopyUrl(image.image_url)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Cover Image Preview */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                {coverImage ? (
                  <Image
                    src={coverImage.image_url}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center">
                    <ImageIcon className="size-8 text-muted-foreground" />
                    <p className="mt-2 text-xs text-muted-foreground">No cover set</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Image Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Images</span>
                <span className="font-medium">{images.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Check className="size-3.5 text-success" />
                  Optimized
                </span>
                <span className="font-medium">{optimizedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Database className="size-3.5" />
                  Storage
                </span>
                <span className="font-medium">{storageCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ExternalLink className="size-3.5" />
                  External
                </span>
                <span className="font-medium">{externalCount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Article Info */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Article Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="line-clamp-3 text-sm text-muted-foreground">{article.title}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{article.brand}</span>
                <span>•</span>
                <span>{article.model}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการลบรูปภาพ</DialogTitle>
            <DialogDescription>
              คุณต้องการลบรูปภาพนี้หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </DialogDescription>
          </DialogHeader>
          {imageToDelete && (
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={imageToDelete.image_url}
                alt="Image to delete"
                fill
                className="object-cover"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              ลบรูปภาพ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Optimize Progress */}
      <OptimizeImagesProgress
        isOpen={optimizeDialogOpen}
        onClose={() => setOptimizeDialogOpen(false)}
        totalImages={images.filter((img) => !img.optimized).length || 1}
        onComplete={() => {
          // Mark all as optimized
          setImages((prev) => prev.map((img) => ({ ...img, optimized: true })))
        }}
      />
    </div>
  )
}
