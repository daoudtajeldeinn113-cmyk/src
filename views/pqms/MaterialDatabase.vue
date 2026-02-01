<template>
  <div class="material-database">
    <!-- Header -->
    <div class="header">
      <h1>📦 Pharmaceutical Material Database</h1>
      <p class="subtitle">قاعدة بيانات المواد الدوائية - نظام إدارة متكامل للمواد وفق GMP</p>
    </div>

    <!-- Standards -->
    <div class="standards-badges">
      <span class="standard-badge gmp">GMP</span>
      <span class="standard-badge glp">GLP</span>
      <span class="standard-badge ich">ICH Q7</span>
      <span class="standard-badge usp">USP</span>
      <span class="standard-badge bp">BP</span>
      <span class="standard-badge ep">EP</span>
    </div>

    <!-- Main Container -->
    <div class="database-container">
      <!-- Left Panel: Filters & Actions -->
      <div class="left-panel">
        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2>⚡ Quick Actions / إجراءات سريعة</h2>
          <div class="action-buttons">
            <button @click="showAddMaterial = true" class="btn btn-success">
              ➕ Add New Material
            </button>
            <button @click="exportToExcel" class="btn btn-primary">
              📊 Export to Excel
            </button>
            <button @click="generateCOA" class="btn btn-info">
              🎫 Generate COA
            </button>
            <button @click="showExpired" class="btn btn-warning">
              ⚠️ Show Expired
            </button>
          </div>
        </div>

        <!-- Advanced Filters -->
        <div class="advanced-filters">
          <h2>🔍 Advanced Filters / فلاتر متقدمة</h2>
          
          <!-- Material Type Filter -->
          <div class="filter-section">
            <h3>Material Type / نوع المادة</h3>
            <div class="filter-options">
              <label v-for="type in materialTypes" :key="type.id" class="checkbox-label">
                <input type="checkbox" v-model="filters.types" :value="type.id">
                <span class="checkmark"></span>
                <span class="type-icon">{{ type.icon }}</span>
                <span>{{ type.name.en }}<br>{{ type.name.ar }}</span>
              </label>
            </div>
          </div>

          <!-- Supplier Filter -->
          <div class="filter-section">
            <h3>Supplier / المورد</h3>
            <select v-model="filters.supplier" class="filter-select">
              <option value="">All Suppliers / كل الموردين</option>
              <option v-for="supp in suppliers" :key="supp">{{ supp }}</option>
            </select>
          </div>

          <!-- Storage Conditions -->
          <div class="filter-section">
            <h3>Storage Conditions / ظروف التخزين</h3>
            <div class="storage-filters">
              <label class="checkbox-label">
                <input type="checkbox" v-model="filters.storage.controlledRoom">
                <span class="checkmark"></span>
                Controlled Room Temp (15-25°C)
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="filters.storage.refrigerated">
                <span class="checkmark"></span>
                Refrigerated (2-8°C)
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="filters.storage.frozen">
                <span class="checkmark"></span>
                Frozen (-20°C)
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="filters.storage.protectLight">
                <span class="checkmark"></span>
                Protect from Light
              </label>
            </div>
          </div>

          <!-- Risk Assessment -->
          <div class="filter-section">
            <h3>Risk Level / مستوى الخطورة</h3>
            <div class="risk-filters">
              <label class="risk-label low" :class="{ active: filters.risk === 'low' }" 
                     @click="filters.risk = 'low'">
                <span class="risk-dot"></span>
                Low / منخفض
              </label>
              <label class="risk-label medium" :class="{ active: filters.risk === 'medium' }" 
                     @click="filters.risk = 'medium'">
                <span class="risk-dot"></span>
                Medium / متوسط
              </label>
              <label class="risk-label high" :class="{ active: filters.risk === 'high' }" 
                     @click="filters.risk = 'high'">
                <span class="risk-dot"></span>
                High / مرتفع
              </label>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="database-stats">
          <h2>📈 Database Statistics / إحصائيات قاعدة البيانات</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">{{ totalMaterials }}</div>
              <div class="stat-label">Total Materials</div>
              <div class="stat-label-ar">إجمالي المواد</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ activeMaterials }}</div>
              <div class="stat-label">Active</div>
              <div class="stat-label-ar">نشطة</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ expiredMaterials }}</div>
              <div class="stat-label">Expired</div>
              <div class="stat-label-ar">منتهية</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ lowStockMaterials }}</div>
              <div class="stat-label">Low Stock</div>
              <div class="stat-label-ar">منخفضة المخزون</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Materials Table -->
      <div class="right-panel">
        <!-- Search Bar -->
        <div class="search-section">
          <div class="search-box">
            <input type="text" v-model="searchQuery" 
                   placeholder="Search by material code, name, or supplier... / ابحث برمز المادة، الاسم، أو المورد"
                   @input="performSearch">
            <span class="search-icon">🔍</span>
          </div>
          <div class="search-actions">
            <button @click="clearFilters" class="btn btn-outline">
              Clear Filters
            </button>
            <button @click="applyFilters" class="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </div>

        <!-- Materials Table -->
        <div class="materials-table">
          <div class="table-header">
            <div class="table-actions">
              <span class="results-count">
                Showing {{ filteredMaterials.length }} of {{ totalMaterials }} materials
              </span>
              <div class="view-options">
                <button @click="viewMode = 'table'" :class="{ active: viewMode === 'table' }" 
                        class="view-btn">
                  📋 Table
                </button>
                <button @click="viewMode = 'cards'" :class="{ active: viewMode === 'cards' }" 
                        class="view-btn">
                  🃏 Cards
                </button>
              </div>
            </div>
          </div>

          <!-- Table View -->
          <div v-if="viewMode === 'table'" class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th @click="sortBy('code')" class="sortable">
                    Code / الرمز
                    <span v-if="sortField === 'code'" class="sort-icon">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th @click="sortBy('name')" class="sortable">
                    Material Name / اسم المادة
                    <span v-if="sortField === 'name'" class="sort-icon">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th>Type / النوع</th>
                  <th>Supplier / المورد</th>
                  <th @click="sortBy('quantity')" class="sortable">
                    Quantity / الكمية
                    <span v-if="sortField === 'quantity'" class="sort-icon">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th @click="sortBy('expiryDate')" class="sortable">
                    Expiry / الانتهاء
                    <span v-if="sortField === 'expiryDate'" class="sort-icon">
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                  </th>
                  <th>Status / الحالة</th>
                  <th>Actions / إجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="material in paginatedMaterials" :key="material.id">
                  <td>
                    <span class="material-code">{{ material.code }}</span>
                  </td>
                  <td>
                    <div class="material-name">
                      <strong>{{ material.name.en }}</strong>
                      <small>{{ material.name.ar }}</small>
                    </div>
                    <div class="material-spec">
                      <small>Spec: {{ material.specification }}</small>
                    </div>
                  </td>
                  <td>
                    <span :class="'material-type ' + material.type">
                      <span class="type-icon">{{ getTypeIcon(material.type) }}</span>
                      {{ getTypeName(material.type) }}
                    </span>
                  </td>
                  <td>
                    <div class="supplier-info">
                      <strong>{{ material.supplier }}</strong>
                      <small>Lot: {{ material.batchNumber }}</small>
                    </div>
                  </td>
                  <td>
                    <div class="quantity-info">
                      <span class="quantity-value">{{ material.quantity }} {{ material.unit }}</span>
                      <div class="quantity-bar" :style="{ width: getQuantityPercentage(material) + '%' }"></div>
                      <small>Min: {{ material.minQuantity }} {{ material.unit }}</small>
                    </div>
                  </td>
                  <td>
                    <span :class="getExpiryClass(material.expiryDate)">
                      {{ formatDate(material.expiryDate) }}
                    </span>
                    <br>
                    <small>{{ getDaysRemaining(material.expiryDate) }} days remaining</small>
                  </td>
                  <td>
                    <span :class="'status-badge ' + material.status">
                      {{ getStatusText(material.status) }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click="viewMaterial(material)" class="btn btn-sm btn-info">
                        👁️ View
                      </button>
                      <button @click="editMaterial(material)" class="btn btn-sm btn-primary">
                        ✏️ Edit
                      </button>
                      <button @click="deleteMaterial(material.id)" class="btn btn-sm btn-danger">
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Card View -->
          <div v-else class="cards-container">
            <div class="cards-grid">
              <div v-for="material in paginatedMaterials" :key="material.id" class="material-card">
                <div class="card-header" :class="material.type">
                  <div class="card-type">
                    <span class="type-icon">{{ getTypeIcon(material.type) }}</span>
                    <span class="type-name">{{ getTypeName(material.type) }}</span>
                  </div>
                  <span class="material-code">{{ material.code }}</span>
                </div>
                
                <div class="card-body">
                  <h3>{{ material.name.en }}</h3>
                  <p class="material-name-ar">{{ material.name.ar }}</p>
                  
                  <div class="card-details">
                    <div class="detail-item">
                      <span class="detail-label">Supplier:</span>
                      <span class="detail-value">{{ material.supplier }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Batch:</span>
                      <span class="detail-value">{{ material.batchNumber }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Quantity:</span>
                      <span class="detail-value">{{ material.quantity }} {{ material.unit }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Expiry:</span>
                      <span :class="'detail-value ' + getExpiryClass(material.expiryDate)">
                        {{ formatDate(material.expiryDate) }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="card-spec">
                    <strong>Specification:</strong>
                    <p>{{ material.specification }}</p>
                  </div>
                </div>
                
                <div class="card-footer">
                  <span :class="'status-badge ' + material.status">
                    {{ getStatusText(material.status) }}
                  </span>
                  <div class="card-actions">
                    <button @click="viewMaterial(material)" class="btn btn-xs">View</button>
                    <button @click="editMaterial(material)" class="btn btn-xs">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
              ← Previous
            </button>
            
            <div class="page-numbers">
              <span v-for="page in pageNumbers" :key="page"
                    @click="goToPage(page)"
                    :class="{ active: currentPage === page }"
                    class="page-number">
                {{ page }}
              </span>
            </div>
            
            <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Material Modal -->
    <div v-if="showAddMaterial" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>➕ Add New Material / إضافة مادة جديدة</h2>
          <button @click="showAddMaterial = false" class="modal-close">×</button>
        </div>
        
        <div class="modal-body">
          <!-- Material Form will be added here -->
          <div class="form-placeholder">
            <p>Material addition form will be implemented here...</p>
            <button @click="showAddMaterial = false" class="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// View Mode
const viewMode = ref('table')

// Search & Filters
const searchQuery = ref('')
const filters = ref({
  types: [] as string[],
  supplier: '',
  storage: {
    controlledRoom: false,
    refrigerated: false,
    frozen: false,
    protectLight: false
  },
  risk: ''
})

// Sorting
const sortField = ref('code')
const sortDirection = ref('asc')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Modal
const showAddMaterial = ref(false)

// Material Types
const materialTypes = [
  { id: 'api', icon: '🧪', name: { en: 'API', ar: 'مادة فعالة' } },
  { id: 'excipient', icon: '⚗️', name: { en: 'Excipient', ar: 'مادة مساعدة' } },
  { id: 'solvent', icon: '💧', name: { en: 'Solvent', ar: 'مذيب' } },
  { id: 'packaging', icon: '📦', name: { en: 'Packaging', ar: 'مواد تعبئة' } },
  { id: 'raw', icon: '⛏️', name: { en: 'Raw Material', ar: 'مادة خام' } },
  { id: 'reagent', icon: '🧫', name: { en: 'Reagent', ar: 'كاشف' } }
]

// Sample Materials Data
const materials = ref([
  {
    id: 1,
    code: 'API-001',
    name: { en: 'Paracetamol', ar: 'باراسيتامول' },
    type: 'api',
    supplier: 'Global Pharma Ltd.',
    batchNumber: 'BATCH-2024-001',
    quantity: 50,
    unit: 'kg',
    minQuantity: 10,
    expiryDate: '2025-12-31',
    specification: 'USP Grade, Purity ≥99.5%',
    status: 'active',
    storage: 'controlledRoom',
    risk: 'medium'
  },
  {
    id: 2,
    code: 'EXC-001',
    name: { en: 'Lactose Monohydrate', ar: 'لاكتوز أحادي الهيدرات' },
    type: 'excipient',
    supplier: 'Excipient World',
    batchNumber: 'BATCH-2024-002',
    quantity: 100,
    unit: 'kg',
    minQuantity: 20,
    expiryDate: '2025-10-15',
    specification: 'Pharma Grade, Particle size 100-150μm',
    status: 'active',
    storage: 'controlledRoom',
    risk: 'low'
  },
  {
    id: 3,
    code: 'SOL-001',
    name: { en: 'Purified Water', ar: 'ماء منقى' },
    type: 'solvent',
    supplier: 'AquaPure Systems',
    batchNumber: 'BATCH-2024-003',
    quantity: 500,
    unit: 'L',
    minQuantity: 100,
    expiryDate: '2024-06-30',
    specification: 'USP Purified Water, Conductivity ≤1.3μS/cm',
    status: 'warning',
    storage: 'controlledRoom',
    risk: 'low'
  },
  {
    id: 4,
    code: 'PACK-001',
    name: { en: 'Aluminum Blister Foil', ar: 'رقائق ألومنيوم للتغليف' },
    type: 'packaging',
    supplier: 'Packaging Solutions Inc.',
    batchNumber: 'BATCH-2024-004',
    quantity: 5000,
    unit: 'rolls',
    minQuantity: 1000,
    expiryDate: '2026-05-20',
    specification: 'Pharma Grade, 40μm thickness',
    status: 'active',
    storage: 'controlledRoom',
    risk: 'low'
  },
  {
    id: 5,
    code: 'API-002',
    name: { en: 'Amoxicillin Trihydrate', ar: 'أموكسيسيلين ثلاثي الهيدرات' },
    type: 'api',
    supplier: 'Antibiotic Pharma',
    batchNumber: 'BATCH-2024-005',
    quantity: 25,
    unit: 'kg',
    minQuantity: 5,
    expiryDate: '2024-03-15',
    specification: 'BP Grade, Potency 98.5-101.5%',
    status: 'expired',
    storage: 'refrigerated',
    risk: 'high'
  }
])

// Suppliers List
const suppliers = computed(() => {
  const supplierSet = new Set(materials.value.map(m => m.supplier))
  return Array.from(supplierSet)
})

// Computed Properties
const totalMaterials = computed(() => materials.value.length)

const activeMaterials = computed(() => {
  return materials.value.filter(m => m.status === 'active').length
})

const expiredMaterials = computed(() => {
  return materials.value.filter(m => {
    if (!m.expiryDate) return false
    const expiry = new Date(m.expiryDate)
    const today = new Date()
    return expiry < today
  }).length
})

const lowStockMaterials = computed(() => {
  return materials.value.filter(m => m.quantity <= m.minQuantity * 1.5).length
})

// Filtered Materials
const filteredMaterials = computed(() => {
  let filtered = materials.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m => 
      m.code.toLowerCase().includes(query) ||
      m.name.en.toLowerCase().includes(query) ||
      m.name.ar.includes(query) ||
      m.supplier.toLowerCase().includes(query) ||
      m.batchNumber.toLowerCase().includes(query)
    )
  }

  // Type filter
  if (filters.value.types.length > 0) {
    filtered = filtered.filter(m => filters.value.types.includes(m.type))
  }

  // Supplier filter
  if (filters.value.supplier) {
    filtered = filtered.filter(m => m.supplier === filters.value.supplier)
  }

  // Risk filter
  if (filters.value.risk) {
    filtered = filtered.filter(m => m.risk === filters.value.risk)
  }

  // Storage filters
  const storageFilters = filters.value.storage
  const activeStorageFilters = Object.keys(storageFilters).filter(key => storageFilters[key])
  if (activeStorageFilters.length > 0) {
    filtered = filtered.filter(m => activeStorageFilters.includes(m.storage))
  }

  return filtered
})

// Sorted Materials
const sortedMaterials = computed(() => {
  const sorted = [...filteredMaterials.value]
  
  sorted.sort((a, b) => {
    let aValue = a[sortField.value]
    let bValue = b[sortField.value]
    
    // Handle nested objects
    if (sortField.value === 'name') {
      aValue = a.name.en
      bValue = b.name.en
    }
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
  
  return sorted
})

// Paginated Materials
const paginatedMaterials = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedMaterials.value.slice(start, end)
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(sortedMaterials.value.length / itemsPerPage)
})

const pageNumbers = computed(() => {
  const pages = []
  const maxPages = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)
  
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const performSearch = () => {
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    types: [],
    supplier: '',
    storage: {
      controlledRoom: false,
      refrigerated: false,
      frozen: false,
      protectLight: false
    },
    risk: ''
  }
  currentPage.value = 1
}

// Pagination Methods
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Material Methods
const getTypeIcon = (type: string) => {
  const typeObj = materialTypes.find(t => t.id === type)
  return typeObj ? typeObj.icon : '📦'
}

const getTypeName = (type: string) => {
  const typeObj = materialTypes.find(t => t.id === type)
  return typeObj ? typeObj.name.en : type
}

const getQuantityPercentage = (material: any) => {
  const max = material.minQuantity * 3 // Assuming max is 3x min
  return Math.min(100, (material.quantity / max) * 100)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB')
}

const getDaysRemaining = (expiryDate: string) => {
  const expiry = new Date(expiryDate)
  const today = new Date()
  const diffTime = expiry.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getExpiryClass = (expiryDate: string) => {
  const days = getDaysRemaining(expiryDate)
  if (days < 0) return 'expiry-expired'
  if (days < 30) return 'expiry-critical'
  if (days < 90) return 'expiry-warning'
  return 'expiry-good'
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'active': 'Active / نشط',
    'warning': 'Warning / تحذير',
    'expired': 'Expired / منتهي',
    'inactive': 'Inactive / غير نشط'
  }
  return statusMap[status] || status
}

// Action Methods
const viewMaterial = (material: any) => {
  alert(`Viewing material: ${material.name.en}\nCode: ${material.code}`)
}

const editMaterial = (material: any) => {
  alert(`Editing material: ${material.name.en}`)
}

const deleteMaterial = (id: number) => {
  if (confirm('Are you sure you want to delete this material?')) {
    materials.value = materials.value.filter(m => m.id !== id)
    alert('Material deleted successfully!')
  }
}

const exportToExcel = () => {
  alert('Export to Excel functionality will be implemented!')
}

const generateCOA = () => {
  alert('Generate COA functionality will be implemented!')
}

const showExpired = () => {
  filters.value = {
    ...filters.value,
    risk: 'high' // Just for demo
  }
  alert('Showing expired and near-expiry materials')
}

// Lifecycle
onMounted(() => {
  // Load materials from localStorage or API
  const savedMaterials = localStorage.getItem('pharma_materials')
  if (savedMaterials) {
    materials.value = JSON.parse(savedMaterials)
  }
})
</script>

<style scoped>
.material-database {
  padding: 20px;
  max-width: 1800px;
  margin: 0 auto;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #0066cc 0%, #003366 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Standards Badges */
.standards-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.standard-badge {
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.gmp { background: linear-gradient(135deg, #007bff, #0056b3); }
.glp { background: linear-gradient(135deg, #28a745, #1e7e34); }
.ich { background: linear-gradient(135deg, #6f42c1, #4e2d8c); }
.usp { background: linear-gradient(135deg, #dc3545, #a71d2a); }
.bp { background: linear-gradient(135deg, #fd7e14, #d9480f); }
.ep { background: linear-gradient(135deg, #17a2b8, #0f6675); }

/* Main Container */
.database-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 30px;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .database-container {
    grid-template-columns: 1fr;
  }
}

/* Left Panel */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.quick-actions, .advanced-filters, .database-stats {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.quick-actions h2, .advanced-filters h2, .database-stats h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
}

/* Action Buttons */
.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.btn {
  padding: 12px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-success { background: #28a745; color: white; }
.btn-primary { background: #007bff; color: white; }
.btn-info { background: #17a2b8; color: white; }
.btn-warning { background: #ffc107; color: #212529; }
.btn-outline { background: white; border: 2px solid #6c757d; color: #6c757d; }
.btn-danger { background: #dc3545; color: white; }

.btn-sm { padding: 8px 12px; font-size: 0.9rem; }
.btn-xs { padding: 5px 10px; font-size: 0.8rem; }

/* Filter Sections */
.filter-section {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dee2e6;
}

.filter-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.filter-section h3 {
  color: #495057;
  margin-bottom: 10px;
  font-size: 1rem;
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  transition: background 0.3s;
}

.checkbox-label:hover {
  background: #f8f9fa;
}

.type-icon {
  font-size: 1.2rem;
}

.filter-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

/* Storage Filters */
.storage-filters {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Risk Filters */
.risk-filters {
  display: flex;
  gap: 10px;
}

.risk-label {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.risk-label:hover {
  opacity: 0.9;
}

.risk-label.active {
  border-color: currentColor;
  font-weight: bold;
}

.risk-label.low { background: #d4edda; color: #155724; }
.risk-label.medium { background: #fff3cd; color: #856404; }
.risk-label.high { background: #f8d7da; color: #721c24; }

.risk-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.low .risk-dot { background: #28a745; }
.medium .risk-dot { background: #ffc107; }
.high .risk-dot { background: #dc3545; }

/* Statistics */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.stat-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #dee2e6;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.stat-label, .stat-label-ar {
  display: block;
  color: #6c757d;
  font-size: 0.9rem;
}

/* Right Panel */
.right-panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Search Section */
.search-section {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-box {
  flex: 1;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #007bff;
  border-radius: 25px;
  font-size: 1rem;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #6c757d;
}

.search-actions {
  display: flex;
  gap: 10px;
}

/* Materials Table */
.table-header {
  margin-bottom: 15px;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.results-count {
  color: #6c757d;
  font-size: 0.9rem;
}

.view-options {
  display: flex;
  gap: 10px;
}

.view-btn {
  padding: 8px 15px;
  border: 2px solid #dee2e6;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  border-color: #007bff;
}

.view-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

/* Data Table */
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th {
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
}

.data-table tr:hover {
  background: #f8f9fa;
}

/* Sortable Columns */
.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #e9ecef;
}

.sort-icon {
  margin-left: 5px;
  font-weight: bold;
}

/* Material Type Styling */
.material-type {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: bold;
}

.material-type.api { background: #e3f2fd; color: #1565c0; }
.material-type.excipient { background: #f3e5f5; color: #7b1fa2; }
.material-type.solvent { background: #e8f5e8; color: #2e7d32; }
.material-type.packaging { background: #fff3e0; color: #ef6c00; }
.material-type.raw { background: #f5f5f5; color: #455a64; }
.material-type.reagent { background: #fce4ec; color: #c2185b; }

/* Quantity Bar */
.quantity-info {
  position: relative;
}

.quantity-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  background: #28a745;
  border-radius: 2px;
}

/* Expiry Date Styling */
.expiry-expired { color: #dc3545; font-weight: bold; }
.expiry-critical { color: #dc3545; font-weight: bold; }
.expiry-warning { color: #ffc107; font-weight: bold; }
.expiry-good { color: #28a745; font-weight: bold; }

/* Status Badges */
.status-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.status-badge.active { background: #d4edda; color: #155724; }
.status-badge.warning { background: #fff3cd; color: #856404; }
.status-badge.expired { background: #f8d7da; color: #721c24; }
.status-badge.inactive { background: #e2e3e5; color: #383d41; }

/* Action Buttons in Table */
.action-buttons {
  display: flex;
  gap: 5px;
}

/* Cards View */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.material-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.material-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.card-header {
  padding: 15px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header.api { background: linear-gradient(135deg, #2196f3, #0d47a1); }
.card-header.excipient { background: linear-gradient(135deg, #9c27b0, #4a148c); }
.card-header.solvent { background: linear-gradient(135deg, #4caf50, #1b5e20); }
.card-header.packaging { background: linear-gradient(135deg, #ff9800, #e65100); }
.card-header.raw { background: linear-gradient(135deg, #607d8b, #37474f); }
.card-header.reagent { background: linear-gradient(135deg, #e91e63, #880e4f); }

.card-type {
  display: flex;
  align-items: center;
  gap: 10px;
}

.type-icon {
  font-size: 1.5rem;
}

.card-body {
  padding: 20px;
}

.card-body h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.material-name-ar {
  color: #6c757d;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.card-details {
  margin: 15px 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: bold;
  color: #495057;
}

.detail-value {
  color: #6c757d;
}

.card-spec {
  margin-top: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
  font-size: 0.9rem;
}

.card-spec p {
  margin: 5px 0 0 0;
  color: #6c757d;
}

.card-footer {
  padding: 15px;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-actions {
  display: flex;
  gap: 5px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination-btn {
  padding: 8px 15px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-number {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover {
  background: #f8f9fa;
}

.page-number.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px;
  background: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .database-container {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .search-section {
    flex-direction: column;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-options {
    grid-template-columns: 1fr;
  }
  
  .risk-filters {
    flex-direction: column;
  }
}
</style>
