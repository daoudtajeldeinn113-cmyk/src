<template>
  <div class="test-store">
    <!-- Header -->
    <div class="header">
      <h1>🧪 PQMS Test Module</h1>
      <p class="subtitle">نظام اختبار إدارة الجودة الدوائية - وحدة الاختبار والتجربة</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
        class="tab-button"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Materials Management -->
      <div v-if="activeTab === 'materials'" class="tab-pane">
        <h2>📦 إدارة المواد</h2>
        <div class="form-section">
          <div class="form-group">
            <label for="materialName">اسم المادة:</label>
            <input type="text" id="materialName" v-model="newMaterial.name" placeholder="أدخل اسم المادة">
          </div>
          
          <div class="form-group">
            <label for="materialType">نوع المادة:</label>
            <select id="materialType" v-model="newMaterial.type">
              <option value="api">مادة فعالة (API)</option>
              <option value="excipient">مادة مساعدة (Excipient)</option>
              <option value="packaging">مواد تعبئة</option>
              <option value="raw">مادة خام</option>
            </select>
          </div>

          <div class="form-group">
            <label for="materialCode">الكود:</label>
            <input type="text" id="materialCode" v-model="newMaterial.code" placeholder="أدخل كود المادة">
          </div>

          <div class="form-group">
            <label for="materialQuantity">الكمية:</label>
            <input type="number" id="materialQuantity" v-model="newMaterial.quantity" placeholder="أدخل الكمية">
          </div>

          <div class="form-group">
            <label for="materialUnit">الوحدة:</label>
            <select id="materialUnit" v-model="newMaterial.unit">
              <option value="kg">كيلوجرام (kg)</option>
              <option value="g">جرام (g)</option>
              <option value="mg">مليجرام (mg)</option>
              <option value="L">لتر (L)</option>
              <option value="mL">مليلتر (mL)</option>
              <option value="piece">قطعة</option>
            </select>
          </div>

          <button @click="addMaterial" class="btn btn-success">➕ إضافة مادة</button>
        </div>

        <!-- Materials List -->
        <div class="table-section" v-if="materials.length > 0">
          <h3>قائمة المواد ({{ materials.length }})</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>الكود</th>
                <th>الاسم</th>
                <th>النوع</th>
                <th>الكمية</th>
                <th>الوحدة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in materials" :key="material.id">
                <td>{{ material.code }}</td>
                <td>{{ material.name }}</td>
                <td>
                  <span class="badge" :class="getMaterialTypeClass(material.type)">
                    {{ getMaterialTypeText(material.type) }}
                  </span>
                </td>
                <td>{{ material.quantity || 0 }}</td>
                <td>{{ material.unit }}</td>
                <td>
                  <button @click="editMaterial(material)" class="btn btn-sm btn-primary">تعديل</button>
                  <button @click="deleteMaterial(material.id)" class="btn btn-sm btn-danger">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Products Management -->
      <div v-if="activeTab === 'products'" class="tab-pane">
        <h2>📊 إدارة المنتجات</h2>
        <div class="form-section">
          <div class="form-group">
            <label for="productName">اسم المنتج:</label>
            <input type="text" id="productName" v-model="newProduct.name" placeholder="أدخل اسم المنتج">
          </div>
          
          <div class="form-group">
            <label for="productType">نوع المنتج:</label>
            <select id="productType" v-model="newProduct.type">
              <option value="tablet">أقراص</option>
              <option value="capsule">كبسولات</option>
              <option value="syrup">شراب</option>
              <option value="injection">حقن</option>
              <option value="cream">كريم</option>
            </select>
          </div>

          <div class="form-group">
            <label for="productCode">الكود:</label>
            <input type="text" id="productCode" v-model="newProduct.code" placeholder="أدخل كود المنتج">
          </div>

          <div class="form-group">
            <label for="productStrength">التركيز:</label>
            <input type="text" id="productStrength" v-model="newProduct.strength" placeholder="مثال: 500mg">
          </div>

          <button @click="addProduct" class="btn btn-success">➕ إضافة منتج</button>
        </div>

        <!-- Products List -->
        <div class="table-section" v-if="products.length > 0">
          <h3>قائمة المنتجات ({{ products.length }})</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>الكود</th>
                <th>الاسم</th>
                <th>النوع</th>
                <th>التركيز</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>
                  <span class="badge" :class="getProductTypeClass(product.type)">
                    {{ getProductTypeText(product.type) }}
                  </span>
                </td>
                <td>{{ product.strength }}</td>
                <td>
                  <span class="status-badge approved">معتمد</span>
                </td>
                <td>
                  <button @click="editProduct(product)" class="btn btn-sm btn-primary">تعديل</button>
                  <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Search Tab -->
      <div v-if="activeTab === 'search'" class="tab-pane">
        <h2>🔍 بحث</h2>
        <div class="search-section">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="ابحث عن مادة أو منتج..."
              @input="performSearch"
              class="search-input"
            >
            <span class="search-icon">🔍</span>
          </div>

          <!-- Search Results -->
          <div v-if="searchResults.length > 0" class="search-results">
            <h3>نتائج البحث ({{ searchResults.length }})</h3>
            <div class="results-grid">
              <div v-for="item in searchResults" :key="item.id" class="result-card">
                <div class="result-header">
                  <span class="result-type">{{ item.type === 'material' ? '📦 مادة' : '📊 منتج' }}</span>
                  <span class="result-code">{{ item.code }}</span>
                </div>
                <div class="result-body">
                  <h4>{{ item.name }}</h4>
                  <p v-if="item.description">{{ item.description }}</p>
                  <div class="result-meta">
                    <span>تاريخ الإضافة: {{ item.date || new Date().toLocaleDateString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="searchQuery" class="no-results">
            <p>لا توجد نتائج لـ "{{ searchQuery }}"</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
          <div class="stat-value">{{ materials.length }}</div>
          <div class="stat-label">المواد</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-value">{{ products.length }}</div>
          <div class="stat-label">المنتجات</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// تعريف البيانات
const activeTab = ref('materials')
const searchQuery = ref('')
const searchResults = ref<any[]>([])

const tabs = [
  { id: 'materials', name: '📦 إدارة المواد' },
  { id: 'products', name: '📊 إدارة المنتجات' },
  { id: 'search', name: '🔍 بحث' }
]

const newMaterial = ref({
  name: '',
  type: 'api',
  code: '',
  quantity: 0,
  unit: 'kg'
})

const newProduct = ref({
  name: '',
  type: 'tablet',
  code: '',
  strength: ''
})

const materials = ref<any[]>([])
const products = ref<any[]>([])

// دورة الحياة
onMounted(() => {
  loadData()
})

// دوال المواد
const addMaterial = () => {
  if (!newMaterial.value.name || !newMaterial.value.code) {
    alert('الرجاء إدخال اسم المادة والكود')
    return
  }

  const material = {
    id: Date.now(),
    ...newMaterial.value,
    date: new Date().toISOString()
  }

  materials.value.push(material)
  saveMaterials()
  
  // إعادة تعيين النموذج
  newMaterial.value = {
    name: '',
    type: 'api',
    code: '',
    quantity: 0,
    unit: 'kg'
  }
}

const editMaterial = (material: any) => {
  // تنفيذ التعديل
}

const deleteMaterial = (id: number) => {
  materials.value = materials.value.filter(m => m.id !== id)
  saveMaterials()
}

// دوال المنتجات
const addProduct = () => {
  if (!newProduct.value.name || !newProduct.value.code) {
    alert('الرجاء إدخال اسم المنتج والكود')
    return
  }

  const product = {
    id: Date.now(),
    ...newProduct.value,
    date: new Date().toISOString(),
    status: 'approved'
  }

  products.value.push(product)
  saveProducts()
  
  // إعادة تعيين النموذج
  newProduct.value = {
    name: '',
    type: 'tablet',
    code: '',
    strength: ''
  }
}

const editProduct = (product: any) => {
  // تنفيذ التعديل
}

const deleteProduct = (id: number) => {
  products.value = products.value.filter(p => p.id !== id)
  saveProducts()
}

// البحث
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  const query = searchQuery.value.toLowerCase()
  
  const materialResults = materials.value
    .filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.code.toLowerCase().includes(query) ||
      m.type.toLowerCase().includes(query)
    )
    .map(m => ({ ...m, resultType: 'material' }))

  const productResults = products.value
    .filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.code.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query)
    )
    .map(p => ({ ...p, resultType: 'product' }))

  searchResults.value = [...materialResults, ...productResults]
}

// التخزين المحلي
const saveMaterials = () => {
  localStorage.setItem('pqms_materials', JSON.stringify(materials.value))
}

const saveProducts = () => {
  localStorage.setItem('pqms_products', JSON.stringify(products.value))
}

const loadData = () => {
  const storedMaterials = localStorage.getItem('pqms_materials')
  const storedProducts = localStorage.getItem('pqms_products')
  
  if (storedMaterials) {
    materials.value = JSON.parse(storedMaterials)
  }
  
  if (storedProducts) {
    products.value = JSON.parse(storedProducts)
  }
}

// دوال مساعدة
const getMaterialTypeClass = (type: string) => {
  switch(type) {
    case 'api': return 'badge-primary'
    case 'excipient': return 'badge-secondary'
    case 'packaging': return 'badge-info'
    case 'raw': return 'badge-warning'
    default: return 'badge-light'
  }
}

const getMaterialTypeText = (type: string) => {
  switch(type) {
    case 'api': return 'مادة فعالة'
    case 'excipient': return 'مادة مساعدة'
    case 'packaging': return 'مواد تعبئة'
    case 'raw': return 'مادة خام'
    default: return type
  }
}

const getProductTypeClass = (type: string) => {
  switch(type) {
    case 'tablet': return 'badge-primary'
    case 'capsule': return 'badge-secondary'
    case 'syrup': return 'badge-success'
    case 'injection': return 'badge-danger'
    case 'cream': return 'badge-warning'
    default: return 'badge-light'
  }
}

const getProductTypeText = (type: string) => {
  switch(type) {
    case 'tablet': return 'أقراص'
    case 'capsule': return 'كبسولات'
    case 'syrup': return 'شراب'
    case 'injection': return 'حقن'
    case 'cream': return 'كريم'
    default: return type
  }
}
</script>

<style scoped>
.test-store {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.tab-button {
  padding: 10px 20px;
  border: none;
  background: #f8f9fa;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.tab-button:hover {
  background: #e9ecef;
}

.tab-button.active {
  background: #3498db;
  color: white;
  font-weight: bold;
}

.tab-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.tab-pane h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.form-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 0.9rem;
}

.table-section {
  margin-top: 30px;
}

.table-section h3 {
  color: #495057;
  margin-bottom: 15px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: right;
  border-bottom: 1px solid #dee2e6;
}

.data-table th {
  background: #f8f9fa;
  font-weight: bold;
  color: #495057;
}

.badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.badge-primary { background: #007bff; color: white; }
.badge-secondary { background: #6c757d; color: white; }
.badge-info { background: #17a2b8; color: white; }
.badge-warning { background: #ffc107; color: #212529; }
.badge-success { background: #28a745; color: white; }
.badge-light { background: #f8f9fa; color: #212529; }

.status-badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status-badge.approved {
  background: #28a745;
  color: white;
}

.stats {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.search-section {
  margin-top: 20px;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 20px;
  border: 2px solid #3498db;
  border-radius: 25px;
  font-size: 1rem;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.search-results {
  margin-top: 20px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.result-card {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.result-header {
  background: #f8f9fa;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.result-body {
  padding: 15px;
}

.result-body h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.result-meta {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 10px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}
</style>
