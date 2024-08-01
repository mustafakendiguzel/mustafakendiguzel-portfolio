// src/stores/path.js
import { defineStore } from 'pinia'

export const usePathStore = defineStore('path', {
  state: () => ({
    currentPath: '/home',
    localeLang: localStorage.getItem('userLanguage') || 'en',
  }),
  actions: {
    updateCurrentPath(path) {
      this.$state.currentPath = path
    },
    
    updateCurrentLang(lang) {
      const supportedLangs = ['en', 'tr']

      if (!supportedLangs.includes(lang)) {
        return
      }
      localStorage.setItem('userLanguage', lang)
      this.$state.localeLang = lang
    }
  }
})