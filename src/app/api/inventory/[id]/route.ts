import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch single inventory item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await db.inventoryItem.findUnique({
      where: { id },
      include: {
        company: true,
        category: true,
        product: {
          include: {
            company: true,
            category: true
          }
        }
      }
    })

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error fetching inventory item:', error)
    return NextResponse.json({ error: 'Failed to fetch inventory item' }, { status: 500 })
  }
}

// PUT - Update inventory item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Convert phases to integer if provided
    const phasesValue = body.phases ? parseInt(body.phases) : null

    const item = await db.inventoryItem.update({
      where: { id },
      data: {
        name: body.name,
        quantity: body.quantity || 1,
        incomingQty: body.incomingQty || 0,
        outgoingQty: body.outgoingQty || 0,
        amperage: body.amperage || null,
        voltage: body.voltage || null,
        phases: phasesValue,
        powerKw: body.powerKw ? parseFloat(body.powerKw) : null,
        customPowerKw: body.customPowerKw || false,
        condition: body.condition || 'new',
        location: body.location || null,
        notes: body.notes || null,
        listId: body.listId || null,
        productId: body.productId || null,
        companyId: body.companyId || null,
        categoryId: body.categoryId || null
      },
      include: {
        company: true,
        category: true,
        product: {
          include: {
            company: true,
            category: true
          }
        },
        list: true
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Error updating inventory item:', error)
    return NextResponse.json({ error: 'Failed to update inventory item' }, { status: 500 })
  }
}

// DELETE - Delete inventory item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.inventoryItem.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    return NextResponse.json({ error: 'Failed to delete inventory item' }, { status: 500 })
  }
}
