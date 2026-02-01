<template>
  <div class="pharma-quality-system">
    <!-- Pharmaceutical Quality System Header -->
    <div class="qms-header">
      <h1>🏥 Pharmaceutical Quality Management System (QMS)</h1>
      <div class="system-badges">
        <span class="badge gmp">GMP</span>
        <span class="badge gdp">GDP</span>
        <span class="badge glp">GLP</span>
        <span class="badge gcp">GCP</span>
        <span class="badge gvp">GVP</span>
      </div>
    </div>

    <!-- Quality System Overview -->
    <div class="system-overview">
      <div class="overview-card">
        <h3>🎯 Quality Policy & Objectives</h3>
        <p>Establish and maintain a quality policy that ensures patient safety and product efficacy.</p>
        <div class="metrics">
          <div class="metric">
            <span class="metric-value">100%</span>
            <span class="metric-label">Regulatory Compliance</span>
          </div>
          <div class="metric">
            <span class="metric-value">0</span>
            <span class="metric-label">Critical Observations</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <h3>🔬 Quality Risk Management (QRM)</h3>
        <p>Proactive identification, assessment, control, and review of risks to product quality.</p>
        <div class="risk-levels">
          <div class="risk-level low">
            <span class="level-name">Low Risk</span>
            <span class="level-count">85%</span>
          </div>
          <div class="risk-level medium">
            <span class="level-name">Medium Risk</span>
            <span class="level-count">12%</span>
          </div>
          <div class="risk-level high">
            <span class="level-name">High Risk</span>
            <span class="level-count">3%</span>
          </div>
        </div>
      </div>
      
      <div class="overview-card">
        <h3>📊 Quality Metrics & KPIs</h3>
        <p>Monitor and measure quality system performance through defined metrics.</p>
        <div class="kpi-grid">
          <div class="kpi">
            <span class="kpi-name">Batch Success Rate</span>
            <span class="kpi-value">99.8%</span>
          </div>
          <div class="kpi">
            <span class="kpi-name">Customer Complaints</span>
            <span class="kpi-value">0.2%</span>
          </div>
          <div class="kpi">
            <span class="kpi-name">CAPA Effectiveness</span>
            <span class="kpi-value">95%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pharmaceutical Quality System Modules -->
    <div class="qms-modules">
      <h2>📋 Pharmaceutical Quality System Components</h2>
      
      <!-- GMP Requirements -->
      <div class="module-section">
        <h3>🏭 Good Manufacturing Practice (GMP)</h3>
        <div class="module-grid">
          <div class="module-card active" @click="navigateTo('documents')">
            <div class="module-icon">📄</div>
            <h4>Documentation System</h4>
            <p>SOPs, batch records, specifications, protocols</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('training')">
            <div class="module-icon">🎓</div>
            <h4>Personnel & Training</h4>
            <p>Qualification, training records, GMP awareness</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('facilities')">
            <div class="module-icon">🏢</div>
            <h4>Premises & Equipment</h4>
            <p>Qualification, calibration, maintenance</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('production')">
            <div class="module-icon">🏭</div>
            <h4>Production & In-Process Controls</h4>
            <p>Batch manufacturing, line clearance, yield</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('quality-control')">
            <div class="module-icon">🔬</div>
            <h4>Quality Control</h4>
            <p>Testing, sampling, stability studies</p>
            <div class="module-status active">Active</div>
          </div>
        </div>
      </div>

      <!-- GDP Requirements -->
      <div class="module-section">
        <h3>📝 Good Documentation Practice (GDP)</h3>
        <div class="module-grid">
          <div class="module-card active">
            <div class="module-icon">✍️</div>
            <h4>Document Creation</h4>
            <p>ALCOA+ principles, data integrity</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">📋</div>
            <h4>Document Control</h4>
            <p>Version control, approval, distribution</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">🔍</div>
            <h4>Document Review</h4>
            <p>Periodic review, effectiveness checks</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">🗂️</div>
            <h4>Document Archival</h4>
            <p>Retention, retrieval, destruction</p>
            <div class="module-status active">Active</div>
          </div>
        </div>
      </div>

      <!-- Quality Assurance -->
      <div class="module-section">
        <h3>✅ Quality Assurance Activities</h3>
        <div class="module-grid">
          <div class="module-card active" @click="navigateTo('audits')">
            <div class="module-icon">✅</div>
            <h4>Audits & Inspections</h4>
            <p>Internal, external, regulatory audits</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('batch-release')">
            <div class="module-icon">📦</div>
            <h4>Batch Release</h4>
            <p>Batch certification, market release</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('complaints')">
            <div class="module-icon">📣</div>
            <h4>Market Complaints</h4>
            <p>Investigation, reporting, trending</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active" @click="navigateTo('recall-management')">
            <div class="module-icon">🚫</div>
            <h4>Recall Management</h4>
            <p>Product recall, market withdrawal</p>
            <div class="module-status active">Active</div>
          </div>
        </div>
      </div>

      <!-- Quality Control -->
      <div class="module-section">
        <h3>🔬 Quality Control Activities</h3>
        <div class="module-grid">
          <div class="module-card active">
            <div class="module-icon">🧪</div>
            <h4>Analytical Testing</h4>
            <p>HPLC, GC, spectroscopy, microbiology</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">📊</div>
            <h4>Stability Studies</h4>
            <p>ICH guidelines, shelf-life determination</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">⚖️</div>
            <h4>Reference Standards</h4>
            <p>Qualification, storage, distribution</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">🔧</div>
            <h4>Laboratory Equipment</h4>
            <p>Qualification, calibration, maintenance</p>
            <div class="module-status active">Active</div>
          </div>
        </div>
      </div>

      <!-- Regulatory Compliance -->
      <div class="module-section">
        <h3>📜 Regulatory Compliance</h3>
        <div class="module-grid">
          <div class="module-card active">
            <div class="module-icon">🇺🇸</div>
            <h4>FDA Compliance</h4>
            <p>21 CFR Parts 210, 211, 11, 820</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">🇪🇺</div>
            <h4>EU GMP Compliance</h4>
            <p>EudraLex Volume 4, Annexes</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">🌍</div>
            <h4>ICH Guidelines</h4>
            <p>Q7, Q9, Q10, Q11, Q12</p>
            <div class="module-status active">Active</div>
          </div>
          
          <div class="module-card active">
            <div class="module-icon">🇬🇧</div>
            <h4>BP/USP/EP Compliance</h4>
            <p>Pharmacopoeial standards</p>
            <div class="module-status active">Active</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quality System Dashboard -->
    <div class="quality-dashboard">
      <h2>📊 Quality System Performance Dashboard</h2>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h4>Quality Metrics Trend</h4>
          <div class="chart-placeholder">
            📈 Quality Metrics Trend Chart
          </div>
        </div>
        
        <div class="dashboard-card">
          <h4>CAPA Effectiveness</h4>
          <div class="chart-placeholder">
            📊 CAPA Effectiveness Chart
          </div>
        </div>
        
        <div class="dashboard-card">
          <h4>Audit Findings</h4>
          <div class="chart-placeholder">
            🎯 Audit Findings Chart
          </div>
        </div>
        
        <div class="dashboard-card">
          <h4>Compliance Status</h4>
          <div class="chart-placeholder">
            ✅ Compliance Status Chart
          </div>
        </div>
      </div>
    </div>

    <!-- Management Review -->
    <div class="management-review">
      <h3>👨‍💼 Management Review & Oversight</h3>
      <div class="review-content">
        <div class="review-item">
          <h4>Next Management Review</h4>
          <div class="review-date">March 15, 2024</div>
          <div class="review-status pending">Pending</div>
        </div>
        
        <div class="review-item">
          <h4>Last Management Review</h4>
          <div class="review-date">December 20, 2023</div>
          <div class="review-status completed">Completed</div>
        </div>
        
        <div class="review-item">
          <h4>Action Items</h4>
          <div class="action-count">12</div>
          <div class="review-status in-progress">In Progress</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (module: string) => {
  router.push(`/${module}`)
}
</script>

<style scoped>
.pharma-quality-system {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.qms-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #3498db;
}

.qms-header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.system-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
}

.badge.gmp {
  background: #3498db;
}

.badge.gdp {
  background: #2ecc71;
}

.badge.glp {
  background: #9b59b6;
}

.badge.gcp {
  background: #e74c3c;
}

.badge.gvp {
  background: #f39c12;
}

.system-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.overview-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
}

.overview-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.overview-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.metrics {
  display: flex;
  gap: 1rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
}

.metric-label {
  display: block;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.risk-levels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.risk-level {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 4px;
}

.risk-level.low {
  background: #d4edda;
  color: #155724;
}

.risk-level.medium {
  background: #fff3cd;
  color: #856404;
}

.risk-level.high {
  background: #f8d7da;
  color: #721c24;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.kpi {
  text-align: center;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.kpi-name {
  display: block;
  font-size: 0.8rem;
  color: #7f8c8d;
}

.kpi-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.qms-modules {
  margin: 3rem 0;
}

.module-section {
  margin: 3rem 0;
}

.module-section h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.module-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid #e9ecef;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  position: relative;
}

.module-card:hover {
  border-color: #3498db;
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.15);
}

.module-card.active {
  border-color: #27ae60;
}

.module-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.module-card h4 {
  color: #2c3e50;
  margin: 0.5rem 0;
}

.module-card p {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.module-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.module-status.active {
  background: #d4edda;
  color: #155724;
}

.quality-dashboard {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  margin: 3rem 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.dashboard-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.dashboard-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 4px;
  color: #6c757d;
}

.management-review {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.review-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.review-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.review-item h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.review-date {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0;
}

.action-count {
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 0.5rem 0;
}

.review-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.review-status.pending {
  background: #fff3cd;
  color: #856404;
}

.review-status.completed {
  background: #d4edda;
  color: #155724;
}

.review-status['in-progress'] {
  background: #d1ecf1;
  color: #0c5460;
}
</style>
