<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  details: string
  tags: string[]
  type: 'education' | 'project'
}

const visibleCount = ref(3)
const expanded = ref(false)
const selectedItem = ref<TimelineItem | null>(null)

function openModal(item: TimelineItem) {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedItem.value = null
  document.body.style.overflow = ''
}

const items: TimelineItem[] = [
  {
    year: '2020',
    title: 'Universidad Veracruzana',
    subtitle: 'Ingeniería de Software',
    description: 'Inicio de la carrera en la Facultad de Estadística e Informática, desarrollando bases sólidas en programación, estructuras de datos y algoritmos.',
    details: 'Comencé mi formación profesional en la Facultad de Estadística e Informática de la Universidad Veracruzana, cursando la carrera de Ingeniería de Software. Durante los primeros semestres adquirí fundamentos sólidos en lógica de programación, estructuras de datos, algoritmos, bases de datos relacionales y paradigmas de programación orientada a objetos. Esta etapa fue clave para desarrollar pensamiento analítico y habilidades de resolución de problemas.',
    tags: ['Java', 'C++', 'MySQL', 'POO'],
    type: 'education'
  },
  {
    year: '2021',
    title: 'Sistema de Gestión Académica',
    subtitle: 'Proyecto universitario',
    description: 'Desarrollo de una plataforma web para la gestión de calificaciones y asistencias utilizando Java y MySQL con arquitectura MVC.',
    details: 'Plataforma web diseñada para facilitar la administración académica dentro de la universidad. El sistema permite a los profesores registrar calificaciones y asistencias, mientras que los estudiantes pueden consultar su historial académico en tiempo real. Se implementó con arquitectura MVC utilizando Java en el backend, MySQL para la persistencia de datos y un frontend con HTML, CSS y JavaScript. Incluye autenticación por roles, generación de reportes en PDF y un dashboard estadístico.',
    tags: ['Java', 'MySQL', 'HTML/CSS', 'JavaScript', 'MVC'],
    type: 'project'
  },
  {
    year: '2022',
    title: 'Aplicación Móvil de Transporte',
    subtitle: 'Proyecto colaborativo',
    description: 'Diseño e implementación de una app Android con Kotlin para rastreo de rutas de transporte público en tiempo real.',
    details: 'Aplicación móvil desarrollada en equipo para resolver la problemática del transporte público en la ciudad. La app permite a los usuarios visualizar en un mapa interactivo la ubicación en tiempo real de las unidades de transporte, consultar rutas disponibles, estimar tiempos de llegada y recibir notificaciones push cuando su camión se aproxima. Se utilizó Kotlin con Android Studio, Firebase Realtime Database para la sincronización de datos y la API de Google Maps para la geolocalización y trazado de rutas.',
    tags: ['Kotlin', 'Android Studio', 'Firebase', 'Google Maps API'],
    type: 'project'
  },
  {
    year: '2023',
    title: 'Plataforma E-Commerce',
    subtitle: 'Proyecto Full Stack',
    description: 'Tienda en línea con Vue.js, Node.js y MongoDB. Implementación de pasarela de pagos, autenticación JWT y panel de administración.',
    details: 'Tienda en línea completa desarrollada como proyecto full stack. El frontend fue construido con Vue.js ofreciendo una experiencia de usuario fluida con catálogo de productos, filtros de búsqueda, carrito de compras persistente y proceso de checkout. El backend en Node.js con Express expone una API RESTful, maneja autenticación con JWT y se conecta a MongoDB para la gestión de productos, usuarios y órdenes. Se integró Stripe como pasarela de pagos y se construyó un panel de administración para gestionar inventario, pedidos y analíticas de ventas.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    type: 'project'
  },
  {
    year: '2024',
    title: 'Videojuego 3D en Unity',
    subtitle: 'Proyecto personal',
    description: 'Desarrollo de un videojuego de aventura 3D usando Unity y C#, con sistema de inventario, IA de enemigos y generación procedural de niveles.',
    details: 'Videojuego de aventura en tercera persona desarrollado como proyecto personal para explorar el desarrollo de videojuegos. El juego cuenta con un sistema de inventario drag-and-drop, enemigos con inteligencia artificial basada en máquinas de estados finitos, generación procedural de niveles mediante algoritmos de ruido Perlin, sistema de partículas para efectos visuales y shaders personalizados creados con Shader Graph. Los modelos 3D fueron creados en Blender y el proyecto incluye un sistema de guardado/carga de progreso.',
    tags: ['Unity', 'C#', 'Blender', 'Shader Graph', 'IA'],
    type: 'project'
  }
]

const timelineRefs = ref<HTMLElement[]>([])

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )

  timelineRefs.value.forEach((el) => {
    if (el) observer.value!.observe(el)
  })
})

const visibleItems = ref<TimelineItem[]>(items.slice(0, visibleCount.value))

function toggleExpand() {
  if (expanded.value) {
    visibleItems.value = items.slice(0, visibleCount.value)
    expanded.value = false
  } else {
    visibleItems.value = items
    expanded.value = true
    // Observe newly added elements after DOM update
    setTimeout(() => {
      timelineRefs.value.forEach((el) => {
        if (el && !el.classList.contains('visible')) {
          observer.value?.observe(el)
        }
      })
    }, 50)
  }
}

const observer = ref<IntersectionObserver | null>(null)

const setRef = (el: any, index: number) => {
  if (el) timelineRefs.value[index] = el
}
</script>

<template>
  <section id="trayectoria" class="section timeline">
    <h2 class="section-title">Mi Trayectoria</h2>
    <p class="section-subtitle">
      Un recorrido por mi formaci&oacute;n y los proyectos que han marcado mi camino como desarrollador.
    </p>

    <div class="timeline__track">
      <div class="timeline__line"></div>

      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        :ref="(el) => setRef(el, index)"
        class="timeline__item fade-up"
        :class="{ 'timeline__item--right': index % 2 !== 0 }"
      >
        <div class="timeline__dot">
          <svg v-if="item.type === 'education'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>

        <div class="timeline__card" @click="openModal(item)">
          <span class="timeline__year">{{ item.year }}</span>
          <h3 class="timeline__title">{{ item.title }}</h3>
          <span class="timeline__subtitle">{{ item.subtitle }}</span>
          <p class="timeline__desc">{{ item.description }}</p>
          <span class="timeline__expand-hint">Click para ver m&aacute;s</span>
        </div>
      </div>
    </div>

    <button v-if="items.length > visibleCount" class="see-more-btn" @click="toggleExpand">
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

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedItem" class="modal-overlay" @click.self="closeModal">
          <div class="modal">
            <button class="modal__close" @click="closeModal" aria-label="Cerrar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div class="modal__header">
              <span class="timeline__year">{{ selectedItem.year }}</span>
              <h3 class="modal__title">{{ selectedItem.title }}</h3>
              <span class="modal__subtitle">{{ selectedItem.subtitle }}</span>
            </div>

            <div class="modal__body">
              <p class="modal__text">{{ selectedItem.details }}</p>
            </div>

            <div class="modal__tags">
              <span v-for="tag in selectedItem.tags" :key="tag" class="modal__tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.timeline {
  position: relative;
  z-index: 1;
}

.timeline__track {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline__line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--blue-accent) 10%,
    var(--blue-accent) 90%,
    transparent
  );
  opacity: 0.2;
  transform: translateX(-50%);
}

.timeline__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  padding-right: calc(50% + 40px);
  justify-content: flex-end;
}

.timeline__item--right {
  padding-right: 0;
  padding-left: calc(50% + 40px);
  justify-content: flex-start;
}

.timeline__dot {
  position: absolute;
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--blue-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue-accent);
  z-index: 2;
  box-shadow: 0 0 20px var(--blue-glow);
}

.timeline__card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  max-width: 340px;
}

.timeline__card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(79, 195, 247, 0.06);
}

.timeline__year {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.timeline__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.timeline__subtitle {
  font-size: 0.9rem;
  color: var(--blue-medium);
  display: block;
  margin-bottom: 12px;
}

.timeline__desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

.timeline__card {
  cursor: pointer;
}

.timeline__expand-hint {
  display: inline-block;
  margin-top: 14px;
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

.timeline__card:hover .timeline__expand-hint {
  color: var(--blue-accent);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 6, 20, 0.8);
  backdrop-filter: blur(8px);
  padding: 24px;
}

.modal {
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--bg-secondary);
  border: 1px solid var(--border-hover);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(79, 195, 247, 0.08);
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.modal__close:hover {
  color: var(--blue-accent);
  border-color: var(--border-hover);
  background: var(--bg-card-hover);
}

.modal__header {
  margin-bottom: 24px;
}

.modal__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 12px 0 6px;
}

.modal__subtitle {
  font-size: 1rem;
  color: var(--blue-medium);
}

.modal__body {
  margin-bottom: 28px;
}

.modal__text {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
}

.modal__tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.08);
  border: 1px solid rgba(79, 195, 247, 0.12);
  padding: 5px 14px;
  border-radius: 20px;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal {
  transform: scale(0.92) translateY(20px);
  opacity: 0;
}

.modal-leave-to .modal {
  transform: scale(0.95);
  opacity: 0;
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
  .timeline__line {
    left: 20px;
  }

  .timeline__item,
  .timeline__item--right {
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
  }

  .timeline__dot {
    left: 20px;
    width: 32px;
    height: 32px;
  }

  .timeline__dot svg {
    width: 14px;
    height: 14px;
  }

  .timeline__card {
    max-width: 100%;
  }
}
</style>
