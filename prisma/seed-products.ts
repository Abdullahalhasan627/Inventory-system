import { PrismaClient } from '@prisma/client'
import { siemensProducts, abbProducts, schneiderProducts } from './products-data'
import { mitsubishiProducts, deltaProducts } from './products-data-2'
import { lsElectricProducts, yaskawaProducts } from './products-data-3'
import { omronProducts, danfossProducts, fujiProducts } from './products-data-4'
import { allenBradleyProducts, eatonProducts } from './products-data-5'
import { allNewProducts } from './products-data-6'

const prisma = new PrismaClient()

interface ProductInput {
  model: string
  name: string
  amperage?: number | null
  voltage?: number | null
  phases?: number | null
  powerKw?: number | null
  company: string
  category: string
}

async function main() {
  console.log('🌱 بدء تحميل البيانات الضخمة للموديلات...')
  console.log('📦 جاري تحميل منتجات من جميع الشركات المصنعة...\n')

  // حذف المنتجات القديمة
  console.log('🗑️ حذف المنتجات القديمة...')
  await prisma.product.deleteMany({})
  
  // جمع كل المنتجات
  const allProducts: ProductInput[] = [
    ...siemensProducts,
    ...abbProducts,
    ...schneiderProducts,
    ...mitsubishiProducts,
    ...deltaProducts,
    ...lsElectricProducts,
    ...yaskawaProducts,
    ...omronProducts,
    ...danfossProducts,
    ...fujiProducts,
    ...allenBradleyProducts,
    ...eatonProducts,
    ...allNewProducts,
  ]

  console.log(`\n📊 إحصائيات المنتجات:`)
  console.log(`   - Siemens: ${siemensProducts.length} منتج`)
  console.log(`   - ABB: ${abbProducts.length} منتج`)
  console.log(`   - Schneider Electric: ${schneiderProducts.length} منتج`)
  console.log(`   - Mitsubishi Electric: ${mitsubishiProducts.length} منتج`)
  console.log(`   - Delta Electronics: ${deltaProducts.length} منتج`)
  console.log(`   - LS Electric: ${lsElectricProducts.length} منتج`)
  console.log(`   - Yaskawa: ${yaskawaProducts.length} منتج`)
  console.log(`   - Omron: ${omronProducts.length} منتج`)
  console.log(`   - Danfoss: ${danfossProducts.length} منتج`)
  console.log(`   - Fuji Electric: ${fujiProducts.length} منتج`)
  console.log(`   - Allen-Bradley (Rockwell): ${allenBradleyProducts.length} منتج`)
  console.log(`   - Eaton: ${eatonProducts.length} منتج`)
  console.log(`   - New Products (WEG, etc.): ${allNewProducts.length} منتج`)
  console.log(`\n📦 إجمالي المنتجات للتحميل: ${allProducts.length}`)

  // إنشاء خريطة للشركات والفئات
  const companyMap = new Map<string, string>()
  const categoryMap = new Map<string, string>()

  // تحميل الشركات
  console.log('\n🏭 تحميل الشركات...')
  const companiesData = new Set(allProducts.map(p => p.company))
  
  for (const companyName of companiesData) {
    const existing = await prisma.company.findFirst({ where: { name: companyName } })
    if (!existing) {
      const company = await prisma.company.create({
        data: {
          name: companyName,
          nameAr: getArabicName(companyName),
          isPopular: isPopularCompany(companyName),
          categories: [...new Set(allProducts.filter(p => p.company === companyName).map(p => p.category))].join(','),
        }
      })
      companyMap.set(companyName, company.id)
    } else {
      companyMap.set(companyName, existing.id)
    }
  }

  // تحميل الفئات
  console.log('📁 تحميل الفئات...')
  const categoriesData = new Set(allProducts.map(p => p.category))
  
  for (const categoryName of categoriesData) {
    const existing = await prisma.productCategory.findFirst({ where: { name: categoryName } })
    if (!existing) {
      const category = await prisma.productCategory.create({
        data: {
          name: categoryName,
          nameAr: getCategoryArabicName(categoryName),
        }
      })
      categoryMap.set(categoryName, category.id)
    } else {
      categoryMap.set(categoryName, existing.id)
    }
  }

  // تحميل المنتجات
  console.log('\n⚡ تحميل المنتجات...')
  let loaded = 0

  for (const product of allProducts) {
    const companyId = companyMap.get(product.company)
    const categoryId = categoryMap.get(product.category)

    if (!companyId || !categoryId) {
      console.log(`⚠️ تخطي المنتج ${product.model} - شركة أو فئة غير موجودة`)
      continue
    }

    try {
      await prisma.product.create({
        data: {
          model: product.model,
          name: product.name,
          amperage: product.amperage ?? null,
          voltage: product.voltage ?? null,
          phases: product.phases ?? null,
          powerKw: product.powerKw ?? null,
          companyId,
          categoryId,
        }
      })
      loaded++
      
      if (loaded % 200 === 0) {
        console.log(`  ✅ تم تحميل ${loaded} منتج...`)
      }
    } catch (e) {
      // تجاهل الأخطاء (مثل التكرار)
    }
  }

  console.log(`\n✅ تم تحميل ${loaded} منتج بنجاح!`)
  
  // عرض الإحصائيات
  const totalCompanies = await prisma.company.count()
  const totalCategories = await prisma.productCategory.count()
  const totalProducts = await prisma.product.count()
  
  console.log('\n📊 إحصائيات قاعدة البيانات النهائية:')
  console.log(`   - الشركات: ${totalCompanies}`)
  console.log(`   - الفئات: ${totalCategories}`)
  console.log(`   - المنتجات: ${totalProducts}`)
  console.log('\n🎉 تم تحميل قاعدة البيانات الشاملة بنجاح!')
}

function getArabicName(name: string): string | null {
  const names: Record<string, string> = {
    'Siemens': 'سيمنز',
    'ABB': 'إيه بي بي',
    'Schneider Electric': 'شنايدر',
    'Mitsubishi Electric': 'ميتسوبيشي',
    'Delta Electronics': 'دلتا',
    'LS Electric': 'إل إس',
    'Yaskawa': 'ياسكاوا',
    'Omron': 'أومرون',
    'Danfoss': 'دانفوس',
    'Fuji Electric': 'فوجي',
    'Allen-Bradley (Rockwell)': 'ألن برادلي',
    'Eaton': 'إيتون',
  }
  return names[name] || null
}

function isPopularCompany(name: string): boolean {
  const popular = ['Siemens', 'ABB', 'Schneider Electric', 'Mitsubishi Electric', 
                  'Delta Electronics', 'LS Electric', 'Yaskawa', 'Omron', 'Danfoss',
                  'Fuji Electric', 'Allen-Bradley (Rockwell)', 'Eaton']
  return popular.includes(name)
}

function getCategoryArabicName(name: string): string | null {
  const names: Record<string, string> = {
    'VFD': 'إنفرتر / محول تردد',
    'PLC': 'التحكم المنطقي المبرمج',
    'Motor': 'محرك كهربائي',
    'Servo': 'سيرفو موتور',
    'Relay': 'مرحل / ريليه',
    'Contactor': 'كونتاكتور',
    'Breaker': 'قاطع كهربائي',
    'Power Supply': 'مزود طاقة',
    'HMI': 'شاشة لمس / واجهة إنسان آلة',
    'Sensor': 'حساس / مستشعر',
  }
  return names[name] || null
}

main()
  .catch((e) => {
    console.error('❌ خطأ:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
