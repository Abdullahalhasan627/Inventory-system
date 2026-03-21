# Prompt: تكميل وتحسين نظام جرد المعدات الكهربائية

> **ملاحظة**: هذا الـ prompt تابع لـ PROMPT.md الرئيسي - يجب قراءته أولاً ثم تطبيق ما يلي.

---

## 🎯 الهدف

تضمين **كل** الشركات القوية و **كل** الفئات و **كل** الموديلات ببيانات حقيقية ومتحقق منها.

---

## ✅ المطلوب بالتفصيل

### 1. تضمين كل الشركات القوية (بدون استثناء)
```
Siemens, ABB, Schneider Electric, Mitsubishi Electric, Delta Electronics,
LS Electric, Yaskawa, Omron, Danfoss, Fuji Electric, Allen-Bradley,
Eaton, WEG, Emerson, Hitachi, Toshiba, Honeywell, Phoenix Contact,
TE Connectivity, Legrand, Hager, SEW-Eurodrive, Lenze, Festo, SMC,
Parker, Bosch Rexroth, Keyence, SICK, Pepperl+Fuchs, IFM Electronic,
Balluff, Turck, Banner, Cognex, Beckhoff, B&R, Advantech, WAGO,
Weidmüller, Mean Well, TDK Lambda, Cosel, Fluke, Megger, Hioki, Kyoritsu
```
- لا تترك أي شركة من هذه القائمة
- أضف شركات أخرى مشهورة إن وجدت

### 2. تضمين كل الفئات المتوفرة (بدون استثناء)
```
VFD, PLC, Motor, Servo, Contactor, Relay, Breaker, Switch,
Sensor, Power Supply, Soft Starter, HMI, IO Module, Encoder,
Gearbox, Pump, Fan, Transformer, Capacitor, Resistor, Fuse,
LED, Light, Cable, Socket, Connector, Valve, Cylinder, Filter
```
- أضف أي فئة أخرى متعلقة بالمعدات الكهربائية

### 3. تضمين كل الموديلات لكل فئة (بدون استثناء)

لكل شركة، اجمع **كل** الموديلات المتاحة في **كل** الفئات التي تنتجها:

```
مثال لـ Siemens:
├── VFD: SINAMICS G120, G130, G150, S120, V20, V90... (كل الموديلات)
├── PLC: S7-200, S7-300, S7-400, S7-1200, S7-1500... (كل الموديلات)
├── Motor: 1LA7, 1LE7, 1LE1, 1LG4, 1PH8... (كل الموديلات)
├── Servo: 1FK7, 1FT7, 1PH7, 1PM6... (كل الموديلات)
└── ... باقي الفئات
```

### 4. التحقق من البيانات 🔑

**قبل إضافة أي منتج، تحقق من:**
- ✅ الموديل موجود فعلاً على موقع الشركة الرسمي
- ✅ المواصفات (أمبير، جهد، قدرة) صحيحة 100%
- ✅ لا توجد أخطاء في الأرقام

**طريقة التحقق:**
```
1. ابحث عن "[موديل] specifications"
2. افتح صفحة المنتج الرسمية
3. قارن المواصفات بالكاتالوج
4. سجل البيانات الصحيحة فقط
```

---

## 📊 الحد الأدنى المتوقع

| الشركة | الحد الأدنى للمنتجات |
|--------|---------------------|
| Siemens | 100+ |
| ABB | 100+ |
| Schneider | 100+ |
| Mitsubishi | 100+ |
| Delta | 80+ |
| LS Electric | 80+ |
| Yaskawa | 60+ |
| Omron | 80+ |
| Danfoss | 60+ |
| Fuji | 60+ |
| Allen-Bradley | 80+ |
| Eaton | 80+ |
| WEG | 50+ |

**الهدف: 1500+ منتج حقيقي ومتحقق منه**

---

## 🔍 مصادر البحث الموثوقة

```
- الموقع الرسمي للشركة (Products/Catalogs)
- كتالوجات PDF الرسمية
- مواقع الموزعين المعتمدين
- datasheets من المصدر
```

**تجنب:**
- البيانات غير المؤكدة
- المنتجات الخيالية
- المواصفات التقريبية

---

## ⚡ تنفيذ سريع

```
1. افتح موقع الشركة الرسمي
2. اذهب لقسم Products
3. اختر الفئة (VFD مثلاً)
4. اسحب كل الموديلات مع مواصفاتها
5. كرر لكل فئة
6. كرر لكل شركة
7. تحقق من كل منتج
8. أدخل في قاعدة البيانات
```

---

**تذكر: الجودة أهم من الكمية، لكن الكمية المطلوبة كبيرة جداً!**
