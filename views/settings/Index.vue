<template>
  <div class="module-container">
    <div class="module-header">
      <h1>📋 Settings</h1>
      <p class="module-description">Pharmaceutical QMS - Settings Module</p>
    </div>
    
    <div class="module-content">
      <div class="info-card">
        <h3>Module Overview</h3>
        <p>This module manages Settings processes in compliance with GMP requirements.</p>
        <p><strong>Status:</strong> 🚧 Under Development</p>
        <p><strong>Compliance:</strong> FDA 21 CFR Part 11, EU GMP Annex 11</p>
      </div>
      
      <div class="features">
        <h3>Planned Features:</h3>
        <ul>
          <li>Electronic record management</li>
          <li>Workflow automation</li>
          <li>Electronic signatures</li>
          <li>Audit trail</li>
          <li>Reporting and analytics</li>
        </ul>
      </div>
      
      <router-link to="/" class="back-link">
        ← Return to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Settings module
</script>

<style scoped>
.module-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.module-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 1rem;
}

.module-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.module-description {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.module-content {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.info-card {
  background: #e8f4fc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #3498db;
}

.features {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.features ul {
  list-style: none;
  padding-left: 0;
}

.features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}

.back-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: 2px solid #3498db;
  border-radius: 6px;
  transition: all 0.3s;
}

.back-link:hover {
  background: #3498db;
  color: white;
}
</style>
