import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const categoryId = searchParams.get('categoryId')

    const where: any = {}
    if (companyId) where.companyId = companyId
    if (categoryId) where.categoryId = categoryId

    const products = await db.product.findMany({
      where,
      include: {
        company: true,
        category: true
      },
      orderBy: { model: 'asc' }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
