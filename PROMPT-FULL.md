# Prompt كامل لمشروع إدارة المخزون الكهربائي

## 📋 وصف المشروع

تطبيق ويب متكامل لإدارة مخزون المعدات والمنتجات الكهربائية الصناعية. يتيح إضافة عناصر للمخزون من خلال نظام القوائم، مع اقتراحات ذكية للأمبير والجهد والفاز، وملء تلقائي للبيانات عند اختيار الموديل.

---

## 🛠️ التقنيات المستخدمة

- **Framework**: Next.js 16.1.3 (App Router + Turbopack)
- **Language**: TypeScript 5
- **Database**: SQLite مع Prisma ORM
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State**: React useState + useEffect
- **Icons**: Lucide React
- **Notifications**: Sonner

---

## ✨ الميزات الرئيسية

### 1. نظام القوائم (Lists)
- ✅ العناصر تُضاف فقط من خلال القوائم
- ✅ كل قائمة لها اسم ووصف ولون وأيقونة
- ✅ حفظ القوائم في قاعدة البيانات
- ✅ حذف القائمة يحذف جميع عناصرها (Cascade Delete)

### 2. حقول العنصر
- **الاسم**: اسم العنصر (مطلوب)
- **الكمية**: العدد
- **الكمية الواردة**: للإضافة لاحقاً
- **الكمية الصادرة**: للإضافة لاحقاً
- **الشركة المصنعة**: اختر من القائمة
- **نوع المنتج**: اختر من الفئات
- **الموديل**: اقتراحات من قاعدة البيانات أو إدخال يدوي
- **الأمبير (A)**: اقتراحات ذكية شائعة + مخصصة
- **الجهد (V)**: اقتراحات ذكية + نوع التيار AC/DC
- **الفاز**: 1 فاز / 3 فاز
- **القدرة (kW)**: حساب تلقائي: P = √3 × V × I × power factor
- **الحالة**: جديد / مستعمل
- **الموقع**: موقع التخزين
- **ملاحظات**: نص حر

### 3. الاقتراحات الذكية
- أمبير شائع: 1, 2, 5, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000
- جهد شائع: 24, 48, 110, 220, 380, 400, 415, 440, 480, 690
- فاز: 1 فاز (أحادي)، 3 فاز (ثلاثي)
- نوع التيار: AC (متردد)، DC (مستمر)

### 4. الملء التلقائي
عند اختيار موديل من الاقتراحات:
- يُملأ اسم المنتج
- يُملأ الأمبير
- يُملأ الجهد
- يُملأ الفاز
- يُملأ القدرة بالكيلووات
- تُحدد الشركة والفئة تلقائياً

### 5. التصدير
- ✅ تصدير Excel (.xlsx) للقائمة الحالية
- ✅ تصدير PDF للطباعة

---

## 📊 قاعدة البيانات

### الإحصائيات
| النوع | العدد |
|-------|-------|
| الشركات | 13 |
| الفئات | 11 |
| المنتجات | 1,740 |

### الجداول الرئيسية

```prisma
// الشركات
model Company {
  id          String     @id @default(cuid())
  name        String     @unique
  nameAr      String?
  country     String?
  logo        String?
  isPopular   Boolean    @default(false)
  categories  String?    // VFD,PLC,Motor,...
  products    Product[]
}

// الفئات
model ProductCategory {
  id          String     @id @default(cuid())
  name        String     @unique
  nameAr      String?
  description String?
  icon        String?
  products    Product[]
}

// المنتجات
model Product {
  id           String          @id @default(cuid())
  model        String          // رقم الموديل
  name         String?         // الاسم الوصفي
  amperage     Float?          // الأمبير
  voltage      Float?          // الجهد
  phases       Int?            // عدد الفازات
  powerKw      Float?          // القدرة بالكيلووات
  powerHp      Float?          // القدرة بالحصان
  companyId    String
  categoryId   String
  company      Company         @relation(...)
  category     ProductCategory @relation(...)
}

// القوائم
model InventoryList {
  id          String          @id @default(cuid())
  name        String
  description String?
  color       String?
  icon        String?
  isActive    Boolean         @default(true)
  items       InventoryItem[]
}

// عناصر المخزون
model InventoryItem {
  id            String         @id @default(cuid())
  name          String
  quantity      Int            @default(1)
  incomingQty   Int            @default(0)
  outgoingQty   Int            @default(0)
  amperage      String?
  voltage       String?
  phases        Int?
  powerKw       Float?
  customPowerKw Boolean        @default(false)
  condition     String?        // new / used
  location      String?
  notes         String?
  listId        String?
  productId     String?
  companyId     String?
  categoryId    String?
  list          InventoryList? @relation(...)
  product       Product?       @relation(...)
  company       Company?       @relation(...)
  category      ProductCategory? @relation(...)
}
```

---

## 🏭 الشركات المدعومة

| الشركة | الاسم العربي | الفئات |
|--------|--------------|--------|
| Siemens | سيمنز | VFD, Servo, PLC, Power Supply, Motor, Contactor, Breaker, Relay |
| ABB | إيه بي بي | VFD, PLC, Motor, Contactor, Breaker, Power Supply |
| Schneider Electric | شنايدر | VFD, PLC, Contactor, Breaker, Relay, Power Supply |
| Mitsubishi Electric | ميتسوبيشي | VFD, PLC, Servo, Contactor |
| Delta Electronics | دلتا | VFD, PLC, Servo, Contactor |
| Yaskawa | ياسكاوا | VFD, Servo, PLC, Motor |
| LS Electric | إل إس | VFD, PLC, Servo, Contactor, Breaker, Power Supply, Motor, Relay, HMI |
| Omron | أومرون | VFD, PLC, Servo, Relay, Contactor, Sensor, HMI, Power Supply |
| Danfoss | دانفوس | VFD, Motor, Contactor, Sensor |
| Fuji Electric | فوجي | VFD, PLC, Contactor, Breaker, Motor |
| Allen-Bradley (Rockwell) | ألن برادلي | VFD, PLC, Servo, Contactor, Breaker, HMI, Motor, Relay |
| Eaton | إيتون | VFD, Contactor, Breaker, Motor, Relay, Power Supply, Sensor |
| WEG | - | Motor |

---

## 📁 الفئات المدعومة

| الفئة | الاسم العربي |
|-------|--------------|
| VFD | إنفرتر / محول تردد |
| Servo | سيرفو موتور |
| PLC | التحكم المنطقي المبرمج |
| Power Supply | مزود طاقة |
| Motor | محرك كهربائي |
| Contactor | كونتاكتور |
| Breaker | قاطع كهربائي |
| Relay | مرحل / ريليه |
| HMI | شاشة لمس / واجهة إنسان آلة |
| Sensor | حساس / مستشعر |
| Soft Starter | - |

---

## 📂 هيكل الملفات

```
/home/z/my-project/
├── src/
│   ├── app/
│   │   ├── page.tsx              # الصفحة الرئيسية
│   │   ├── layout.tsx            # التخطيط العام
│   │   ├── globals.css           # الأنماط العامة
│   │   └── api/
│   │       ├── products/route.ts # API المنتجات
│   │       ├── companies/route.ts
│   │       ├── categories/route.ts
│   │       ├── inventory/route.ts
│   │       ├── lists/route.ts
│   │       ├── suggestions/
│   │       │   ├── amperage/route.ts
│   │       │   ├── voltage/route.ts
│   │       │   └── phases/route.ts
│   │       ├── defaults/route.ts
│   │       └── export/
│   │           ├── excel/route.ts
│   │           └── pdf/route.ts
│   ├── components/ui/            # مكونات shadcn/ui
│   └── lib/
│       ├── db.ts                 # اتصال Prisma
│       └── utils.ts
├── prisma/
│   ├── schema.prisma             # هيكل قاعدة البيانات
│   ├── seed-products.ts          # زرع المنتجات
│   ├── seed-suggestions.ts       # زرع الاقتراحات
│   └── products-data*.ts         # بيانات المنتجات
├── db/
│   └── custom.db                 # ملف قاعدة البيانات SQLite
├── .env                          # متغيرات البيئة
├── package.json
└── PROMPT-FULL.md                # هذا الملف
```

---

## 🔧 الإعدادات

### ملف .env
```
DATABASE_URL=file:/home/z/my-project/db/custom.db
```

**مهم**: عند نقل المشروع لجهاز آخر، غيّر المسار إلى المسار الجديد.

---

## 🚀 التشغيل

### على السيرفر الحالي
```bash
bun run dev
# التطبيق يعمل على http://localhost:3000
```

### على جهاز جديد
```bash
# 1. نسخ المشروع كاملاً
# 2. تعديل .env بمسار قاعدة البيانات الجديد
DATABASE_URL=file:/المسار/الجديد/db/custom.db

# 3. تثبيت المكتبات
bun install

# 4. توليد Prisma Client
bunx prisma generate

# 5. تشغيل التطبيق
bun run dev
```

---

## 🐛 الإصلاحات التي تمت في هذه المحادثة

### 1. إصلاح خطأ قاعدة البيانات
**المشكلة**: تغيير DATABASE_URL لمسار نسبي سبّب عطل
**الحل**: إبقاء المسار المطلق

### 2. إصلاح API المنتجات
**المشكلة**: جلب كل المنتجات (1,740) بدون limit يسبب timeout
**الحل**: إضافة limit افتراضي = 500
```typescript
// src/app/api/products/route.ts
const limit = parseInt(searchParams.get('limit') || '500')
const products = await db.product.findMany({
  where,
  take: limit,  // تمت الإضافة
  ...
})
```

---

## ⚠️ قواعد صارمة للتعديل

```
❌ لا تحذف أي ملف
❌ لا تغير أي كود غير مرتبط بالمشكلة
❌ لا تعيد كتابة الملفات من الصفر
✅ أصلح المشكلة المحددة فقط
```

---

## 📝 ملاحظات مهمة

1. **قاعدة البيانات**: ملف SQLite في `db/custom.db` يحتوي على كل البيانات
2. **النسخ الاحتياطي**: انسخ ملف `db/custom.db` للحفاظ على البيانات
3. **المسار المطلق**: DATABASE_URL يجب أن يكون مساراً مطلقاً
4. **المنتجات**: لا تُعرض كلها دفعة واحدة، فقط بعد اختيار شركة أو فئة
5. **القوائم**: لا يمكن إضافة عناصر بدون إنشاء قائمة أولاً

---

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | جلب المنتجات (companyId, categoryId, limit) |
| `/api/companies` | GET | جلب جميع الشركات |
| `/api/categories` | GET | جلب جميع الفئات |
| `/api/inventory` | GET | جلب العناصر (listId) |
| `/api/inventory` | POST | إضافة عنصر جديد |
| `/api/inventory/[id]` | PUT | تحديث عنصر |
| `/api/inventory/[id]` | DELETE | حذف عنصر |
| `/api/lists` | GET | جلب القوائم |
| `/api/lists` | POST | إنشاء قائمة |
| `/api/lists/[id]` | PUT | تحديث قائمة |
| `/api/lists/[id]` | DELETE | حذف قائمة وعناصرها |
| `/api/suggestions/amperage` | GET | اقتراحات الأمبير |
| `/api/suggestions/voltage` | GET | اقتراحات الجهد |
| `/api/suggestions/phases` | GET | اقتراحات الفاز |
| `/api/defaults` | GET | القيم الافتراضية |
| `/api/export/excel` | GET | تصدير Excel |
| `/api/export/pdf` | GET | تصدير PDF |

---

## 📞 الدعم

في حالة وجود أي مشاكل:
1. تحقق من ملف `.env` والمسار
2. تحقق من وجود ملف `db/custom.db`
3. راجع الـ logs في `dev.log`
4. تأكد من تشغيل `bunx prisma generate`

---

*آخر تحديث: 2024*
