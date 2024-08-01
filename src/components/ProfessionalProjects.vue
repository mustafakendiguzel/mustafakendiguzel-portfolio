<template>
  <div class="open-source-projects">
    <div class="projects-list">
      <div v-for="project in localizedProjects" :key="project.id" class="project-card">
        <div class="project-header">
          <img :src="project.logo" :alt="project.name" class="project-logo"
          :class="['project-logo', { 'nutcracker-logo': project.name === 'Meetnutcracker' }]">

          <div class="project-title-description">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </div>
        <div class="project-links">
          <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="project-link github">
            <i class="fab fa-github"></i> GitHub
          </a>
          <a v-if="project.website" :href="project.website" target="_blank" rel="noopener noreferrer" class="project-link demo">
            <i class="fas fa-external-link-alt"></i> Website
          </a>
          <a v-if="project.store" :href="project.store" target="_blank" rel="noopener noreferrer" class="project-link demo">
            <i class="fas fa-external-link-alt"></i> {{ $t('store') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfessionalProjectsList',
  props: {
    title: {
      type: String,
      default: 'Kişisel Projeler'
    },
    projects: {
      type: Array,
      required: true,
      default: () => [
        {
        id: 1,
        name: 'Medionam',
        description: 'Türkiyenin ilk bulut tabanl',
        logo: 'https://medionam.com.tr/assets/img/medionam-long.png',
        website: 'https://medionam.com.tr',
      },
      {
        id: 1,
        name: 'Eyedius-one',
        logo: 'https://eyedius.com/wp-content/uploads/2024/03/logo_eyedius.svg',
        website: 'https://eyedius.com',
        store: 'https://apps.apple.com/tr/app/eyedius-desktop/id1591502799'
      },
      {
        id: 1,
        name: 'Meetnutcracker',
        logo: 'https://www.meetnutcracker.com/wp-content/uploads/2024/05/nutcracker-logo-white.webp',
        website: 'https://meetnutcracker.com',
      },
    ]
    }
  },
  computed: {
    localizedProjects() {
      return this.projects.map(project => ({
        ...project,
        description: this.$t(`projects.professional.${project.name}.description`),
      }));
    }
  }
}
</script>

<style scoped>

.nutcracker-logo {
  background-color: #000000; /* Siyah renk */
}

.open-source-projects {
  padding: 2rem;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-card {
  border: 0.2px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.project-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.project-logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-right: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.nutcracker-logo {
  background-color: #6c29e3 !important;
}

.project-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.project-title-description {
  flex-grow: 1;
}

.project-name {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.project-description {
  margin-bottom: 1rem;
  color: #b2b9be;
  line-height: 1.6;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.project-link.github {
  background-color: #24292e;
  color: #ffffff;
}

.project-link.demo {
  background-color: #007bff;
  color: #ffffff;
}

.project-link:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.project-link i {
  margin-right: 0.5rem;
}
</style>