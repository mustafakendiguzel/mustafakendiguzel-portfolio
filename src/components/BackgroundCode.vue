<template>
  <div class="background-code">
    <div v-for="(line, index) in codeLines" :key="index" class="code-line" :style="{ top: `${line.top}%`, left: `${line.left}%` }">
      {{ line.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundCode',
  data() {
    return {
      codeLines: [],
      backgroundTexts: [
        'nodejs', 'nestjs', 'expressjs', 'backend', 'microservices', 'clickhouse', 
        'postgresql', 'mongodb', 'rest API', 'nosql', 'sql', 'bigdata', 
        'architecture design', 'solid', 'dependency injection', 'vue.js', 'aws', 'google-cloud', 'aws-sns', 'braintree', 'react.js', 'next.js','braintree','supabase','realtime-db','firebase','redis','rabbitmq','typescript','docker',
      ]
    }
  },
  mounted() {
    this.generateCodeLines();
    setInterval(this.moveCodeLines, 100);
  },
  methods: {
    generateCodeLines() {
      for (let i = 0; i < 20; i++) {
        this.codeLines.push({
          text: this.backgroundTexts[Math.floor(Math.random() * this.backgroundTexts.length)],
          top: Math.random() * 100,
          left: Math.random() * 100,
        });
      }
    },
    moveCodeLines() {
      this.codeLines.forEach(line => {
        line.top += 0.1;
        if (line.top > 100) {
          line.top = -10;
          line.left = Math.random() * 100;
          line.text = this.backgroundTexts[Math.floor(Math.random() * this.backgroundTexts.length)];
        }
      });
    }
  }
}
</script>

<style scoped>
.background-code {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.code-line {
  position: absolute;
  color: rgba(0, 255, 0, 0.2);
  font-size: 14px;
  font-family: monospace;
}
</style>