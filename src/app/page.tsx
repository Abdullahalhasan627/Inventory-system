'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, Trash2, Edit, Search, Zap, Factory, 
  Settings, ChevronDown, Check, FileSpreadsheet, FileText,
  Package, TrendingUp, TrendingDown, FolderOpen,
  FolderPlus, AlertCircle, ArrowRight
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Types
interface Company {
  id: string
  name: string
  nameAr: string | null
  country: string | null
  isPopular: boolean
  categories: string | null
}

interface ProductCategory {
  id: string
  name: string
  nameAr: string | null
  icon: string | null
}

interface Product {
  id: string
  model: string
  name: string | null
  amperage: number | null
  voltage: number | null
  phases: number | null
  powerKw: number | null
  companyId: string
  categoryId: string
  company: Company
  category: ProductCategory
}

interface InventoryList {
  id: string
  name: string
  description: string | null
  color: string | null
  icon: string | null
  isActive: boolean
  createdAt: string
  _count?: { items: number }
}

interface InventoryItem {
  id: string
  name: string
  quantity: number
  incomingQty: number
  outgoingQty: number
  amperage: string | null
  voltage: string | null
  phases: number | null
  powerKw: number | null
  customPowerKw: boolean
  condition: string | null
  location: string | null
  notes: string | null
  listId: string | null
  productId: string | null
  companyId: string | null
  categoryId: string | null
  product?: Product
  company?: Company
  category?: ProductCategory
  list?: InventoryList
}

interface Suggestion {
  value: number
  isPopular: boolean
}

interface DefaultValue {
  id: string
  fieldName: string
  value: string
  count: number
}

export default function HomePage() {
  // State
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [lists, setLists] = useState<InventoryList[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [amperageSuggestions, setAmperageSuggestions] = useState<Suggestion[]>([])
  const [voltageSuggestions, setVoltageSuggestions] = useState<Suggestion[]>([])
  const [phaseSuggestions, setPhaseSuggestions] = useState<{value: number, name: string, isPopular: boolean}[]>([])
  const [defaultValues, setDefaultValues] = useState<DefaultValue[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  // Dialog state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddListDialogOpen, setIsAddListDialogOpen] = useState(false)
  const [isEditListDialogOpen, setIsEditListDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [editingList, setEditingList] = useState<InventoryList | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    incomingQty: 0,
    outgoingQty: 0,
    companyId: '',
    categoryId: '',
    productId: '',
    amperage: '',
    voltage: '',
    phases: '',
    powerKw: '',
    customPowerKw: false,
    condition: 'new',
    location: '',
    notes: '',
    model: '',
    listId: '' as string | null
  })

  // List form state
  const [listFormData, setListFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: 'folder'
  })

  // Combobox open states
  const [companyOpen, setCompanyOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [amperageOpen, setAmperageOpen] = useState(false)
  const [voltageOpen, setVoltageOpen] = useState(false)
  const [phaseOpen, setPhaseOpen] = useState(false)

  // List colors
  const listColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  // Fetch data on mount
  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [invRes, listsRes, compRes, catRes, ampRes, voltRes, phaseRes, defaultsRes] = await Promise.all([
        fetch('/api/inventory'),
        fetch('/api/lists'),
        fetch('/api/companies'),
        fetch('/api/categories'),
        fetch('/api/suggestions/amperage'),
        fetch('/api/suggestions/voltage'),
        fetch('/api/suggestions/phases'),
        fetch('/api/defaults')
      ])
      
      const [inventoryData, listsData, companiesData, categoriesData, ampData, voltData, phaseData, defaultsData] = await Promise.all([
        invRes.json(),
        listsRes.json(),
        compRes.json(),
        catRes.json(),
        ampRes.json(),
        voltRes.json(),
        phaseRes.json(),
        defaultsRes.json()
      ])
      
      setInventory(inventoryData)
      setLists(listsData)
      setCompanies(companiesData)
      setCategories(categoriesData)
      setAmperageSuggestions(ampData)
      setVoltageSuggestions(voltData)
      setPhaseSuggestions(phaseData)
      setDefaultValues(defaultsData)

      // Load default values into form
      loadDefaultValues(defaultsData)
    } catch (error) {
      toast.error('خطأ في تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }

  // Load default values into form
  const loadDefaultValues = (defaults: DefaultValue[]) => {
    const locationDefault = defaults.find(d => d.fieldName === 'location')
    if (locationDefault) {
      setFormData(prev => ({ ...prev, location: locationDefault.value }))
    }
  }

  // Fetch products when company or category changes
  useEffect(() => {
    if (formData.companyId || formData.categoryId) {
      fetchProducts()
    }
  }, [formData.companyId, formData.categoryId])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (formData.companyId) params.append('companyId', formData.companyId)
      if (formData.categoryId) params.append('categoryId', formData.categoryId)
      
      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Fetch items for selected list
  useEffect(() => {
    if (selectedListId) {
      fetch(`/api/inventory?listId=${selectedListId}`)
        .then(res => res.json())
        .then(data => setInventory(data))
        .catch(err => console.error(err))
    } else {
      fetch('/api/inventory')
        .then(res => res.json())
        .then(data => setInventory(data))
        .catch(err => console.error(err))
    }
  }, [selectedListId])

  // Calculate power in kW
  const calculatePowerKw = useCallback((amperage: string, voltage: string, phases: number): number => {
    const amp = parseFloat(amperage)
    const volt = parseFloat(voltage)
    
    if (isNaN(amp) || isNaN(volt) || isNaN(phases)) return 0
    
    const powerFactor = 0.85
    
    if (phases === 3) {
      return Math.sqrt(3) * volt * amp * powerFactor / 1000
    } else if (phases === 1) {
      return volt * amp * powerFactor / 1000
    }
    return volt * amp * powerFactor / 1000
  }, [])

  // Update power calculation when amperage, voltage, or phases change
  useEffect(() => {
    if (!formData.customPowerKw && formData.amperage && formData.voltage && formData.phases) {
      const phases = parseInt(formData.phases)
      if (!isNaN(phases)) {
        const power = calculatePowerKw(formData.amperage, formData.voltage, phases)
        setFormData(prev => ({ ...prev, powerKw: power.toFixed(2) }))
      }
    }
  }, [formData.amperage, formData.voltage, formData.phases, formData.customPowerKw, calculatePowerKw])

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setFormData(prev => ({
      ...prev,
      productId: product.id,
      model: product.model,
      name: product.name || prev.name,
      amperage: product.amperage?.toString() || prev.amperage,
      voltage: product.voltage?.toString() || prev.voltage,
      phases: product.phases?.toString() || prev.phases,
      powerKw: product.powerKw?.toString() || prev.powerKw,
      companyId: product.companyId,
      categoryId: product.categoryId
    }))
    setProductOpen(false)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      quantity: 1,
      incomingQty: 0,
      outgoingQty: 0,
      companyId: '',
      categoryId: '',
      productId: '',
      amperage: '',
      voltage: '',
      phases: '',
      powerKw: '',
      customPowerKw: false,
      condition: 'new',
      location: defaultValues.find(d => d.fieldName === 'location')?.value || '',
      notes: '',
      model: '',
      listId: selectedListId
    })
  }

  // Reset list form
  const resetListForm = () => {
    setListFormData({
      name: '',
      description: '',
      color: '#3B82F6',
      icon: 'folder'
    })
  }

  // Add inventory item
  const handleAddItem = async () => {
    if (!formData.name.trim()) {
      toast.error('الرجاء إدخال اسم العنصر')
      return
    }
    
    setSubmitting(true)
    try {
      const payload = {
        name: formData.name,
        quantity: parseInt(formData.quantity.toString()) || 1,
        incomingQty: parseInt(formData.incomingQty.toString()) || 0,
        outgoingQty: parseInt(formData.outgoingQty.toString()) || 0,
        amperage: formData.amperage || null,
        voltage: formData.voltage || null,
        phases: formData.phases ? parseInt(formData.phases) : null,
        powerKw: formData.powerKw ? parseFloat(formData.powerKw) : null,
        customPowerKw: formData.customPowerKw,
        condition: formData.condition,
        location: formData.location || null,
        notes: formData.notes || null,
        listId: selectedListId,
        productId: formData.productId || null,
        companyId: formData.companyId || null,
        categoryId: formData.categoryId || null
      }
      
      console.log('Submitting:', payload)
      
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json()
      console.log('Response:', data)
      
      if (res.ok) {
        toast.success('تم إضافة العنصر بنجاح')
        setIsAddDialogOpen(false)
        resetForm()
        fetchAllData()
      } else {
        toast.error(data.error || 'خطأ في إضافة العنصر')
        console.error('Error:', data)
      }
    } catch (error) {
      console.error('Error adding item:', error)
      toast.error('خطأ في إضافة العنصر')
    } finally {
      setSubmitting(false)
    }
  }

  // Update inventory item
  const handleUpdateItem = async () => {
    if (!editingItem) return
    if (!formData.name.trim()) {
      toast.error('الرجاء إدخال اسم العنصر')
      return
    }
    
    setSubmitting(true)
    try {
      const res = await fetch(`/api/inventory/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          quantity: parseInt(formData.quantity.toString()) || 1,
          incomingQty: parseInt(formData.incomingQty.toString()) || 0,
          outgoingQty: parseInt(formData.outgoingQty.toString()) || 0,
          amperage: formData.amperage || null,
          voltage: formData.voltage || null,
          phases: formData.phases ? parseInt(formData.phases) : null,
          powerKw: formData.powerKw ? parseFloat(formData.powerKw) : null,
          customPowerKw: formData.customPowerKw,
          condition: formData.condition,
          location: formData.location || null,
          notes: formData.notes || null,
          productId: formData.productId || null,
          companyId: formData.companyId || null,
          categoryId: formData.categoryId || null
        })
      })
      
      if (res.ok) {
        toast.success('تم تحديث العنصر بنجاح')
        setIsEditDialogOpen(false)
        setEditingItem(null)
        resetForm()
        fetchAllData()
      } else {
        toast.error('خطأ في تحديث العنصر')
      }
    } catch (error) {
      toast.error('خطأ في تحديث العنصر')
    } finally {
      setSubmitting(false)
    }
  }

  // Delete inventory item
  const handleDeleteItem = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return
    
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: 'DELETE' })
      
      if (res.ok) {
        toast.success('تم حذف العنصر بنجاح')
        fetchAllData()
      } else {
        toast.error('خطأ في حذف العنصر')
      }
    } catch (error) {
      toast.error('خطأ في حذف العنصر')
    }
  }

  // Open edit dialog
  const openEditDialog = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      quantity: item.quantity,
      incomingQty: item.incomingQty,
      outgoingQty: item.outgoingQty,
      companyId: item.companyId || '',
      categoryId: item.categoryId || '',
      productId: item.productId || '',
      amperage: item.amperage || '',
      voltage: item.voltage || '',
      phases: item.phases?.toString() || '',
      powerKw: item.powerKw?.toString() || '',
      customPowerKw: item.customPowerKw,
      condition: item.condition || 'new',
      location: item.location || '',
      notes: item.notes || '',
      model: item.product?.model || '',
      listId: item.listId
    })
    setIsEditDialogOpen(true)
  }

  // Add list
  const handleAddList = async () => {
    if (!listFormData.name.trim()) {
      toast.error('الرجاء إدخال اسم القائمة')
      return
    }
    
    try {
      const res = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listFormData)
      })
      
      if (res.ok) {
        const newList = await res.json()
        toast.success('تم إنشاء القائمة بنجاح')
        setIsAddListDialogOpen(false)
        resetListForm()
        fetchAllData()
        // Automatically select the new list
        setSelectedListId(newList.id)
      } else {
        toast.error('خطأ في إنشاء القائمة')
      }
    } catch (error) {
      toast.error('خطأ في إنشاء القائمة')
    }
  }

  // Update list
  const handleUpdateList = async () => {
    if (!editingList) return
    if (!listFormData.name.trim()) {
      toast.error('الرجاء إدخال اسم القائمة')
      return
    }
    
    try {
      const res = await fetch(`/api/lists/${editingList.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listFormData)
      })
      
      if (res.ok) {
        toast.success('تم تحديث القائمة بنجاح')
        setIsEditListDialogOpen(false)
        setEditingList(null)
        resetListForm()
        fetchAllData()
      } else {
        toast.error('خطأ في تحديث القائمة')
      }
    } catch (error) {
      toast.error('خطأ في تحديث القائمة')
    }
  }

  // Delete list
  const handleDeleteList = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه القائمة؟ سيتم حذف جميع العناصر بداخلها.')) return
    
    try {
      const res = await fetch(`/api/lists/${id}`, { method: 'DELETE' })
      
      if (res.ok) {
        toast.success('تم حذف القائمة بنجاح')
        if (selectedListId === id) {
          setSelectedListId(null)
        }
        fetchAllData()
      } else {
        toast.error('خطأ في حذف القائمة')
      }
    } catch (error) {
      toast.error('خطأ في حذف القائمة')
    }
  }

  // Open edit list dialog
  const openEditListDialog = (list: InventoryList) => {
    setEditingList(list)
    setListFormData({
      name: list.name,
      description: list.description || '',
      color: list.color || '#3B82F6',
      icon: list.icon || 'folder'
    })
    setIsEditListDialogOpen(true)
  }

  // Delete default value
  const handleDeleteDefault = async (fieldName: string) => {
    try {
      await fetch(`/api/defaults?fieldName=${fieldName}`, { method: 'DELETE' })
      setDefaultValues(prev => prev.filter(d => d.fieldName !== fieldName))
      toast.success('تم حذف القيمة الافتراضية')
      
      // Clear from form if it's the location
      if (fieldName === 'location') {
        setFormData(prev => ({ ...prev, location: '' }))
      }
    } catch (error) {
      toast.error('خطأ في حذف القيمة')
    }
  }

  // Export to Excel for current list
  const handleExportExcel = async () => {
    try {
      const url = selectedListId 
        ? `/api/export/excel?listId=${selectedListId}` 
        : '/api/export/excel'
      const res = await fetch(url)
      const blob = await res.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = downloadUrl
      const listName = selectedListId ? lists.find(l => l.id === selectedListId)?.name : 'all'
      a.download = `${listName}_${new Date().toISOString().split('T')[0]}.xlsx`
      a.click()
      window.URL.revokeObjectURL(downloadUrl)
      toast.success('تم تصدير البيانات بنجاح')
    } catch (error) {
      toast.error('خطأ في تصدير البيانات')
    }
  }

  // Export to PDF for current list
  const handleExportPDF = async () => {
    try {
      const url = selectedListId 
        ? `/api/export/pdf?listId=${selectedListId}` 
        : '/api/export/pdf'
      const res = await fetch(url)
      const html = await res.text()
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(html)
        printWindow.document.close()
        printWindow.print()
      }
      toast.success('تم تصدير البيانات بنجاح')
    } catch (error) {
      toast.error('خطأ في تصدير البيانات')
    }
  }

  // Filter inventory by search term
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get filtered products based on company and category
  const filteredProducts = products.filter(p => {
    if (formData.companyId && formData.categoryId) {
      return p.companyId === formData.companyId && p.categoryId === formData.categoryId
    }
    if (formData.companyId) return p.companyId === formData.companyId
    if (formData.categoryId) return p.categoryId === formData.categoryId
    return true
  })

  // Get available categories for selected company
  const availableCategories = formData.companyId 
    ? categories.filter(cat => {
        const company = companies.find(c => c.id === formData.companyId)
        if (company?.categories) {
          return company.categories.split(',').includes(cat.name)
        }
        return true
      })
    : categories

  // Get default value for field
  const getDefaultValue = (fieldName: string): string | null => {
    const def = defaultValues.find(d => d.fieldName === fieldName)
    return def?.value || null
  }

  // Selected list info
  const selectedList = selectedListId ? lists.find(l => l.id === selectedListId) : null

  // Render form
  const renderForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      {/* Name */}
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          اسم العنصر *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="أدخل اسم العنصر"
        />
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          حالة المنتج
        </Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={formData.condition === 'new' ? 'default' : 'outline'}
            className={cn(
              "flex-1",
              formData.condition === 'new' && "bg-green-600 hover:bg-green-700"
            )}
            onClick={() => setFormData(prev => ({ ...prev, condition: 'new' }))}
          >
            جديد
          </Button>
          <Button
            type="button"
            variant={formData.condition === 'used' ? 'default' : 'outline'}
            className={cn(
              "flex-1",
              formData.condition === 'used' && "bg-orange-600 hover:bg-orange-700"
            )}
            onClick={() => setFormData(prev => ({ ...prev, condition: 'used' }))}
          >
            مستعمل
          </Button>
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <Label>الكمية</Label>
        <Input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
          min="0"
        />
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Factory className="h-4 w-4" />
          الشركة المصنعة
          {getDefaultValue('company') && (
            <Badge variant="outline" className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleDeleteDefault('company')}>
              آخر: {getDefaultValue('company')} ×
            </Badge>
          )}
        </Label>
        <Popover open={companyOpen} onOpenChange={setCompanyOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {formData.companyId 
                ? companies.find(c => c.id === formData.companyId)?.name 
                : 'اختر الشركة...'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput placeholder="ابحث عن شركة..." />
              <CommandList>
                <CommandEmpty>لم يتم العثور على شركة</CommandEmpty>
                <CommandGroup heading="الشركات المشهورة">
                  {companies.filter(c => c.isPopular).map((company) => (
                    <CommandItem
                      key={company.id}
                      value={company.name}
                      onSelect={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          companyId: company.id,
                          productId: '',
                          categoryId: ''
                        }))
                        setCompanyOpen(false)
                      }}
                    >
                      <Check className={cn(
                        "mr-2 h-4 w-4",
                        formData.companyId === company.id ? "opacity-100" : "opacity-0"
                      )} />
                      <span>{company.name}</span>
                      {company.nameAr && <span className="text-muted-foreground mr-2">({company.nameAr})</span>}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <Separator />
                <CommandGroup heading="جميع الشركات">
                  <ScrollArea className="h-[200px]">
                    {companies.filter(c => !c.isPopular).map((company) => (
                      <CommandItem
                        key={company.id}
                        value={company.name}
                        onSelect={() => {
                          setFormData(prev => ({ 
                            ...prev, 
                            companyId: company.id,
                            productId: '',
                            categoryId: ''
                          }))
                          setCompanyOpen(false)
                        }}
                      >
                        <Check className={cn(
                          "mr-2 h-4 w-4",
                          formData.companyId === company.id ? "opacity-100" : "opacity-0"
                        )} />
                        <span>{company.name}</span>
                        {company.nameAr && <span className="text-muted-foreground mr-2">({company.nameAr})</span>}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          نوع المنتج
          {getDefaultValue('category') && (
            <Badge variant="outline" className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleDeleteDefault('category')}>
              آخر: {getDefaultValue('category')} ×
            </Badge>
          )}
        </Label>
        <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {formData.categoryId 
                ? categories.find(c => c.id === formData.categoryId)?.nameAr || categories.find(c => c.id === formData.categoryId)?.name
                : 'اختر النوع...'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="ابحث عن نوع..." />
              <CommandList>
                <CommandEmpty>لم يتم العثور على نوع</CommandEmpty>
                <CommandGroup>
                  {availableCategories.map((category) => (
                    <CommandItem
                      key={category.id}
                      value={category.name}
                      onSelect={() => {
                        setFormData(prev => ({ ...prev, categoryId: category.id, productId: '' }))
                        setCategoryOpen(false)
                      }}
                    >
                      <Check className={cn(
                        "mr-2 h-4 w-4",
                        formData.categoryId === category.id ? "opacity-100" : "opacity-0"
                      )} />
                      <span>{category.name}</span>
                      {category.nameAr && <span className="text-muted-foreground mr-2">({category.nameAr})</span>}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Model / Product */}
      <div className="space-y-2 md:col-span-2">
        <Label className="flex items-center gap-2">
          الموديل
        </Label>
        <Popover open={productOpen} onOpenChange={setProductOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {formData.productId 
                ? products.find(p => p.id === formData.productId)?.model 
                : formData.model || 'اختر الموديل أو اكتب...'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] p-0" align="start">
            <Command>
              <CommandInput placeholder="ابحث عن موديل..." />
              <CommandList>
                <CommandEmpty>
                  <div className="p-2">
                    <p className="text-sm text-muted-foreground mb-2">لم يتم العثور على الموديل</p>
                    <Input
                      placeholder="اكتب الموديل يدوياً..."
                      value={formData.model}
                      onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value, productId: '' }))}
                    />
                  </div>
                </CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[300px]">
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.model}
                        onSelect={() => handleProductSelect(product)}
                      >
                        <Check className={cn(
                          "mr-2 h-4 w-4",
                          formData.productId === product.id ? "opacity-100" : "opacity-0"
                        )} />
                        <div className="flex flex-col">
                          <span className="font-mono">{product.model}</span>
                          <span className="text-xs text-muted-foreground">{product.name}</span>
                        </div>
                        {product.powerKw && <Badge className="mr-2">{product.powerKw} kW</Badge>}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Amperage */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          الأمبير (A)
        </Label>
        <Popover open={amperageOpen} onOpenChange={setAmperageOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {formData.amperage || 'اختر الأمبير...'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="ابحث أو اكتب..." />
              <CommandList>
                <CommandEmpty>
                  <div className="p-2">
                    <Input
                      placeholder="اكتب القيمة..."
                      value={formData.amperage}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, amperage: e.target.value }))
                        setAmperageOpen(false)
                      }}
                    />
                  </div>
                </CommandEmpty>
                <CommandGroup heading="القيم الشائعة">
                  {amperageSuggestions.filter(s => s.isPopular).map((suggestion) => (
                    <CommandItem
                      key={suggestion.value}
                      value={suggestion.value.toString()}
                      onSelect={() => {
                        setFormData(prev => ({ ...prev, amperage: suggestion.value.toString() }))
                        setAmperageOpen(false)
                      }}
                    >
                      <Check className={cn(
                        "mr-2 h-4 w-4",
                        formData.amperage === suggestion.value.toString() ? "opacity-100" : "opacity-0"
                      )} />
                      {suggestion.value} A
                    </CommandItem>
                  ))}
                </CommandGroup>
                <Separator />
                <CommandGroup heading="جميع القيم">
                  <ScrollArea className="h-[150px]">
                    {amperageSuggestions.filter(s => !s.isPopular).map((suggestion) => (
                      <CommandItem
                        key={suggestion.value}
                        value={suggestion.value.toString()}
                        onSelect={() => {
                          setFormData(prev => ({ ...prev, amperage: suggestion.value.toString() }))
                          setAmperageOpen(false)
                        }}
                      >
                        <Check className={cn(
                          "mr-2 h-4 w-4",
                          formData.amperage === suggestion.value.toString() ? "opacity-100" : "opacity-0"
                        )} />
                        {suggestion.value} A
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Voltage */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          الجهد (V)
        </Label>
        <Popover open={voltageOpen} onOpenChange={setVoltageOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {formData.voltage || 'اختر الجهد...'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="ابحث أو اكتب..." />
              <CommandList>
                <CommandEmpty>
                  <div className="p-2">
                    <Input
                      placeholder="اكتب القيمة..."
                      value={formData.voltage}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, voltage: e.target.value }))
                        setVoltageOpen(false)
                      }}
                    />
                  </div>
                </CommandEmpty>
                <CommandGroup heading="نوع التيار">
                  <CommandItem
                    value="AC"
                    onSelect={() => {
                      setFormData(prev => ({ ...prev, voltage: 'AC' }))
                      setVoltageOpen(false)
                    }}
                  >
                    <Check className={cn(
                      "mr-2 h-4 w-4",
                      formData.voltage === 'AC' ? "opacity-100" : "opacity-0"
                    )} />
                    <span className="font-semibold text-blue-600">AC</span>
                    <span className="text-xs text-muted-foreground mr-2">تيار متردد</span>
                  </CommandItem>
                  <CommandItem
                    value="DC"
                    onSelect={() => {
                      setFormData(prev => ({ ...prev, voltage: 'DC' }))
                      setVoltageOpen(false)
                    }}
                  >
                    <Check className={cn(
                      "mr-2 h-4 w-4",
                      formData.voltage === 'DC' ? "opacity-100" : "opacity-0"
                    )} />
                    <span className="font-semibold text-green-600">DC</span>
                    <span className="text-xs text-muted-foreground mr-2">تيار مستمر</span>
                  </CommandItem>
                </CommandGroup>
                <Separator />
                <CommandGroup heading="القيم الشائعة">
                  {voltageSuggestions.filter(s => s.isPopular).map((suggestion) => (
                    <CommandItem
                      key={suggestion.value}
                      value={suggestion.value.toString()}
                      onSelect={() => {
                        setFormData(prev => ({ ...prev, voltage: suggestion.value.toString() }))
                        setVoltageOpen(false)
                      }}
                    >
                      <Check className={cn(
                        "mr-2 h-4 w-4",
                        formData.voltage === suggestion.value.toString() ? "opacity-100" : "opacity-0"
                      )} />
                      {suggestion.value} V
                    </CommandItem>
                  ))}
                </CommandGroup>
                <Separator />
                <CommandGroup heading="جميع القيم">
                  <ScrollArea className="h-[150px]">
                    {voltageSuggestions.filter(s => !s.isPopular).map((suggestion) => (
                      <CommandItem
                        key={suggestion.value}
                        value={suggestion.value.toString()}
                        onSelect={() => {
                          setFormData(prev => ({ ...prev, voltage: suggestion.value.toString() }))
                          setVoltageOpen(false)
                        }}
                      >
                        <Check className={cn(
                          "mr-2 h-4 w-4",
                          formData.voltage === suggestion.value.toString() ? "opacity-100" : "opacity-0"
                        )} />
                        {suggestion.value} V
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Phases */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          الفاز
        </Label>
        <Popover open={phaseOpen} onOpenChange={setPhaseOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {formData.phases 
                ? phaseSuggestions.find(s => s.value.toString() === formData.phases)?.name
                : 'اختر الفاز...'}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandList>
                <CommandGroup>
                  {phaseSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.value}
                      value={suggestion.value.toString()}
                      onSelect={() => {
                        setFormData(prev => ({ ...prev, phases: suggestion.value.toString() }))
                        setPhaseOpen(false)
                      }}
                    >
                      <Check className={cn(
                        "mr-2 h-4 w-4",
                        formData.phases === suggestion.value.toString() ? "opacity-100" : "opacity-0"
                      )} />
                      {suggestion.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Power (kW) */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          القدرة (kW)
        </Label>
        <Input
          type="number"
          step="0.01"
          value={formData.powerKw}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            powerKw: e.target.value,
            customPowerKw: true
          }))}
          placeholder="القدرة بالكيلو واط"
        />
        {!formData.customPowerKw && formData.powerKw && (
          <p className="text-xs text-muted-foreground">
            * محسوبة تلقائياً (P = √3 × V × I × 0.85)
          </p>
        )}
        {formData.customPowerKw && (
          <p className="text-xs text-amber-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            تم الإدخال يدوياً
          </p>
        )}
      </div>

      {/* Incoming/Outgoing */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          الداخل
        </Label>
        <Input
          type="number"
          value={formData.incomingQty}
          onChange={(e) => setFormData(prev => ({ ...prev, incomingQty: parseInt(e.target.value) || 0 }))}
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-red-500" />
          الخارج
        </Label>
        <Input
          type="number"
          value={formData.outgoingQty}
          onChange={(e) => setFormData(prev => ({ ...prev, outgoingQty: parseInt(e.target.value) || 0 }))}
          min="0"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          الموقع
          {getDefaultValue('location') && (
            <Badge variant="outline" className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleDeleteDefault('location')}>
              آخر: {getDefaultValue('location')} ×
            </Badge>
          )}
        </Label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="موقع التخزين"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2 md:col-span-2">
        <Label>ملاحظات</Label>
        <Input
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="ملاحظات إضافية"
        />
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-7 w-7 text-primary" />
                نظام جرد المعدات الكهربائية
              </h1>
              <p className="text-muted-foreground text-sm">
                إدارة المخزون مع نظام القوائم والاقتراحات الذكية
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Only show add button when a list is selected */}
              {selectedListId && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة عنصر
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>إضافة عنصر جديد</DialogTitle>
                      <DialogDescription>
                        أدخل بيانات العنصر الجديد. سيتم حساب القدرة (kW) تلقائياً عند إدخال الأمبير والجهد والفاز.
                      </DialogDescription>
                    </DialogHeader>
                    {renderForm()}
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" type="button">إلغاء</Button>
                      </DialogClose>
                      <Button onClick={handleAddItem} disabled={!formData.name || submitting}>
                        {submitting ? 'جاري الإضافة...' : 'إضافة'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {/* Export buttons - only show when a list is selected */}
              {selectedListId && (
                <>
                  <Button variant="outline" onClick={handleExportExcel}>
                    <FileSpreadsheet className="h-4 w-4 ml-2" />
                    تصدير Excel
                  </Button>

                  <Button variant="outline" onClick={handleExportPDF}>
                    <FileText className="h-4 w-4 ml-2" />
                    تصدير PDF
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-1">
        {/* Lists Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              القوائم
            </h2>
            <Dialog open={isAddListDialogOpen} onOpenChange={setIsAddListDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => { resetListForm(); setIsAddListDialogOpen(true); }}>
                  <FolderPlus className="h-4 w-4 ml-2" />
                  قائمة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إنشاء قائمة جديدة</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>اسم القائمة *</Label>
                    <Input
                      value={listFormData.name}
                      onChange={(e) => setListFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="أدخل اسم القائمة"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الوصف</Label>
                    <Input
                      value={listFormData.description}
                      onChange={(e) => setListFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="وصف القائمة (اختياري)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>اللون</Label>
                    <div className="flex gap-2 flex-wrap">
                      {listColors.map(color => (
                        <button
                          key={color}
                          type="button"
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all",
                            listFormData.color === color ? "border-foreground scale-110" : "border-transparent"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => setListFormData(prev => ({ ...prev, color }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">إلغاء</Button>
                  </DialogClose>
                  <Button onClick={handleAddList} disabled={!listFormData.name}>
                    إنشاء
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Lists Grid */}
          {lists.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">لا توجد قوائم</h3>
                <p className="text-muted-foreground mb-4">قم بإنشاء قائمة جديدة للبدء بإضافة العناصر</p>
                <Button onClick={() => setIsAddListDialogOpen(true)}>
                  <FolderPlus className="h-4 w-4 ml-2" />
                  إنشاء قائمة جديدة
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lists.map(list => (
                <Card 
                  key={list.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md relative group",
                    selectedListId === list.id ? "ring-2 ring-primary shadow-md" : ""
                  )}
                  onClick={() => setSelectedListId(list.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: list.color || '#3B82F6' }}
                      >
                        <FolderOpen className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{list.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {list._count?.items || 0} عنصر
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-background/80"
                        onClick={(e) => {
                          e.stopPropagation()
                          openEditListDialog(list)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-background/80 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteList(list.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    {selectedListId === list.id && (
                      <div className="absolute bottom-2 left-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Selected List Content */}
        {selectedListId && selectedList && (
          <>
            {/* List Header */}
            <div className="mb-4 flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center text-white"
                style={{ backgroundColor: selectedList.color || '#3B82F6' }}
              >
                <FolderOpen className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedList.name}</h2>
                {selectedList.description && (
                  <p className="text-sm text-muted-foreground">{selectedList.description}</p>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجمالي العناصر</CardDescription>
                  <CardTitle className="text-3xl">{inventory.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>إجمالي الكمية</CardDescription>
                  <CardTitle className="text-3xl">
                    {inventory.reduce((sum, item) => sum + item.quantity, 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    إجمالي الداخل
                  </CardDescription>
                  <CardTitle className="text-3xl text-green-600">
                    {inventory.reduce((sum, item) => sum + item.incomingQty, 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    إجمالي الخارج
                  </CardDescription>
                  <CardTitle className="text-3xl text-red-600">
                    {inventory.reduce((sum, item) => sum + item.outgoingQty, 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن عنصر..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {/* Inventory Table */}
            <Card>
              <CardContent className="pt-6">
                {filteredInventory.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا توجد عناصر في هذه القائمة</p>
                    <p className="text-sm mt-2">اضغط على "إضافة عنصر" للبدء</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الاسم</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead>الشركة</TableHead>
                          <TableHead>النوع</TableHead>
                          <TableHead>الموديل</TableHead>
                          <TableHead className="text-center">الأمبير</TableHead>
                          <TableHead className="text-center">الجهد</TableHead>
                          <TableHead className="text-center">الفاز</TableHead>
                          <TableHead className="text-center">kW</TableHead>
                          <TableHead className="text-center">الكمية</TableHead>
                          <TableHead className="text-center">داخل</TableHead>
                          <TableHead className="text-center">خارج</TableHead>
                          <TableHead>الموقع</TableHead>
                          <TableHead className="text-center">إجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInventory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                              <Badge className={item.condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                                {item.condition === 'new' ? 'جديد' : 'مستعمل'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {item.company?.name || item.product?.company?.name ? (
                                <Badge variant="outline">
                                  {item.company?.name || item.product?.company?.name}
                                </Badge>
                              ) : '-'}
                            </TableCell>
                            <TableCell>
                              {item.category?.name || item.product?.category?.name ? (
                                <Badge variant="secondary">
                                  {item.category?.name || item.product?.category?.name}
                                </Badge>
                              ) : '-'}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {item.product?.model || '-'}
                            </TableCell>
                            <TableCell className="text-center">{item.amperage || '-'}</TableCell>
                            <TableCell className="text-center">{item.voltage || '-'}</TableCell>
                            <TableCell className="text-center">{item.phases ? `${item.phases}φ` : '-'}</TableCell>
                            <TableCell className="text-center">
                              {item.powerKw ? (
                                <Badge className="bg-amber-100 text-amber-800">
                                  {item.powerKw} kW
                                </Badge>
                              ) : '-'}
                            </TableCell>
                            <TableCell className="text-center font-medium">{item.quantity}</TableCell>
                            <TableCell className="text-center text-green-600">{item.incomingQty}</TableCell>
                            <TableCell className="text-center text-red-600">{item.outgoingQty}</TableCell>
                            <TableCell>{item.location || '-'}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex justify-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEditDialog(item)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* No list selected message */}
        {!selectedListId && lists.length > 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <ArrowRight className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">اختر قائمة للبدء</h3>
              <p className="text-muted-foreground">اضغط على إحدى القوائم أعلاه لعرض وإدارة العناصر</p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Edit List Dialog */}
      <Dialog open={isEditListDialogOpen} onOpenChange={setIsEditListDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل القائمة</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>اسم القائمة *</Label>
              <Input
                value={listFormData.name}
                onChange={(e) => setListFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="أدخل اسم القائمة"
              />
            </div>
            <div className="space-y-2">
              <Label>الوصف</Label>
              <Input
                value={listFormData.description}
                onChange={(e) => setListFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="وصف القائمة (اختياري)"
              />
            </div>
            <div className="space-y-2">
              <Label>اللون</Label>
              <div className="flex gap-2 flex-wrap">
                {listColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      listFormData.color === color ? "border-foreground scale-110" : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setListFormData(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button onClick={handleUpdateList} disabled={!listFormData.name}>
              حفظ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تعديل العنصر</DialogTitle>
          </DialogHeader>
          {renderForm()}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">إلغاء</Button>
            </DialogClose>
            <Button onClick={handleUpdateItem} disabled={!formData.name || submitting}>
              {submitting ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t bg-background/95 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>نظام جرد المعدات الكهربائية © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
