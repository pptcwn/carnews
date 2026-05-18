'use client'

import { cn } from '@/lib/utils'

interface ScoreBadgesProps {
  viralScore: number
  seoScore: number
  tiktokScore: number
  className?: string
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-success/20 text-success'
  if (score >= 60) return 'bg-warning/20 text-warning-foreground'
  return 'bg-destructive/20 text-destructive'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  return 'Needs Work'
}

export function ScoreBadges({ viralScore, seoScore, tiktokScore, className }: ScoreBadgesProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
          getScoreColor(viralScore)
        )}
      >
        <span>Viral</span>
        <span className="font-bold">{viralScore}</span>
      </div>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
          getScoreColor(seoScore)
        )}
      >
        <span>SEO</span>
        <span className="font-bold">{seoScore}</span>
      </div>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
          getScoreColor(tiktokScore)
        )}
      >
        <span>TikTok</span>
        <span className="font-bold">{tiktokScore}</span>
      </div>
    </div>
  )
}

export function ScoreCard({
  label,
  score,
  className,
}: {
  label: string
  score: number
  className?: string
}) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={cn('text-xs', getScoreColor(score).replace('bg-', 'text-').split(' ')[0])}>
          {getScoreLabel(score)}
        </span>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-bold">{score}</span>
        <span className="mb-1 text-sm text-muted-foreground">/ 100</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn('h-full rounded-full transition-all', getScoreColor(score).split(' ')[0])}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
