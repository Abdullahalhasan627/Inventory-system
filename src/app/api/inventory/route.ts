import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Force recompile - version 2
// GET - Fetch all inventory items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const listId = searchParams.get('listId')
    
    const whereClause = listId ? { listId } : {}
    
    const items = await db.inventoryItem.findMany({
      where: whereClause,
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
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 })
  }
}

// POST - Create new inventory item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Creating inventory item:', body)
    
    // Convert phases to integer if provided
    const phasesValue = body.phases ? parseInt(body.phases) : null
    
    const item = await db.inventoryItem.create({
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

    // Save default values for fields that have values
    if (body.location) {
      await saveDefaultValue('location', body.location)
    }
    if (body.companyId) {
      const company = await db.company.findUnique({ where: { id: body.companyId } })
      if (company) await saveDefaultValue('company', company.name)
    }
    if (body.categoryId) {
      const category = await db.productCategory.findUnique({ where: { id: body.categoryId } })
      if (category) await saveDefaultValue('category', category.name)
    }

    console.log('Created item:', item)
    return NextResponse.json(item)
  } catch (error) {
    console.error('Error creating inventory item:', error)
    return NextResponse.json({ error: 'Failed to create inventory item', details: String(error) }, { status: 500 })
  }
}

// Helper function to save default value
async function saveDefaultValue(fieldName: string, value: string) {
  try {
    const existing = await db.userDefaultValue.findUnique({
      where: { fieldName }
    })
    
    if (existing) {
      await db.userDefaultValue.update({
        where: { fieldName },
        data: {
          value,
          count: { increment: 1 },
          lastUsed: new Date()
        }
      })
    } else {
      await db.userDefaultValue.create({
        data: { fieldName, value }
      })
    }
  } catch (error) {
    console.error('Error saving default value:', error)
  }
}
