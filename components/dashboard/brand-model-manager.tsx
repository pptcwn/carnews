'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Car,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CategoryBadge } from '@/components/dashboard/category-badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import type { Brand, CarModel, Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BrandModelManagerProps {
  brands: Brand[]
  models: CarModel[]
}

const categories: Category[] = ['EV', 'SUV', 'Sedan', 'Pickup', 'Hypercar', 'Coupe']

export function BrandModelManager({ brands: initialBrands, models: initialModels }: BrandModelManagerProps) {
  const [brands, setBrands] = useState(initialBrands)
  const [models, setModels] = useState(initialModels)
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(brands[0]?.id || null)
  const [brandSearch, setBrandSearch] = useState('')
  const [modelSearch, setModelSearch] = useState('')

  const [brandDialogOpen, setBrandDialogOpen] = useState(false)
  const [modelDialogOpen, setModelDialogOpen] = useState(false)
  const [newBrandName, setNewBrandName] = useState('')
  const [newBrandNameTh, setNewBrandNameTh] = useState('')
  const [newModelName, setNewModelName] = useState('')
  const [newModelCategory, setNewModelCategory] = useState<Category>('Sedan')

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
    (brand.name_th && brand.name_th.includes(brandSearch))
  )

  const selectedBrand = brands.find((b) => b.id === selectedBrandId)
  const brandModels = models.filter((m) => m.brand_id === selectedBrandId)
  const filteredModels = brandModels.filter((model) =>
    model.name.toLowerCase().includes(modelSearch.toLowerCase())
  )

  const handleAddBrand = () => {
    // TODO: CRUD brands
    if (!newBrandName) return

    const newBrand: Brand = {
      id: Math.max(...brands.map((b) => b.id)) + 1,
      name: newBrandName,
      name_th: newBrandNameTh || undefined,
      news_count: 0,
      created_at: new Date().toISOString(),
    }
    setBrands((prev) => [...prev, newBrand])
    setNewBrandName('')
    setNewBrandNameTh('')
    setBrandDialogOpen(false)
    toast.success('เพิ่ม Brand แล้ว', { description: newBrandName })
  }

  const handleAddModel = () => {
    // TODO: CRUD models
    // TODO: call RPC upsert_brand_model from n8n only
    if (!newModelName || !selectedBrandId) return

    const newModel: CarModel = {
      id: Math.max(...models.map((m) => m.id)) + 1,
      brand_id: selectedBrandId,
      name: newModelName,
      category: newModelCategory,
      news_count: 0,
      created_at: new Date().toISOString(),
    }
    setModels((prev) => [...prev, newModel])
    const brandName = selectedBrand?.name ?? ''
    setNewModelName('')
    setNewModelCategory('Sedan')
    setModelDialogOpen(false)
    toast.success('เพิ่ม Model แล้ว', { description: `${brandName} · ${newModelName}` })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Brands & Models</h1>
        <p className="text-sm text-muted-foreground">
          จัดการแบรนด์และรุ่นรถยนต์
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Brand List - Left Panel */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Brands ({filteredBrands.length})</CardTitle>
            <Button size="sm" onClick={() => setBrandDialogOpen(true)}>
              <Plus className="mr-1 size-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาแบรนด์..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Brand List */}
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 pr-4">
                  {filteredBrands.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <Car className="size-8 opacity-50" />
                      <p className="mt-2 text-sm">ไม่พบแบรนด์</p>
                    </div>
                  ) : (
                    filteredBrands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => setSelectedBrandId(brand.id)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors',
                          selectedBrandId === brand.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        )}
                      >
                        <div>
                          <p className="font-medium">{brand.name}</p>
                          {brand.name_th && (
                            <p
                              className={cn(
                                'text-xs',
                                selectedBrandId === brand.id
                                  ? 'text-primary-foreground/80'
                                  : 'text-muted-foreground'
                              )}
                            >
                              {brand.name_th}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={selectedBrandId === brand.id ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {brand.news_count}
                          </Badge>
                          <ChevronRight
                            className={cn(
                              'size-4',
                              selectedBrandId === brand.id
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground'
                            )}
                          />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Model List - Right Panel */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">
                {selectedBrand ? `${selectedBrand.name} Models` : 'Models'}
              </CardTitle>
              {selectedBrand && (
                <p className="text-xs text-muted-foreground mt-1">
                  {brandModels.length} models
                </p>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => setModelDialogOpen(true)}
              disabled={!selectedBrandId}
            >
              <Plus className="mr-1 size-4" />
              Add Model
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ค้นหารุ่น..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="pl-9"
                  disabled={!selectedBrandId}
                />
              </div>

              {/* Model Grid */}
              <ScrollArea className="h-[400px]">
                {!selectedBrandId ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Car className="size-12 opacity-50" />
                    <p className="mt-2">เลือกแบรนด์เพื่อดูรุ่น</p>
                  </div>
                ) : filteredModels.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Car className="size-12 opacity-50" />
                    <p className="mt-2">ไม่พบรุ่นสำหรับแบรนด์นี้</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4"
                      onClick={() => setModelDialogOpen(true)}
                    >
                      <Plus className="mr-1 size-4" />
                      Add First Model
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-3 pr-4 sm:grid-cols-2">
                    {filteredModels.map((model) => (
                      <div
                        key={model.id}
                        className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                      >
                        <div>
                          <p className="font-medium">{model.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <CategoryBadge category={model.category} />
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {model.news_count} news
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Brand Dialog */}
      <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Brand</DialogTitle>
            <DialogDescription>เพิ่มแบรนด์รถยนต์ใหม่</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name (EN)</Label>
              <Input
                id="brand-name"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                placeholder="Toyota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-name-th">Brand Name (TH) - Optional</Label>
              <Input
                id="brand-name-th"
                value={newBrandNameTh}
                onChange={(e) => setNewBrandNameTh(e.target.value)}
                placeholder="โตโยต้า"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBrandDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBrand} disabled={!newBrandName}>
              Add Brand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Model Dialog */}
      <Dialog open={modelDialogOpen} onOpenChange={setModelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Model</DialogTitle>
            <DialogDescription>
              เพิ่มรุ่นใหม่สำหรับ {selectedBrand?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model-name">Model Name</Label>
              <Input
                id="model-name"
                value={newModelName}
                onChange={(e) => setNewModelName(e.target.value)}
                placeholder="Camry"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model-category">Category</Label>
              <Select
                value={newModelCategory}
                onValueChange={(v) => setNewModelCategory(v as Category)}
              >
                <SelectTrigger id="model-category">
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setModelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddModel} disabled={!newModelName}>
              Add Model
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
