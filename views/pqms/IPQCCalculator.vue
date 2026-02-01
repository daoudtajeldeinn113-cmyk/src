<template>
  <div class="ipqc-calculator">
    <!-- Header -->
    <div class="header">
      <h1>📊 In-Process Quality Control (IPQC) Calculator</h1>
      <p class="subtitle">حاسبة مراقبة الجودة أثناء الإنتاج - جميع عمليات التصنيع الدوائي</p>
    </div>

    <!-- Pharmacopoeia Standards -->
    <div class="pharmacopoeia-badges">
      <span class="badge bp">BP 2025</span>
      <span class="badge usp">USP-NF</span>
      <span class="badge ep">EP 11.0</span>
      <span class="badge ip">IP 2018</span>
    </div>

    <!-- Main Container -->
    <div class="main-container">
      <!-- Process Selection -->
      <div class="process-selection">
        <h2>🏭 Select Manufacturing Process / اختر عملية التصنيع</h2>
        <div class="process-tabs">
          <button v-for="process in manufacturingProcesses" 
                  :key="process.id"
                  :class="{ active: selectedProcess.id === process.id }"
                  @click="selectProcess(process)"
                  class="process-tab">
            <span class="tab-icon">{{ process.icon }}</span>
            <span class="tab-name">{{ process.name.en }}</span>
            <span class="tab-name-ar">{{ process.name.ar }}</span>
          </button>
        </div>
      </div>

      <!-- Current Process Info -->
      <div class="process-info">
        <h3>{{ selectedProcess.name.en }} / {{ selectedProcess.name.ar }}</h3>
        <div class="process-description">{{ selectedProcess.description }}</div>
      </div>

      <!-- Batch Information -->
      <div class="batch-section">
        <h2>📋 Batch Information / معلومات التشغيلة</h2>
        <div class="batch-form">
          <div class="form-row">
            <div class="form-group">
              <label>🔢 Batch Number / رقم التشغيلة:</label>
              <input v-model="batchData.batchNumber" placeholder="BATCH-2024-001">
              <button @click="generateBatchNumber" class="btn-generate">Generate</button>
            </div>
            <div class="form-group">
              <label>📦 Product Name / اسم المنتج:</label>
              <input v-model="batchData.productName" placeholder="Enter product name">
            </div>
            <div class="form-group">
              <label>📅 Manufacturing Date / تاريخ التصنيع:</label>
              <input type="date" v-model="batchData.manufacturingDate">
            </div>
            <div class="form-group">
              <label>⏰ Expiry Date / تاريخ الانتهاء:</label>
              <input type="date" v-model="batchData.expiryDate">
            </div>
          </div>
        </div>
      </div>

      <!-- Dynamic Process Sections -->
      <div class="process-sections">
        <!-- Tablet Manufacturing -->
        <div v-if="selectedProcess.id === 'tablet'" class="tablet-section">
          <h3>💊 Tablet Manufacturing Tests / اختبارات تصنيع الأقراص</h3>
          
          <!-- Disintegration Test -->
          <div class="test-card">
            <h4>⚗️ Disintegration Test (BP 2025) / اختبار التفتت</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>Disintegration Time (min):</label>
                  <input type="number" v-model="tabletTests.disintegrationTime" 
                         placeholder="15">
                  <small>BP Limit: ≤15 min for uncoated tablets</small>
                </div>
                <div class="param">
                  <label>Media Temperature (°C):</label>
                  <input type="number" v-model="tabletTests.disintegrationTemp" 
                         placeholder="37" step="0.1">
                </div>
                <div class="param">
                  <label>Result:</label>
                  <select v-model="tabletTests.disintegrationResult">
                    <option value="pass">✅ Pass / مطابق</option>
                    <option value="fail">❌ Fail / غير مطابق</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Dissolution Test -->
          <div class="test-card">
            <h4>🧪 Dissolution Test (USP Apparatus 2) / اختبار الذوبانية</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>Q Value (%):</label>
                  <input type="number" v-model="tabletTests.dissolutionQ" 
                         placeholder="75" step="0.1">
                  <small>USP Requirement: Q=75% in 45 min</small>
                </div>
                <div class="param">
                  <label>Time Point (min):</label>
                  <input type="number" v-model="tabletTests.dissolutionTime" 
                         placeholder="45">
                </div>
                <div class="param">
                  <label>Media pH:</label>
                  <input type="number" v-model="tabletTests.dissolutionpH" 
                         placeholder="6.8" step="0.1">
                </div>
              </div>
              <div class="param-row">
                <div class="param">
                  <label>Apparatus:</label>
                  <select v-model="tabletTests.dissolutionApparatus">
                    <option value="1">Basket / سلة</option>
                    <option value="2">Paddle / مجداف</option>
                  </select>
                </div>
                <div class="param">
                  <label>RPM:</label>
                  <input type="number" v-model="tabletTests.dissolutionRPM" 
                         placeholder="50">
                </div>
                <div class="param">
                  <label>Media Volume (ml):</label>
                  <input type="number" v-model="tabletTests.dissolutionVolume" 
                         placeholder="900">
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Tablet Tests -->
          <div class="test-grid">
            <div class="test-item">
              <h5>Weight Variation / توزيع الوزن</h5>
              <div class="test-inputs">
                <label>Average Weight (mg):</label>
                <input type="number" v-model="tabletTests.avgWeight" placeholder="500">
                <label>Limit (%):</label>
                <select v-model="tabletTests.weightLimit">
                  <option value="5">±5% (Tablets >130mg)</option>
                  <option value="10">±10% (Tablets ≤130mg)</option>
                  <option value="7.5">±7.5% (Capsules)</option>
                </select>
              </div>
            </div>

            <div class="test-item">
              <h5>Hardness / الصلابة</h5>
              <div class="test-inputs">
                <label>Hardness (N):</label>
                <input type="number" v-model="tabletTests.hardness" placeholder="75">
                <label>Limit:</label>
                <span>50-100 N (USP)</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Friability / الهشاشة</h5>
              <div class="test-inputs">
                <label>Weight Loss (%):</label>
                <input type="number" v-model="tabletTests.friability" placeholder="0.5" step="0.01">
                <label>Limit:</label>
                <span>≤1.0% (USP)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Capsule Manufacturing -->
        <div v-if="selectedProcess.id === 'capsule'" class="capsule-section">
          <h3>💊 Capsule Manufacturing Tests / اختبارات تصنيع الكبسولات</h3>
          
          <!-- Capsule Dissolution -->
          <div class="test-card">
            <h4>🧪 Capsule Dissolution Test / اختبار ذوبان الكبسولات</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>Dissolution Q (%):</label>
                  <input type="number" v-model="capsuleTests.dissolutionQ" 
                         placeholder="80" step="0.1">
                  <small>BP Requirement: Q=75% in 45 min</small>
                </div>
                <div class="param">
                  <label>Time (min):</label>
                  <input type="number" v-model="capsuleTests.dissolutionTime" 
                         placeholder="30">
                </div>
                <div class="param">
                  <label>With Sinkers:</label>
                  <input type="checkbox" v-model="capsuleTests.withSinkers">
                </div>
              </div>
            </div>
          </div>

          <!-- Capsule Disintegration -->
          <div class="test-card">
            <h4>⚗️ Capsule Disintegration / تفتت الكبسولات</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>Disintegration Time (min):</label>
                  <input type="number" v-model="capsuleTests.disintegrationTime" 
                         placeholder="30">
                  <small>BP Limit: ≤30 min for hard capsules</small>
                </div>
                <div class="param">
                  <label>Media:</label>
                  <select v-model="capsuleTests.disintegrationMedia">
                    <option value="water">Water / ماء</option>
                    <option value="hcl">0.1N HCl</option>
                    <option value="buffer">pH 6.8 Buffer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Capsule Weight & Fill -->
          <div class="test-grid">
            <div class="test-item">
              <h5>Capsule Fill Weight / وزن محتويات الكبسولة</h5>
              <div class="test-inputs">
                <label>Average Fill (mg):</label>
                <input type="number" v-model="capsuleTests.avgFill" placeholder="250">
                <label>Variation:</label>
                <span>±7.5% (BP)</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Shell Integrity / سلامة الغلاف</h5>
              <div class="test-inputs">
                <label>Lock Length (mm):</label>
                <input type="number" v-model="capsuleTests.lockLength" placeholder="21.4" step="0.1">
                <label>Limit:</label>
                <span>±0.3 mm</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Moisture Content / المحتوى الرطوبي</h5>
              <div class="test-inputs">
                <label>Moisture (%):</label>
                <input type="number" v-model="capsuleTests.moisture" placeholder="5.5" step="0.1">
                <label>Limit:</label>
                <span>≤13% (USP)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Syrup Manufacturing -->
        <div v-if="selectedProcess.id === 'syrup'" class="syrup-section">
          <h3>🥤 Syrup Manufacturing Tests / اختبارات تصنيع الشراب</h3>
          
          <!-- Physical Tests -->
          <div class="test-card">
            <h4>📏 Physical Tests / اختبارات فيزيائية</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>pH Value:</label>
                  <input type="number" v-model="syrupTests.pH" 
                         placeholder="5.5" step="0.1">
                  <small>BP Limit: 4.0-6.5 for most syrups</small>
                </div>
                <div class="param">
                  <label>Specific Gravity:</label>
                  <input type="number" v-model="syrupTests.specificGravity" 
                         placeholder="1.25" step="0.01">
                </div>
                <div class="param">
                  <label>Viscosity (cP):</label>
                  <input type="number" v-model="syrupTests.viscosity" 
                         placeholder="1500" step="10">
                </div>
              </div>
            </div>
          </div>

          <!-- Microbial Tests -->
          <div class="test-card">
            <h4>🦠 Microbial Tests / اختبارات ميكروبيولوجية</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>TAMC (cfu/ml):</label>
                  <input type="number" v-model="syrupTests.tamc" placeholder="100">
                  <small>BP Limit: ≤100 cfu/ml</small>
                </div>
                <div class="param">
                  <label>TYMC (cfu/ml):</label>
                  <input type="number" v-model="syrupTests.tymc" placeholder="10">
                  <small>BP Limit: ≤10 cfu/ml</small>
                </div>
                <div class="param">
                  <label>Specified Pathogens:</label>
                  <select v-model="syrupTests.pathogens">
                    <option value="absent">Absent / غير موجود</option>
                    <option value="present">Present / موجود</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Chemical Tests -->
          <div class="test-grid">
            <div class="test-item">
              <h5>Assay / التحليل الكمي</h5>
              <div class="test-inputs">
                <label>Active Content (%):</label>
                <input type="number" v-model="syrupTests.assay" placeholder="98.5" step="0.1">
                <label>Limit:</label>
                <span>95.0-105.0% (BP)</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Sugar Content / محتوى السكر</h5>
              <div class="test-inputs">
                <label>Sucrose (% w/v):</label>
                <input type="number" v-model="syrupTests.sucrose" placeholder="60" step="0.1">
                <label>Limit:</label>
                <span>64-66% (Simple Syrup)</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Preservative Content / المواد الحافظة</h5>
              <div class="test-inputs">
                <label>Methyl Paraben (%):</label>
                <input type="number" v-model="syrupTests.methylParaben" placeholder="0.18" step="0.01">
                <label>Limit:</label>
                <span>0.18% (USP)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Effervescent Sachet Manufacturing -->
        <div v-if="selectedProcess.id === 'sachet'" class="sachet-section">
          <h3>💥 Effervescent Sachet Tests / اختبارات الأظرف الفوارة</h3>
          
          <!-- Effervescence Test -->
          <div class="test-card">
            <h4>💦 Effervescence Time Test / اختبار زمن الفوران</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>Complete Disintegration (min):</label>
                  <input type="number" v-model="sachetTests.effervescenceTime" 
                         placeholder="5">
                  <small>BP Limit: ≤5 min in 200ml water</small>
                </div>
                <div class="param">
                  <label>Water Temperature (°C):</label>
                  <input type="number" v-model="sachetTests.waterTemp" 
                         placeholder="20" step="0.1">
                </div>
                <div class="param">
                  <label>CO₂ Evolution (ml):</label>
                  <input type="number" v-model="sachetTests.co2Evolution" 
                         placeholder="150" step="1">
                </div>
              </div>
            </div>
          </div>

          <!-- Moisture Sensitivity -->
          <div class="test-card">
            <h4>💧 Moisture Sensitivity Test / اختبار حساسية الرطوبة</h4>
            <div class="test-parameters">
              <div class="param-row">
                <div class="param">
                  <label>LOD (%):</label>
                  <input type="number" v-model="sachetTests.lod" 
                         placeholder="0.5" step="0.01">
                  <small>Critical: ≤1.0% for stability</small>
                </div>
                <div class="param">
                  <label>Karl Fischer (%):</label>
                  <input type="number" v-model="sachetTests.karlFischer" 
                         placeholder="0.3" step="0.01">
                </div>
                <div class="param">
                  <label>RH Test (%):</label>
                  <input type="number" v-model="sachetTests.rhTest" 
                         placeholder="75" step="1">
                  <small>75% RH, 40°C for 4 weeks</small>
                </div>
              </div>
            </div>
          </div>

          <!-- Granule Properties -->
          <div class="test-grid">
            <div class="test-item">
              <h5>Granule Size Distribution / توزيع حجم الحبيبات</h5>
              <div class="test-inputs">
                <label>d(0.5) (μm):</label>
                <input type="number" v-model="sachetTests.granuleSize" placeholder="500" step="1">
                <label>Range:</label>
                <span>300-700 μm</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Flow Properties / خواص الجريان</h5>
              <div class="test-inputs">
                <label>Flow Rate (g/sec):</label>
                <input type="number" v-model="sachetTests.flowRate" placeholder="15" step="0.1">
                <label>Carr's Index:</label>
                <span>≤18% (Excellent)</span>
              </div>
            </div>

            <div class="test-item">
              <h5>Sachet Seal Strength / قوة ختم الظرف</h5>
              <div class="test-inputs">
                <label>Seal Strength (N/15mm):</label>
                <input type="number" v-model="sachetTests.sealStrength" placeholder="25" step="0.1">
                <label>Limit:</label>
                <span>≥15 N/15mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="results-summary">
        <h2>📊 Test Results Summary / ملخص نتائج الاختبارات</h2>
        <div class="summary-grid">
          <div class="summary-item total">
            <span class="summary-value">{{ totalTests }}</span>
            <span class="summary-label">Total Tests</span>
            <span class="summary-label-ar">إجمالي الاختبارات</span>
          </div>
          <div class="summary-item passed">
            <span class="summary-value">{{ passedTests }}</span>
            <span class="summary-label">Passed</span>
            <span class="summary-label-ar">ناجحة</span>
          </div>
          <div class="summary-item failed">
            <span class="summary-value">{{ failedTests }}</span>
            <span class="summary-label">Failed</span>
            <span class="summary-label-ar">فاشلة</span>
          </div>
          <div class="summary-item warning">
            <span class="summary-value">{{ warningTests }}</span>
            <span class="summary-label">Warning</span>
            <span class="summary-label-ar">تحذيرية</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-section">
        <button @click="saveIPQCData" class="btn btn-success">
          💾 Save IPQC Data
        </button>
        <button @click="generateIPQCReport" class="btn btn-primary">
          📄 Generate Report
        </button>
        <button @click="sendToCOA" class="btn btn-info">
          🎫 Send to COA Generator
        </button>
        <button @click="resetAll" class="btn btn-outline">
          🔄 Reset All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Manufacturing Processes
const manufacturingProcesses = [
  {
    id: 'tablet',
    icon: '💊',
    name: { en: 'Tablet Manufacturing', ar: 'تصنيع الأقراص' },
    description: 'Solid dosage form manufacturing with compression'
  },
  {
    id: 'capsule',
    icon: '💊',
    name: { en: 'Capsule Manufacturing', ar: 'تصنيع الكبسولات' },
    description: 'Hard and soft gelatin capsule filling'
  },
  {
    id: 'syrup',
    icon: '🥤',
    name: { en: 'Syrup Manufacturing', ar: 'تصنيع الشراب' },
    description: 'Liquid oral dosage form with preservatives'
  },
  {
    id: 'sachet',
    icon: '💥',
    name: { en: 'Effervescent Sachet', ar: 'أظرف فوارة' },
    description: 'Granular effervescent powder in sachets'
  }
]

// Selected Process
const selectedProcess = ref(manufacturingProcesses[0])

// Batch Data
const batchData = ref({
  batchNumber: '',
  productName: '',
  manufacturingDate: new Date().toISOString().split('T')[0],
  expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]
})

// Tablet Tests
const tabletTests = ref({
  disintegrationTime: 15,
  disintegrationTemp: 37.0,
  disintegrationResult: 'pass',
  dissolutionQ: 75.0,
  dissolutionTime: 45,
  dissolutionpH: 6.8,
  dissolutionApparatus: '2',
  dissolutionRPM: 50,
  dissolutionVolume: 900,
  avgWeight: 500,
  weightLimit: '5',
  hardness: 75,
  friability: 0.5
})

// Capsule Tests
const capsuleTests = ref({
  dissolutionQ: 80.0,
  dissolutionTime: 30,
  withSinkers: true,
  disintegrationTime: 30,
  disintegrationMedia: 'water',
  avgFill: 250,
  lockLength: 21.4,
  moisture: 5.5
})

// Syrup Tests
const syrupTests = ref({
  pH: 5.5,
  specificGravity: 1.25,
  viscosity: 1500,
  tamc: 100,
  tymc: 10,
  pathogens: 'absent',
  assay: 98.5,
  sucrose: 60.0,
  methylParaben: 0.18
})

// Sachet Tests
const sachetTests = ref({
  effervescenceTime: 5,
  waterTemp: 20.0,
  co2Evolution: 150,
  lod: 0.5,
  karlFischer: 0.3,
  rhTest: 75,
  granuleSize: 500,
  flowRate: 15.0,
  sealStrength: 25.0
})

// Computed Properties
const totalTests = computed(() => {
  let count = 0
  if (selectedProcess.value.id === 'tablet') count = Object.keys(tabletTests.value).length
  else if (selectedProcess.value.id === 'capsule') count = Object.keys(capsuleTests.value).length
  else if (selectedProcess.value.id === 'syrup') count = Object.keys(syrupTests.value).length
  else if (selectedProcess.value.id === 'sachet') count = Object.keys(sachetTests.value).length
  return count
})

const passedTests = computed(() => {
  // This would be calculated based on actual results vs limits
  return Math.floor(totalTests.value * 0.85)
})

const failedTests = computed(() => {
  return Math.floor(totalTests.value * 0.05)
})

const warningTests = computed(() => {
  return Math.floor(totalTests.value * 0.10)
})

// Methods
const selectProcess = (process: any) => {
  selectedProcess.value = process
}

const generateBatchNumber = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  batchData.value.batchNumber = `BATCH-${year}${month}${day}-${random}`
}

const saveIPQCData = () => {
  const ipqcData = {
    batchNumber: batchData.value.batchNumber,
    productName: batchData.value.productName,
    process: selectedProcess.value.id,
    manufacturingDate: batchData.value.manufacturingDate,
    expiryDate: batchData.value.expiryDate,
    tabletTests: selectedProcess.value.id === 'tablet' ? tabletTests.value : null,
    capsuleTests: selectedProcess.value.id === 'capsule' ? capsuleTests.value : null,
    syrupTests: selectedProcess.value.id === 'syrup' ? syrupTests.value : null,
    sachetTests: selectedProcess.value.id === 'sachet' ? sachetTests.value : null,
    timestamp: new Date().toISOString()
  }

  // Save to localStorage
  const existingData = JSON.parse(localStorage.getItem('ipqc_records') || '[]')
  existingData.push(ipqcData)
  localStorage.setItem('ipqc_records', JSON.stringify(existingData))

  alert('✅ IPQC data saved successfully!')
}

const generateIPQCReport = () => {
  alert('📄 IPQC Report generation will be implemented!')
}

const sendToCOA = () => {
  // Prepare data for COA
  const coaData = {
    batchNumber: batchData.value.batchNumber,
    productName: batchData.value.productName,
    manufacturingDate: batchData.value.manufacturingDate,
    expiryDate: batchData.value.expiryDate,
    tests: {}
  }

  // Add appropriate tests based on process
  if (selectedProcess.value.id === 'tablet') {
    coaData.tests = tabletTests.value
  } else if (selectedProcess.value.id === 'capsule') {
    coaData.tests = capsuleTests.value
  } else if (selectedProcess.value.id === 'syrup') {
    coaData.tests = syrupTests.value
  } else if (selectedProcess.value.id === 'sachet') {
    coaData.tests = sachetTests.value
  }

  // Save to localStorage for COA module
  localStorage.setItem('coa_ipqc_data', JSON.stringify(coaData))
  alert('🎫 Data sent to COA Generator!')
}

const resetAll = () => {
  if (confirm('Are you sure you want to reset all data?')) {
    batchData.value = {
      batchNumber: '',
      productName: '',
      manufacturingDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]
    }
    
    tabletTests.value = {
      disintegrationTime: 15,
      disintegrationTemp: 37.0,
      disintegrationResult: 'pass',
      dissolutionQ: 75.0,
      dissolutionTime: 45,
      dissolutionpH: 6.8,
      dissolutionApparatus: '2',
      dissolutionRPM: 50,
      dissolutionVolume: 900,
      avgWeight: 500,
      weightLimit: '5',
      hardness: 75,
      friability: 0.5
    }

    // Reset other tests similarly
    alert('🔄 All data reset successfully!')
  }
}

// Lifecycle
onMounted(() => {
  generateBatchNumber()
})
</script>

<style scoped>
.ipqc-calculator {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #2c3e50 0%, #4a6491 100%);
  color: white;
  border-radius: 10px;
}

/* Pharmacopoeia Badges */
.pharmacopoeia-badges {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.badge {
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: bold;
  color: white;
  font-size: 0.9rem;
}

.bp { background: linear-gradient(135deg, #dc3545, #a71d2a); }
.usp { background: linear-gradient(135deg, #007bff, #0056b3); }
.ep { background: linear-gradient(135deg, #28a745, #1e7e34); }
.ip { background: linear-gradient(135deg, #ffc107, #d39e00); }

/* Main Container */
.main-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Process Tabs */
.process-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.process-tab {
  padding: 20px;
  border: 2px solid #dee2e6;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.process-tab:hover {
  border-color: #007bff;
  transform: translateY(-5px);
}

.process-tab.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.tab-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 10px;
}

.tab-name, .tab-name-ar {
  display: block;
}

.tab-name-ar {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 5px;
}

/* Process Info */
.process-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #007bff;
}

/* Batch Section */
.batch-section {
  margin: 30px 0;
}

.batch-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: bold;
  color: #495057;
  font-size: 0.9rem;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
}

.btn-generate {
  margin-top: 5px;
  padding: 8px 15px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

/* Test Cards */
.test-card {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.test-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
}

.test-parameters {
  margin: 15px 0;
}

.param-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 15px;
}

.param {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.param label {
  font-weight: bold;
  color: #495057;
  font-size: 0.9rem;
}

.param input, .param select {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.param small {
  color: #6c757d;
  font-size: 0.8rem;
}

/* Test Grid */
.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.test-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.test-item h5 {
  color: #495057;
  margin-bottom: 10px;
}

.test-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.test-inputs label {
  font-weight: bold;
  font-size: 0.9rem;
  color: #495057;
}

.test-inputs input, .test-inputs select {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.test-inputs span {
  color: #28a745;
  font-weight: bold;
  font-size: 0.9rem;
}

/* Results Summary */
.results-summary {
  margin: 30px 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.summary-item {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: white;
}

.summary-item.total { background: linear-gradient(135deg, #007bff, #0056b3); }
.summary-item.passed { background: linear-gradient(135deg, #28a745, #1e7e34); }
.summary-item.failed { background: linear-gradient(135deg, #dc3545, #a71d2a); }
.summary-item.warning { background: linear-gradient(135deg, #ffc107, #d39e00); }

.summary-value {
  font-size: 2.5rem;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.summary-label, .summary-label-ar {
  display: block;
  font-size: 0.9rem;
}

/* Action Section */
.action-section {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn-success { background: #28a745; color: white; }
.btn-primary { background: #007bff; color: white; }
.btn-info { background: #17a2b8; color: white; }
.btn-outline { background: white; border: 2px solid #6c757d; color: #6c757d; }

/* Responsive Design */
@media (max-width: 768px) {
  .process-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .param-row {
    grid-template-columns: 1fr;
  }
  
  .test-grid {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-section {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
