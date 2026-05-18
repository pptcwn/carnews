'use client'

import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Globe,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import type { NewsSource } from '@/lib/types'

interface SourceManagementTableProps {
  sources: NewsSource[]
}

export function SourceManagementTable({ sources: initialSources }: SourceManagementTableProps) {
  const [sources, setSources] = useState(initialSources)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingSource, setEditingSource] = useState<NewsSource | null>(null)
  const [sourceToDelete, setSourceToDelete] = useState<NewsSource | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    active: true,
    scrape_format: '',
  })

  const handleOpenAdd = () => {
    setEditingSource(null)
    setFormData({
      name: '',
      url: '',
      active: true,
      scrape_format: '',
    })
    setDialogOpen(true)
  }

  const handleOpenEdit = (source: NewsSource) => {
    setEditingSource(source)
    setFormData({
      name: source.name,
      url: source.url,
      active: source.active,
      scrape_format: source.scrape_format,
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    // TODO: CRUD public.news_sources
    if (editingSource) {
      // Update
      setSources((prev) =>
        prev.map((s) =>
          s.id === editingSource.id
            ? { ...s, ...formData }
            : s
        )
      )
      toast.success('อัปเดต Source แล้ว', { description: formData.name })
    } else {
      // Create
      const newSource: NewsSource = {
        id: Math.max(...sources.map((s) => s.id)) + 1,
        ...formData,
        created_at: new Date().toISOString(),
      }
      setSources((prev) => [...prev, newSource])
      toast.success('เพิ่ม Source ใหม่แล้ว', { description: formData.name })
    }
    setDialogOpen(false)
  }

  const handleToggleActive = (sourceId: number) => {
    // TODO: PATCH active status
    setSources((prev) =>
      prev.map((s) =>
        s.id === sourceId ? { ...s, active: !s.active } : s
      )
    )
    const source = sources.find((s) => s.id === sourceId)
    const nowActive = !source?.active
    toast.success(nowActive ? 'เปิด Source แล้ว' : 'ปิด Source แล้ว', { description: source?.name })
  }

  const handleDelete = () => {
    // TODO: DELETE source
    if (sourceToDelete) {
      setSources((prev) => prev.filter((s) => s.id !== sourceToDelete.id))
      toast.success('ลบ Source แล้ว', { description: sourceToDelete.name })
    }
    setDeleteDialogOpen(false)
    setSourceToDelete(null)
  }

  const handleOpenDelete = (source: NewsSource) => {
    setSourceToDelete(source)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Source Management</h1>
          <p className="text-sm text-muted-foreground">
            จัดการแหล่งข่าวสำหรับ Scraping
          </p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 size-4" />
          Add Source
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="w-24 text-center">Active</TableHead>
              <TableHead className="w-40">Scrape Format</TableHead>
              <TableHead className="w-32">Created</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Globe className="size-8 opacity-50" />
                    <p>ยังไม่มี Source</p>
                    <Button size="sm" onClick={handleOpenAdd}>
                      <Plus className="mr-2 size-4" />
                      Add First Source
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {source.url}
                    </a>
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={source.active}
                      onCheckedChange={() => handleToggleActive(source.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {source.scrape_format}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(source.created_at).toLocaleDateString('th-TH')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenEdit(source)}>
                          <Pencil className="mr-2 size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleOpenDelete(source)}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
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
        {sources.map((source) => (
          <div
            key={source.id}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{source.name}</p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {source.url}
                </a>
              </div>
              <Switch
                checked={source.active}
                onCheckedChange={() => handleToggleActive(source.id)}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">
                {source.scrape_format}
              </Badge>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(source)}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleOpenDelete(source)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSource ? 'Edit Source' : 'Add Source'}
            </DialogTitle>
            <DialogDescription>
              {editingSource
                ? 'แก้ไขข้อมูลแหล่งข่าว'
                : 'เพิ่มแหล่งข่าวใหม่สำหรับ Scraping'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Headlightmag"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder="https://www.headlightmag.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scrape_format">Scrape Format</Label>
              <Input
                id="scrape_format"
                value={formData.scrape_format}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, scrape_format: e.target.value }))
                }
                placeholder="headlightmag_v2"
              />
              <p className="text-xs text-muted-foreground">
                Format ID สำหรับ n8n workflow
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <Label htmlFor="active">Active</Label>
                <p className="text-xs text-muted-foreground">
                  เปิด/ปิดการ Scrape จาก Source นี้
                </p>
              </div>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, active: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name || !formData.url || !formData.scrape_format}
            >
              {editingSource ? 'Save Changes' : 'Add Source'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ Source</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบ &quot;{sourceToDelete?.name}&quot; หรือไม่?
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              ลบ Source
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
