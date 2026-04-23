<script setup lang="ts">
import HeroSection from './components/HeroSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import PapersSection from './components/PapersSection.vue'
import TechSection from './components/TechSection.vue'
import ContactSection from './components/ContactSection.vue'
import LangToggle from './components/LangToggle.vue'
import { useI18n } from './composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="app-wrapper">
    <LangToggle />

    <!-- Ambient background glow -->
    <div class="bg-glow bg-glow--top"></div>
    <div class="bg-glow bg-glow--mid"></div>

    <HeroSection />
    <TimelineSection />
    <ProjectsSection />
    <PapersSection />
    <TechSection />
    <ContactSection />

    <footer class="footer">
      <p>&copy; 2026 Luis &Aacute;ngel Rueda D&iacute;az</p>
    </footer>
  </div>
</template>

<style>
.app-wrapper {
  position: relative;
  min-height: 100vh;
  padding-top: 56px;
}

.bg-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
}

.bg-glow--top {
  width: 600px;
  height: 600px;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%);
}

.bg-glow--mid {
  width: 500px;
  height: 500px;
  top: 60%;
  right: -150px;
  background: radial-gradient(circle, rgba(79, 195, 247, 0.05) 0%, transparent 70%);
}

.footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 48px 24px;
  border-top: 1px solid var(--border-subtle);
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
