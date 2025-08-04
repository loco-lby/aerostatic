'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'

const formSchema = z.object({
  flight_date: z.string().min(1, 'Flight date is required'),
  passenger_names: z.string().min(1, 'Passenger names are required'),
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
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flight_date: '',
      passenger_names: '',
    }
  })
  
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

      const { data: packageData, error: packageError } = await supabase
        .from('media_packages')
        .insert({
          access_code: accessCode,
          flight_date: data.flight_date,
          passenger_names: passengerNamesArray,
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