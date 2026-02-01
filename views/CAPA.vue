<template>
  <div class="page">
    <h1>⚠️ CAPA Management</h1>
    <p>Corrective and Preventive Actions Tracking System</p>
    <p>This module is under development.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCAPAStore } from '@/stores/capaStore'
import type { CAPAReport, CAPAFormData } from '@/types/capa'

// PrimeVue Components
import Card from 'primevue/card'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'

// Store
const store = useCAPAStore()

// Local state
const showNewDialog = ref(false)
const showDeleteDialog = ref(false)
const searchText = ref('')
const selectedReport = ref<CAPAReport | null>(null)

const newReport = ref<CAPAFormData>({
  title: '',
  description: '',
  type: 'corrective',
  priority: 'medium',
  dueDate: '',
  assignedTo: '',
  department: 'Quality Assurance',
  source: ''
})

// Options
const typeOptions = [
  { label: 'Corrective Action', value: 'corrective' },
  { label: 'Preventive Action', value: 'preventive' }
]

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' }
]

// Computed
const statsCards = computed(() => [
  { title: 'Total Reports', value: store.totalReports, color: 'blue' },
  { title: 'Open', value: store.openReports, color: 'orange' },
  { title: 'In Progress', value: store.inProgressReports, color: 'green' },
  { title: 'Critical', value: store.criticalReports, color: 'red' }
])

const filteredReports = computed(() => {
  if (!searchText.value) return store.filteredReports
  const search = searchText.value.toLowerCase()
  return store.filteredReports.filter(report =>
    report.title.toLowerCase().includes(search) ||
    report.reportNumber.toLowerCase().includes(search) ||
    report.assignedTo.toLowerCase().includes(search)
  )
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low': return 'info'
    case 'medium': return 'warning'
    case 'high': return 'danger'
    case 'critical': return 'danger'
    default: return 'info'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'warning'
    case 'in_progress': return 'info'
    case 'closed': return 'success'
    case 'verified': return 'help'
    default: return 'info'
  }
}

const viewReport = (report: CAPAReport) => {
  // Implement view functionality
  console.log('View report:', report)
}

const editReport = (report: CAPAReport) => {
  selectedReport.value = report
  // Implement edit functionality
}

const confirmDelete = (report: CAPAReport) => {
  selectedReport.value = report
  showDeleteDialog.value = true
}

const deleteReport = () => {
  if (selectedReport.value) {
    store.deleteReport(selectedReport.value.id)
    showDeleteDialog.value = false
    selectedReport.value = null
  }
}

const createReport = () => {
  store.addReport({
    ...newReport.value,
    status: 'open',
    department: 'Quality Assurance',
    source: 'Manual Entry',
    attachments: []
  })
  
  showNewDialog.value = false
  resetNewReport()
}

const resetNewReport = () => {
  newReport.value = {
    title: '',
    description: '',
    type: 'corrective',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    department: 'Quality Assurance',
    source: ''
  }
}

onMounted(() => {
  // Load initial data
})
</script>

<style scoped>
.page {
  padding: 2rem;
}
h1 {
  color: #2c3e50;
}
p {
  color: #7f8c8d;
}
</style>

