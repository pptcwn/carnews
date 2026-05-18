'use client'

import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface RichTextEditorMockProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const toolbarButtons = [
  { icon: Bold, label: 'Bold' },
  { icon: Italic, label: 'Italic' },
  { icon: Underline, label: 'Underline' },
  { separator: true },
  { icon: Heading1, label: 'Heading 1' },
  { icon: Heading2, label: 'Heading 2' },
  { separator: true },
  { icon: List, label: 'Bullet List' },
  { icon: ListOrdered, label: 'Numbered List' },
  { separator: true },
  { icon: AlignLeft, label: 'Align Left' },
  { icon: AlignCenter, label: 'Align Center' },
  { icon: AlignRight, label: 'Align Right' },
  { separator: true },
  { icon: Link, label: 'Insert Link' },
  { icon: ImageIcon, label: 'Insert Image' },
  { icon: Quote, label: 'Block Quote' },
  { icon: Code, label: 'Code Block' },
]

export function RichTextEditorMock({
  value,
  onChange,
  placeholder = 'เขียนเนื้อหา...',
  className,
}: RichTextEditorMockProps) {
  // Note: This is a mock component. In production, use a real rich text editor like Tiptap.
  // TODO: Replace with Tiptap or similar rich text editor

  return (
    <div className={cn('rounded-lg border border-input', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 overflow-x-auto border-b border-border bg-muted/50 p-1">
        {toolbarButtons.map((item, index) =>
          'separator' in item ? (
            <div key={index} className="mx-1 h-6 w-px bg-border" />
          ) : (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              title={item.label}
              onClick={() => {
                // Mock: In real implementation, this would apply formatting
                console.log(`${item.label} clicked`)
              }}
            >
              <item.icon className="size-4" />
              <span className="sr-only">{item.label}</span>
            </Button>
          )
        )}
      </div>

      {/* Editor Area */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[300px] resize-none rounded-none border-0 focus-visible:ring-0"
      />

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <span>รองรับ HTML: &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;h2&gt;, &lt;h3&gt;</span>
        <span>{value.length} characters</span>
      </div>
    </div>
  )
}
