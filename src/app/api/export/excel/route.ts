import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import * as XLSX from 'xlsx'

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
        },
        list: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get list name if filtering by list
    let listName = 'inventory'
    if (listId) {
      const list = await db.inventoryList.findUnique({ where: { id: listId } })
      if (list) listName = list.name.replace(/\s+/g, '_')
    }

    // Transform data for Excel
    const data = items.map((item, index) => ({
      '#': index + 1,
      'Name': item.name,
      'Condition': item.condition === 'new' ? 'New' : 'Used',
      'Company': item.company?.name || item.product?.company?.name || '-',
      'Type': item.category?.name || item.product?.category?.name || '-',
      'Model': item.product?.model || '-',
      'Amperage (A)': item.amperage || '-',
      'Voltage (V)': item.voltage || '-',
      'Phases': item.phases ? `${item.phases}φ` : '-',
      'Power (kW)': item.powerKw || '-',
      'Quantity': item.quantity,
      'Incoming': item.incomingQty,
      'Outgoing': item.outgoingQty,
      'Location': item.location || '-',
      'Notes': item.notes || '-',
      'Date': item.createdAt.toLocaleDateString('en-US')
    }))

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)

    // Set column widths
    ws['!cols'] = [
      { wch: 5 },   // #
      { wch: 25 },  // Name
      { wch: 10 },  // Condition
      { wch: 20 },  // Company
      { wch: 20 },  // Type
      { wch: 20 },  // Model
      { wch: 12 },  // Amperage
      { wch: 12 },  // Voltage
      { wch: 10 },  // Phases
      { wch: 12 },  // Power
      { wch: 10 },  // Quantity
      { wch: 10 },  // Incoming
      { wch: 10 },  // Outgoing
      { wch: 15 },  // Location
      { wch: 30 },  // Notes
      { wch: 15 },  // Date
    ]

    XLSX.utils.book_append_sheet(wb, ws, 'Inventory')

    // Generate buffer
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${listName}_${new Date().toISOString().split('T')[0]}.xlsx`
      }
    })
  } catch (error) {
    console.error('Error exporting to Excel:', error)
    return NextResponse.json({ error: 'Failed to export to Excel' }, { status: 500 })
  }
}
