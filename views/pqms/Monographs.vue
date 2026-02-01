<template>
  <div class="monographs-page">
    <div class="page-header">
      <h1>📖 Pharmacopoeial Monographs</h1>
      <p class="subtitle">BP, USP, EP Standards for APIs & Finished Products</p>
    </div>

    <div class="content-section">
      <div class="pharmacopoeia-filter">
        <h3>Filter by Pharmacopoeia</h3>
        <div class="filter-buttons">
          <button :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">All</button>
          <button :class="{ active: activeFilter === 'bp' }" @click="activeFilter = 'bp'">British Pharmacopoeia (BP)</button>
          <button :class="{ active: activeFilter === 'usp' }" @click="activeFilter = 'usp'">United States Pharmacopeia (USP)</button>
          <button :class="{ active: activeFilter === 'ep' }" @click="activeFilter = 'ep'">European Pharmacopoeia (EP)</button>
        </div>
      </div>

      <div class="monographs-grid">
        <div class="monograph-card" v-for="monograph in filteredMonographs" :key="monograph.id">
          <div class="monograph-header">
            <span class="pharma-badge" :class="monograph.pharmacopoeia.toLowerCase()">{{ monograph.pharmacopoeia }}</span>
            <span class="monograph-code">{{ monograph.code }}</span>
          </div>
          <div class="monograph-body">
            <h4>{{ monograph.name }}</h4>
            <p class="monograph-title">{{ monograph.title }}</p>
            
            <div class="monograph-details">
              <div class="detail-item">
                <span class="detail-label">Edition:</span>
                <span class="detail-value">{{ monograph.edition }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Effective Date:</span>
                <span class="detail-value">{{ monograph.effectiveDate }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Category:</span>
                <span class="detail-value">{{ monograph.category }}</span>
              </div>
            </div>

            <div class="monograph-actions">
              <button @click="viewMonograph(monograph)" class="btn btn-view">View Details</button>
              <button @click="downloadMonograph(monograph)" class="btn btn-download">Download PDF</button>
            </div>
          </div>
        </div>
      </div>

      <div class="quick-access">
        <h3>Quick Access to Common Monographs</h3>
        <div class="quick-list">
          <div class="quick-item" @click="openMonograph('paracetamol')">
            <span class="quick-icon">💊</span>
            <span class="quick-text">Paracetamol Monograph</span>
          </div>
          <div class="quick-item" @click="openMonograph('aspirin')">
            <span class="quick-icon">💊</span>
            <span class="quick-text">Aspirin Monograph</span>
          </div>
          <div class="quick-item" @click="openMonograph('amoxicillin')">
            <span class="quick-icon">💊</span>
            <span class="quick-text">Amoxicillin Monograph</span>
          </div>
          <div class="quick-item" @click="openMonograph('insulin')">
            <span class="quick-icon">💉</span>
            <span class="quick-text">Insulin Monograph</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Monograph {
  id: number
  code: string
  name: string
  title: string
  pharmacopoeia: string
  edition: string
  effectiveDate: string
  category: string
}

const activeFilter = ref('all')

const monographs = ref<Monograph[]>([
  {
    id: 1,
    code: 'BP 2023',
    name: 'Paracetamol',
    title: 'Paracetamol Tablets',
    pharmacopoeia: 'BP',
    edition: '2023',
    effectiveDate: '2023-01-01',
    category: 'Analgesic'
  },
  {
    id: 2,
    code: 'USP-NF 2022',
    name: 'Aspirin',
    title: 'Aspirin Tablets',
    pharmacopoeia: 'USP',
    edition: '2022',
    effectiveDate: '2022-01-01',
    category: 'Analgesic'
  },
  {
    id: 3,
    code: 'EP 10.0',
    name: 'Amoxicillin',
    title: 'Amoxicillin Trihydrate',
    pharmacopoeia: 'EP',
    edition: '10.0',
    effectiveDate: '2022-07-01',
    category: 'Antibiotic'
  },
  {
    id: 4,
    code: 'BP 2023',
    name: 'Insulin',
    title: 'Insulin Injection',
    pharmacopoeia: 'BP',
    edition: '2023',
    effectiveDate: '2023-01-01',
    category: 'Hormone'
  },
  {
    id: 5,
    code: 'USP-NF 2023',
    name: 'Vitamin C',
    title: 'Ascorbic Acid Tablets',
    pharmacopoeia: 'USP',
    edition: '2023',
    effectiveDate: '2023-01-01',
    category: 'Vitamin'
  },
  {
    id: 6,
    code: 'EP 10.0',
    name: 'Diazepam',
    title: 'Diazepam Tablets',
    pharmacopoeia: 'EP',
    edition: '10.0',
    effectiveDate: '2022-07-01',
    category: 'Sedative'
  }
])

const filteredMonographs = computed(() => {
  if (activeFilter.value === 'all') {
    return monographs.value
  }
  return monographs.value.filter(m => 
    m.pharmacopoeia.toLowerCase() === activeFilter.value
  )
})

const viewMonograph = (monograph: Monograph) => {
  alert(`Viewing monograph: ${monograph.name}\n\nPharmacopoeia: ${monograph.pharmacopoeia}\nEdition: ${monograph.edition}\nEffective Date: ${monograph.effectiveDate}`)
}

const downloadMonograph = (monograph: Monograph) => {
  alert(`Downloading PDF for: ${monograph.name} (${monograph.code})`)
}

const openMonograph = (name: string) => {
  const monograph = monographs.value.find(m => m.name.toLowerCase() === name)
  if (monograph) {
    viewMonograph(monograph)
  }
}
</script>

<style scoped>
.monographs-page {
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 32px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.subtitle {
  color: #6c757d;
  margin-top: 10px;
  font-size: 16px;
}

.content-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.08);
}

.pharmacopoeia-filter {
  margin-bottom: 32px;
}

.pharmacopoeia-filter h3 {
  color: #495057;
  margin-bottom: 20px;
  font-size: 20px;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-buttons button {
  padding: 12px 24px;
  border: 2px solid #dee2e6;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  transition: all 0.3s;
}

.filter-buttons button:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-buttons button.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.monographs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.monograph-card {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  background: white;
}

.monograph-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.monograph-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
}

.pharma-badge {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.pharma-badge.bp {
  background: #dc3545;
}

.pharma-badge.usp {
  background: #007bff;
}

.pharma-badge.ep {
  background: #28a745;
}

.monograph-code {
  font-family: monospace;
  font-weight: bold;
  color: #6c757d;
}

.monograph-body {
  padding: 20px;
}

.monograph-body h4 {
  color: #2c3e50;
  margin: 0 0 10px 0;
  font-size: 18px;
}

.monograph-title {
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.monograph-details {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: #6c757d;
  font-weight: 500;
}

.detail-value {
  color: #495057;
  font-weight: 600;
}

.monograph-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  flex: 1;
}

.btn-view {
  background: #6c757d;
  color: white;
}

.btn-view:hover {
  background: #545b62;
}

.btn-download {
  background: #28a745;
  color: white;
}

.btn-download:hover {
  background: #1e7e34;
}

.quick-access {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #dee2e6;
}

.quick-access h3 {
  color: #495057;
  margin-bottom: 20px;
  font-size: 20px;
}

.quick-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.quick-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.quick-item:hover {
  background: white;
  border-color: #667eea;
  transform: translateX(5px);
}

.quick-icon {
  font-size: 24px;
}

.quick-text {
  color: #2c3e50;
  font-weight: 500;
  font-size: 16px;
}
</style>
