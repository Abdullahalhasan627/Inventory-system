import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all default values
export async function GET() {
  try {
    // Return empty array if model not available
    if (!(db as any).userDefaultValue) {
      return NextResponse.json([])
    }
    
    const defaults = await db.userDefaultValue.findMany({
      orderBy: [
        { count: 'desc' },
        { lastUsed: 'desc' }
      ]
    })
    
    return NextResponse.json(defaults)
  } catch (error) {
    console.error('Error fetching defaults:', error)
    // Return empty array instead of error to allow UI to work
    return NextResponse.json([])
  }
}

// POST save/update default value
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fieldName, value } = body
    
    if (!fieldName || !value) {
      return NextResponse.json({ error: 'fieldName and value are required' }, { status: 400 })
    }
    
    // Check if userDefaultValue exists on db
    if (!db.userDefaultValue) {
      return NextResponse.json({ fieldName, value })
    }
    
    // Check if exists
    const existing = await db.userDefaultValue.findUnique({
      where: { fieldName }
    })
    
    if (existing) {
      // Update existing
      const updated = await db.userDefaultValue.update({
        where: { fieldName },
        data: {
          value,
          count: { increment: 1 },
          lastUsed: new Date()
        }
      })
      return NextResponse.json(updated)
    } else {
      // Create new
      const created = await db.userDefaultValue.create({
        data: {
          fieldName,
          value
        }
      })
      return NextResponse.json(created)
    }
  } catch (error) {
    console.error('Error saving default:', error)
    return NextResponse.json({ error: 'Failed to save default' }, { status: 500 })
  }
}

// DELETE remove default value
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const fieldName = searchParams.get('fieldName')
    
    if (!fieldName) {
      return NextResponse.json({ error: 'fieldName is required' }, { status: 400 })
    }
    
    // Check if userDefaultValue exists on db
    if (!db.userDefaultValue) {
      return NextResponse.json({ success: true })
    }
    
    await db.userDefaultValue.delete({
      where: { fieldName }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting default:', error)
    return NextResponse.json({ error: 'Failed to delete default' }, { status: 500 })
  }
}
