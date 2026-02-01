<template>
  <div class="document-list">
    <div class="list-header">
      <h2>📋 All Documents</h2>
      <div class="filter-controls">
        <input type="text" placeholder="Search documents..." class="search-input" />
        <select class="filter-select">
          <option>All Types</option>
          <option>SOPs</option>
          <option>Work Instructions</option>
          <option>Forms</option>
          <option>Policies</option>
          <option>Batch Records</option>
        </select>
        <select class="filter-select">
          <option>All Status</option>
          <option>Draft</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Obsolete</option>
        </select>
      </div>
    </div>

    <div class="documents-table">
      <table>
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Version</th>
            <th>Status</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in sampleDocuments" :key="doc.id">
            <td>{{ doc.id }}</td>
            <td>
              <div class="doc-title">
                <span class="doc-icon">{{ getDocIcon(doc.type) }}</span>
                {{ doc.title }}
              </div>
            </td>
            <td><span class="doc-type">{{ doc.type }}</span></td>
            <td><span class="doc-version">v{{ doc.version }}</span></td>
            <td>
              <span :class="['status-badge', doc.status.toLowerCase()]">
                {{ doc.status }}
              </span>
            </td>
            <td>{{ doc.lastModified }}</td>
            <td>
              <div class="action-buttons">
                <button class="action-btn view" title="View">
                  👁️
                </button>
                <button class="action-btn edit" title="Edit">
                  ✏️
                </button>
                <button class="action-btn download" title="Download">
                  ⬇️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="list-info">
      <p>Showing {{ sampleDocuments.length }} documents</p>
      <div class="pagination">
        <button class="page-btn">Previous</button>
        <span class="page-info">Page 1 of 5</span>
        <button class="page-btn">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Document {
  id: string
  title: string
  type: string
  version: number
  status: string
  lastModified: string
}

const sampleDocuments = ref<Document[]>([
  { id: 'SOP-QA-001', title: 'Good Documentation Practices', type: 'SOP', version: 3.2, status: 'Approved', lastModified: '2024-01-15' },
  { id: 'WI-PROD-045', title: 'Tablet Compression Operating Procedure', type: 'Work Instruction', version: 2.1, status: 'Under Review', lastModified: '2024-01-14' },
  { id: 'FRM-QC-012', title: 'Raw Material Receipt Form', type: 'Form', version: 1.5, status: 'Approved', lastModified: '2024-01-13' },
  { id: 'POL-QA-003', title: 'Quality Policy', type: 'Policy', version: 1.0, status: 'Approved', lastModified: '2024-01-12' },
  { id: 'BR-BATCH-2301', title: 'Batch Manufacturing Record - Product A', type: 'Batch Record', version: 1.0, status: 'Draft', lastModified: '2024-01-11' },
  { id: 'SOP-QC-022', title: 'HPLC Operation and Maintenance', type: 'SOP', version: 4.0, status: 'Approved', lastModified: '2024-01-10' },
  { id: 'WI-PACK-018', title: 'Blister Packaging Procedure', type: 'Work Instruction', version: 1.2, status: 'Approved', lastModified: '2024-01-09' },
  { id: 'FRM-QA-008', title: 'Deviation Report Form', type: 'Form', version: 2.0, status: 'Approved', lastModified: '2024-01-08' }
])

const getDocIcon = (type: string) => {
  const icons: Record<string, string> = {
    'SOP': '📘',
    'Work Instruction': '📝',
    'Form': '📋',
    'Policy': '📜',
    'Batch Record': '📊'
  }
  return icons[type] || '📄'
}
</script>

<style scoped>
.document-list {
  padding: 1.5rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  min-width: 250px;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
}

.documents-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: bold;
  color: #2c3e50;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.doc-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.doc-icon {
  font-size: 1.2rem;
}

.doc-type {
  background: #e8f4fc;
  color: #3498db;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
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

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #f8f9fa;
}

.action-btn.view:hover {
  border-color: #3498db;
  color: #3498db;
}

.action-btn.edit:hover {
  border-color: #ffc107;
  color: #ffc107;
}

.action-btn.download:hover {
  border-color: #28a745;
  color: #28a745;
}

.list-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover {
  background: #f8f9fa;
  border-color: #3498db;
  color: #3498db;
}

.page-info {
  color: #6c757d;
}
</style>
