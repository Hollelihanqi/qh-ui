<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-16 10:57:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-18 14:00:14
 * @FilePath: \yto-engine\docs3\.vitepress\vitepress\components\vp-nav-full.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref } from "vue";
import { useLockScreen } from "../composables/lock-screen";
import VPFullScreenMenu from "./full-screen/vp-menu.vue";
// import VPFullScreenTranslation from './full-screen/vp-translation.vue'
import VPFullScreenThemeToggler from "./full-screen/vp-theme-toggler.vue";

defineProps<{
  fullScreen: boolean;
}>();

const { lock, cleanup } = useLockScreen();
const fullscreen = ref();
</script>

<template>
  <Transition name="el-fade-in" @enter="lock" @after-leave="cleanup">
    <div v-if="fullScreen" ref="fullscreen">
      <div class="full-screen-container">
        <VPFullScreenMenu @close="$emit('close')" />
        <!-- <VPFullScreenTranslation @close="$emit('close')" /> -->
        <VPFullScreenThemeToggler />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.full-screen {
  position: fixed;
  top: var(--nav-height);
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: var(--bg-color);
  transition: background-color 0.5s;
  overflow-y: auto;

  &.el-fade-in-enter-active,
  &.el-fade-in-leave-active {
    .full-screen-container {
      transition: transform var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
    }
  }

  &.el-fade-in-enter-from,
  &.el-fade-in-leave-to {
    .full-screen-container {
      transform: translateY(-8px);
    }
  }

  .full-screen-container {
    margin: 0 auto;
    padding: 24px 0 96px;
    max-width: 18rem;
  }
}
</style>
