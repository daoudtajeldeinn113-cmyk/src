<template>
  <div id="app">
    <!-- Pharmaceutical QMS Header -->
    <header class="app-header">
      <div class="header-container">
        <div class="brand-section">
          <router-link to="/" class="brand-link">
            <div class="brand-icon">🏥</div>
            <div class="brand-text">
              <h1>Pharmaceutical QMS</h1>
              <p class="brand-subtitle">GMP Compliance Platform</p>
            </div>
          </router-link>
        </div>
        
        <div class="user-section">
          <div class="user-info">
            <div class="user-avatar">DT</div>
            <div class="user-details">
              <span class="user-name">Dr. Daoud Tajeldeinn</span>
              <span class="user-role">QMS Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Pharmaceutical Navigation -->
    <nav class="main-nav">
      <div class="nav-container">
        <div class="nav-group">
          <router-link to="/" class="nav-item">
            <span class="nav-icon">📊</span>
            <span class="nav-text">Dashboard</span>
          </router-link>
        </div>

        <!-- Core Quality Navigation -->
        <div class="nav-group">
          <div class="nav-header">🎯 Core Quality</div>
          <router-link to="/documents" class="nav-item">
            <span class="nav-icon">📄</span>
            <span class="nav-text">Documents</span>
          </router-link>
          <router-link to="/training" class="nav-item">
            <span class="nav-icon">🎓</span>
            <span class="nav-text">Training</span>
          </router-link>
          <router-link to="/audits" class="nav-item">
            <span class="nav-icon">✅</span>
            <span class="nav-text">Audits</span>
          </router-link>
          <router-link to="/capa" class="nav-item">
            <span class="nav-icon">⚠️</span>
            <span class="nav-text">CAPA</span>
          </router-link>
          <router-link to="/deviations" class="nav-item">
            <span class="nav-icon">🚨</span>
            <span class="nav-text">Deviations</span>
          </router-link>
        </div>

        <!-- GMP Compliance Navigation -->
        <div class="nav-group">
          <div class="nav-header">🏭 GMP Compliance</div>
          <router-link to="/change-control" class="nav-item">
            <span class="nav-icon">🔄</span>
            <span class="nav-text">Change Control</span>
          </router-link>
          <router-link to="/risk-management" class="nav-item">
            <span class="nav-icon">⚖️</span>
            <span class="nav-text">Risk Management</span>
          </router-link>
          <router-link to="/validation" class="nav-item">
            <span class="nav-icon">🔬</span>
            <span class="nav-text">Validation</span>
          </router-link>
          <router-link to="/equipment" class="nav-item">
            <span class="nav-icon">🔧</span>
            <span class="nav-text">Equipment</span>
          </router-link>
        </div>

        <!-- Administration Navigation -->
        <div class="nav-group">
          <div class="nav-header">⚙️ Administration</div>
          <router-link to="/users" class="nav-item">
            <span class="nav-icon">👥</span>
            <span class="nav-text">Users</span>
          </router-link>
          <router-link to="/reports" class="nav-item">
            <span class="nav-icon">📈</span>
            <span class="nav-text">Reports</span>
          </router-link>
          <router-link to="/settings" class="nav-item">
            <span class="nav-icon">⚙️</span>
            <span class="nav-text">Settings</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="main-content">
      <div class="content-container">
        <router-view />
      </div>
    </main>

    <!-- Pharmaceutical Footer -->
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>Pharmaceutical QMS v1.0</h4>
          <p>Comprehensive Quality Management System for Pharmaceutical Manufacturing</p>
          <p class="compliance-info">Compliant with: FDA 21 CFR Part 11, EU GMP Annex 11, ICH Q10</p>
        </div>
        <div class="footer-section">
          <h4>Developed by</h4>
          <p>Dr. Daoud Tajeldeinn Ahmed Abdelkareim</p>
          <p>Pharmaceutical QMS Specialist | GMP Compliance Expert</p>
        </div>
        <div class="footer-section">
          <h4>Technology Stack</h4>
          <p>Vue.js 3 • TypeScript • PrimeVue • Vite</p>
          <p class="tech-info">Built with modern web technologies for optimal performance</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// App component
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background: #f8f9fa;
  color: #2c3e50;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styles */
.app-header {
  background: linear-gradient(135deg, #1a5276 0%, #3498db 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.brand-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.brand-text h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.brand-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  font-size: 0.95rem;
}

.user-role {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Navigation Styles */
.main-nav {
  background: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  overflow-x: auto;
}

.nav-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-header {
  font-weight: bold;
  color: #7f8c8d;
  font-size: 0.9rem;
  padding: 1rem 0.5rem;
  white-space: nowrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2c3e50;
  padding: 1rem 1rem;
  border-radius: 6px;
  transition: all 0.3s;
  white-space: nowrap;
  border: 1px solid transparent;
}

.nav-item:hover {
  background: #e8f4fc;
  color: #3498db;
  border-color: #3498db;
}

.nav-item.router-link-active {
  background: #3498db;
  color: white;
}

.nav-icon {
  font-size: 1.2rem;
}

/* Main Content */
.main-content {
  flex: 1;
  background: #f8f9fa;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Footer Styles */
.app-footer {
  background: #2c3e50;
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.compliance-info {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 1rem;
}

.tech-info {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .nav-container {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .content-container {
    padding: 1rem;
  }
  
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
