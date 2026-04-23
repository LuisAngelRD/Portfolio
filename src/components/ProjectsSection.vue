<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import imgImss from '../assets/project-imss.jpg'
import imgSinaptea from '../assets/project-sinaptea.png'
import imgLoading from '../assets/loading-placeholder.svg'

const { t } = useI18n()

interface Project {
  index: number
  tags: string[]
  image: string
  github: string
}

const visibleCount = 2
const expanded = ref(false)
const selectedProject = ref<Project | null>(null)

function openModal(project: Project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const projects: Project[] = [
  { index: 0, tags: ['SQL', 'MySQL', 'Base de Datos', 'Script'], image: imgImss, github: 'https://github.com/LuisAngelRD/bdimss' },
  { index: 1, tags: ['Unity', 'C#', 'Web', 'UX', 'Psicolog\u00eda'], image: imgSinaptea, github: 'https://github.com/LuisAngelRD/SinapteaWeb' },
  { index: 2, tags: ['Gemini AI', 'Marketing 5.0', 'Facebook', 'Instagram'], image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop', github: 'https://github.com/LuisAngelRD' },
  { index: 3, tags: [], image: imgLoading, github: '#' },
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
        if (el && !el.classList.contains('visible')) observer.value?.observe(el)
      })
    }, 50)
  }
}

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') }) },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )
  cardRefs.value.forEach((el) => { if (el) observer.value!.observe(el) })
})

const setRef = (el: any, index: number) => { if (el) cardRefs.value[index] = el }
</script>

<template>
  <section id="proyectos" class="section projects">
    <h2 class="section-title">{{ t('projects.title') }}</h2>
    <p class="section-subtitle">{{ t('projects.subtitle') }}</p>

    <div class="projects__grid">
      <article
        v-for="(project, idx) in visibleProjects"
        :key="idx"
        :ref="(el) => setRef(el, idx)"
        class="projects__card fade-up"
        :style="{ transitionDelay: (idx * 0.1) + 's' }"
      >
        <div class="projects__image-wrapper">
          <img :src="project.image" :alt="t(`projects.${project.index}.title`)" class="projects__image" loading="lazy" />
          <div class="projects__image-overlay"></div>
        </div>

        <div class="projects__body">
          <h3 class="projects__title">{{ t(`projects.${project.index}.title`) }}</h3>
          <p class="projects__desc">{{ t(`projects.${project.index}.description`) }}</p>
          <div class="projects__tags">
            <span v-for="tag in project.tags" :key="tag" class="projects__tag">{{ tag }}</span>
          </div>
          <button class="projects__link" @click="openModal(project)">
            {{ t('projects.viewProject') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </article>
    </div>

    <button v-if="projects.length > visibleCount" class="see-more-btn" @click="toggleExpand">
      <span>{{ expanded ? t('seeLess') : t('seeMore') }}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'see-more-btn__icon--flipped': expanded }" class="see-more-btn__icon">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProject" class="modal-overlay" @click.self="closeModal">
          <div class="modal">
            <button class="modal__close" @click="closeModal" :aria-label="t('projects.close')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div class="modal__image-wrapper">
              <img :src="selectedProject.image" :alt="t(`projects.${selectedProject.index}.title`)" class="modal__image" />
            </div>

            <div class="modal__content">
              <h3 class="modal__title">{{ t(`projects.${selectedProject.index}.title`) }}</h3>

              <div class="modal__tags">
                <span v-for="tag in selectedProject.tags" :key="tag" class="modal__tag">{{ tag }}</span>
              </div>

              <p class="modal__text">{{ t(`projects.${selectedProject.index}.details`) }}</p>

              <a :href="selectedProject.github" target="_blank" rel="noopener" class="modal__github-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                {{ t('projects.viewOnGithub') }}
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.projects { position: relative; z-index: 1; }

.projects__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

.projects__card {
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.projects__card:hover { border-color: var(--border-hover); transform: translateY(-4px); box-shadow: 0 16px 50px rgba(79, 195, 247, 0.08); }

.projects__image-wrapper { position: relative; height: 160px; overflow: hidden; }
.projects__image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.projects__card:hover .projects__image { transform: scale(1.05); }
.projects__image-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, var(--bg-primary) 100%); }

.projects__body { padding: 18px 22px 22px; }
.projects__title { font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; color: var(--text-primary); }
.projects__desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px; }
.projects__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.projects__tag {
  font-family: var(--font-mono); font-size: 0.75rem; color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.08); border: 1px solid rgba(79, 195, 247, 0.12);
  padding: 4px 12px; border-radius: 20px;
}

.projects__link {
  display: inline-flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 500;
  color: var(--blue-accent); background: none; border: none; cursor: pointer;
  font-family: var(--font-sans); padding: 0; transition: gap 0.3s;
}
.projects__link:hover { gap: 12px; }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center;
  justify-content: center; background: rgba(4, 6, 20, 0.8); backdrop-filter: blur(8px); padding: 24px;
}

.modal {
  position: relative; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto;
  background: var(--bg-secondary); border: 1px solid var(--border-hover); border-radius: 24px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(79, 195, 247, 0.08);
}

.modal__close {
  position: absolute; top: 16px; right: 16px; z-index: 2; display: flex; align-items: center;
  justify-content: center; width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.4);
  color: #fff; cursor: pointer; transition: all 0.2s; backdrop-filter: blur(4px);
}
.modal__close:hover { background: rgba(0,0,0,0.6); border-color: var(--border-hover); }

.modal__image-wrapper { width: 100%; height: 220px; overflow: hidden; border-radius: 24px 24px 0 0; }
.modal__image { width: 100%; height: 100%; object-fit: cover; }

.modal__content { padding: 32px 36px 36px; }

.modal__title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }

.modal__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.modal__tag {
  font-family: var(--font-mono); font-size: 0.78rem; color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.08); border: 1px solid rgba(79, 195, 247, 0.12);
  padding: 5px 14px; border-radius: 20px;
}

.modal__text { font-size: 1rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 28px; }

.modal__github-btn {
  display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px;
  border-radius: 14px; background: var(--bg-card); border: 1px solid var(--border-subtle);
  color: var(--text-primary); font-size: 0.95rem; font-weight: 500;
  font-family: var(--font-sans); text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
}
.modal__github-btn:hover {
  color: var(--blue-accent); background: var(--bg-card-hover);
  border-color: var(--border-hover); transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(79, 195, 247, 0.1);
}

/* Modal transition */
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-active .modal, .modal-leave-active .modal { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal { transform: scale(0.92) translateY(20px); opacity: 0; }
.modal-leave-to .modal { transform: scale(0.95); opacity: 0; }

/* See more */
.see-more-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin: 48px auto 0; padding: 14px 32px; border-radius: 14px;
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  color: var(--blue-accent); font-family: var(--font-sans); font-size: 0.95rem;
  font-weight: 500; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.see-more-btn:hover { background: var(--bg-card-hover); border-color: var(--border-hover); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(79, 195, 247, 0.1); }
.see-more-btn__icon { transition: transform 0.3s ease; }
.see-more-btn__icon--flipped { transform: rotate(180deg); }

@media (max-width: 768px) {
  .projects__grid { grid-template-columns: 1fr; }
  .projects__image-wrapper { height: 150px; }
  .modal__image-wrapper { height: 160px; }
  .modal__content { padding: 24px; }
}
</style>
