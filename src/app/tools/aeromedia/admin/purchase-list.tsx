'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw,
  DollarSign,
  Mail,
  Calendar
} from 'lucide-react'

interface Purchase {
  id: string
  package_id: string
  email: string
  amount_cents: number
  currency: string
  status: 'pending' | 'succeeded' | 'refunded' | 'failed' | 'canceled'
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  created_at: string
  updated_at: string
  metadata: any
}

interface PurchaseListProps {
  packageId: string
}

export function PurchaseList({ packageId }: PurchaseListProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalRevenue, setTotalRevenue] = useState(0)
  
  const supabase = createClient()

  useEffect(() => {
    loadPurchases()
  }, [packageId])

  const loadPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('package_id', packageId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setPurchases(data || [])
      
      // Calculate total revenue
      const revenue = (data || [])
        .filter(p => p.status === 'succeeded')
        .reduce((sum, p) => sum + p.amount_cents, 0)
      setTotalRevenue(revenue)
    } catch (error) {
      console.error('Error loading purchases:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: Purchase['status']) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        )
      case 'refunded':
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/30">
            <RefreshCw className="w-3 h-3 mr-1" />
            Refunded
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case 'canceled':
        return (
          <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Canceled
          </Badge>
        )
      default:
        return null
    }
  }

  const formatCurrency = (cents: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(cents / 100)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Revenue Summary */}
      <div className="bg-slate-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Total Revenue</p>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(totalRevenue, 'usd')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">Total Orders</p>
            <p className="text-2xl font-bold text-white">
              {purchases.filter(p => p.status === 'succeeded').length}
            </p>
          </div>
        </div>
      </div>

      {/* Purchase List */}
      <div className="space-y-2">
        {purchases.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            No purchases yet
          </div>
        ) : (
          purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-slate-900/50 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-white/60" />
                    <span className="text-white font-medium">
                      {purchase.email}
                    </span>
                    {getStatusBadge(purchase.status)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {formatCurrency(purchase.amount_cents, purchase.currency)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(purchase.created_at)}
                    </span>
                  </div>
                  
                  {purchase.stripe_session_id && (
                    <div className="text-xs text-white/40">
                      Session: {purchase.stripe_session_id.slice(0, 20)}...
                    </div>
                  )}
                </div>

                {purchase.status === 'succeeded' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white"
                    onClick={() => {
                      // Open Stripe dashboard to this payment
                      window.open(
                        `https://dashboard.stripe.com/payments/${purchase.stripe_payment_intent}`,
                        '_blank'
                      )
                    }}
                  >
                    View in Stripe
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={loadPurchases}
        className="border-white/20 text-white hover:bg-white/10"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
    </div>
  )
}