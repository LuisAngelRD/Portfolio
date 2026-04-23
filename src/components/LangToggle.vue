<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { locale, toggleLocale, t } = useI18n()

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar__links">
      <button class="navbar__link" @click="scrollTo('trayectoria')">{{ t('nav.timeline') }}</button>
      <button class="navbar__link" @click="scrollTo('proyectos')">{{ t('nav.projects') }}</button>
      <button class="navbar__link" @click="scrollTo('papers')">{{ t('nav.papers') }}</button>
      <button class="navbar__link" @click="scrollTo('tecnologias')">{{ t('nav.tech') }}</button>
      <button class="navbar__link" @click="scrollTo('contacto')">{{ t('nav.contact') }}</button>
    </div>

    <button class="lang-toggle" @click="toggleLocale" :aria-label="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'">
      <span class="lang-toggle__option" :class="{ 'lang-toggle__option--active': locale === 'es' }">ES</span>
      <span class="lang-toggle__divider">/</span>
      <span class="lang-toggle__option" :class="{ 'lang-toggle__option--active': locale === 'en' }">EN</span>
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 28px;
  background: rgba(6, 8, 26, 0.75);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar__link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.88rem;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.navbar__link:hover {
  color: var(--blue-accent);
  background: rgba(79, 195, 247, 0.07);
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 16px;
  border-radius: 8px;
  background: rgba(79, 195, 247, 0.06);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  margin-left: 12px;
  transition: all 0.2s ease;
}
.lang-toggle:hover {
  border-color: var(--border-hover);
  background: rgba(79, 195, 247, 0.1);
}

.lang-toggle__option {
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.3s;
}
.lang-toggle__option--active { color: var(--blue-accent); }
.lang-toggle__divider { color: var(--text-muted); }

@media (max-width: 768px) {
  .navbar { padding: 10px 16px; gap: 4px; }
  .navbar__link { font-size: 0.78rem; padding: 6px 8px; }
  .lang-toggle { padding: 6px 12px; margin-left: 6px; }
}

@media (max-width: 480px) {
  .navbar__links { gap: 0; }
  .navbar__link { font-size: 0.72rem; padding: 5px 6px; }
}
</style>
