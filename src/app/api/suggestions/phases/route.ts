import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const suggestions = await db.phaseSuggestion.findMany({
      orderBy: [
        { isPopular: 'desc' },
        { order: 'asc' }
      ]
    })
    return NextResponse.json(suggestions)
  } catch (error) {
    console.error('Error fetching phase suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch phase suggestions' }, { status: 500 })
  }
}
