'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Video, Target, TrendingUp, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Brand {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
  _count?: {
    videos: number
    audience_segments: number
  }
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    setLoading(true)
    const { data: brandsData } = await supabase
      .from('brands')
      .select(`
        *,
        videos(count),
        audience_segments(count)
      `)
      .order('created_at', { ascending: false })

    if (brandsData) {
      setBrands(brandsData)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading brands...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brands</h1>
          <p className="text-muted-foreground mt-1">
            Manage your content brands and their strategies
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/brands/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Brand
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Card key={brand.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: brand.color }}
                  />
                  <CardTitle>{brand.name}</CardTitle>
                </div>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>@{brand.slug}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">0 videos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">0 segments</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/brands/${brand.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {brands.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No brands yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first brand to start managing content
            </p>
            <Button asChild>
              <Link href="/dashboard/brands/new">
                <Plus className="mr-2 h-4 w-4" />
                Create First Brand
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}