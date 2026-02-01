<template>
  <div class="dashboard">
    <h1>🏥 Pharmaceutical Quality Management System (PQMS)</h1>
    <p class="subtitle">نظام إدارة الجودة الدوائية - الإصدار V008</p>
    
    <!-- Quality Standards -->
    <div class="standards">
      <span class="standard">GMP</span>
      <span class="standard">GLP</span>
      <span class="standard">GCP</span>
      <span class="standard">GDP</span>
      <span class="standard">ICH</span>
      <span class="standard">USP</span>
      <span class="standard">BP</span>
    </div>
    
    <!-- Modules Grid -->
    <div class="modules-grid">
      <!-- Test Module -->
      <router-link to="/pqms/test-store" class="module-card">
        <div class="module-icon">🧪</div>
        <h3>Test Module</h3>
        <p>وحدة الاختبار والتجربة</p>
      </router-link>
      
      <!-- COA Generator -->
      <router-link to="/pqms/coa-generator" class="module-card">
        <div class="module-icon">🎫</div>
        <h3>COA Generator</h3>
        <p>مولد شهادات التحليل</p>
      </router-link>
      
      <!-- Material Database -->
      <router-link to="/pqms/material-database" class="module-card">
        <div class="module-icon">📦</div>
        <h3>Material Database</h3>
        <p>قاعدة بيانات المواد</p>
      </router-link>
      
      <!-- IPQC Calculator -->
      <router-link to="/pqms/ipqc-calculator" class="module-card">
        <div class="module-icon">📊</div>
        <h3>IPQC Calculator</h3>
        <p>حاسبة مراقبة الجودة أثناء الإنتاج</p>
      </router-link>
      
      <!-- CAPA Management -->
      <router-link to="/pqms/capa-management" class="module-card">
        <div class="module-icon">🔄</div>
        <h3>CAPA Management</h3>
        <p>إدارة الإجراءات التصحيحية والوقائية</p>
      </router-link>
      
      <!-- Deviation Management -->
      <router-link to="/pqms/deviation-management" class="module-card">
        <div class="module-icon">⚠️</div>
        <h3>Deviation Management</h3>
        <p>إدارة الانحرافات</p>
      </router-link>
      
      <!-- Stability Studies -->
      <router-link to="/pqms/stability-studies" class="module-card">
        <div class="module-icon">📈</div>
        <h3>Stability Studies</h3>
        <p>دراسات الثبات</p>
      </router-link>
      
      <!-- Monographs -->
      <router-link to="/pqms/monographs" class="module-card">
        <div class="module-icon">📚</div>
        <h3>Monographs</h3>
        <p>الأدوية الفردية</p>
      </router-link>
    </div>
    
    <!-- System Status -->
    <div class="system-status">
      <h2>📊 System Status / حالة النظام</h2>
      <div class="status-grid">
        <div class="status-item online">
          <span class="status-dot"></span>
          <span class="status-text">System Online</span>
          <span class="status-text-ar">النظام يعمل</span>
        </div>
        <div class="status-item">
          <span class="status-value">8</span>
          <span class="status-label">Active Modules</span>
          <span class="status-label-ar">وحدات نشطة</span>
        </div>
        <div class="status-item">
          <span class="status-value">0</span>
          <span class="status-label">Errors</span>
          <span class="status-label-ar">أخطاء</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dashboard component
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 30px;
}

/* Standards */
.standards {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.standard {
  padding: 8px 15px;
  background: #3498db;
  color: white;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
}

/* Modules Grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.module-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s;
  text-align: center;
}

.module-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.module-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.module-card h3 {
  color: #2c3e50;
  margin: 10px 0;
}

.module-card p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* System Status */
.system-status {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.status-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #dee2e6;
}

.status-item.online {
  background: #d4edda;
  border-color: #c3e6cb;
}

.status-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #28a745;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.status-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.status-label, .status-label-ar {
  display: block;
  color: #6c757d;
  font-size: 0.9rem;
}

.status-text, .status-text-ar {
  display: block;
  color: #155724;
  font-weight: bold;
}
</style>

