// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import OpenSourceProjects from './components/OpenSourceProjects.vue'
import ProfessionalProjects from './components/ProfessionalProjects.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', component: HomePage },
  { path: '/open-source-projects', component: OpenSourceProjects },
  { path: '/professional-projects', component: ProfessionalProjects },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router