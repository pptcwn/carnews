'use client'

import { useState, useEffect } from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface OptimizeImagesProgressProps {
  isOpen: boolean
  onClose: () => void
  totalImages: number
  onComplete?: () => void
}

interface ImageResult {
  id: number
  url: string
  status: 'pending' | 'processing' | 'success' | 'error'
  error?: string
}

export function OptimizeImagesProgress({
  isOpen,
  onClose,
  totalImages,
  onComplete,
}: OptimizeImagesProgressProps) {
  const [results, setResults] = useState<ImageResult[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setResults([])
      setCurrentIndex(0)
      setIsComplete(false)
      return
    }

    // Initialize results
    const initialResults: ImageResult[] = Array.from({ length: totalImages }, (_, i) => ({
      id: i + 1,
      url: `image_${i + 1}.jpg`,
      status: 'pending',
    }))
    setResults(initialResults)

    // Simulate optimization process
    // TODO: POST /api/images/optimize/[newsId]
    // TODO: upload optimized image to Supabase Storage bucket car-images
    const processImages = async () => {
      for (let i = 0; i < totalImages; i++) {
        setCurrentIndex(i)
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i ? { ...r, status: 'processing' } : r
          )
        )

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700))

        // Random success/error (90% success rate)
        const success = Math.random() > 0.1
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i
              ? {
                  ...r,
                  status: success ? 'success' : 'error',
                  error: success ? undefined : 'Failed to optimize image',
                }
              : r
          )
        )
      }
      setIsComplete(true)
      onComplete?.()
    }

    processImages()
  }, [isOpen, totalImages, onComplete])

  if (!isOpen) return null

  const successCount = results.filter((r) => r.status === 'success').length
  const errorCount = results.filter((r) => r.status === 'error').length
  const progress = ((currentIndex + (isComplete ? 1 : 0)) / totalImages) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Optimizing Images</h3>
          {isComplete && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-4" />
            </Button>
          )}
        </div>

        <div className="mt-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {isComplete ? 'Complete' : `Processing ${currentIndex + 1} of ${totalImages}`}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Summary */}
          {isComplete && (
            <div className="flex gap-4 rounded-lg bg-muted p-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{successCount}</div>
                <div className="text-xs text-muted-foreground">Success</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.id}
                className={cn(
                  'flex items-center gap-3 rounded-md border border-border p-2 text-sm',
                  result.status === 'processing' && 'bg-muted/50',
                  result.status === 'success' && 'border-success/50 bg-success/10',
                  result.status === 'error' && 'border-destructive/50 bg-destructive/10'
                )}
              >
                <div className="flex size-6 items-center justify-center">
                  {result.status === 'pending' && (
                    <div className="size-2 rounded-full bg-muted-foreground" />
                  )}
                  {result.status === 'processing' && (
                    <Loader2 className="size-4 animate-spin text-primary" />
                  )}
                  {result.status === 'success' && (
                    <Check className="size-4 text-success" />
                  )}
                  {result.status === 'error' && (
                    <X className="size-4 text-destructive" />
                  )}
                </div>
                <span className="flex-1 truncate">{result.url}</span>
                {result.error && (
                  <span className="text-xs text-destructive">{result.error}</span>
                )}
              </div>
            ))}
          </div>

          {/* Close Button */}
          {isComplete && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
