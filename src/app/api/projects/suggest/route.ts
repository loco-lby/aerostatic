import { NextRequest, NextResponse } from 'next/server'
import { suggestProjectFromScript } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { script } = await request.json()

    if (!script || script.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a more detailed script or description' },
        { status: 400 }
      )
    }

    const suggestion = await suggestProjectFromScript(script)

    return NextResponse.json(suggestion)
  } catch (error) {
    console.error('Error in suggest API:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions. Please try again.' },
      { status: 500 }
    )
  }
}