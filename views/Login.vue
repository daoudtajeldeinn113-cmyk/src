<template>
  <div class="login-container">
    <h1>Pharmaceutical QMS Login</h1>
    <p>Developed by Dr. Daoud Tajeldeinn Ahmed Abdelkareim</p>
    
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" placeholder="admin" />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="password123" />
      </div>
      <button type="submit">Login</button>
    </form>
    
    <div class="demo-credentials">
      <h3>Demo Credentials:</h3>
      <ul>
        <li><strong>Admin:</strong> admin / password123</li>
        <li><strong>Quality Manager:</strong> qmanager / password123</li>
        <li><strong>Quality Analyst:</strong> qanalyst / password123</li>
        <li><strong>Operator:</strong> operator / password123</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('admin')
const password = ref('password123')

const login = () => {
  // For demo purposes, just redirect to dashboard
  router.push('/')
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background: #2980b9;
}

.demo-credentials {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 5px;
}

.demo-credentials h3 {
  margin-top: 0;
  color: #2c3e50;
}

.demo-credentials ul {
  padding-left: 1.5rem;
  margin: 0;
}

.demo-credentials li {
  margin-bottom: 0.5rem;
  color: #34495e;
}
</style>
