'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
}

export function TagInput({
  tags,
  onChange,
  placeholder = 'เพิ่ม tag...',
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const tag = inputValue.trim()
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag])
      setInputValue('')
    }
  }

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div
      className={cn(
        'flex min-h-10 flex-wrap gap-1.5 rounded-md border border-input bg-transparent px-3 py-2 text-sm',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        className
      )}
    >
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="gap-1 px-2 py-0.5"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
          >
            <X className="size-3" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="min-w-[100px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}
