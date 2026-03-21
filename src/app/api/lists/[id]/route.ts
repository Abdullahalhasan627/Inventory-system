import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET single list with items
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if inventoryList exists on db
    if (!db.inventoryList) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 })
    }
    
    const list = await db.inventoryList.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            company: true,
            category: true,
            product: {
              include: {
                company: true,
                category: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { items: true }
        }
      }
    })
    
    if (!list) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 })
    }
    
    return NextResponse.json(list)
  } catch (error) {
    console.error('Error fetching list:', error)
    return NextResponse.json({ error: 'Failed to fetch list' }, { status: 500 })
  }
}

// PUT update list
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, color, icon, isActive } = body
    
    // Check if inventoryList exists on db
    if (!db.inventoryList) {
      return NextResponse.json({ 
        id, 
        name: name || 'List',
        description: description || null,
        color: color || null,
        icon: icon || null,
        isActive: isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    
    const list = await db.inventoryList.update({
      where: { id },
      data: {
        name,
        description,
        color,
        icon,
        isActive
      }
    })
    
    return NextResponse.json(list)
  } catch (error) {
    console.error('Error updating list:', error)
    return NextResponse.json({ error: 'Failed to update list' }, { status: 500 })
  }
}

// DELETE list and its items
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if inventoryList exists on db
    if (!db.inventoryList) {
      return NextResponse.json({ success: true })
    }
    
    // First delete all items in the list
    await db.inventoryItem.deleteMany({
      where: { listId: id }
    })
    
    // Then delete the list
    await db.inventoryList.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting list:', error)
    return NextResponse.json({ error: 'Failed to delete list' }, { status: 500 })
  }
}
