import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from "@/views/Dashboard.vue"

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/documents',
    name: 'DocumentControl',
    component: () => import('@/views/documents/Index.vue')
  },
  {
    path: '/quality-management',
    name: 'QualityManagement',
    component: () => import('@/views/quality-management/Index.vue')
  },
  {
    path: '/production/batch-manufacturing',
    name: 'BatchManufacturing',
    component: () => import('@/views/production/batch-manufacturing/Index.vue')
  },
  {
    path: '/quality-control/testing',
    name: 'QualityControlTesting',
    component: () => import('@/views/quality-control/testing/Index.vue')
  },
  {
    path: '/quality-control/stability-studies',
    name: 'StabilityStudies',
    component: () => import('@/views/quality-control/stability-studies/Index.vue')
  },
  {
    path: '/validation/process-validation',
    name: 'ProcessValidation',
    component: () => import('@/views/validation/process-validation/Index.vue')
  },
  {
    path: '/pqms/coa-generator',
    name: 'PQMSCoaGenerator',
    component: () => import('@/views/pqms/COAGenerator.vue')
  },
  {
    path: '/pqms/material-database',
    name: 'PQMSMaterialDatabase',
    component: () => import('@/views/pqms/MaterialDatabase.vue')
  },
  {
    path: '/pqms/ipqc-calculator',
    name: 'PQMSIPQCCalculator',
    component: () => import('@/views/pqms/IPQCCalculator.vue')
  },
  {
    path: '/pqms/monographs',
    name: 'PqmsMonographs',
    component: () => import('@/views/pqms/Monographs.vue')
  },
  {
    path: '/pqms/product-specs',
    name: 'PQMSProductSpecs',
    component: () => import('@/views/pqms/ProductSpecs.vue')
  },
  {
    path: '/pqms/quality-dashboard',
    name: 'PQMSQualityDashboard',
    component: () => import('@/views/pqms/QualityDashboard.vue')
  },
  {
    path: '/pqms/test-store',
    name: 'TestStore',
    component: () => import('@/views/TestStore.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


