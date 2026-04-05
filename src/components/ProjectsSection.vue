<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

const visibleCount = 2
const expanded = ref(false)

const projects: Project[] = [
  {
    title: 'Sistema de Gestión Académica',
    description: 'Plataforma web completa para la administración de calificaciones, asistencias y reportes académicos con roles de usuario y dashboard interactivo.',
    tags: ['Java', 'MySQL', 'HTML/CSS', 'Spring Boot'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    link: '#'
  },
  {
    title: 'App de Transporte Público',
    description: 'Aplicación móvil para rastreo de rutas de transporte público en tiempo real con mapas interactivos y notificaciones push.',
    tags: ['Kotlin', 'Android Studio', 'Firebase', 'Google Maps API'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    link: '#'
  },
  {
    title: 'Plataforma E-Commerce',
    description: 'Tienda en línea full stack con catálogo de productos, carrito de compras, pasarela de pagos y panel de administración.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    link: '#'
  },
  {
    title: 'Videojuego 3D de Aventura',
    description: 'Juego de aventura en 3D con generación procedural de niveles, sistema de inventario y inteligencia artificial de enemigos.',
    tags: ['Unity', 'C#', 'Blender', 'Shader Graph'],
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=600&h=400&fit=crop',
    link: '#'
  }
]

const visibleProjects = ref<Project[]>(projects.slice(0, visibleCount))
const cardRefs = ref<HTMLElement[]>([])
const observer = ref<IntersectionObserver | null>(null)

function toggleExpand() {
  if (expanded.value) {
    visibleProjects.value = projects.slice(0, visibleCount)
    expanded.value = false
  } else {
    visibleProjects.value = projects
    expanded.value = true
    setTimeout(() => {
      cardRefs.value.forEach((el) => {
        if (el && !el.classList.contains('visible')) {
          observer.value?.observe(el)
        }
      })
    }, 50)
  }
}

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )

  cardRefs.value.forEach((el) => {
    if (el) observer.value!.observe(el)
  })
})

const setRef = (el: any, index: number) => {
  if (el) cardRefs.value[index] = el
}
</script>

<template>
  <section class="section projects">
    <h2 class="section-title">Proyectos</h2>
    <p class="section-subtitle">
      Una selecci&oacute;n de proyectos en los que he trabajado, cada uno con sus propios desaf&iacute;os y aprendizajes.
    </p>

    <div class="projects__grid">
      <article
        v-for="(project, index) in visibleProjects"
        :key="index"
        :ref="(el) => setRef(el, index)"
        class="projects__card fade-up"
        :style="{ transitionDelay: (index * 0.1) + 's' }"
      >
        <div class="projects__image-wrapper">
          <img :src="project.image" :alt="project.title" class="projects__image" loading="lazy" />
          <div class="projects__image-overlay"></div>
        </div>

        <div class="projects__body">
          <h3 class="projects__title">{{ project.title }}</h3>
          <p class="projects__desc">{{ project.description }}</p>
          <div class="projects__tags">
            <span v-for="tag in project.tags" :key="tag" class="projects__tag">{{ tag }}</span>
          </div>
          <a :href="project.link" class="projects__link">
            Ver proyecto
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </article>
    </div>

    <button v-if="projects.length > visibleCount" class="see-more-btn" @click="toggleExpand">
      <span>{{ expanded ? 'Ver menos' : 'Ver m\u00e1s' }}</span>
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        :class="{ 'see-more-btn__icon--flipped': expanded }"
        class="see-more-btn__icon"
      >
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  </section>
</template>

<style scoped>
.projects {
  position: relative;
  z-index: 1;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.projects__card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.projects__card:hover {
  border-color: var(--border-hover);
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(79, 195, 247, 0.08);
}

.projects__image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.projects__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.projects__card:hover .projects__image {
  transform: scale(1.05);
}

.projects__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, var(--bg-primary) 100%);
}

.projects__body {
  padding: 24px 28px 28px;
}

.projects__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.projects__desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 18px;
}

.projects__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.projects__tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.08);
  border: 1px solid rgba(79, 195, 247, 0.12);
  padding: 4px 12px;
  border-radius: 20px;
}

.projects__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--blue-accent);
  transition: gap 0.3s;
}

.projects__link:hover {
  gap: 12px;
}

/* See more button */
.see-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 48px auto 0;
  padding: 14px 32px;
  border-radius: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--blue-accent);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.see-more-btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(79, 195, 247, 0.1);
}

.see-more-btn__icon {
  transition: transform 0.3s ease;
}

.see-more-btn__icon--flipped {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }

  .projects__image-wrapper {
    height: 180px;
  }
}
</style>
