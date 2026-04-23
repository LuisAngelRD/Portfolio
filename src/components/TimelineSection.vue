<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

interface TimelineItem {
  year: string
  index: number
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
  { year: '2022', index: 0, tags: ['Java', 'C++', 'MySQL', 'POO', 'UI/UX'], type: 'education' },
  { year: '2023', index: 1, tags: ['SQL', 'MySQL', 'Base de Datos', 'Script'], type: 'project' },
  { year: '2025', index: 2, tags: ['Unity', 'C#', 'Web', 'UX', 'Psicolog\u00eda'], type: 'project' },
  { year: '2025', index: 3, tags: ['Gemini AI', 'Marketing 5.0', 'Facebook', 'Instagram'], type: 'project' },
  { year: '2025', index: 4, tags: ['IEEE', 'Paper', 'Ponente', 'PSP'], type: 'achievement' },
]

const timelineRefs = ref<HTMLElement[]>([])
const observer = ref<IntersectionObserver | null>(null)
const visibleItems = ref<TimelineItem[]>(items.slice(0, visibleCount.value))

function toggleExpand() {
  if (expanded.value) {
    visibleItems.value = items.slice(0, visibleCount.value)
    expanded.value = false
  } else {
    visibleItems.value = items
    expanded.value = true
    setTimeout(() => {
      timelineRefs.value.forEach((el) => {
        if (el && !el.classList.contains('visible')) {
          observer.value?.observe(el)
        }
      })
    }, 50)
  }
}

const setRef = (el: any, index: number) => {
  if (el) timelineRefs.value[index] = el
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
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  timelineRefs.value.forEach((el) => {
    if (el) observer.value!.observe(el)
  })
})
</script>

<template>
  <section id="trayectoria" class="section timeline">
    <h2 class="section-title">{{ t('timeline.title') }}</h2>
    <p class="section-subtitle">{{ t('timeline.subtitle') }}</p>

    <div class="timeline__track">
      <div class="timeline__line"></div>

      <div
        v-for="(item, idx) in visibleItems"
        :key="idx"
        :ref="(el) => setRef(el, idx)"
        class="timeline__item fade-up"
        :class="{ 'timeline__item--right': idx % 2 !== 0 }"
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
          <h3 class="timeline__title">{{ t(`timeline.${item.index}.title`) }}</h3>
          <span class="timeline__subtitle">{{ t(`timeline.${item.index}.subtitle`) }}</span>
          <p class="timeline__desc">{{ t(`timeline.${item.index}.description`) }}</p>
          <span class="timeline__expand-hint">{{ t('timeline.clickHint') }}</span>
        </div>
      </div>
    </div>

    <button v-if="items.length > visibleCount" class="see-more-btn" @click="toggleExpand">
      <span>{{ expanded ? t('seeLess') : t('seeMore') }}</span>
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
            <button class="modal__close" @click="closeModal" :aria-label="t('timeline.close')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div class="modal__header">
              <span class="timeline__year">{{ selectedItem.year }}</span>
              <h3 class="modal__title">{{ t(`timeline.${selectedItem.index}.title`) }}</h3>
              <span class="modal__subtitle">{{ t(`timeline.${selectedItem.index}.subtitle`) }}</span>
            </div>

            <div class="modal__body">
              <p class="modal__text">{{ t(`timeline.${selectedItem.index}.details`) }}</p>
            </div>

            <div class="modal__tags">
              <span v-for="tag in selectedItem.tags" :key="tag" class="modal__tag">{{ tag }}</span>
            </div>

            <a
              v-if="selectedItem.index === 4"
              href="https://ieeexplore.ieee.org/document/11311909"
              target="_blank"
              rel="noopener noreferrer"
              class="modal__paper-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              {{ t('timeline.viewPaper') }}
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.timeline { position: relative; z-index: 1; }

.timeline__track { position: relative; max-width: 800px; margin: 0 auto; }

.timeline__line {
  position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(to bottom, transparent, var(--blue-accent) 10%, var(--blue-accent) 90%, transparent);
  opacity: 0.2; transform: translateX(-50%);
}

.timeline__item {
  position: relative; display: flex; align-items: flex-start;
  margin-bottom: 48px; padding-right: calc(50% + 40px); justify-content: flex-end;
}
.timeline__item--right { padding-right: 0; padding-left: calc(50% + 40px); justify-content: flex-start; }

.timeline__dot {
  position: absolute; left: 50%; top: 24px; transform: translateX(-50%);
  width: 40px; height: 40px; border-radius: 50%; background: var(--bg-secondary);
  border: 2px solid var(--blue-accent); display: flex; align-items: center;
  justify-content: center; color: var(--blue-accent); z-index: 2;
  box-shadow: 0 0 20px var(--blue-glow);
}

.timeline__card {
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  border-radius: 14px; padding: 20px; max-width: 300px; cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.timeline__card:hover {
  background: var(--bg-card-hover); border-color: var(--border-hover);
  transform: translateY(-4px); box-shadow: 0 12px 40px rgba(79, 195, 247, 0.06);
}

.timeline__year {
  display: inline-block; font-family: var(--font-mono); font-size: 0.8rem;
  color: var(--blue-accent); background: rgba(79, 195, 247, 0.1);
  padding: 4px 12px; border-radius: 20px; margin-bottom: 12px;
}
.timeline__title { font-size: 1.05rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.timeline__subtitle { font-size: 0.85rem; color: var(--blue-medium); display: block; margin-bottom: 10px; }
.timeline__desc { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; }

.timeline__expand-hint {
  display: inline-block; margin-top: 14px; font-size: 0.78rem;
  color: var(--text-muted); letter-spacing: 0.5px; transition: color 0.3s;
}
.timeline__card:hover .timeline__expand-hint { color: var(--blue-accent); }

/* Modal */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center;
  justify-content: center; background: rgba(4, 6, 20, 0.8); backdrop-filter: blur(8px); padding: 24px;
}
.modal {
  position: relative; width: 100%; max-width: 600px; max-height: 85vh; overflow-y: auto;
  background: var(--bg-secondary); border: 1px solid var(--border-hover); border-radius: 24px;
  padding: 40px; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(79, 195, 247, 0.08);
}
.modal__close {
  position: absolute; top: 16px; right: 16px; display: flex; align-items: center;
  justify-content: center; width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid var(--border-subtle); background: var(--bg-card);
  color: var(--text-secondary); cursor: pointer; transition: all 0.2s;
}
.modal__close:hover { color: var(--blue-accent); border-color: var(--border-hover); background: var(--bg-card-hover); }
.modal__header { margin-bottom: 24px; }
.modal__title { font-size: 1.6rem; font-weight: 700; color: var(--text-primary); margin: 12px 0 6px; }
.modal__subtitle { font-size: 1rem; color: var(--blue-medium); }
.modal__body { margin-bottom: 28px; }
.modal__text { font-size: 1rem; color: var(--text-secondary); line-height: 1.8; }
.modal__tags { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 20px; border-top: 1px solid var(--border-subtle); }
.modal__tag {
  font-family: var(--font-mono); font-size: 0.78rem; color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.08); border: 1px solid rgba(79, 195, 247, 0.12);
  padding: 5px 14px; border-radius: 20px;
}
.modal__paper-link {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
  padding: 12px 24px; border-radius: 12px; border: 1px solid var(--blue-accent);
  color: var(--blue-accent); font-size: 0.95rem; font-weight: 500;
  text-decoration: none; transition: all 0.2s ease;
  background: rgba(79, 195, 247, 0.06);
}
.modal__paper-link:hover {
  background: rgba(79, 195, 247, 0.14); box-shadow: 0 4px 20px rgba(79, 195, 247, 0.15);
  transform: translateY(-2px);
}

.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-active .modal, .modal-leave-active .modal { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal { transform: scale(0.92) translateY(20px); opacity: 0; }
.modal-leave-to .modal { transform: scale(0.95); opacity: 0; }

/* See more button */
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
  .timeline__line { left: 20px; }
  .timeline__item, .timeline__item--right { padding-left: 60px; padding-right: 0; justify-content: flex-start; }
  .timeline__dot { left: 20px; width: 32px; height: 32px; }
  .timeline__dot svg { width: 14px; height: 14px; }
  .timeline__card { max-width: 100%; }
}
</style>
