'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MediaManager } from './media-manager'
import { PackagePricingForm } from './package-pricing-form'
import { PurchaseList } from './purchase-list'
import { 
  Calendar, 
  Users, 
  Copy, 
  Package, 
  DollarSign,
  Receipt,
  Image as ImageIcon
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface MediaPackage {
  id: string
  access_code: string
  flight_date: string
  passenger_names: string[]
  created_at: string
  expires_at: string
  is_active: boolean
  access_count: number
  price_cents?: number | null
  requires_purchase?: boolean
  is_comp?: boolean
  media_items?: { count: number }[]
}

interface PackageDetailDialogProps {
  pkg: MediaPackage | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: () => void
}

export function PackageDetailDialog({ 
  pkg, 
  isOpen, 
  onClose,
  onUpdate 
}: PackageDetailDialogProps) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!pkg) return null

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pkg.access_code)
    toast.success('Access code copied!')
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM d, yyyy')
  }

  const getDaysRemaining = () => {
    const expiry = new Date(pkg.expires_at)
    const now = new Date()
    const days = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">Package Details</span>
            <div className="flex items-center gap-2">
              <Badge 
                className="bg-orange-500/10 text-orange-500 border-orange-500/30 cursor-pointer"
                onClick={handleCopyCode}
              >
                <Copy className="w-3 h-3 mr-1" />
                {pkg.access_code}
              </Badge>
              {pkg.requires_purchase && !pkg.is_comp && (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                  ${((pkg.price_cents || 0) / 100).toFixed(2)}
                </Badge>
              )}
              {pkg.is_comp && (
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                  COMP
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Package Info */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/60">
              <Calendar className="w-4 h-4" />
              <span>Flight: {formatDate(pkg.flight_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Users className="w-4 h-4" />
              <span>{pkg.passenger_names.length} passengers</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Package className="w-4 h-4" />
              <span>{getDaysRemaining()} days remaining</span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-black border border-white/10 p-1 gap-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 bg-black hover:bg-white/5 hover:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="media"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 bg-black hover:bg-white/5 hover:text-white"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Media
              </TabsTrigger>
              <TabsTrigger 
                value="pricing"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 bg-black hover:bg-white/5 hover:text-white"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Pricing
              </TabsTrigger>
              <TabsTrigger 
                value="purchases"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400 bg-black hover:bg-white/5 hover:text-white"
              >
                <Receipt className="w-4 h-4 mr-2" />
                Purchases
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-white">Package Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Access Code:</span>
                    <span className="text-white font-mono">{pkg.access_code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Flight Date:</span>
                    <span className="text-white">{formatDate(pkg.flight_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Created:</span>
                    <span className="text-white">{formatDate(pkg.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Expires:</span>
                    <span className="text-white">{formatDate(pkg.expires_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Access Count:</span>
                    <span className="text-white">{pkg.access_count}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Passengers</h3>
                <div className="flex flex-wrap gap-2">
                  {pkg.passenger_names.map((name, idx) => (
                    <Badge key={idx} variant="outline" className="border-white/20">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="font-medium text-white mb-2">Share Link</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/tools/aeromedia/${pkg.access_code}`}
                    className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white/80"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/tools/aeromedia/${pkg.access_code}`)
                      toast.success('Link copied!')
                    }}
                    className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media">
              <MediaManager packageId={pkg.id} packageCode={pkg.access_code} />
            </TabsContent>

            <TabsContent value="pricing">
              <PackagePricingForm
                packageId={pkg.id}
                currentPrice={pkg.price_cents}
                requiresPurchase={pkg.requires_purchase}
                isComp={pkg.is_comp}
                onUpdate={onUpdate}
              />
            </TabsContent>

            <TabsContent value="purchases">
              <PurchaseList packageId={pkg.id} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}