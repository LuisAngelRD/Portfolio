<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import claudeCodeIcon from '../assets/claude-code.svg'

const { t } = useI18n()

interface Tech {
  name: string
  icon: string
  color: string
}

interface TechCategory {
  labelKey: string
  icon: string
  items: Tech[]
}

const categories: TechCategory[] = [
  {
    labelKey: 'tech.frontend',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
    items: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#e34f26' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572b6' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#4fc08d' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
    ]
  },
  {
    labelKey: 'tech.backend',
    icon: 'M5 12h14M12 5l7 7-7 7',
    items: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#f89820' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776ab' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599c' },
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', color: '#7f52ff' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    ]
  },
  {
    labelKey: 'tech.learning',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    items: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#ff9900' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#ffffff' },
    ]
  },
  {
    labelKey: 'tech.tools',
    icon: 'M11.42 15.17l-5.66-5.66a8 8 0 1111.31 0l-5.66 5.66zM12 10h.01',
    items: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#f05032' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#ffffff' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007acc' },
      { name: 'npm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', color: '#cb3837' },
      { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', color: '#ffffff' },
      { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg', color: '#3ddc84' },
      { name: 'Claude Code', icon: claudeCodeIcon, color: '#cc9b7a' },
    ]
  }
]

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return
  const observer = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') }) },
    { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
  )
  sectionRef.value.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section id="tecnologias" class="section tech" ref="sectionRef">
    <h2 class="section-title">{{ t('tech.title') }}</h2>
    <p class="section-subtitle">{{ t('tech.subtitle') }}</p>

    <div class="tech__categories">
      <div v-for="(category, catIdx) in categories" :key="category.labelKey" class="tech__category fade-up" :style="{ transitionDelay: (catIdx * 0.12) + 's' }">
        <div class="tech__category-header">
          <div class="tech__category-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path :d="category.icon" />
            </svg>
          </div>
          <h3 class="tech__category-label">{{ t(category.labelKey) }}</h3>
        </div>

        <div class="tech__grid">
          <div v-for="tech in category.items" :key="tech.name" class="tech__item">
            <div class="tech__icon-wrapper" :style="{ '--glow-color': tech.color + '25' }">
              <img :src="tech.icon" :alt="tech.name" class="tech__icon" loading="lazy" />
            </div>
            <span class="tech__name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech { position: relative; z-index: 1; }

.tech__categories { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

.tech__category {
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  border-radius: 16px; padding: 22px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.tech__category:hover { border-color: var(--border-hover); box-shadow: 0 12px 40px rgba(79, 195, 247, 0.04); }

.tech__category-header {
  display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
  padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle);
}
.tech__category-icon {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(79, 195, 247, 0.08); color: var(--blue-accent);
}
.tech__category-label { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); letter-spacing: 0.5px; }

.tech__grid { display: flex; flex-wrap: wrap; gap: 12px; }

.tech__item {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 12px 10px; width: 80px; border-radius: 12px;
  background: rgba(255, 255, 255, 0.02); border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); cursor: default;
}
.tech__item:hover { background: var(--bg-card-hover); border-color: var(--border-hover); transform: translateY(-4px); }
.tech__item:hover .tech__icon-wrapper { box-shadow: 0 0 20px var(--glow-color); }

.tech__icon-wrapper {
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  border-radius: 10px; background: rgba(255, 255, 255, 0.03); transition: box-shadow 0.3s;
}
.tech__icon { width: 28px; height: 28px; object-fit: contain; }

.tech__name { font-size: 0.72rem; font-weight: 500; color: var(--text-secondary); text-align: center; transition: color 0.3s; line-height: 1.3; }
.tech__item:hover .tech__name { color: var(--text-primary); }

@media (max-width: 768px) {
  .tech__categories { grid-template-columns: 1fr; gap: 24px; }
  .tech__category { padding: 24px; }
  .tech__grid { gap: 12px; justify-content: center; }
  .tech__item { width: 80px; padding: 12px 10px; }
  .tech__icon-wrapper { width: 40px; height: 40px; }
  .tech__icon { width: 28px; height: 28px; }
}
</style>
