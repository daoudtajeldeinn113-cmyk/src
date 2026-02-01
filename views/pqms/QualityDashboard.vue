<template>
  <div class="pqms-page">
    <div class="header">
      <h1>🔬 لوحة تحكم الجودة</h1>
      <p class="subtitle">نظام إدارة الجودة الدوائية - وحدة لوحة تحكم الجودة</p>
    </div>
    
    <div class="content">
      <div class="card">
        <h2>🚧 تحت التطوير</h2>
        <p>هذه الصفحة قيد الإنشاء حالياً. ستكون متاحة قريباً.</p>
        
        <div class="features">
          <h3>المميزات القادمة:</h3>
          <ul>
            <li>واجهة مستخدم متكاملة</li>
            <li>إدارة البيانات</li>
            <li>تقارير وتحليلات</li>
            <li>تصدير البيانات</li>
          </ul>
        </div>
        
        <div class="actions">
          <router-link to="/" class="btn btn-primary">
            ← العودة للرئيسية
          </router-link>
          <router-link to="/pqms/test-store" class="btn btn-secondary">
            🧪 الذهاب لـ Test Module
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// QualityDashboard component
</script>

<style scoped>
.pqms-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.content {
  display: flex;
  justify-content: center;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
}

.card h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.features {
  margin: 25px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.features h3 {
  color: #3498db;
  margin-bottom: 10px;
}

.features ul {
  list-style-type: none;
  padding-left: 20px;
}

.features li {
  padding: 5px 0;
  position: relative;
}

.features li:before {
  content: "✓";
  color: #27ae60;
  position: absolute;
  left: -20px;
}

.actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-secondary {
  background: #2ecc71;
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
