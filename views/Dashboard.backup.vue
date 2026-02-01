<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>🏥 Pharmaceutical Quality Management System</h1>
      <div class="developer-info">
        <h2>Developed by: Dr. Daoud Tajeldeinn Ahmed Abdelkareim</h2>
        <p>Pharmaceutical QMS Specialist | GMP Compliance Expert</p>
      </div>
    </div>

    <!-- System Status -->
    <div class="system-status">
      <div class="status-card">
        <h3>✅ System Status: Fully Operational</h3>
        <div class="status-indicators">
          <div class="status-item">
            <span class="status-dot active"></span>
            <span>Vue.js 3: Running</span>
          </div>
          <div class="status-item">
            <span class="status-dot active"></span>
            <span>TypeScript: Compiled</span>
          </div>
          <div class="status-item">
            <span class="status-dot active"></span>
            <span>PrimeVue: Loaded</span>
          </div>
          <div class="status-item">
            <span class="status-dot active"></span>
            <span>Database: Ready</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <h3>📊 System Overview</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📄</div>
          <div class="stat-number">342</div>
          <div class="stat-label">Active Documents</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <div class="stat-number">18</div>
          <div class="stat-label">Open CAPAs</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-number">7</div>
          <div class="stat-label">Scheduled Audits</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚨</div>
          <div class="stat-number">23</div>
          <div class="stat-label">Open Deviations</div>
        </div>
      </div>
    </div>

    <!-- COMPLETE QMS MODULES STRUCTURE -->
    <div class="modules-section">
      <h2>📋 Complete Pharmaceutical QMS Modules</h2>
      <p class="section-description">Comprehensive GMP Compliance Platform</p>

      <!-- Core Quality Modules -->
      <div class="module-group">
        <h3>🎯 Core Quality Modules</h3>
        <div class="module-grid">
          <router-link to="/documents" class="module-card">
            <div class="module-icon">📄</div>
            <h4>Document Control</h4>
            <p>SOPs, Work Instructions, Forms, Batch Records</p>
            <span class="module-status">Active</span>
          </router-link>

          <router-link to="/training" class="module-card">
            <div class="module-icon">🎓</div>
            <h4>Training Management</h4>
            <p>Employee training records & qualification</p>
            <span class="module-status">Active</span>
          </router-link>

          <router-link to="/audits" class="module-card">
            <div class="module-icon">✅</div>
            <h4>Audit Management</h4>
            <p>Internal, External & Supplier Audits</p>
            <span class="module-status">Active</span>
          </router-link>

          <router-link to="/capa" class="module-card">
            <div class="module-icon">⚠️</div>
            <h4>CAPA Management</h4>
            <p>Corrective & Preventive Actions</p>
            <span class="module-status">Active</span>
          </router-link>
        </div>
      </div>

      <!-- PQMS Integration -->
      <div class="module-group">
        <h3>🔬 PQMS V008 Integration</h3>
        <p class="section-description">Enhanced Material & Quality Management System</p>

        <div class="module-grid">
          <!-- Test Component -->
          <div class="module-card pqms-test-module">
            <div class="module-icon">🧪</div>
            <h4>PQMS Test Module</h4>
            <p>Testing the new PQMS material management system</p>
            <TestStore />
          </div>

          <!-- COA Generator -->
          <router-link to="/pqms/coa-generator" class="module-card">
            <div class="module-icon">🎫</div>
            <h4>COA Generator</h4>
            <p>Certificate of Analysis with BP/USP compliance</p>
            <span class="module-status">New</span>
          </router-link>

          <!-- Material Database -->
          <router-link to="/pqms/material-database" class="module-card">
            <div class="module-icon">📦</div>
            <h4>Material Database</h4>
            <p>API, Excipients & Finished Products specifications</p>
            <span class="module-status">New</span>
          </router-link>

          <!-- IPQC Calculator -->
          <router-link to="/pqms/ipqc-calculator" class="module-card">
            <div class="module-icon">📊</div>
            <h4>IPQC Calculator</h4>
            <p>In-process quality control calculations</p>
            <span class="module-status">New</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TestStore from '../modules/pqms/components/TestStore.vue';
</script>

<style scoped>
/* إضافة الأنماط الحالية هنا */
.dashboard {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.developer-info {
  margin-top: 15px;
}

.system-status {
  margin-bottom: 30px;
}

.quick-stats {
  margin-bottom: 40px;
}

.modules-section {
  margin-top: 40px;
}

.module-group {
  margin-bottom: 40px;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.module-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.pqms-test-module {
  border: 2px solid #4CAF50;
}

.module-icon {
  font-size: 32px;
  margin-bottom: 15px;
}

.module-status {
  display: inline-block;
  padding: 4px 12px;
  background: #4CAF50;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  margin-top: 10px;
}
</style>
