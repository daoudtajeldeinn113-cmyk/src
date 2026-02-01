<template>
  <div class="document-system">
    <!-- Document Control Header -->
    <div class="system-header">
      <h1>📋 Document Control System (DMS)</h1>
      <div class="compliance-badges">
        <span class="badge fda">FDA 21 CFR Part 11</span>
        <span class="badge eu">EU GMP Annex 11</span>
        <span class="badge ich">ICH Q10</span>
        <span class="badge who">WHO TRS 1033</span>
      </div>
    </div>

    <!-- Document Statistics -->
    <div class="document-stats">
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-content">
          <h3>Total Documents</h3>
          <div class="stat-number">{{ totalDocuments }}</div>
          <div class="stat-trend">↑ 12% this month</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⏰</div>
        <div class="stat-content">
          <h3>Pending Review</h3>
          <div class="stat-number">{{ pendingReview }}</div>
          <div class="stat-trend warning">⚠️ 5 overdue</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <h3>Approved Documents</h3>
          <div class="stat-number">{{ approvedDocuments }}</div>
          <div class="stat-trend">↑ 8% this month</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">🔄</div>
        <div class="stat-content">
          <h3>Under Revision</h3>
          <div class="stat-number">{{ underRevision }}</div>
          <div class="stat-trend">↑ 15% this month</div>
        </div>
      </div>
    </div>

    <!-- Document Types Navigation -->
    <nav class="document-types">
      <button 
        v-for="type in documentTypes" 
        :key="type.id"
        :class="['type-btn', { active: activeType === type.id }]"
        @click="setActiveType(type.id)"
      >
        <span class="type-icon">{{ type.icon }}</span>
        <span class="type-name">{{ type.name }}</span>
        <span class="type-count">{{ type.count }}</span>
      </button>
    </nav>

    <!-- Document Actions -->
    <div class="document-actions">
      <button class="action-btn primary" @click="createNewDocument">
        <span class="btn-icon">➕</span>
        Create New Document
      </button>
      
      <button class="action-btn secondary" @click="importDocuments">
        <span class="btn-icon">📤</span>
        Import Documents
      </button>
      
      <button class="action-btn secondary" @click="exportDocuments">
        <span class="btn-icon">📥</span>
        Export Reports
      </button>
      
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search documents by ID, title, or content..."
          class="search-input"
        />
        <button class="search-btn">🔍</button>
      </div>
    </div>

    <!-- Document Table -->
    <div class="document-table-container">
      <table class="document-table">
        <thead>
          <tr>
            <th @click="sortBy('id')" class="sortable">
              Document ID
              <span v-if="sortField === 'id'" class="sort-indicator">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th @click="sortBy('title')" class="sortable">
              Title
              <span v-if="sortField === 'title'" class="sort-indicator">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Type</th>
            <th>Version</th>
            <th>Status</th>
            <th>Effective Date</th>
            <th>Review Date</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in filteredDocuments" :key="doc.id">
            <td class="doc-id">{{ doc.id }}</td>
            <td class="doc-title">
              <span class="doc-icon">{{ getDocIcon(doc.type) }}</span>
              {{ doc.title }}
            </td>
            <td>
              <span class="doc-type-badge" :class="doc.type.toLowerCase()">
                {{ doc.type }}
              </span>
            </td>
            <td>
              <span class="doc-version">v{{ doc.version }}</span>
            </td>
            <td>
              <span class="status-badge" :class="doc.status.toLowerCase()">
                {{ doc.status }}
              </span>
            </td>
            <td>{{ formatDate(doc.effectiveDate) }}</td>
            <td>{{ formatDate(doc.reviewDate) }}</td>
            <td class="doc-owner">{{ doc.owner }}</td>
            <td>
              <div class="action-buttons">
                <button @click="viewDocument(doc)" class="action-icon" title="View">
                  👁️
                </button>
                <button @click="editDocument(doc)" class="action-icon" title="Edit">
                  ✏️
                </button>
                <button @click="downloadDocument(doc)" class="action-icon" title="Download">
                  ⬇️
                </button>
                <button @click="showHistory(doc)" class="action-icon" title="Version History">
                  📜
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">
        ← Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">
        Next →
      </button>
      <select v-model="pageSize" @change="updatePagination" class="page-size-select">
        <option value="10">10 per page</option>
        <option value="25">25 per page</option>
        <option value="50">50 per page</option>
        <option value="100">100 per page</option>
      </select>
    </div>

    <!-- Quick Actions Panel -->
    <div class="quick-actions">
      <h3>🔄 Quick Actions</h3>
      <div class="action-grid">
        <button @click="initiateReview" class="quick-action-btn">
          <span class="action-icon">📝</span>
          <span class="action-text">Initiate Review</span>
        </button>
        <button @click="approveDocuments" class="quick-action-btn">
          <span class="action-icon">✅</span>
          <span class="action-text">Approve Documents</span>
        </button>
        <button @click="obsoleteDocuments" class="quick-action-btn">
          <span class="action-icon">🗑️</span>
          <span class="action-text">Mark Obsolete</span>
        </button>
        <button @click="printDocuments" class="quick-action-btn">
          <span class="action-icon">🖨️</span>
          <span class="action-text">Print Selected</span>
        </button>
        <button @click="exportToPDF" class="quick-action-btn">
          <span class="action-icon">📄</span>
          <span class="action-text">Export to PDF</span>
        </button>
        <button @click="sendForTraining" class="quick-action-btn">
          <span class="action-icon">🎓</span>
          <span class="action-text">Send for Training</span>
        </button>
      </div>
    </div>

    <!-- Compliance Information -->
    <div class="compliance-info">
      <h3>📜 Compliance Requirements</h3>
      <div class="requirements">
        <div class="requirement">
          <h4>FDA 21 CFR Part 11 Requirements:</h4>
          <ul>
            <li>✓ Electronic signatures with time-stamp</li>
            <li>✓ Audit trail for all changes</li>
            <li>✓ Version control and history</li>
            <li>✓ Access controls and permissions</li>
          </ul>
        </div>
        <div class="requirement">
          <h4>EU GMP Annex 11 Requirements:</h4>
          <ul>
            <li>✓ Data integrity and ALCOA+ principles</li>
            <li>✓ Periodic reviews and effectiveness checks</li>
            <li>✓ Change control and impact assessment</li>
            <li>✓ Backup and disaster recovery</li>
          </ul>
        </div>
        <div class="requirement">
          <h4>ICH Q10 Requirements:</h4>
          <ul>
            <li>✓ Documented quality system</li>
            <li>✓ Management review and oversight</li>
            <li>✓ Continuous improvement</li>
            <li>✓ Knowledge management</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Document {
  id: string
  title: string
  type: string
  version: number
  status: string
  effectiveDate: string
  reviewDate: string
  owner: string
  department: string
}

// Reactive data
const documents = ref<Document[]>([
  { id: 'SOP-QA-001', title: 'Good Documentation Practices (GDP)', type: 'SOP', version: 4.2, status: 'Approved', effectiveDate: '2024-01-15', reviewDate: '2025-01-15', owner: 'Dr. Smith', department: 'Quality Assurance' },
  { id: 'SOP-PROD-045', title: 'Manufacturing Operating Procedures', type: 'SOP', version: 3.1, status: 'Under Review', effectiveDate: '2024-01-10', reviewDate: '2025-01-10', owner: 'Production Manager', department: 'Production' },
  { id: 'WI-QC-012', title: 'HPLC Analysis Procedure', type: 'Work Instruction', version: 2.5, status: 'Approved', effectiveDate: '2024-01-05', reviewDate: '2025-01-05', owner: 'QC Analyst', department: 'Quality Control' },
  { id: 'FRM-QA-008', title: 'Deviation Report Form', type: 'Form', version: 1.3, status: 'Approved', effectiveDate: '2024-01-01', reviewDate: '2025-01-01', owner: 'QA Officer', department: 'Quality Assurance' },
  { id: 'POL-001', title: 'Quality Policy', type: 'Policy', version: 1.0, status: 'Approved', effectiveDate: '2024-01-20', reviewDate: '2025-01-20', owner: 'Quality Director', department: 'Management' },
  { id: 'BR-BATCH-2301', title: 'Batch Manufacturing Record - Product X', type: 'Batch Record', version: 1.0, status: 'Draft', effectiveDate: '2024-01-25', reviewDate: '2024-02-25', owner: 'Production Supervisor', department: 'Production' },
  { id: 'PROT-VAL-022', title: 'Cleaning Validation Protocol', type: 'Protocol', version: 2.0, status: 'Approved', effectiveDate: '2024-01-18', reviewDate: '2025-01-18', owner: 'Validation Manager', department: 'Validation' },
  { id: 'SPEC-RAW-015', title: 'Raw Material Specifications', type: 'Specification', version: 3.2, status: 'Approved', effectiveDate: '2024-01-12', reviewDate: '2025-01-12', owner: 'QC Manager', department: 'Quality Control' },
])

const documentTypes = ref([
  { id: 'all', name: 'All Documents', icon: '📄', count: 8 },
  { id: 'sop', name: 'SOPs', icon: '📘', count: 2 },
  { id: 'wi', name: 'Work Instructions', icon: '📝', count: 1 },
  { id: 'form', name: 'Forms', icon: '📋', count: 1 },
  { id: 'policy', name: 'Policies', icon: '📜', count: 1 },
  { id: 'batch', name: 'Batch Records', icon: '📊', count: 1 },
  { id: 'protocol', name: 'Protocols', icon: '🔬', count: 1 },
  { id: 'spec', name: 'Specifications', icon: '⚖️', count: 1 },
])

const activeType = ref('all')
const searchQuery = ref('')
const sortField = ref('id')
const sortOrder = ref('asc')
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const totalDocuments = computed(() => documents.value.length)
const pendingReview = computed(() => documents.value.filter(d => d.status === 'Under Review').length)
const approvedDocuments = computed(() => documents.value.filter(d => d.status === 'Approved').length)
const underRevision = computed(() => documents.value.filter(d => d.status === 'Draft').length)

const filteredDocuments = computed(() => {
  let filtered = documents.value
  
  // Filter by type
  if (activeType.value !== 'all') {
    filtered = filtered.filter(doc => doc.type.toLowerCase().includes(activeType.value))
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc => 
      doc.id.toLowerCase().includes(query) ||
      doc.title.toLowerCase().includes(query) ||
      doc.owner.toLowerCase().includes(query)
    )
  }
  
  // Sort
  filtered = [...filtered].sort((a, b) => {
    const aValue = a[sortField.value as keyof Document]
    const bValue = b[sortField.value as keyof Document]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder.value === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    return 0
  })
  
  // Pagination
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(documents.value.length / pageSize.value)
)

// Methods
const setActiveType = (type: string) => {
  activeType.value = type
  currentPage.value = 1
}

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getDocIcon = (type: string) => {
  const icons: Record<string, string> = {
    'SOP': '📘',
    'Work Instruction': '📝',
    'Form': '📋',
    'Policy': '📜',
    'Batch Record': '📊',
    'Protocol': '🔬',
    'Specification': '⚖️'
  }
  return icons[type] || '📄'
}

const createNewDocument = () => {
  alert('Create new document functionality would open a document creation form.')
}

const viewDocument = (doc: Document) => {
  alert(`Viewing document: ${doc.title}\nID: ${doc.id}\nVersion: v${doc.version}`)
}

const editDocument = (doc: Document) => {
  alert(`Editing document: ${doc.title}\nThis would open the document editor.`)
}

const downloadDocument = (doc: Document) => {
  alert(`Downloading: ${doc.title} (${doc.id})`)
}

const showHistory = (doc: Document) => {
  alert(`Showing version history for: ${doc.title}`)
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const updatePagination = () => {
  currentPage.value = 1
}

// Quick actions
const initiateReview = () => alert('Initiate review process')
const approveDocuments = () => alert('Approve selected documents')
const obsoleteDocuments = () => alert('Mark documents as obsolete')
const printDocuments = () => alert('Print selected documents')
const exportToPDF = () => alert('Export to PDF format')
const sendForTraining = () => alert('Send documents for training')

onMounted(() => {
  console.log('Document Control System loaded')
})
</script>

<style scoped>
.document-system {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.system-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #3498db;
}

.system-header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.compliance-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.badge.fda {
  background: #e74c3c;
  color: white;
}

.badge.eu {
  background: #3498db;
  color: white;
}

.badge.ich {
  background: #9b59b6;
  color: white;
}

.badge.who {
  background: #1abc9c;
  color: white;
}

.document-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content h3 {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-trend {
  font-size: 0.85rem;
  color: #27ae60;
}

.stat-trend.warning {
  color: #e74c3c;
}

.document-types {
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  overflow-x: auto;
}

.type-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.type-btn:hover {
  border-color: #3498db;
  background: #e8f4fc;
}

.type-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.type-icon {
  font-size: 1.2rem;
}

.type-count {
  background: rgba(0,0,0,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.document-actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  align-items: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.primary {
  background: #3498db;
  color: white;
}

.action-btn.primary:hover {
  background: #2980b9;
}

.action-btn.secondary {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #dee2e6;
}

.action-btn.secondary:hover {
  background: #e9ecef;
}

.search-box {
  display: flex;
  flex: 1;
  max-width: 400px;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px 0 0 6px;
  border-right: none;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
}

.document-table-container {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin: 2rem 0;
}

.document-table {
  width: 100%;
  border-collapse: collapse;
}

.document-table th {
  background: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 2px solid #dee2e6;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  margin-left: 0.5rem;
}

.document-table td {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.doc-id {
  font-family: monospace;
  font-weight: bold;
  color: #2c3e50;
}

.doc-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.doc-icon {
  font-size: 1.2rem;
}

.doc-type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.doc-type-badge.sop {
  background: #d4edda;
  color: #155724;
}

.doc-type-badge.work-instruction {
  background: #d1ecf1;
  color: #0c5460;
}

.doc-type-badge.form {
  background: #fff3cd;
  color: #856404;
}

.doc-version {
  background: #f8f9fa;
  color: #6c757d;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.status-badge.approved {
  background: #d4edda;
  color: #155724;
}

.status-badge.draft {
  background: #fff3cd;
  color: #856404;
}

.status-badge['under-review'] {
  background: #d1ecf1;
  color: #0c5460;
}

.doc-owner {
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-icon {
  background: none;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-icon:hover {
  background: #f8f9fa;
  border-color: #3498db;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #3498db;
  color: #3498db;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #6c757d;
}

.page-size-select {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
}

.quick-actions {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-action-btn:hover {
  border-color: #3498db;
  background: #e8f4fc;
  transform: translateY(-2px);
}

.action-icon {
  font-size: 2rem;
}

.action-text {
  font-weight: 500;
  color: #2c3e50;
}

.compliance-info {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.requirements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.requirement h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.requirement ul {
  list-style: none;
  padding-left: 0;
}

.requirement li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #495057;
}

.requirement li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}
</style>
