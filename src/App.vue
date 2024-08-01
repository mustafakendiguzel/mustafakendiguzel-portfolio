<template>
  <div id="app">
    <BackgroundCode />
    <nav>
      <router-link to="/home">{{ $t('nav.home') }}</router-link>
      <router-link to="/open-source-projects">{{ $t('nav.openSourceProjects') }}</router-link>
      <router-link to="/professional-projects">
      <span v-on:click="updateCurrentDirectory('sd')">
        {{ $t('nav.professionalProjects') }}
      </span></router-link>

      <div class="dropdown">
        <button class="dropbtn">
          <img :src="currentFlag" alt="Language" class="flag-icon" />
        </button>
        <div class="dropdown-content">
          <a v-for="(lang, code) in languageOptions" :key="code" @click="changeLanguage(code)">
            <img  :src="lang.flag" alt="Language" class="flag-icon" />
          </a>
        </div>
      </div>

    </nav>
    <div class="content-wrapper">
      <main>
        <router-view></router-view>
      </main>
      <Terminal />
    </div>
  </div>
</template>

<script>
import Terminal from './components/Terminal.vue'
import BackgroundCode from './components/BackgroundCode.vue'
import axios from 'axios'
import { usePathStore } from './stores/path';


export default {
  name: 'App',
  components: {
    Terminal,
    BackgroundCode
  },
  data() {
    return {
      thirdLanguage: { countryCode: null, code: null },
      languageOptions: {
        en: { flag: require('@/assets/flags/en.jpg') },
        tr: { flag: require('@/assets/flags/tr.jpg') },
        // Add other languages here
      },
      currentFlag: require('@/assets/flags/en.jpg') // Default flag
    }
  },
  mounted() {
    this.detectUserCountry()
  },
  methods: {
    async detectUserCountry() {
      const pathStore = usePathStore()
      try {
        const response = await axios.get('https://ipapi.co/json/')
        const countryCode = response.data.country_code.toLowerCase()
        const languageCode = response.data.languages.split(',')[0].toLowerCase().substring(0, 2)
        
        this.thirdLanguage = { countryCode, code: languageCode }
        if (!localStorage.getItem('userLanguage')) {
          return pathStore.updateCurrentLang(languageCode)
        }
        this.currentFlag = this.languageOptions[languageCode]?.flag || this.currentFlag
        
      } catch (error) {
        console.error('Error detecting user country:', error)
      }
    },

    async updateCurrentDirectory(path) {
      const pathStore = usePathStore()
      pathStore.updateCurrentPath(path)
    },

    async changeLanguage(lang) {
      if (this.$i18n.availableLocales.includes(lang)) {
        this.$i18n.locale = lang
        localStorage.setItem('userLanguage', lang)
        this.currentFlag = this.languageOptions[lang]?.flag || this.currentFlag
      } else {
        console.log(`Dil mevcut değil: ${lang}. Çeviriliyor...`)
        await this.translateContent(lang)
      }
    },

    async translateContent(targetLang) {
      const messages = this.$i18n.messages['en']
      const translatedMessages = {}

      for (const [key, value] of Object.entries(messages)) {
        if (typeof value === 'object') {
          translatedMessages[key] = await this.translateObject(value, targetLang)
        } else {
          translatedMessages[key] = await this.translateText(value, targetLang)
        }
      }

      this.$i18n.locale = targetLang
      localStorage.setItem('userLanguage', targetLang)
      this.currentFlag = this.languageOptions[targetLang]?.flag || this.currentFlag
    }
  }
}
</script>

<style>
.flag-icon {
  width: 24px;
  height: 16px;
  vertical-align: middle;
  margin-right: 8px;
}

.dropdown-content a {
  display: flex;
  align-items: center;
}

.dropdown-content a:hover {
  background-color: #00ff00;
  color: #000000;
}
body {
  background-color: #000000;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 10vh;
  position: relative;
  z-index: 1;
}

nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: nowrap;
  background-color: rgba(10, 31, 10, 0.8);
  padding: 15px;
  border-radius: 5px;
}

nav a, .dropdown > router-link {
  color: #00ff00;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin: 0 10px;
  display: inline-block;
}

nav a:hover, .dropdown > router-link:hover {
  background-color: #00ff00;
  color: #000000;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 0.5;
}

main {
  background-color: rgba(10, 31, 10, 0.3);
  padding: 30px;
  border-radius: 5px;
  margin-bottom: 30px;
  flex-grow: 1;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(10, 31, 10, 0.8);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,255,0,0.2);
  z-index: 1;
  right: 0;
  top: 100%;
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-content a {
  color: #00ff00;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border: none;
  margin: 0;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #00ff00;
  color: #000000;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  color: #00ff00;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  margin: 0 10px;
  background-color: transparent;
  cursor: pointer;
}

.dropbtn:hover {
  background-color: #00ff00;
  color: #000000;
}
</style>
