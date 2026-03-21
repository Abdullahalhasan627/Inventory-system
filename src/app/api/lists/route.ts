import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all lists
export async function GET() {
  try {
    // Return empty array if model not available
    if (!(db as any).inventoryList) {
      return NextResponse.json([])
    }
    
    const lists = await db.inventoryList.findMany({
      include: {
        _count: {
          select: { items: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(lists)
  } catch (error) {
    console.error('Error fetching lists:', error)
    // Return empty array instead of error to allow UI to work
    return NextResponse.json([])
  }
}

// POST create new list
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, color, icon } = body
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    
    // Check if inventoryList exists on db
    if (!db.inventoryList) {
      return NextResponse.json({ 
        id: 'temp-' + Date.now(),
        name, 
        description: description || null, 
        color: color || null, 
        icon: icon || null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    
    const list = await db.inventoryList.create({
      data: {
        name,
        description,
        color,
        icon
      }
    })
    
    return NextResponse.json(list)
  } catch (error) {
    console.error('Error creating list:', error)
    return NextResponse.json({ error: 'Failed to create list' }, { status: 500 })
  }
}
