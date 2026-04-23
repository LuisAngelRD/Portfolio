<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

interface Paper {
  index: number
  tags: string[]
  venue: string
  year: string
  doi: string
}

const papers: Paper[] = [
  {
    index: 0,
    tags: ['PSP', 'Software Engineering', 'Education', 'Case Study'],
    venue: 'IEEE ENC 2025',
    year: '2025',
    doi: 'https://ieeexplore.ieee.org/document/11311909',
  },
]

const cardRefs = ref<HTMLElement[]>([])
const observer = ref<IntersectionObserver | null>(null)
const setRef = (el: any, index: number) => { if (el) cardRefs.value[index] = el }

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible') }) },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  )
  cardRefs.value.forEach((el) => { if (el) observer.value!.observe(el) })
})
</script>

<template>
  <section id="papers" class="section papers">
    <h2 class="section-title">{{ t('papers.title') }}</h2>
    <p class="section-subtitle">{{ t('papers.subtitle') }}</p>

    <div class="papers__list">
      <article
        v-for="(paper, idx) in papers"
        :key="idx"
        :ref="(el) => setRef(el, idx)"
        class="papers__card fade-up"
        :style="{ transitionDelay: (idx * 0.1) + 's' }"
      >
        <div class="papers__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>

        <div class="papers__body">
          <div class="papers__meta">
            <span class="papers__venue">{{ paper.venue }}</span>
            <span class="papers__year">{{ paper.year }}</span>
          </div>

          <h3 class="papers__title">{{ t(`papers.${paper.index}.title`) }}</h3>
          <p class="papers__authors">{{ t(`papers.${paper.index}.authors`) }}</p>
          <p class="papers__abstract">{{ t(`papers.${paper.index}.abstract`) }}</p>

          <div class="papers__tags">
            <span v-for="tag in paper.tags" :key="tag" class="papers__tag">{{ tag }}</span>
          </div>

          <a :href="paper.doi" target="_blank" rel="noopener noreferrer" class="papers__link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            {{ t('papers.viewOnIEEE') }}
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.papers { position: relative; z-index: 1; }

.papers__list { display: flex; flex-direction: column; gap: 24px; max-width: 860px; margin: 0 auto; }

.papers__card {
  display: flex; gap: 28px; align-items: flex-start;
  background: var(--bg-card); border: 1px solid var(--border-subtle);
  border-radius: 20px; padding: 32px 36px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.papers__card:hover {
  border-color: var(--border-hover); transform: translateY(-4px);
  box-shadow: 0 16px 50px rgba(79, 195, 247, 0.07);
}

.papers__icon {
  flex-shrink: 0; width: 56px; height: 56px; border-radius: 14px;
  background: rgba(79, 195, 247, 0.08); border: 1px solid rgba(79, 195, 247, 0.15);
  display: flex; align-items: center; justify-content: center;
  color: var(--blue-accent);
}

.papers__body { flex: 1; min-width: 0; }

.papers__meta { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }

.papers__venue {
  font-family: var(--font-mono); font-size: 0.8rem; font-weight: 600;
  color: var(--blue-accent); background: rgba(79, 195, 247, 0.1);
  border: 1px solid rgba(79, 195, 247, 0.2); padding: 4px 12px; border-radius: 20px;
}
.papers__year {
  font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);
}

.papers__title {
  font-size: 1.15rem; font-weight: 600; color: var(--text-primary);
  line-height: 1.4; margin-bottom: 8px;
}
.papers__authors {
  font-size: 0.88rem; color: var(--blue-medium); margin-bottom: 12px; font-style: italic;
}
.papers__abstract {
  font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 18px;
}

.papers__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.papers__tag {
  font-family: var(--font-mono); font-size: 0.75rem; color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.08); border: 1px solid rgba(79, 195, 247, 0.12);
  padding: 4px 12px; border-radius: 20px;
}

.papers__link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; border-radius: 12px;
  border: 1px solid var(--border-subtle); background: var(--bg-card);
  color: var(--blue-accent); font-size: 0.9rem; font-weight: 500;
  text-decoration: none; transition: all 0.25s ease;
}
.papers__link:hover {
  background: var(--bg-card-hover); border-color: var(--border-hover);
  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79, 195, 247, 0.12);
}

@media (max-width: 640px) {
  .papers__card { flex-direction: column; gap: 20px; padding: 24px; }
}
</style>
