<template>
  <div class="play-shell">
    <aside class="play-sidebar">
      <div class="play-brand">
        <strong>HD Custom</strong>
        <span>Component Playground</span>
      </div>

      <nav class="play-nav">
        <button
          v-for="menu in menus"
          :key="menu.code"
          class="play-nav-item"
          :class="{ active: route.path === menu.href }"
          type="button"
          @click="router.push(menu.href)"
        >
          {{ menu.label }}
        </button>
      </nav>
    </aside>

    <section class="play-main">
      <header class="play-header">
        <div>
          <span>Playground</span>
          <h1>{{ currentTitle }}</h1>
        </div>
      </header>

      <main class="play-content">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menus } from '@/router/menu'

const route = useRoute()
const router = useRouter()

const currentTitle = computed(() => menus.find((item) => item.href === route.path)?.label ?? 'Component Preview')
</script>

<style scoped lang="scss">
.play-shell {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  width: 100%;
  min-height: 100%;
  color: #1f2937;
  background: #f6f7fb;
}

.play-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 24px 16px;
  overflow-y: auto;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
}

.play-brand {
  display: grid;
  gap: 4px;
  padding: 0 8px 20px;

  strong {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
  }

  span {
    font-size: 12px;
    color: #6b7280;
  }
}

.play-nav {
  display: grid;
  gap: 4px;
}

.play-nav-item {
  width: 100%;
  min-height: 38px;
  padding: 8px 12px;
  font: inherit;
  font-size: 14px;
  line-height: 20px;
  color: #4b5563;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-radius: 8px;
  transition:
    color 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    color: #7c3aed;
    background: #f3f0ff;
  }

  &.active {
    font-weight: 600;
    color: #7c3aed;
    background: #ede9fe;
  }
}

.play-main {
  min-width: 0;
}

.play-header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  min-height: 76px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.86);
  border-bottom: 1px solid #e5e7eb;
  backdrop-filter: blur(14px);

  span {
    display: block;
    margin-bottom: 2px;
    font-size: 12px;
    color: #8b5cf6;
  }

  h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    color: #111827;
  }
}

.play-content {
  min-width: 0;
  padding: 28px 32px 48px;
}

@media (max-width: 760px) {
  .play-shell {
    grid-template-columns: 1fr;
  }

  .play-sidebar {
    position: static;
    height: auto;
    padding: 16px;
    border-right: 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .play-nav {
    grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
  }

  .play-header,
  .play-content {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
