'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'

const formSchema = z.object({
  flight_date: z.string().min(1, 'Flight date is required'),
  passenger_names: z.string().min(1, 'Passenger names are required'),
  requires_purchase: z.boolean().default(true),
  price: z.string().optional(),
  is_comp: z.boolean().default(false),
})

type FormData = z.infer<typeof formSchema>

interface NewPackageFormProps {
  onSuccess: (packageData: any) => void
}

export function NewPackageForm({ onSuccess }: NewPackageFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [defaultDate, setDefaultDate] = useState('')
  const supabase = createClient()
  
  // Set default date on client side only to avoid hydration mismatch
  useEffect(() => {
    setDefaultDate(format(new Date(), 'yyyy-MM-dd'))
  }, [])
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flight_date: '',
      passenger_names: '',
      requires_purchase: true,
      price: '29.99',
      is_comp: false,
    }
  })
  
  const requiresPurchase = watch('requires_purchase')
  const isComp = watch('is_comp')
  
  // Set the form value when defaultDate is ready
  useEffect(() => {
    if (defaultDate) {
      setValue('flight_date', defaultDate)
    }
  }, [defaultDate, setValue])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    try {
      // Generate access code
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_access_code')

      if (codeError) throw codeError
      
      const accessCode = codeData

      // Create package
      const passengerNamesArray = data.passenger_names
        .split(',')
        .map(name => name.trim())
        .filter(name => name.length > 0)

      // Calculate price in cents
      const priceCents = data.requires_purchase && !data.is_comp && data.price
        ? Math.round(parseFloat(data.price) * 100)
        : null

      const { data: packageData, error: packageError } = await supabase
        .from('media_packages')
        .insert({
          access_code: accessCode,
          flight_date: data.flight_date,
          passenger_names: passengerNamesArray,
          requires_purchase: data.requires_purchase && !data.is_comp,
          price_cents: priceCents,
          is_comp: data.is_comp,
        })
        .select()
        .single()

      if (packageError) throw packageError

      onSuccess(packageData)
    } catch (error) {
      console.error('Error creating package:', error)
      toast.error('Failed to create package')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="flight_date">Flight Date</Label>
        <div className="relative">
          <Input
            id="flight_date"
            type="date"
            {...register('flight_date')}
            className="bg-white/5 border-white/10 pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        {errors.flight_date && (
          <p className="text-sm text-red-500">{errors.flight_date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passenger_names">Passenger Names</Label>
        <Input
          id="passenger_names"
          placeholder="John Doe, Jane Smith"
          {...register('passenger_names')}
          className="bg-white/5 border-white/10"
        />
        <p className="text-sm text-gray-400">Separate multiple names with commas</p>
        {errors.passenger_names && (
          <p className="text-sm text-red-500">{errors.passenger_names.message}</p>
        )}
      </div>

      {/* Pricing Settings */}
      <div className="space-y-4 border-t border-white/10 pt-4">
        <h3 className="text-sm font-medium text-white">Pricing Settings</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="requires_purchase"
            {...register('requires_purchase')}
            defaultChecked={true}
          />
          <Label htmlFor="requires_purchase" className="cursor-pointer">
            Require payment to download
          </Label>
        </div>

        {requiresPurchase && (
          <>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_comp"
                {...register('is_comp')}
              />
              <Label htmlFor="is_comp" className="cursor-pointer">
                Complimentary (free) access
              </Label>
            </div>

            {!isComp && (
              <div className="space-y-2">
                <Label htmlFor="price">Package Price (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('price')}
                    placeholder="29.99"
                    className="bg-white/5 border-white/10 pl-10"
                  />
                </div>
                <p className="text-sm text-gray-400">Passengers will need to pay this amount to download</p>
              </div>
            )}
          </>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600"
      >
        {isLoading ? 'Creating...' : 'Create Package'}
      </Button>
    </form>
  )
}