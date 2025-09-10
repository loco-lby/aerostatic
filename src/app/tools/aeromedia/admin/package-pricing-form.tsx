'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { DollarSign, Tag, Gift } from 'lucide-react'

interface PackagePricingFormProps {
  packageId: string
  currentPrice?: number | null
  requiresPurchase?: boolean
  isComp?: boolean
  onUpdate?: () => void
}

export function PackagePricingForm({
  packageId,
  currentPrice,
  requiresPurchase = false,
  isComp = false,
  onUpdate
}: PackagePricingFormProps) {
  const [price, setPrice] = useState(currentPrice ? (currentPrice / 100).toFixed(2) : '')
  const [requirePayment, setRequirePayment] = useState(requiresPurchase)
  const [isComplimentary, setIsComplimentary] = useState(isComp)
  const [isUpdating, setIsUpdating] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const priceCents = requirePayment && !isComplimentary 
        ? Math.round(parseFloat(price) * 100) 
        : null

      const { error } = await supabase
        .from('media_packages')
        .update({
          price_cents: priceCents,
          requires_purchase: requirePayment && !isComplimentary,
          is_comp: isComplimentary
        })
        .eq('id', packageId)

      if (error) throw error

      toast.success('Pricing updated successfully')
      onUpdate?.()
    } catch (error) {
      console.error('Error updating pricing:', error)
      toast.error('Failed to update pricing')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="require-payment"
            checked={requirePayment}
            onCheckedChange={(checked) => {
              setRequirePayment(checked as boolean)
              if (!checked) setIsComplimentary(false)
            }}
          />
          <Label htmlFor="require-payment" className="cursor-pointer">
            Require payment to download
          </Label>
        </div>

        {requirePayment && (
          <>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is-comp"
                checked={isComplimentary}
                onCheckedChange={(checked) => setIsComplimentary(checked as boolean)}
              />
              <Label htmlFor="is-comp" className="cursor-pointer">
                Complimentary (free) access
              </Label>
            </div>

            {!isComplimentary && (
              <div className="space-y-2">
                <Label htmlFor="price">Package Price (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="29.99"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Pricing'}
        </Button>
      </div>

      {/* Pricing Summary */}
      <div className="bg-slate-800/50 rounded-lg p-4 mt-4">
        <h4 className="font-medium text-white mb-2">Current Settings:</h4>
        <div className="space-y-1 text-sm text-white/70">
          {isComplimentary ? (
            <p className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-500" />
              Complimentary package (free access)
            </p>
          ) : requirePayment ? (
            <p className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-orange-500" />
              Price: ${price || '0.00'} USD
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-blue-500" />
              Free access (no payment required)
            </p>
          )}
        </div>
      </div>
    </form>
  )
}