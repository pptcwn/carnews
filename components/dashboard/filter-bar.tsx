'use client'

import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface FilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  brandValue: string
  onBrandChange: (value: string) => void
  categoryValue: string
  onCategoryChange: (value: string) => void
  statusValue: string
  onStatusChange: (value: string) => void
  sourceValue: string
  onSourceChange: (value: string) => void
  onClearFilters: () => void
}

const brands = ['all', 'Toyota', 'Honda', 'BYD', 'BMW', 'Mercedes-Benz', 'Mazda', 'Mitsubishi', 'Porsche']
const categories = ['all', 'EV', 'SUV', 'Sedan', 'Pickup', 'Hypercar', 'Coupe']
const statuses = ['all', 'raw', 'rewritten', 'review', 'published']
const sources = ['all', 'Headlightmag']

export function FilterBar({
  searchValue,
  onSearchChange,
  brandValue,
  onBrandChange,
  categoryValue,
  onCategoryChange,
  statusValue,
  onStatusChange,
  sourceValue,
  onSourceChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = 
    brandValue !== 'all' || 
    categoryValue !== 'all' || 
    statusValue !== 'all' || 
    sourceValue !== 'all' ||
    searchValue !== ''

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ค้นหาข่าว..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={brandValue} onValueChange={onBrandChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand === 'all' ? 'ทุก Brand' : brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryValue} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'ทุก Category' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusValue} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'ทุก Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sourceValue} onValueChange={onSourceChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source === 'all' ? 'ทุก Source' : source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Filter className="size-3" />
            Filters:
          </span>
          
          {searchValue && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchValue}
              <X 
                className="size-3 cursor-pointer" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          
          {brandValue !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Brand: {brandValue}
              <X 
                className="size-3 cursor-pointer" 
                onClick={() => onBrandChange('all')}
              />
            </Badge>
          )}
          
          {categoryValue !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Category: {categoryValue}
              <X 
                className="size-3 cursor-pointer" 
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          
          {statusValue !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {statusValue}
              <X 
                className="size-3 cursor-pointer" 
                onClick={() => onStatusChange('all')}
              />
            </Badge>
          )}
          
          {sourceValue !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Source: {sourceValue}
              <X 
                className="size-3 cursor-pointer" 
                onClick={() => onSourceChange('all')}
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-6 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
