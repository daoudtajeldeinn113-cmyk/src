<template>
  <div class="documents-container">
    <div class="documents-header">
      <h1>📄 Document Control System</h1>
      <p class="subtitle">GMP Compliance Document Management</p>
    </div>

    <div class="documents-content">
      <div class="documents-stats">
        <div class="stat-card">
          <div class="stat-value">342</div>
          <div class="stat-label">Active Documents</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">28</div>
          <div class="stat-label">Pending Review</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">15</div>
          <div class="stat-label">Overdue</div>
        </div>
      </div>

      <div class="documents-message">
        <p>Document Control Module is currently under development.</p>
        <p>Full functionality will be available soon.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Document control logic will be implemented here
</script>

<style scoped>
.documents-container {
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.documents-header {
  margin-bottom: 32px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 16px;
}

.documents-header h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 28px;
}

.subtitle {
  color: #7f8c8d;
  margin-top: 8px;
  font-size: 16px;
}

.documents-content {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.documents-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  border-left: 4px solid #3498db;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  color: #7f8c8d;
  font-size: 14px;
  margin-top: 8px;
}

.documents-message {
  background: #e8f4fd;
  border-radius: 6px;
  padding: 20px;
  border-left: 4px solid #3498db;
}

.documents-message p {
  margin: 8px 0;
  color: #2c3e50;
}
</style>
