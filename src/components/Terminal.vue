<template>
  <div 
    class="terminal" 
    ref="terminal" 
    :style="terminalStyle" 
    :class="{ 'minimized': isMinimized }"
    @mousedown="startDragging"
    @dblclick="handleDoubleClick"
  >
    <div class="terminal-header">
      Terminal
      <div class="terminal-controls">
        <button @click.stop="toggleMinimize" class="control-button minimize">_</button>
        <button @click.stop="resetPosition" class="control-button reset">
          <span class="reset-icon">↺</span>
        </button>
      </div>
    </div>
    <div class="terminal-body" ref="terminalBody">
      <div v-for="(line, index) in outputLines" :key="index" class="output-line">{{ line }}</div>
      <div class="input-line">
        <span class="prompt">{{ currentDirectory }}$</span>
        <input
          ref="commandInput"
          v-model="currentCommand"
          @keydown.enter="executeCommand"
          @keydown.tab.prevent="handleTabCompletion"
          type="text"
          spellcheck="false"
        />
      </div>
    </div>
    <div class="resize-handle" @mousedown.stop="startResizing"></div>
  </div>
</template>




<script>
import cvUrl from '@/assets/mustafaKendiguzel_cv.pdf';
import axios from 'axios'

export default {
  name: 'TerminalLists',
  data() {
    const welcomeText = this.$t('terminal.welcomeText')
    return {
      outputLines: [welcomeText],
      currentCommand: '',
      currentDirectory: '/home',
      fileSystem: {
        '/': ['home'],
        '/home': ['open-source-projects', 'professional-projects'],
        '/home/open-source-projects': ['project1', 'project2'],
        '/home/professional-projects': ['Medionam', 'Eyedius-One','Meetnutcracker'],
      },
      position: { x: 50, y: 50 },
      size: { width: 550, height: 300},
      isDragging: false,
      isResizing: false,
      dragOffset: { x: 0, y: 0 },
      isMinimized: false,
      originalPosition: { x: 40, y: 20 },
      originalSize: { width: 600, height: 400 },
    }
  },
  computed: {
    terminalStyle() {
      if (this.isMinimized) {
        return {
          position: 'fixed',
          left: '10px',
          bottom: '10px',
          width: '200px',
          height: '40px',
        }
      }
      return {
        position: 'fixed',
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.size.width}px`,
        height: `${this.size.height}px`,
      }
    },
  },
  methods: {
    executeCommand() {
      const command = this.currentCommand.trim()
      this.outputLines.push(`${this.currentDirectory}$ ${command}`)

      const [cmd, ...args] = command.split(' ')

      switch(cmd) {
        case 'cd':
          this.changeDirectory(args[0])
          break
        case 'ls':
          this.listDirectory()
          break
        case 'clear':
        case 'cls':
          this.clearTerminal()
          break
        case 'help':
          this.showHelp()
          break
        case 'ipconfig':
          this.showIpAddress()
          break
        case 'echo':
          this.outputLines.push(args.join(' '))
          break
        case 'download-cv':
          this.downloadCV()
          break
        case 'change-language':
          this.changeLanguageFromTerminal(args[0])
          break
        default:
          this.outputLines.push(`${this.$t('terminal.commandNotFound')}: ${cmd}`)
      }

      this.currentCommand = ''
      this.$nextTick(() => {
        if (this.$refs.terminalBody) {
          this.$refs.terminalBody.scrollTop = this.$refs.terminalBody.scrollHeight
        }
      })
    },
    downloadCV() {
      const link = document.createElement('a')
      link.href = cvUrl
      link.download = 'mustafaKendiguzel_cv.pdf'
      link.click()
      this.outputLines.push('Downloading CV...')
    },
    changeLanguageFromTerminal(lang) {
      const supportedLanguages = ['en', 'tr']

      if (!supportedLanguages.includes(lang)) {
        return this.outputLines.push(`${lang} is not supported`)
      }
      return this.$i18n.locale = lang



        
    },
    changeDirectory(dir) {
      if (!dir) return
      let newPath
      if (dir === '..') {
        const parts = this.currentDirectory.split('/')
        parts.pop()
        newPath = parts.join('/') || '/'
        this.$router.push(`${newPath}`)
      } else if (dir.startsWith('/')) {
        newPath = dir
      } else {
        newPath = `${this.currentDirectory}/${dir}`.replace('//', '/')
        if(this.fileSystem[newPath]) {
          this.$router.push(`/${dir}`)
        }
      }
      if (this.fileSystem[newPath]) {
        this.currentDirectory = newPath
      } else {
        this.outputLines.push(`cd: ${dir}: No such directory`)
      }
    },
    listDirectory() {
      const contents = this.fileSystem[this.currentDirectory]
      if (contents) {
        this.outputLines.push(contents.join(' '))
      } else {
        this.outputLines.push('ls: cannot access directory')
      }
    },
    clearTerminal() {
      this.outputLines = []
    },
    showHelp() {
      this.outputLines.push(
        `${this.$t('terminal.availableCommands.title')}:`,
        `${this.$t('terminal.availableCommands.cd')}:`,
        `${this.$t('terminal.availableCommands.ls')}:`,
        `${this.$t('terminal.availableCommands.clear')}:`,
        `${this.$t('terminal.availableCommands.help')}:`,
        `${this.$t('terminal.availableCommands.ipconfig')}:`,
        `${this.$t('terminal.availableCommands.echo')}:`,
        `${this.$t('terminal.availableCommands.downloadCv')}:`,
        `${this.$t('terminal.availableCommands.changeLanguage')}:`,
      )
    },
    async showIpAddress() {
      const response = await axios.get('https://ipapi.co/json/')
      this.outputLines.push(`IP Address: ${response.data.ip}`)
    },
    handleTabCompletion() {
      const parts = this.currentCommand.split(' ')
      if (parts[0] === 'cd' && parts.length === 2) {
        const partialDir = parts[1]
        const contents = this.fileSystem[this.currentDirectory]
        if (contents) {
          const matches = contents.filter(item => item.startsWith(partialDir))
          if (matches.length === 1) {
            this.currentCommand = `cd ${matches[0]}`
          } else if (matches.length > 1) {
            this.outputLines.push(matches.join(' '))
          }
        }
      } else if (parts[0] === 'ask-ai' && parts.length === 1) {
        this.currentCommand = 'ask-ai '
      }
    },
    startDragging(event) {
      if (event.target.closest('.terminal-controls')) return;
      if (!this.isMinimized) {
        this.isDragging = true
        this.dragOffset.x = event.clientX - this.position.x
        this.dragOffset.y = event.clientY - this.position.y
        document.addEventListener('mousemove', this.drag)
        document.addEventListener('mouseup', this.stopDragging)
      }
    },
    drag(event) {
      if (this.isDragging) {
        requestAnimationFrame(() => {
          this.position.x = event.clientX - this.dragOffset.x
          this.position.y = event.clientY - this.dragOffset.y
        })
      }
    },
    stopDragging() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.drag)
      document.removeEventListener('mouseup', this.stopDragging)
    },
    startResizing() {
      if (!this.isMinimized) {
        this.isResizing = true
        document.addEventListener('mousemove', this.resize)
        document.addEventListener('mouseup', this.stopResizing)
      }
    },
    resize(event) {
      if (this.isResizing) {
        const newWidth = event.clientX - this.position.x
        const newHeight = event.clientY - this.position.y
        this.size.width = Math.max(300, newWidth) // Minimum genişlik
        this.size.height = Math.max(200, newHeight) // Minimum yükseklik
      }
    },
    stopResizing() {
      this.isResizing = false
      document.removeEventListener('mousemove', this.resize)
      document.removeEventListener('mouseup', this.stopResizing)
    },
    resetPosition(event) {
      if (event) event.stopPropagation();
      this.position = { ...this.originalPosition }
      this.size = { ...this.originalSize }
      this.isMinimized = false
    },
    toggleMinimize(event) {
      if (event) event.stopPropagation();
      this.isMinimized = !this.isMinimized
      if (!this.isMinimized) {
        this.position = { ...this.originalPosition }
        this.size = { ...this.originalSize }
      }
    },
    handleDoubleClick(event) {
      if (this.isMinimized && !event.target.closest('.terminal-controls')) {
        this.toggleMinimize()
      }
    },
  },
  mounted() {
    if (this.$refs.commandInput) {
      this.$refs.commandInput.focus()
    }
    this.originalPosition = { ...this.position }
    this.originalSize = { ...this.size }
  },
}
</script>

<style scoped>
.terminal {
  background-color: rgba(10, 31, 10, 0.8);
  border-radius: 5px;
  overflow: hidden;
  font-family: 'Courier New', monospace;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  resize: both;
  overflow: auto;
  will-change: transform;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  box-sizing: border-box;
}

.terminal.minimized {
  width: 200px !important;
  height: 40px !important;
  overflow: hidden;
}

.terminal-header {
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: calc(100% - 20px);
  top: 0;
  left: 0;
  z-index: 1;
}

.terminal-controls {
  display: flex;
  gap: 5px;
}

.control-button {
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 0 5px;
}

.control-button.reset {
  color: #ffff00;
}

.reset-icon {
  display: inline-block;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.control-button.reset:hover .reset-icon {
  transform: rotate(180deg);
}

.terminal-body {
  height: calc(100% - 30px);
  overflow-y: auto;
  padding: 10px;
  position: relative;
  top: 30px; /* To account for header height */
  box-sizing: border-box;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.terminal-body::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 0, 0.5);
  border-radius: 4px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 0, 0.7);
}

.output-line {
  white-space: pre-wrap;
  word-break: break-all;
}

.input-line {
  display: flex;
  align-items: center;
}

.prompt {
  color: #00ff00;
  margin-right: 5px;
  white-space: nowrap;
}

input {
  background-color: transparent;
  border: none;
  color: #00ff00;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: 100%;
}

.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  cursor: se-resize;
}
</style>
