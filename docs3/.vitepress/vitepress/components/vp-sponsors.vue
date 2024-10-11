<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-16 10:57:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-18 15:06:17
 * @FilePath: \yto-engine\docs3\.vitepress\vitepress\components\vp-sponsors.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { computed } from "vue";
import VPSponsorSmall from "./vp-sponsor-small.vue";
</script>

<template>
  <div class="page-content">
    <p class="title">这是自定Title</p>
    <VPSponsorLarge />
  </div>
</template>

<style lang="scss" scoped>
.page-content {
  padding-bottom: 10px;
  padding-top: 0;
  .title {
    color: var(--text-color-secondary);
    font-weight: 300;
    font-size: 14px;
  }
}
</style>
