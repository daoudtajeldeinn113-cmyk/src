<template>
  <div class="test-store">
    <div class="test-store-header">
      <h3>🧪 نظام إدارة المواد PQMS</h3>
      <p class="subtitle">إدارة المواد الخام والمنتجات النهائية</p>
    </div>

    <div class="stats-display">
      <div class="stat-item">
        <div class="stat-label">المواد المسجلة</div>
        <div class="stat-value">{{ materials.length }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">المنتجات المسجلة</div>
        <div class="stat-value">{{ products.length }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">إجمالي العناصر</div>
        <div class="stat-value">{{ totalItems }}</div>
      </div>
    </div>

    <div class="tabs">
      <button 
        @click="activeTab = 'materials'" 
        :class="{ active: activeTab === 'materials' }"
        class="tab-btn"
      >
        📦 إدارة المواد
      </button>
      <button 
        @click="activeTab = 'products'" 
        :class="{ active: activeTab === 'products' }"
        class="tab-btn"
      >
        🏭 إدارة المنتجات
      </button>
      <button 
        @click="activeTab = 'search'" 
        :class="{ active: activeTab === 'search' }"
        class="tab-btn"
      >
        🔍 البحث والتصفية
      </button>
    </div>

    <!-- نموذج إضافة مادة -->
    <div v-if="activeTab === 'materials'" class="form-section">
      <h4>📝 إضافة مادة جديدة</h4>
      <form @submit.prevent="addMaterial" class="material-form">
        <div class="form-row">
          <div class="form-group">
            <label for="materialName">اسم المادة *</label>
            <input 
              id="materialName" 
              v-model="newMaterial.name" 
              type="text" 
              placeholder="أدخل اسم المادة"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="materialCode">الكود *</label>
            <input 
              id="materialCode" 
              v-model="newMaterial.code" 
              type="text" 
              placeholder="MAT-001"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="materialType">النوع *</label>
            <select id="materialType" v-model="newMaterial.type" required>
              <option value="">اختر نوع المادة</option>
              <option value="api">مادة فعالة (API)</option>
              <option value="excipient">مادة مالئة (Excipient)</option>
              <option value="solvent">مذيب (Solvent)</option>
              <option value="packaging">مادة تغليف</option>
              <option value="reagent">كاشف (Reagent)</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="materialSupplier">المورد</label>
            <input 
              id="materialSupplier" 
              v-model="newMaterial.supplier" 
              type="text" 
              placeholder="اسم المورد"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="materialBatch">رقم الدفعة *</label>
            <input 
              id="materialBatch" 
              v-model="newMaterial.batchNumber" 
              type="text" 
              placeholder="BATCH-2024-001"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="materialQuantity">الكمية *</label>
            <div class="quantity-input">
              <input 
                id="materialQuantity" 
                v-model.number="newMaterial.quantity" 
                type="number" 
                min="0.01"
                step="0.01"
                required
              />
              <select v-model="newMaterial.unit">
                <option value="kg">كيلوجرام</option>
                <option value="g">جرام</option>
                <option value="mg">مليجرام</option>
                <option value="L">لتر</option>
                <option value="mL">مليلتر</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label for="materialSpecs">المواصفات</label>
            <textarea 
              id="materialSpecs" 
              v-model="newMaterial.specifications" 
              rows="3"
              placeholder="أدخل المواصفات الفنية للمادة..."
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            💾 حفظ المادة
          </button>
          <button type="button" @click="resetMaterialForm" class="btn btn-secondary">
            ↻ مسح النموذج
          </button>
        </div>
      </form>

      <!-- قائمة المواد -->
      <div class="materials-list" v-if="materials.length > 0">
        <h5>📋 المواد المسجلة ({{ materials.length }})</h5>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>الكود</th>
                <th>الاسم</th>
                <th>النوع</th>
                <th>الدفعة</th>
                <th>الكمية</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="material in materials" :key="material.id">
                <td>{{ material.code }}</td>
                <td>{{ material.name }}</td>
                <td><span class="badge">{{ getMaterialTypeLabel(material.type) }}</span></td>
                <td>{{ material.batchNumber }}</td>
                <td>{{ material.quantity }} {{ material.unit }}</td>
                <td>
                  <button @click="viewMaterial(material)" class="btn-icon" title="عرض">
                    👁️
                  </button>
                  <button @click="deleteMaterial(material.id)" class="btn-icon delete" title="حذف">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- نموذج إضافة منتج -->
    <div v-if="activeTab === 'products'" class="form-section">
      <h4>🏭 إضافة منتج جديد</h4>
      <form @submit.prevent="addProduct" class="product-form">
        <div class="form-row">
          <div class="form-group">
            <label for="productName">اسم المنتج *</label>
            <input 
              id="productName" 
              v-model="newProduct.name" 
              type="text" 
              placeholder="أدخل اسم المنتج"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="productCode">الكود *</label>
            <input 
              id="productCode" 
              v-model="newProduct.code" 
              type="text" 
              placeholder="PROD-001"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="productType">النوع *</label>
            <select id="productType" v-model="newProduct.type" required>
              <option value="">اختر نوع المنتج</option>
              <option value="tablet">أقراص</option>
              <option value="capsule">كبسولات</option>
              <option value="syrup">شراب</option>
              <option value="injection">حقن</option>
              <option value="ointment">مرهم</option>
              <option value="cream">كريم</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="productStrength">التركيز</label>
            <input 
              id="productStrength" 
              v-model="newProduct.strength" 
              type="text" 
              placeholder="مثال: 500mg"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="productBatch">رقم الدفعة *</label>
            <input 
              id="productBatch" 
              v-model="newProduct.batchNumber" 
              type="text" 
              placeholder="BATCH-2024-001"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="productQuantity">الكمية *</label>
            <div class="quantity-input">
              <input 
                id="productQuantity" 
                v-model.number="newProduct.quantity" 
                type="number" 
                min="1"
                required
              />
              <select v-model="newProduct.unit">
                <option value="unit">وحدة</option>
                <option value="box">علبة</option>
                <option value="carton">كرتون</option>
                <option value="pallet">بالت</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group full-width">
            <label for="productComposition">التركيبة</label>
            <textarea 
              id="productComposition" 
              v-model="newProduct.composition" 
              rows="3"
              placeholder="أدخل مكونات المنتج..."
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-success">
            💾 حفظ المنتج
          </button>
          <button type="button" @click="resetProductForm" class="btn btn-secondary">
            ↻ مسح النموذج
          </button>
        </div>
      </form>

      <!-- قائمة المنتجات -->
      <div class="products-list" v-if="products.length > 0">
        <h5>📦 المنتجات المسجلة ({{ products.length }})</h5>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>الكود</th>
                <th>الاسم</th>
                <th>النوع</th>
                <th>الدفعة</th>
                <th>الكمية</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td><span class="badge">{{ getProductTypeLabel(product.type) }}</span></td>
                <td>{{ product.batchNumber }}</td>
                <td>{{ product.quantity }} {{ product.unit }}</td>
                <td>
                  <button @click="viewProduct(product)" class="btn-icon" title="عرض">
                    👁️
                  </button>
                  <button @click="deleteProduct(product.id)" class="btn-icon delete" title="حذف">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- البحث والتصفية -->
    <div v-if="activeTab === 'search'" class="search-section">
      <h4>🔍 بحث في المواد والمنتجات</h4>
      
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="ابحث بالاسم أو الكود أو الدفعة..."
          @input="performSearch"
        />
        <button class="btn btn-primary">
          🔍 بحث
        </button>
      </div>

      <div class="search-results">
        <div v-if="searchResults.length > 0">
          <h5>نتائج البحث ({{ searchResults.length }})</h5>
          <div class="results-grid">
            <div v-for="item in searchResults" :key="item.id" class="result-card">
              <div class="result-header">
                <span class="result-type" :class="item.type === 'material' ? 'material' : 'product'">
                  {{ item.type === 'material' ? '📦 مادة' : '🏭 منتج' }}
                </span>
                <span class="result-code">{{ item.code }}</span>
              </div>
              <div class="result-body">
                <h6>{{ item.name }}</h6>
                <p v-if="item.batchNumber">الدفعة: {{ item.batchNumber }}</p>
                <p>الكمية: {{ item.quantity }} {{ item.unit }}</p>
                <p v-if="item.type === 'material' && item.supplier">المورد: {{ item.supplier }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <p>🔍 ابدأ بالبحث عن المواد أو المنتجات المسجلة</p>
        </div>
      </div>
    </div>

    <!-- رسالة نجاح -->
    <div v-if="successMessage" class="success-message">
      ✅ {{ successMessage }}
      <button @click="successMessage = ''" class="close-btn">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

interface Material {
  id: number;
  code: string;
  name: string;
  type: string;
  supplier: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  specifications: string;
}

interface Product {
  id: number;
  code: string;
  name: string;
  type: string;
  strength: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  composition: string;
}

// البيانات التفاعلية
const activeTab = ref<'materials' | 'products' | 'search'>('materials');
const materials = ref<Material[]>([]);
const products = ref<Product[]>([]);
const searchQuery = ref('');
const searchResults = ref<any[]>([]);
const successMessage = ref('');

// نموذج مادة جديد
const newMaterial = reactive({
  name: '',
  code: '',
  type: '',
  supplier: '',
  batchNumber: '',
  quantity: 1,
  unit: 'kg',
  specifications: ''
});

// نموذج منتج جديد
const newProduct = reactive({
  name: '',
  code: '',
  type: '',
  strength: '',
  batchNumber: '',
  quantity: 1,
  unit: 'unit',
  composition: ''
});

// الإحصائيات
const totalItems = computed(() => materials.value.length + products.value.length);

// إضافة مادة جديدة
const addMaterial = () => {
  const material: Material = {
    id: Date.now(),
    code: newMaterial.code,
    name: newMaterial.name,
    type: newMaterial.type,
    supplier: newMaterial.supplier,
    batchNumber: newMaterial.batchNumber,
    quantity: newMaterial.quantity,
    unit: newMaterial.unit,
    specifications: newMaterial.specifications
  };
  
  materials.value.push(material);
  successMessage.value = `تم إضافة المادة "${material.name}" بنجاح`;
  resetMaterialForm();
  saveToLocalStorage();
};

// إضافة منتج جديد
const addProduct = () => {
  const product: Product = {
    id: Date.now(),
    code: newProduct.code,
    name: newProduct.name,
    type: newProduct.type,
    strength: newProduct.strength,
    batchNumber: newProduct.batchNumber,
    quantity: newProduct.quantity,
    unit: newProduct.unit,
    composition: newProduct.composition
  };
  
  products.value.push(product);
  successMessage.value = `تم إضافة المنتج "${product.name}" بنجاح`;
  resetProductForm();
  saveToLocalStorage();
};

// إعادة تعيين نموذج المادة
const resetMaterialForm = () => {
  newMaterial.name = '';
  newMaterial.code = '';
  newMaterial.type = '';
  newMaterial.supplier = '';
  newMaterial.batchNumber = '';
  newMaterial.quantity = 1;
  newMaterial.unit = 'kg';
  newMaterial.specifications = '';
};

// إعادة تعيين نموذج المنتج
const resetProductForm = () => {
  newProduct.name = '';
  newProduct.code = '';
  newProduct.type = '';
  newProduct.strength = '';
  newProduct.batchNumber = '';
  newProduct.quantity = 1;
  newProduct.unit = 'unit';
  newProduct.composition = '';
};

// حذف مادة
const deleteMaterial = (id: number) => {
  if (confirm('هل أنت متأكد من حذف هذه المادة؟')) {
    materials.value = materials.value.filter(m => m.id !== id);
    successMessage.value = 'تم حذف المادة بنجاح';
    saveToLocalStorage();
  }
};

// حذف منتج
const deleteProduct = (id: number) => {
  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    products.value = products.value.filter(p => p.id !== id);
    successMessage.value = 'تم حذف المنتج بنجاح';
    saveToLocalStorage();
  }
};

// عرض تفاصيل المادة
const viewMaterial = (material: Material) => {
  alert(`تفاصيل المادة:
  
الاسم: ${material.name}
الكود: ${material.code}
النوع: ${getMaterialTypeLabel(material.type)}
المورد: ${material.supplier || 'غير محدد'}
الدفعة: ${material.batchNumber}
الكمية: ${material.quantity} ${material.unit}

المواصفات:
${material.specifications || 'لا توجد مواصفات'}`);
};

// عرض تفاصيل المنتج
const viewProduct = (product: Product) => {
  alert(`تفاصيل المنتج:
  
الاسم: ${product.name}
الكود: ${product.code}
النوع: ${getProductTypeLabel(product.type)}
التركيز: ${product.strength || 'غير محدد'}
الدفعة: ${product.batchNumber}
الكمية: ${product.quantity} ${product.unit}

التركيبة:
${product.composition || 'لا توجد تفاصيل'}`);
};

// البحث
const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  
  const query = searchQuery.value.toLowerCase();
  const allItems = [
    ...materials.value.map(m => ({ ...m, itemType: 'material' })),
    ...products.value.map(p => ({ ...p, itemType: 'product' }))
  ];
  
  searchResults.value = allItems.filter(item => 
    item.name.toLowerCase().includes(query) ||
    item.code.toLowerCase().includes(query) ||
    item.batchNumber.toLowerCase().includes(query) ||
    (item.itemType === 'material' && item.supplier?.toLowerCase().includes(query))
  );
};

// دوال مساعدة للعرض
const getMaterialTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    'api': 'مادة فعالة',
    'excipient': 'مادة مالئة',
    'solvent': 'مذيب',
    'packaging': 'تغليف',
    'reagent': 'كاشف'
  };
  return types[type] || type;
};

const getProductTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    'tablet': 'أقراص',
    'capsule': 'كبسولات',
    'syrup': 'شراب',
    'injection': 'حقن',
    'ointment': 'مرهم',
    'cream': 'كريم'
  };
  return types[type] || type;
};

// حفظ البيانات في localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('pqms_materials', JSON.stringify(materials.value));
  localStorage.setItem('pqms_products', JSON.stringify(products.value));
};

// تحميل البيانات من localStorage
const loadFromLocalStorage = () => {
  const savedMaterials = localStorage.getItem('pqms_materials');
  const savedProducts = localStorage.getItem('pqms_products');
  
  if (savedMaterials) {
    materials.value = JSON.parse(savedMaterials);
  }
  
  if (savedProducts) {
    products.value = JSON.parse(savedProducts);
  }
};

// تحميل البيانات عند بدء التشغيل
onMounted(() => {
  loadFromLocalStorage();
});
</script>

<style scoped>
.test-store {
  background: #ffffff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.test-store-header {
  margin-bottom: 25px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
}

.test-store-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 22px;
}

.subtitle {
  color: #7f8c8d;
  margin-top: 5px;
  font-size: 14px;
}

.stats-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.stat-item {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #dee2e6;
}

.stat-label {
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 15px;
}

.tab-btn {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #6c757d;
  transition: all 0.3s;
}

.tab-btn:hover {
  color: #007bff;
}

.tab-btn.active {
  color: #007bff;
  border-bottom-color: #007bff;
  background-color: #f8f9fa;
  border-radius: 6px 6px 0 0;
}

.form-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
}

.form-section h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dee2e6;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #495057;
  font-weight: 500;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.3s;
  background: white;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
}

.quantity-input {
  display: flex;
  gap: 10px;
}

.quantity-input input {
  flex: 2;
}

.quantity-input select {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #dee2e6;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #1e7e34;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

table thead {
  background-color: #007bff;
  color: white;
}

table th {
  padding: 15px;
  text-align: right;
  font-weight: 600;
}

table td {
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
  color: #495057;
}

table tbody tr:hover {
  background-color: #f8f9fa;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  background: #e9ecef;
  color: #495057;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  margin: 0 3px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-icon:hover {
  background-color: #f8f9fa;
}

.btn-icon.delete:hover {
  background-color: #f8d7da;
  color: #721c24;
}

.search-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 25px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.search-box input {
  flex: 1;
  padding: 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 16px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.result-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #dee2e6;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.result-type {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.result-type.material {
  background: #d1ecf1;
  color: #0c5460;
}

.result-type.product {
  background: #d4edda;
  color: #155724;
}

.result-code {
  font-family: monospace;
  font-weight: bold;
  color: #6c757d;
}

.result-body h6 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 16px;
}

.result-body p {
  margin: 5px 0;
  color: #6c757d;
  font-size: 14px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.success-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1000;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.materials-list h5,
.products-list h5 {
  color: #2c3e50;
  margin: 30px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
}
</style>
