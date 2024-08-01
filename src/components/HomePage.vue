<template>
  <div class="home-page">
    <div class="profile-container">
      <h2 class="title">{{$t('personal.title')}}</h2>
      <img :src="profileImage" alt="Mustafa Kendiguzel" class="profile-image">
      <h1 class="name">Mustafa Kendigüzel</h1>
      <div class="social-links">
        <a href="https://www.linkedin.com/in/mustafa-kendiguzel/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a  href="https://github.com/mustafakendiguzel" target="_blank" rel="noopener noreferrer">GitHub</a>
        <button @click="downloadCV" class="download-cv-button">CV</button>

      </div>
      <div class="email-links">
        <a href="mailto:mustafakendiguzel@gmail.com">mustafakendiguzel@gmail.com</a>
      </div>
    </div>
  </div>
</template>

<script>
import profileImage from '@/assets/profile-photo.jpg'
import cvUrl from '@/assets/mustafaKendiguzel_cv.pdf'


export default {
  name: 'HomePage',
  data() {
    return {
      profileImage: profileImage,
    }
  },
  methods: {
    downloadCV() {
      const link = document.createElement('a')
      link.href = cvUrl
      link.download = 'mustafaKendiguzel_cv.pdf'
      link.click()
    },
  },
}
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.profile-container {
  text-align: center;
  background-color: rgba(10, 31, 10, 0.5);
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  width: 600px;
}

.title {
  color: white;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 30px;
  object-fit: cover;
}

.name {
  font-size: 2.2em;
  margin-bottom: 30px;
  font-weight: bold;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.social-links a {
  color: #00ff00;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  padding: 12px 24px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.social-links a,
.download-cv-button {
  color: #00ff00;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  padding: 12px 24px;
  border: 2px solid #00ff00;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.social-links a:hover,
.download-cv-button:hover {
  background-color: #00ff00;
  color: #000000;
}

.download-cv-button {
  background-color: transparent;
  cursor: pointer;
  border: 2px solid #00ff00;
  font-size: 1em;
}

.social-links a:hover {
  background-color: #00ff00;
  color: #000000;
}

.email-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.email-links a {
  color: #00ff00;
  text-decoration: none;
  font-size: 1em;
  transition: all 0.3s ease;
}

.email-links a:hover {
  text-decoration: underline;
}
</style>